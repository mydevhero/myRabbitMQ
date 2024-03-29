type cb_t = (data: any) => void;
type hostname_t = string;
type port_t = number;
type username_t = string;
type password_t = string;
type timeout_t = number;
type url_t = string;
type exchange_name_t = undefined|string;
type exchange_type_t = undefined|'direct'|'fanout'|'topic'|'headers';
type exchange_opts_t = any;
type ttl_t = number;
type prefetch_t = number;
type durable_t = boolean;
type connect_opts_t = any;
type queue_name_t = undefined|string;
type queue_opts_t = any;
type routingKey_t = string;
type topicKey_t = string;
type sendToQueue_opts_t = any;
type publish_opts_t = any;
type consume_opts_t = any;
type context_t = string;

type queue_t = undefined|Replies.AssertQueue;
type exchange_t = undefined|Replies.AssertExchange;

interface myRabbitMQ_i {
  hostname?: hostname_t;
  port?: port_t;
  username?: username_t;
  password?: password_t;
  timeout?: timeout_t;
  url?: url_t;
  exchange_name?: exchange_name_t;
  exchange_type?: exchange_type_t;
  exchange_opts?: exchange_opts_t;
  ttl?: ttl_t;
  prefetch?: prefetch_t;
  durable_queue?: durable_t;
  durable_exchange?: durable_t;
  connect_opts?: connect_opts_t;
  queue_name?: queue_name_t;
  queue_opts?: queue_opts_t;
  routingKey?: routingKey_t;
  topicKey?: topicKey_t;
  sendToQueue_opts?: sendToQueue_opts_t;
  publish_opts?: publish_opts_t;
  consume_opts?: consume_opts_t;
}

import amqp, { credentials, Connection, ConfirmChannel, Replies } from 'amqplib';

const timeout_reconnect = 150;
const ttl = 60000;
const prefetch=20;
const port=5672;
const durable_queue=true;
const durable_exchange=true;
const exchange_name = 'exchange';
const exchange_type='fanout';
const queue_name = undefined;
var DEBUG=false;

class myRabbitMQ {
  #context!: context_t;
  #hostname!: hostname_t;
  #port!: port_t;
  #username!: username_t;
  #password!: password_t;
  #timeout_reconnect!: timeout_t;
  #url!: url_t;
  #exchange_name!: exchange_name_t;
  #exchange_type!: exchange_type_t;
  #exchange_opts!: exchange_opts_t;
  #ttl!: ttl_t;
  #prefetch!: prefetch_t;
  #durable_queue!: durable_t;
  #durable_exchange!: durable_t;
  #connection?: Connection;
  #channel?: ConfirmChannel;
  #queue?:queue_t;
  #exchange?:exchange_t;
  #routingKey!: routingKey_t;
  #topicKey!: topicKey_t;
  #connect_opts!: connect_opts_t;
  #queue_name?: queue_name_t;
  #queue_opts!: queue_opts_t;
  #consume_opts!: consume_opts_t; 
  #sendToQueue_opts!: sendToQueue_opts_t;
  #publish_opts!: publish_opts_t;
  #myRabbitMQ_is_running!: boolean;
  #fnopts?: myRabbitMQ_i;

  constructor (context:context_t, fnopts?: myRabbitMQ_i) {
    this.#context = context;
    this.#fnopts = fnopts;
  }

  private initDefault() {
    console.log(`${this.context}: myRabbitMQ.initDefault() - initializing values to default`);

    this.#connection=undefined;
    this.#channel=undefined;
    this.#queue=undefined;
    this.#exchange=undefined;
    this.#routingKey=this.#fnopts?.routingKey || '';
    this.#routingKey=this.#fnopts?.topicKey || '';
    this.#myRabbitMQ_is_running = false;
    this.#hostname = this.#fnopts?.hostname || process.env.RABBITMQ_HOSTNAME || 'rabbitmq';
    this.#port = this.#fnopts?.port || Number(process.env.RABBITMQ_PORT) || port;
    this.#username = this.#fnopts?.username || process.env.RABBITMQ_DEFAULT_USER || 'guest';
    this.#password = this.#fnopts?.password || process.env.RABBITMQ_DEFAULT_PASS || 'guest';
    this.#timeout_reconnect = this.#fnopts?.timeout || Number(process.env.RABBITMQ_TIMEOUT) || timeout_reconnect;
    this.#queue_name = this.#fnopts?.queue_name || process.env.RABBITMQ_QUEUE_NAME || queue_name;
    this.#ttl = this.#fnopts?.ttl || Number(process.env.RABBITMQ_TTL) || ttl;
    this.#url = this.#fnopts?.url || process.env.RABBITMQ_URL || `amqp://${this.#hostname}:${this.#port}`;
    this.#exchange_name = this.#fnopts?.exchange_name || process.env.RABBITMQ_EXCHANGE_NAME || exchange_name;
    this.#exchange_type = this.#fnopts?.exchange_type || (process.env.RABBITMQ_EXCHANGE_TYPE as exchange_type_t) || exchange_type;
    this.#prefetch = this.#fnopts?.prefetch || Number(process.env.RABBITMQ_PREFETCH) || prefetch;
    this.#durable_queue = this.#fnopts?.durable_queue || Boolean(process.env.RABBITMQ_DURABLE_QUEUE) || durable_queue;
    this.#durable_exchange = this.#fnopts?.durable_exchange || Boolean(process.env.RABBITMQ_DURABLE_EXCHANGE) || durable_exchange;
    this.#connect_opts = this.#fnopts?.connect_opts || {
      credentials: credentials.plain(this.#username, this.#password)
    };
    this.#queue_opts = this.#fnopts?.queue_opts || {
      durable: this.#durable_queue,
      arguments: {
        // If unset messages is living forever until ack
        // 'x-message-ttl': this.#ttl,
      }
    };
    this.#exchange_opts = this.#fnopts?.exchange_opts || {
      durable: this.#durable_exchange
    };
    this.#sendToQueue_opts = this.#fnopts?.sendToQueue_opts || {
      //expiration: this.#ttl
      persistent: true
    };
    this.#publish_opts = this.#fnopts?.publish_opts || {
      //expiration: this.#ttl
      persistent: true
    };
    this.#consume_opts = this.#fnopts?.consume_opts || {
      noAck: false,
    };

    if(DEBUG===true)
      console.log(
        `hostname = ${this.#hostname}
        port = ${this.#port}
        username = ${this.#username}
        password = ${this.#password}
        timeout = ${this.#timeout_reconnect}
        queue_name = ${this.#queue_name}
        ttl = ${this.#ttl}
        url = ${this.#url}
        prefetch = ${this.#prefetch}
        durable_queue = ${this.#durable_queue}
        durable_exchange = ${this.#durable_exchange}
        queue_opts = ${this.#queue_opts}
        connect_opts = ${this.#connect_opts}
        exchange_name = ${this.#exchange_name}
        exchange_type = ${this.#exchange_type}
        exchange_opts = ${this.#exchange_opts}`
      );
  } // End of init()

  public get context():context_t{
    return this.#context
  }

  public set context(val:context_t){
    this.#context = val
  }

  public set queue_name(val:queue_name_t){
    this.#queue_name = val;
  }

  public get queue_name():queue_name_t{
    return this.#queue_name
  }

  protected get queue_opts():queue_opts_t{
    return this.#queue_opts
  }

  public set exchange_name(val:exchange_name_t){
    this.#exchange_name = val;
  }

  public get exchange_name():exchange_name_t{
    return this.#exchange_name
  }

  public set exchange_type(val:exchange_type_t){
    this.#exchange_type=val;
  }

  public get exchange_type():exchange_type_t{
    return this.#exchange_type
  }

  protected get exchange_opts():exchange_opts_t{
    return this.#exchange_opts
  }

  public set routingKey(val:routingKey_t) {
    this.#routingKey = val;
  }

  public get routingKey():routingKey_t {
    return this.#routingKey
  }

  public set topicKey(val:topicKey_t) {
    this.#topicKey = val;
  }

  public get topicKey():topicKey_t {
    return this.#topicKey
  }

  public set myRabbitMQ_is_running(value:boolean){
    this.#myRabbitMQ_is_running = value;
  }
  
  public get myRabbitMQ_is_running():boolean{
    return this.#myRabbitMQ_is_running;
  }

  protected async connection(value?:Connection):Promise<Connection>{
    return new Promise<Connection>(async(resolve,reject)=>{
      try {
        if (typeof this.#connection === 'undefined') {

          this.#connection = value ? value : await amqp.connect(this.#url, this.#connect_opts);

          console.log(`${this.context}: myRabbitMQ.connection() - connection enstablished:`);
          if(DEBUG===true) console.debug(this.#connection);

          this.#connection.on('close', (error: any) => {
            console.error(`${this.context}: myRabbitMQ.connection() - connection closed, restart myRabbitMQ.setup()`);
            reject(error)
          });

          this.#connection.on('error', (error: any) => {
            console.error(`${this.context}: myRabbitMQ.connection() - connection error, restart myRabbitMQ.setup()`);
            reject(error);
          });

        }

        if (typeof this.#connection === 'undefined') {
          console.error(`${this.context}: myRabbitMQ.connection() - connection undefined, restart myRabbitMQ.setup()`);
          reject();
        }

        resolve(this.#connection);
      } catch (error) {
        setTimeout(async () => {
          this.myRabbitMQ_is_running=false;
          if(DEBUG===true) console.debug(error)
          await this.setup();
        }, this.#timeout_reconnect);
      }
    })
  }
  
  protected get consume_opts():consume_opts_t{
    return this.#consume_opts;
  }

  protected get sendToQueue_opts():sendToQueue_opts_t{
    return this.#sendToQueue_opts;
  }

  protected get publish_opts():publish_opts_t{
    return this.#publish_opts;
  }

  protected async channel(value?: ConfirmChannel):Promise<ConfirmChannel>{
    return new Promise<ConfirmChannel>(async (resolve,reject)=>{
      try {
        if (typeof this.#channel === 'undefined') {
          this.myRabbitMQ_is_running = false;
          const connection = await this.connection();
          this.#channel = value ? value : await connection.createConfirmChannel();

          this.#channel.prefetch(this.#prefetch);

          console.log(`${this.context}: myRabbitMQ.channel() - channel create:`);
          if(DEBUG===true) console.debug(this.#channel);

          this.#channel.on('close', (error: any) => {
            console.error(`${this.context}: myRabbitMQ.connection() - connection error, restart myRabbitMQ.setup()`);
            reject(error);
          });

          this.#channel.on('error', (error: any) => {
            console.error(`${this.context}: myRabbitMQ.connection() - connection error, restart myRabbitMQ.setup()`);
            reject(error);
          });

          this.#channel.on('delivery', (msg: any) => console.log('Message sent!:', msg));
          this.#channel.on('ack', (msg: any) => console.log('Got ack!:', msg));
          this.#channel.on('nack', (msg: any) => console.log('Got nack!:', msg));
          this.#channel.on('drain', (msg: any) => console.log('Buffer empty, good job!:', msg));
          this.#channel.on('cancel', (msg: any) => console.log('Message is deleted!:', msg));
          this.#channel.on('return', (msg: any) => console.log('Message was refused by consumer:', msg));
          this.#channel.on('blocked', (msg: any) => console.error('Channel blocked!:', msg));
          this.#channel.on('unblocker', (msg: any) => console.log('Channel unlocked!:', msg));
        }

        if (typeof this.#channel === 'undefined') {
          console.error(`${this.context}: myRabbitMQ.connection() - connection error, restart myRabbitMQ.setup()`);
          reject();
        }

        resolve(this.#channel);
      } catch (error) {
        setTimeout(async () => {
          this.myRabbitMQ_is_running=false;
          if(DEBUG===true) console.debug(error)
          await this.setup();
        }, this.#timeout_reconnect);
      }
    })
  }

  protected async queue(value?:Replies.AssertQueue):Promise<queue_t>{

    return new Promise<queue_t>(async(resolve,reject)=>{
      if(typeof this.queue_name==='undefined') {
        this.#queue = undefined;
        resolve(this.#queue);
      }

      try{
        const channel = await this.channel();

        if (typeof this.#queue === 'undefined' && typeof this.queue_name==='string'){
          this.#queue = value ? value : await channel.assertQueue(this.queue_name, this.queue_opts);

          console.log(`${this.context}: myRabbitMQ.queue() - queue asserted:`);
          if(DEBUG===true) console.debug(this.#queue);
        }

        if (typeof this.#queue === 'undefined')
          reject(`${this.context}: myRabbitMQ.queue(): Can't assert queue`);

        resolve(this.#queue);
      } catch(error) {
        console.error(error);
      }
    })
  }

  protected async exchange(value?:Replies.AssertExchange):Promise<exchange_t> {
    return new Promise<exchange_t>(async(resolve,reject)=>{
      if(typeof this.exchange_name==='undefined' || typeof this.exchange_type==='undefined'){
        this.exchange_type = undefined;
        this.exchange_name = undefined;
        this.#exchange = undefined;
        resolve(this.#exchange);
      }

      try{
        if (
          typeof this.#exchange === 'undefined' 
          && typeof this.exchange_name==='string' && this.exchange_name.length>0
          && typeof this.exchange_type==='string'
        ) {
          const channel = await this.channel();
          console.log(`channel.assertExchange(${this.exchange_name}, ${this.exchange_type}, this.exchange_opts)`)
          this.#exchange = value ? value : await channel.assertExchange(this.exchange_name, this.exchange_type, this.exchange_opts);

          if(this.#exchange_type!='fanout' && typeof this.queue_name==='string'){
            console.log(`channel.bindQueue(${this.queue_name}, ${this.exchange_name}, ${this.routingKey})`)
            await channel.bindQueue(this.queue_name, this.exchange_name, this.routingKey);
          }

          console.log(`${this.context}: myRabbitMQ.exchange() - exchange asserted:`);
          if(DEBUG===true) console.debug(this.#channel);

        }

        if (typeof this.#exchange === 'undefined')
          reject(`${this.context}: myRabbitMQ.queue(): Can't assert exchange`);

        resolve(this.#exchange);
      } catch(error) {
        console.error(error);
      }
    })
  }


  protected async setup(): Promise<ConfirmChannel>{
    return new Promise<ConfirmChannel>(async (resolve,reject)=>{
      try{
        this.initDefault();// Initialize default values

        await this.connection();
        const channel = await this.channel();

        if (channel===null)
          reject('myRabbitMQ.setup(): failed')

        this.myRabbitMQ_is_running=true;

        console.log(`${this.context}: myRabbitMQ.setup() - Setup done :)`);

        resolve(channel)
      } catch (error) {
        this.myRabbitMQ_is_running=false;
        console.error(error)
      }
    })
  }

}

class myRabbitMQConsumer extends myRabbitMQ {
  constructor(context:context_t, fnopts?: myRabbitMQ_i) {
    super(context, fnopts);
  }

  public async init():Promise<ConfirmChannel> {
    console.log(`${this.context}: myRabbitMQConsumer.init() - initializing instance...`);

    return new Promise<ConfirmChannel>(async (resolve,reject)=>{
      try{
        const channel = await this.setup();
        resolve(channel)
      } catch(error) {
        reject(`${this.context}: myRabbitMQConsumer.init(): ${error}`)
      }
    })
  }

  public async consume(cb?:cb_t):Promise<any> {
    console.log(`${this.context}: myRabbitMQConsumer.consume() - run instance...`);

    return new Promise<any>(async (resolve, reject)=>{
      try{

        const channel = await this.channel();
        const queue = await this.queue();
        await this.exchange();

        if(typeof queue === 'undefined'){
          reject(`${this.context}: No queue defined. You must pass "queue_name" key inside options`);
        } else {

          await channel.consume(queue.queue, async (message) => {
            console.log(`${this.context}: myRabbitMQConsumer.consume()->consume() - working on message...`);

            let obj: any

            if (message?.content) {
              // TODO: Validate message schema
              obj = JSON.parse(message.content.toString());
  
              channel.ack(message);
            } else {
              reject(`${this.context}: myRabbitMQConsumer.consume()->consume() error: No content`)
            }

            if(typeof cb==='undefined') {
              resolve(obj)
            } else {
              try{
                resolve(cb(obj));
              } catch(error){
                reject(`${this.context}: myRabbitMQConsumer.consume()->consume()->cb() error: ${error}`)
              }
            }
          },
          this.consume_opts)
        }
      } catch(error) {
        reject(error)
      }
    })
  }
}

class myRabbitMQProducer extends myRabbitMQ {
  constructor(context:context_t, fnopts?: myRabbitMQ_i) {
    super(context, fnopts);
  }

  public async init():Promise<ConfirmChannel> {
    console.log(`${this.context}: myRabbitMQProducer.init() - initializing instance...`);

    return new Promise<ConfirmChannel>(async (resolve,reject)=>{
      try{
        resolve(await this.setup())
      } catch(error) {
        reject(`${this.context}: myRabbitMQProducer.init(): ${error}`)
      }
    })
  }

  public async produce(obj:any, cb?:cb_t):Promise<any>{
    console.log(`${this.context}: myRabbitMQProducer.produce() - run instance...`);

    return new Promise<any>(async (resolve,reject)=>{
      try{
        if(Object.entries(obj).length === 0) reject(`${this.context}: myRabbitMQProducer.produce() - No obj{}`);

        var message:string = JSON.stringify(obj);

        if (message.length===0) reject(`${this.context}: myRabbitMQProducer.produce() - No message`);

        const channel = await this.channel();
        const queue = await this.queue();

        if(typeof queue != 'undefined'){
          channel.sendToQueue(queue.queue, Buffer.from(message), this.sendToQueue_opts, async (error) => {
            console.log(`${this.context}: myRabbitMQProducer.produce()->sendToQueue() - working on message...`);

            if (error !== null) {
              reject(`${this.context}: myRabbitMQProducer.publish()->sendToQueue() error: ${error}`);
            } else {
              console.log(this.context,': Message published on queue!');

              if(typeof cb==='undefined'){
                resolve(message)
              } else {
                try{
                  resolve(cb(obj));
                } catch(error){
                  reject(`${this.context}: myRabbitMQProducer.produce()->sendToQueue()->cb() error: ${error}`);
                }
              }
            }
          });
        } else {
          const exchange = await this.exchange();
          if(typeof exchange === 'undefined'){
            reject(`${this.context}: No exchange defined. You must pass "exchange_name" and "exchange_type" keys inside options`);
          } else {
            if(typeof this.exchange_name!='undefined') {
              channel.publish(this.exchange_name, this.routingKey, Buffer.from(message), this.publish_opts, async (error) => {
                console.log(`${this.context}: myRabbitMQProducer.produce()->publish() - working on message...`);
    
                if (error !== null) {
                  reject(`${this.context}: myRabbitMQProducer.produce()->publish() error: ${error}`)
                } else {
                  console.log(this.context,': Message published on queue!');
    
                  if(typeof cb!='undefined'){
                    try{
                      resolve(cb(obj));
                    } catch(error){
                      reject(`${this.context}: myRabbitMQProducer.produce()->publish()->cb() error: ${error}`);
                    }
                  } else {
                    resolve(message)
                  }
                }
              });
            }
          }
        }

        await channel.waitForConfirms();
        console.log(`Message sent to exchange confirmed`, message)
      } catch(error) {
        console.error(error);
      }
    })
  }
}

export {myRabbitMQConsumer, myRabbitMQProducer, myRabbitMQ_i};

// vim: set tabstop=2 shiftwidth=2 expandtab colorcolumn=101 :
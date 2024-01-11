"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _myRabbitMQ_context, _myRabbitMQ_hostname, _myRabbitMQ_port, _myRabbitMQ_username, _myRabbitMQ_password, _myRabbitMQ_timeout, _myRabbitMQ_url, _myRabbitMQ_exchange_name, _myRabbitMQ_exchange_type, _myRabbitMQ_exchange_opts, _myRabbitMQ_ttl, _myRabbitMQ_prefetch, _myRabbitMQ_durable_queue, _myRabbitMQ_durable_exchange, _myRabbitMQ_connection, _myRabbitMQ_channel, _myRabbitMQ_queue, _myRabbitMQ_exchange, _myRabbitMQ_routingKey, _myRabbitMQ_topicKey, _myRabbitMQ_connect_opts, _myRabbitMQ_queue_name, _myRabbitMQ_queue_opts, _myRabbitMQ_consume_opts, _myRabbitMQ_sendToQueue_opts, _myRabbitMQ_publish_opts, _myRabbitMQ_myRabbitMQ_is_running, _myRabbitMQ_fnopts;
Object.defineProperty(exports, "__esModule", { value: true });
exports.myRabbitMQProducer = exports.myRabbitMQConsumer = void 0;
const amqplib_1 = __importStar(require("amqplib"));
const timeout = 250;
const ttl = 60000;
const prefetch = 20;
const port = 5672;
const durable_queue = true;
const durable_exchange = true;
const exchange_name = 'exchange';
const exchange_type = 'fanout';
const queue_name = '';
var DEBUG = false;
class myRabbitMQ {
    constructor(context, fnopts) {
        _myRabbitMQ_context.set(this, void 0);
        _myRabbitMQ_hostname.set(this, void 0);
        _myRabbitMQ_port.set(this, void 0);
        _myRabbitMQ_username.set(this, void 0);
        _myRabbitMQ_password.set(this, void 0);
        _myRabbitMQ_timeout.set(this, void 0);
        _myRabbitMQ_url.set(this, void 0);
        _myRabbitMQ_exchange_name.set(this, void 0);
        _myRabbitMQ_exchange_type.set(this, void 0);
        _myRabbitMQ_exchange_opts.set(this, void 0);
        _myRabbitMQ_ttl.set(this, void 0);
        _myRabbitMQ_prefetch.set(this, void 0);
        _myRabbitMQ_durable_queue.set(this, void 0);
        _myRabbitMQ_durable_exchange.set(this, void 0);
        _myRabbitMQ_connection.set(this, void 0);
        _myRabbitMQ_channel.set(this, void 0);
        _myRabbitMQ_queue.set(this, void 0);
        _myRabbitMQ_exchange.set(this, void 0);
        _myRabbitMQ_routingKey.set(this, void 0);
        _myRabbitMQ_topicKey.set(this, void 0);
        _myRabbitMQ_connect_opts.set(this, void 0);
        _myRabbitMQ_queue_name.set(this, void 0);
        _myRabbitMQ_queue_opts.set(this, void 0);
        _myRabbitMQ_consume_opts.set(this, void 0);
        _myRabbitMQ_sendToQueue_opts.set(this, void 0);
        _myRabbitMQ_publish_opts.set(this, void 0);
        _myRabbitMQ_myRabbitMQ_is_running.set(this, void 0);
        _myRabbitMQ_fnopts.set(this, void 0);
        __classPrivateFieldSet(this, _myRabbitMQ_context, context, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_fnopts, fnopts, "f");
    }
    initDefault() {
        console.log(`${this.context}: myRabbitMQ.initDefault() - initializing values to default`);
        __classPrivateFieldSet(this, _myRabbitMQ_connection, undefined, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_channel, undefined, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_queue, undefined, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_exchange, undefined, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_routingKey, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.routingKey || '', "f");
        __classPrivateFieldSet(this, _myRabbitMQ_routingKey, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.topicKey || '', "f");
        __classPrivateFieldSet(this, _myRabbitMQ_myRabbitMQ_is_running, false, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_hostname, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.hostname || process.env.RABBITMQ_HOSTNAME || 'rabbitmq', "f");
        __classPrivateFieldSet(this, _myRabbitMQ_port, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.port || Number(process.env.RABBITMQ_PORT) || port, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_username, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.username || process.env.RABBITMQ_DEFAULT_USER || 'guest', "f");
        __classPrivateFieldSet(this, _myRabbitMQ_password, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.password || process.env.RABBITMQ_DEFAULT_PASS || 'guest', "f");
        __classPrivateFieldSet(this, _myRabbitMQ_timeout, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.timeout || Number(process.env.RABBITMQ_TIMEOUT) || timeout, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_queue_name, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.queue_name || process.env.RABBITMQ_QUEUE_NAME || queue_name, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_ttl, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.ttl || Number(process.env.RABBITMQ_TTL) || ttl, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_url, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.url || process.env.RABBITMQ_URL || `amqp://${__classPrivateFieldGet(this, _myRabbitMQ_hostname, "f")}:${__classPrivateFieldGet(this, _myRabbitMQ_port, "f")}`, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_exchange_name, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.exchange_name || process.env.RABBITMQ_EXCHANGE_NAME || exchange_name, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_exchange_type, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.exchange_type || process.env.RABBITMQ_EXCHANGE_TYPE || exchange_type, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_prefetch, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.prefetch || Number(process.env.RABBITMQ_PREFETCH) || prefetch, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_durable_queue, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.durable_queue || Boolean(process.env.RABBITMQ_DURABLE_QUEUE) || durable_queue, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_durable_exchange, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.durable_exchange || Boolean(process.env.RABBITMQ_DURABLE_EXCHANGE) || durable_exchange, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_connect_opts, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.connect_opts || {
            credentials: amqplib_1.credentials.plain(__classPrivateFieldGet(this, _myRabbitMQ_username, "f"), __classPrivateFieldGet(this, _myRabbitMQ_password, "f"))
        }, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_queue_opts, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.queue_opts || {
            durable: __classPrivateFieldGet(this, _myRabbitMQ_durable_queue, "f"),
            arguments: {
            // If unset messages is living forever until ack
            // 'x-message-ttl': this.#ttl,
            }
        }, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_exchange_opts, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.exchange_opts || {
            durable: __classPrivateFieldGet(this, _myRabbitMQ_durable_exchange, "f")
        }, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_sendToQueue_opts, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.sendToQueue_opts || {
            //expiration: this.#ttl
            persistent: true
        }, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_publish_opts, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.publish_opts || {
            //expiration: this.#ttl
            persistent: true
        }, "f");
        __classPrivateFieldSet(this, _myRabbitMQ_consume_opts, __classPrivateFieldGet(this, _myRabbitMQ_fnopts, "f")?.consume_opts || {
            noAck: false,
        }, "f");
        if (DEBUG === true)
            console.log(`hostname = ${__classPrivateFieldGet(this, _myRabbitMQ_hostname, "f")}
        port = ${__classPrivateFieldGet(this, _myRabbitMQ_port, "f")}
        username = ${__classPrivateFieldGet(this, _myRabbitMQ_username, "f")}
        password = ${__classPrivateFieldGet(this, _myRabbitMQ_password, "f")}
        timeout = ${__classPrivateFieldGet(this, _myRabbitMQ_timeout, "f")}
        queue_name = ${__classPrivateFieldGet(this, _myRabbitMQ_queue_name, "f")}
        ttl = ${__classPrivateFieldGet(this, _myRabbitMQ_ttl, "f")}
        url = ${__classPrivateFieldGet(this, _myRabbitMQ_url, "f")}
        prefetch = ${__classPrivateFieldGet(this, _myRabbitMQ_prefetch, "f")}
        durable_queue = ${__classPrivateFieldGet(this, _myRabbitMQ_durable_queue, "f")}
        durable_exchange = ${__classPrivateFieldGet(this, _myRabbitMQ_durable_exchange, "f")}
        queue_opts = ${__classPrivateFieldGet(this, _myRabbitMQ_queue_opts, "f")}
        connect_opts = ${__classPrivateFieldGet(this, _myRabbitMQ_connect_opts, "f")}
        exchange_name = ${__classPrivateFieldGet(this, _myRabbitMQ_exchange_name, "f")}
        exchange_type = ${__classPrivateFieldGet(this, _myRabbitMQ_exchange_type, "f")}
        exchange_opts = ${__classPrivateFieldGet(this, _myRabbitMQ_exchange_opts, "f")}`);
    } // End of init()
    get context() {
        return __classPrivateFieldGet(this, _myRabbitMQ_context, "f");
    }
    set context(val) {
        __classPrivateFieldSet(this, _myRabbitMQ_context, val, "f");
    }
    set queue_name(val) {
        __classPrivateFieldSet(this, _myRabbitMQ_queue_name, val, "f");
    }
    get queue_name() {
        return __classPrivateFieldGet(this, _myRabbitMQ_queue_name, "f");
    }
    get queue_opts() {
        return __classPrivateFieldGet(this, _myRabbitMQ_queue_opts, "f");
    }
    set exchange_name(val) {
        __classPrivateFieldSet(this, _myRabbitMQ_exchange_name, val, "f");
    }
    get exchange_name() {
        return __classPrivateFieldGet(this, _myRabbitMQ_exchange_name, "f");
    }
    set exchange_type(val) {
        __classPrivateFieldSet(this, _myRabbitMQ_exchange_type, val, "f");
    }
    get exchange_type() {
        return __classPrivateFieldGet(this, _myRabbitMQ_exchange_type, "f");
    }
    get exchange_opts() {
        return __classPrivateFieldGet(this, _myRabbitMQ_exchange_opts, "f");
    }
    set routingKey(val) {
        __classPrivateFieldSet(this, _myRabbitMQ_routingKey, val, "f");
    }
    get routingKey() {
        return __classPrivateFieldGet(this, _myRabbitMQ_routingKey, "f");
    }
    set topicKey(val) {
        __classPrivateFieldSet(this, _myRabbitMQ_topicKey, val, "f");
    }
    get topicKey() {
        return __classPrivateFieldGet(this, _myRabbitMQ_topicKey, "f");
    }
    set myRabbitMQ_is_running(value) {
        __classPrivateFieldSet(this, _myRabbitMQ_myRabbitMQ_is_running, value, "f");
    }
    get myRabbitMQ_is_running() {
        return __classPrivateFieldGet(this, _myRabbitMQ_myRabbitMQ_is_running, "f");
    }
    async connection(value) {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof __classPrivateFieldGet(this, _myRabbitMQ_connection, "f") === 'undefined') {
                    __classPrivateFieldSet(this, _myRabbitMQ_connection, value ? value : await amqplib_1.default.connect(__classPrivateFieldGet(this, _myRabbitMQ_url, "f"), __classPrivateFieldGet(this, _myRabbitMQ_connect_opts, "f")), "f");
                    console.log(`${this.context}: myRabbitMQ.connection() - connection enstablished:`);
                    if (DEBUG === true)
                        console.debug(__classPrivateFieldGet(this, _myRabbitMQ_connection, "f"));
                    __classPrivateFieldGet(this, _myRabbitMQ_connection, "f").on('close', (error) => {
                        console.error(`${this.context}: myRabbitMQ.connection() - connection closed, restart myRabbitMQ.setup()`);
                        reject(error);
                    });
                    __classPrivateFieldGet(this, _myRabbitMQ_connection, "f").on('error', (error) => {
                        console.error(`${this.context}: myRabbitMQ.connection() - connection error, restart myRabbitMQ.setup()`);
                        reject(error);
                    });
                }
                if (typeof __classPrivateFieldGet(this, _myRabbitMQ_connection, "f") === 'undefined') {
                    console.error(`${this.context}: myRabbitMQ.connection() - connection undefined, restart myRabbitMQ.setup()`);
                    reject();
                }
                resolve(__classPrivateFieldGet(this, _myRabbitMQ_connection, "f"));
            }
            catch (error) {
                setTimeout(async () => {
                    this.myRabbitMQ_is_running = false;
                    if (DEBUG === true)
                        console.debug(error);
                    await this.setup();
                }, __classPrivateFieldGet(this, _myRabbitMQ_timeout, "f"));
            }
        });
    }
    get consume_opts() {
        return __classPrivateFieldGet(this, _myRabbitMQ_consume_opts, "f");
    }
    get sendToQueue_opts() {
        return __classPrivateFieldGet(this, _myRabbitMQ_sendToQueue_opts, "f");
    }
    get publish_opts() {
        return __classPrivateFieldGet(this, _myRabbitMQ_publish_opts, "f");
    }
    async channel(value) {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof __classPrivateFieldGet(this, _myRabbitMQ_channel, "f") === 'undefined') {
                    this.myRabbitMQ_is_running = false;
                    const connection = await this.connection();
                    __classPrivateFieldSet(this, _myRabbitMQ_channel, value ? value : await connection.createConfirmChannel(), "f");
                    __classPrivateFieldGet(this, _myRabbitMQ_channel, "f").prefetch(__classPrivateFieldGet(this, _myRabbitMQ_prefetch, "f"));
                    console.log(`${this.context}: myRabbitMQ.channel() - channel create:`);
                    if (DEBUG === true)
                        console.debug(__classPrivateFieldGet(this, _myRabbitMQ_channel, "f"));
                    __classPrivateFieldGet(this, _myRabbitMQ_channel, "f").on('close', (error) => {
                        console.error(`${this.context}: myRabbitMQ.connection() - connection error, restart myRabbitMQ.setup()`);
                        reject(error);
                    });
                    __classPrivateFieldGet(this, _myRabbitMQ_channel, "f").on('error', (error) => {
                        console.error(`${this.context}: myRabbitMQ.connection() - connection error, restart myRabbitMQ.setup()`);
                        reject(error);
                    });
                    __classPrivateFieldGet(this, _myRabbitMQ_channel, "f").on('delivery', (msg) => console.log('Message sent!:', msg));
                    __classPrivateFieldGet(this, _myRabbitMQ_channel, "f").on('ack', (msg) => console.log('Got ack!:', msg));
                    __classPrivateFieldGet(this, _myRabbitMQ_channel, "f").on('nack', (msg) => console.log('Got nack!:', msg));
                    __classPrivateFieldGet(this, _myRabbitMQ_channel, "f").on('drain', (msg) => console.log('Buffer empty, good job!:', msg));
                    __classPrivateFieldGet(this, _myRabbitMQ_channel, "f").on('cancel', (msg) => console.log('Message is deleted!:', msg));
                    __classPrivateFieldGet(this, _myRabbitMQ_channel, "f").on('return', (msg) => console.log('Message was refused by consumer:', msg));
                    __classPrivateFieldGet(this, _myRabbitMQ_channel, "f").on('blocked', (msg) => console.error('Channel blocked!:', msg));
                    __classPrivateFieldGet(this, _myRabbitMQ_channel, "f").on('unblocker', (msg) => console.log('Channel unlocked!:', msg));
                }
                if (typeof __classPrivateFieldGet(this, _myRabbitMQ_channel, "f") === 'undefined') {
                    console.error(`${this.context}: myRabbitMQ.connection() - connection error, restart myRabbitMQ.setup()`);
                    reject();
                }
                resolve(__classPrivateFieldGet(this, _myRabbitMQ_channel, "f"));
            }
            catch (error) {
                setTimeout(async () => {
                    this.myRabbitMQ_is_running = false;
                    if (DEBUG === true)
                        console.debug(error);
                    await this.setup();
                }, __classPrivateFieldGet(this, _myRabbitMQ_timeout, "f"));
            }
        });
    }
    async queue(value) {
        return new Promise(async (resolve, reject) => {
            try {
                const channel = await this.channel();
                if (typeof __classPrivateFieldGet(this, _myRabbitMQ_queue, "f") === 'undefined') {
                    __classPrivateFieldSet(this, _myRabbitMQ_queue, value ? value : await channel.assertQueue(this.queue_name, this.queue_opts), "f");
                    console.log(`${this.context}: myRabbitMQ.queue() - queue asserted:`);
                    if (DEBUG === true)
                        console.debug(__classPrivateFieldGet(this, _myRabbitMQ_queue, "f"));
                }
                if (typeof __classPrivateFieldGet(this, _myRabbitMQ_queue, "f") === 'undefined')
                    reject(`${this.context}: myRabbitMQ.queue(): Can't assert queue`);
                console.log(this.routingKey, ' - ', this.topicKey);
                resolve(__classPrivateFieldGet(this, _myRabbitMQ_queue, "f"));
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    async exchange(value) {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof __classPrivateFieldGet(this, _myRabbitMQ_exchange, "f") === 'undefined') {
                    const channel = await this.channel();
                    __classPrivateFieldSet(this, _myRabbitMQ_exchange, value ? value : await channel.assertExchange(this.exchange_name, this.exchange_type, this.exchange_opts), "f");
                    if (__classPrivateFieldGet(this, _myRabbitMQ_exchange_type, "f") != 'fanout') {
                        await channel.bindQueue(this.queue_name, this.exchange_name, this.routingKey);
                    }
                    console.log(`${this.context}: myRabbitMQ.exchange() - exchange asserted:`);
                    if (DEBUG === true)
                        console.debug(__classPrivateFieldGet(this, _myRabbitMQ_channel, "f"));
                }
                if (typeof __classPrivateFieldGet(this, _myRabbitMQ_exchange, "f") === 'undefined')
                    reject(`${this.context}: myRabbitMQ.queue(): Can't assert exchange`);
                resolve(__classPrivateFieldGet(this, _myRabbitMQ_exchange, "f"));
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    async setup() {
        return new Promise(async (resolve, reject) => {
            try {
                this.initDefault(); // Initialize default values
                await this.connection();
                const channel = await this.channel();
                if (channel === null)
                    reject('myRabbitMQ.setup(): failed');
                this.myRabbitMQ_is_running = true;
                console.log(`${this.context}: myRabbitMQ.setup() - Setup done :)`);
                resolve(channel);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
_myRabbitMQ_context = new WeakMap(), _myRabbitMQ_hostname = new WeakMap(), _myRabbitMQ_port = new WeakMap(), _myRabbitMQ_username = new WeakMap(), _myRabbitMQ_password = new WeakMap(), _myRabbitMQ_timeout = new WeakMap(), _myRabbitMQ_url = new WeakMap(), _myRabbitMQ_exchange_name = new WeakMap(), _myRabbitMQ_exchange_type = new WeakMap(), _myRabbitMQ_exchange_opts = new WeakMap(), _myRabbitMQ_ttl = new WeakMap(), _myRabbitMQ_prefetch = new WeakMap(), _myRabbitMQ_durable_queue = new WeakMap(), _myRabbitMQ_durable_exchange = new WeakMap(), _myRabbitMQ_connection = new WeakMap(), _myRabbitMQ_channel = new WeakMap(), _myRabbitMQ_queue = new WeakMap(), _myRabbitMQ_exchange = new WeakMap(), _myRabbitMQ_routingKey = new WeakMap(), _myRabbitMQ_topicKey = new WeakMap(), _myRabbitMQ_connect_opts = new WeakMap(), _myRabbitMQ_queue_name = new WeakMap(), _myRabbitMQ_queue_opts = new WeakMap(), _myRabbitMQ_consume_opts = new WeakMap(), _myRabbitMQ_sendToQueue_opts = new WeakMap(), _myRabbitMQ_publish_opts = new WeakMap(), _myRabbitMQ_myRabbitMQ_is_running = new WeakMap(), _myRabbitMQ_fnopts = new WeakMap();
class myRabbitMQConsumer extends myRabbitMQ {
    constructor(context, fnopts, cb) {
        super(context, fnopts);
        if (typeof cb != 'undefined')
            this.consume(cb);
    }
    async init() {
        console.log(`${this.context}: myRabbitMQConsumer.init() - initializing instance...`);
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.setup());
            }
            catch (error) {
                reject(`${this.context}: myRabbitMQConsumer.init(): ${error}`);
            }
        });
    }
    async consume(cb) {
        console.log(`${this.context}: myRabbitMQConsumer.consume() - run instance...`);
        return new Promise(async (resolve, reject) => {
            try {
                const channel = await this.channel();
                const queue = await this.queue();
                const exchange = await this.exchange();
                console.log(3, exchange, 4, queue, 5, channel);
                await channel.consume(queue.queue, async (message) => {
                    console.log(`${this.context}: myRabbitMQConsumer.consume()->consume() - working on message...`);
                    let obj;
                    if (message?.content) {
                        // TODO: Validate message schema
                        obj = JSON.parse(message.content.toString());
                        channel.ack(message);
                    }
                    else {
                        reject(`${this.context}: myRabbitMQConsumer.consume()->consume() error: No content`);
                    }
                    if (typeof cb === 'undefined') {
                        resolve(obj);
                    }
                    else {
                        try {
                            resolve(cb(obj));
                        }
                        catch (error) {
                            reject(`${this.context}: myRabbitMQConsumer.consume()->consume()->cb() error: ${error}`);
                        }
                    }
                }, this.consume_opts);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.myRabbitMQConsumer = myRabbitMQConsumer;
class myRabbitMQProducer extends myRabbitMQ {
    constructor(context, fnopts, obj, cb) {
        super(context, fnopts);
        if (typeof obj != 'undefined' && typeof cb != 'undefined')
            this.produce(obj, cb);
    }
    async init() {
        console.log(`${this.context}: myRabbitMQProducer.init() - initializing instance...`);
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.setup());
            }
            catch (error) {
                reject(`${this.context}: myRabbitMQProducer.init(): ${error}`);
            }
        });
    }
    async produce(obj, cb) {
        console.log(`${this.context}: myRabbitMQProducer.produce() - run instance...`);
        return new Promise(async (resolve, reject) => {
            try {
                if (Object.entries(obj).length === 0)
                    reject(`${this.context}: myRabbitMQProducer.produce() - No obj{}`);
                var message = JSON.stringify(obj);
                if (message.length === 0)
                    reject(`${this.context}: myRabbitMQProducer.produce() - No message`);
                const channel = await this.channel();
                const queue = await this.queue();
                const exchange = await this.exchange();
                if (this.exchange_type === 'fanout') {
                    channel.sendToQueue(queue.queue, Buffer.from(message), this.sendToQueue_opts, async (error) => {
                        console.log(`${this.context}: myRabbitMQProducer.produce()->sendToQueue() - working on message...`);
                        if (error !== null) {
                            reject(`${this.context}: myRabbitMQProducer.publish()->sendToQueue() error: ${error}`);
                        }
                        else {
                            console.log(this.context, ': Message published on queue!');
                            if (typeof cb === 'undefined') {
                                resolve(message);
                            }
                            else {
                                try {
                                    resolve(cb(obj));
                                }
                                catch (error) {
                                    reject(`${this.context}: myRabbitMQProducer.produce()->sendToQueue()->cb() error: ${error}`);
                                }
                            }
                        }
                    });
                }
                else {
                    channel.publish(this.exchange_name, this.routingKey, Buffer.from(message), this.publish_opts, async (error) => {
                        console.log(`${this.context}: myRabbitMQProducer.produce()->publish() - working on message...`);
                        if (error !== null) {
                            reject(`${this.context}: myRabbitMQProducer.produce()->publish() error: ${error}`);
                        }
                        else {
                            console.log(this.context, ': Message published on queue!');
                            if (typeof cb != 'undefined') {
                                try {
                                    resolve(cb(obj));
                                }
                                catch (error) {
                                    reject(`${this.context}: myRabbitMQProducer.produce()->publish()->cb() error: ${error}`);
                                }
                            }
                            else {
                                resolve(message);
                            }
                        }
                    });
                }
                await channel.waitForConfirms();
                console.log(`Message sent to exchange confirmed`, message);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.myRabbitMQProducer = myRabbitMQProducer;

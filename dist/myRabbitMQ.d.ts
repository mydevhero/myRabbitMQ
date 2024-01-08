type cb_t = (data: any) => void;
type hostname_t = string;
type port_t = number;
type username_t = string;
type password_t = string;
type timeout_t = number;
type url_t = string;
type exchange_name_t = string;
type exchange_type_t = 'direct' | 'fanout' | 'topic' | 'headers';
type exchange_opts_t = any;
type ttl_t = number;
type prefetch_t = number;
type durable_t = boolean;
type connect_opts_t = any;
type queue_name_t = string;
type queue_opts_t = any;
type routingKey_t = string;
type topicKey_t = string;
type sendToQueue_opts_t = any;
type publish_opts_t = any;
type consume_opts_t = any;
type context_t = string;
interface myRabbitMQ_opts_i {
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
import { Connection, ConfirmChannel, Replies } from 'amqplib';
declare class myRabbitMQ {
    #private;
    constructor(context: context_t, fnopts?: myRabbitMQ_opts_i);
    private initDefault;
    get context(): context_t;
    set context(val: context_t);
    set queue_name(val: queue_name_t);
    get queue_name(): queue_name_t;
    protected get queue_opts(): queue_opts_t;
    set exchange_name(val: exchange_name_t);
    get exchange_name(): exchange_name_t;
    set exchange_type(val: exchange_type_t);
    get exchange_type(): exchange_type_t;
    protected get exchange_opts(): exchange_opts_t;
    set routingKey(val: routingKey_t);
    get routingKey(): routingKey_t;
    set topicKey(val: topicKey_t);
    get topicKey(): topicKey_t;
    set myRabbitMQ_is_running(value: boolean);
    get myRabbitMQ_is_running(): boolean;
    protected connection(value?: Connection): Promise<Connection>;
    protected get consume_opts(): consume_opts_t;
    protected get sendToQueue_opts(): sendToQueue_opts_t;
    protected get publish_opts(): publish_opts_t;
    protected channel(value?: ConfirmChannel): Promise<ConfirmChannel>;
    protected queue(value?: Replies.AssertQueue): Promise<Replies.AssertQueue>;
    protected exchange(value?: Replies.AssertExchange): Promise<Replies.AssertExchange>;
    protected setup(): Promise<ConfirmChannel>;
}
declare class myRabbitMQConsumer extends myRabbitMQ {
    constructor(context: context_t, fnopts?: myRabbitMQ_opts_i, cb?: cb_t);
    init(): Promise<ConfirmChannel>;
    consume(cb?: cb_t): Promise<any>;
}
declare class myRabbitMQProducer extends myRabbitMQ {
    constructor(context: context_t, fnopts?: myRabbitMQ_opts_i, obj?: any, cb?: cb_t);
    init(): Promise<ConfirmChannel>;
    produce(obj: any, cb?: cb_t): Promise<any>;
}
export { myRabbitMQConsumer, myRabbitMQProducer };
//# sourceMappingURL=myRabbitMQ.d.ts.map
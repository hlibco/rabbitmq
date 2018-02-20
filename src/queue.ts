import * as amqp from 'amqplib'
import Config from './config'
import Message from './message'

const debug = require('debug')('rabbitmq:queue')

export class Queue {
  private conn
  private channel

  /**
   * Create an instance
   * @param name string (name of the queue)
   */
  constructor (private name) {}

  /**
   * Setup connection and channel
   */
  async setup () {
    return amqp.connect(Config.get('amqp.url')).then(conn => {
      return conn
    }).then(conn => {
      this.conn = conn
      return this.conn.createChannel()
    }).then(channel => {
      this.channel = channel
      return this.channel.assertQueue(this.name)
    }).then(() => {
      return this
    }).catch(err => {
      debug(err)
    })
  }

  /**
   * Publish a message in the queue
   * @param message Message
   * @return Promise<Boolean>
   */
  async publish (message: Message): Promise<Boolean> {
    const str = JSON.stringify(message.toObject())
    debug('Published: ', str)
    return this.channel.sendToQueue(this.name, new Buffer(str))
  }

  /**
   * Consume queue messages
   * @param fn Function (parser)
   */
  async consume (fn: Function): Promise<any> {
    return this.channel.consume(this.name, msg => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString())
        debug('Consumed: ', message)
        fn(msg)
        this.channel.ack(msg)
      } else {
        debug('Message is null')
      }
    })
  }
}

export default Queue

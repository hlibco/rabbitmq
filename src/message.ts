import * as uuid from 'uuid/v4'
import Queue from './queue'

export interface IMessage {
  id: string
  type: string
  payload: string | Object | Array<any> | ArrayBuffer
}

export class Message {
  private id
  constructor (private type: string, private payload: Object) {
    this.id = uuid()
  }

  /**
   * Convert message to object
   * @return IMessage
   */
  toObject (): IMessage {
    return {
      id: this.id,
      type: this.type,
      payload: this.payload
    }
  }

  /**
   * Publish the message to the queue
   * @param queue Queue
   * @return Promise<Boolean>
   */
  async publish (queue: Queue): Promise<Boolean> {
    return queue.publish(this)
  }
}

export default Message

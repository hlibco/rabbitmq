import Queue from './queue'
import Message from './message'

const debug = require('debug')('rabbitmq:publisher')

debug('Publishing messages...')

async function publish (queue, message) {
  debug('publishing...')
  return message.publish(queue) // or queue.publish(message)
}

async function publisher () {
  const queue = await new Queue('tasks').setup()
  return setInterval(() => {
    const message = new Message('clock', { seconds: new Date().getSeconds() })
    publish(queue, message)
  }, 1000)
}

publisher()
.then(res => debug(res))
.catch(err => debug(err))

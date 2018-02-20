import Queue from './queue'
import Message from './message'

const debug = require('debug')('rabbitmq:index')

// Publisher
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

// Consumer
async function consumer () {
  try {
    const queue = await new Queue('tasks').setup()
    if (queue) {
      return queue.consume(msg => debug('Parsed: ', msg.content.toString()))
    } else {
      debug('No queue instantiated')
    }
  } catch (err) {
    debug(err)
  }
}

consumer()
.then(res => debug(res))
.catch(err => debug(err))

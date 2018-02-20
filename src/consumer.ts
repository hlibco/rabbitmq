import Queue from './queue'

const debug = require('debug')('rabbitmq:consumer')

debug('Consuming queue...')

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

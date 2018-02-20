import { Store } from 'confidence'

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

const criteria = {
  env: process.env.NODE_ENV
}

const config = {
  env: process.env.NODE_ENV,
  amqp: {
    url: process.env.RABBITMQ_AMQP_URL
  }
}

// Store config in Confindence
const store = new Store(config)
export default {
  get (key) {
    key = '/' + key.replace(/\./g, '/').replace(/^\/+/g, '')
    return store.get(key, criteria)
  },
  meta (key) {
    return store.meta(key)
  }
}

import test from 'ava'
import Message from '../message'

const message = new Message('signup', 'content')

test('toObject', t => {
  const obj = message.toObject()

  t.is(obj.id.length, 36)
  t.is(obj.type, 'signup')
  t.is(obj.payload, 'content')
})

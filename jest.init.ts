import * as path from 'path'

// @ts-ignore
import('dotenv').then(dotenv => {
  return dotenv.config({
    path: path.join(__dirname, '.env.jest'),
  })
}).catch(e => {
  if (e.code !== 'MODULE_NOT_FOUND') {
    throw e
  }
})

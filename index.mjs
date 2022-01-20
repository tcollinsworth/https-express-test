/* eslint-disable no-console */
import path from 'path'
import fs from 'fs'
import http from 'http'
import https from 'https'
import express from 'express'

import __dirname from './dirname.mjs'

// const { HTTP_PORT } = process.env
// const { HTTP_HOST } = process.env
// const { HTTPS_PORT } = process.env
// const { HTTPS_HOST } = process.env

const HTTP_PORT = '8080' // process.env
const HTTP_HOST = '0.0.0.0' // "localhost" // 0.0.0.0 for all //process.env
const HTTPS_PORT = '8888' // process.env
const HTTPS_HOST = '0.0.0.0' // "localhost" // 0.0.0.0 for all process.env //process.env

const app = express()

export async function start() {
  console.log('Starting initialization')

  app.get('/', (req, resp) => resp.send('Hello world!'))

  try {
    const httpServer = http.createServer(app)

    httpServer.listen(parseInt(HTTP_PORT, 10), HTTP_HOST, () => {
      console.log(`http server is listening on ${HTTP_HOST}:${HTTP_PORT}`)
    })
      .on('error', (err) => {
        console.error(err, 'Error initializing express http')
        // delay exit to allow time to log
        setTimeout(() => process.exit(1), 1000)
      })

    // https://www.kevinleary.net/self-signed-trusted-certificates-node-js-express-js/
    const httpsServer = https.createServer({
      key: fs.readFileSync(path.join(__dirname, './https-test-cert/server.key')),
      cert: fs.readFileSync(path.join(__dirname, './https-test-cert/server.crt')),
      requestCert: false,
      rejectUnauthorized: false,
    }, app)

    httpsServer.listen(parseInt(HTTPS_PORT, 10), HTTPS_HOST, () => {
      console.log(`https server is listening on ${HTTPS_HOST}:${HTTPS_PORT}`)
    })
      .on('error', (err) => {
        console.error(err, 'Error initializing express https')
        // delay exit to allow time to log
        setTimeout(() => process.exit(1), 1000)
      })
  } catch (err) {
    console.error(err, 'Error initializing services')
    // delay exit to allow time to log
    setTimeout(() => process.exit(1), 1000)
  }
  console.log('Initialization completed')
}

start()

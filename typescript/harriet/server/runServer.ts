import express, { Express, Request, Response } from 'express'
import { Pool } from 'pg'
import winston, { createLogger, Logger } from 'winston'
import dotenv from 'dotenv'
import HealthcheckService from './healthcheck/service'
import { Server } from 'http'

const runServer = async (): Promise<Server> => {
  dotenv.config()

  const port: string = process.env.PORT || '8080'

  const app: Express = express()
  const pool = new Pool()
  const logger = buildLogger()

  const poolClient = await pool.connect()

  const healthcheckService = new HealthcheckService(poolClient)

  app.get('/healthcheck', async (req: Request, res: Response) => {
    const { ok, val } = await healthcheckService.isHealthy()
    if (ok) res.json('healthy')
    else {
      res.status(500)
      res.render('error', { error: val })
    }
  })

  const server = app.listen(port)
  server.on('close', async () => {
    logger.log({ level: 'info', message: 'server is closing down' })
    await poolClient.release(true)
    await pool.end()
    logger.log({ level: 'info', message: 'database connection closed' })
  })

  return server
}

const buildLogger = (): Logger => {
  const logger = createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  })

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    )
  }

  return logger
}

export default runServer

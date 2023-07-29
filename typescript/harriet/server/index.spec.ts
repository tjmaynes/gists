import { agent } from 'supertest'
import runServer from './runServer'
import { Server } from 'http'

describe('App', () => {
  let sut: Server

  beforeEach(async () => {
    sut = await runServer()
  })

  afterEach((done) => {
    sut.close(done)
  })

  describe('GET /healthcheck', () => {
    describe('when app is ready for requests', () => {
      it('should return "healthy"', async () => {
        const res = await agent(sut).get('/healthcheck')

        expect(res.headers['content-type']).toBe(
          'application/json; charset=utf-8'
        )
        expect(res.statusCode).toBe(200)
        expect(res.body).toBe('healthy')
      })
    })
  })
})

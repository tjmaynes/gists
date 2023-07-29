import { PoolClient } from 'pg'
import { Err, Ok, Result } from 'ts-results'

export interface IHealthcheckService {
  isHealthy(): Promise<Result<boolean, Error>>
}

class HealthcheckService implements IHealthcheckService {
  private readonly poolClient: PoolClient

  constructor(poolClient: PoolClient) {
    this.poolClient = poolClient
  }

  isHealthy(): Promise<Result<boolean, Error>> {
    return Promise.all([this.checkDatabaseConnection()])
      .then(([hasDbConnection]) => {
        if (!hasDbConnection) return new Err(new Error('Database is down'))

        return new Ok(true)
      })
      .catch((error: Error) => {
        return new Err(error)
      })
  }

  checkDatabaseConnection = async (): Promise<boolean> => {
    try {
      const { rows } = await this.poolClient.query(
        'SELECT $1::text as message',
        ['healthy!']
      )
      return Promise.resolve(rows.length > 0)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

export default HealthcheckService

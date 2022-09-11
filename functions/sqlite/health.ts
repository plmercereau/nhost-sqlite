import { Request, Response } from 'express'
import { tryGetConfig } from './_config'
import { connect } from './_db'
import { sqlLogger } from './_logger'

export default async (request: Request, response: Response) => {
  const config = tryGetConfig(request)
  if (config === null) {
    return response.status(200).send('no config')
  } else {
    const db = connect(config, sqlLogger)
    const [r, m] = await db.query('select 1 where 1 = 1')
    if (r && JSON.stringify(r) == '[{"1":1}]') {
      return response.status(200).send('ok')
    } else {
      return response
        .status(500)
        .send({ error: 'problem executing query', query_result: r })
    }
  }
}

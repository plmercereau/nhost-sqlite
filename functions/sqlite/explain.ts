import { Request, Response } from 'express'
import { getConfig } from './_config'
import { explain } from './query'
import { sqlLogger } from './_logger'

export default (req: Request, res: Response) => {
  const config = getConfig(req)

  res.status(200).send(explain(config, sqlLogger, req.body))
}

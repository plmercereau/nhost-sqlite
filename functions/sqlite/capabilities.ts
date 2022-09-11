import { Request, Response } from 'express'
import { configSchema } from './_config'
import { CapabilitiesResponse } from '@hasura/dc-api-types'

const capabilitiesResponse: CapabilitiesResponse = {
  configSchemas: configSchema,
  capabilities: {
    queries: {
      supportsPrimaryKeys: true
    },
    relationships: {},
    explain: {}
  }
}

export default (req: Request, res: Response) => {
  res.status(200).json(capabilitiesResponse)
}

import { Request, Response } from 'express'
import fs from 'fs'

export default async (request: Request, response: Response) => {
  fs.readFile('agent.openapi.json', (err, fileBuffer) => {
    response.type('application/json')
    response.send(err || fileBuffer)
  })
}

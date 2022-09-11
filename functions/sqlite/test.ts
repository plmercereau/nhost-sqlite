import { Request, Response } from 'express'

export default async (request: Request, response: Response) => {
  return response.status(200).send('ok')
}

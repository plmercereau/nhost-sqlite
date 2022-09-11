import { Request } from 'express'
import { ConfigSchemaResponse } from '@hasura/dc-api-types'
import path from 'path'

export type Config = {
  db: string
  tables: String[] | null
  meta: Boolean
}

export const getConfig = (request: Request): Config => {
  const config = tryGetConfig(request)
  if (config === null) {
    throw new Error('X-Hasura-DataConnector-Config header must specify db')
  }
  return config
}

export const tryGetConfig = (request: Request): Config | null => {
  return {
    db: path.join(__dirname, 'db.chinook.sqlite'),
    tables: null,
    meta: false
  }
}

export const configSchema: ConfigSchemaResponse = {
  configSchema: {
    type: 'object',
    nullable: false,
    properties: {
      db: {
        description: 'The SQLite database file to use.',
        type: 'string'
      },
      tables: {
        description:
          'List of tables to make available in the schema and for querying',
        type: 'array',
        items: { $ref: '#/otherSchemas/TableName' },
        nullable: true
      },
      include_sqlite_meta_tables: {
        description:
          'By default index tables, etc are not included, set this to true to include them.',
        type: 'boolean',
        nullable: true
      },
      DEBUG: {
        description: 'For debugging.',
        type: 'object',
        additionalProperties: true,
        nullable: true
      }
    }
  },
  otherSchemas: {
    TableName: {
      nullable: false,
      type: 'string'
    }
  }
}

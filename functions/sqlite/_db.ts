import { Config } from './_config'
import { Sequelize } from 'sequelize'
import { envToBool } from './_util'
import SQLite from 'sqlite3'

export type SqlLogger = (sql: string) => void

export function connect(config: Config, sqlLogger: SqlLogger): Sequelize {
  // See https://github.com/TryGhost/node-sqlite3/wiki/API#new-sqlite3databasefilename--mode--callback
  // The default value is OPEN_READWRITE | OPEN_CREATE | OPEN_FULLMUTEX.
  const readMode = SQLite.OPEN_READONLY
  const createMode = envToBool('DB_CREATE') ? SQLite.OPEN_CREATE : 0 // Flag style means 0=off
  const cacheMode = envToBool('DB_PRIVATECACHE')
    ? SQLite.OPEN_PRIVATECACHE
    : SQLite.OPEN_SHAREDCACHE
  const mode = readMode | createMode | cacheMode

  const db = new Sequelize({
    dialect: 'sqlite',
    storage: config.db,
    dialectOptions: { mode },
    logging: sqlLogger
  })

  return db
}

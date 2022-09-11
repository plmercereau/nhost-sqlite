export const sqlLogger = (sql: string): void => {
  console.debug({ sql }, 'Executed SQL')
}

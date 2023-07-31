import { existsSync, readdirSync } from "fs"
import postgres from "postgres"

export async function migrate() {
  try {
    if (existsSync('./migrations')) {
      const files = readdirSync('./migrations').filter(file_name => file_name.endsWith('.sql'))
      if (files.length === 0) {
        console.log('squils did not find any sql file in the migrations folder. Aborting operation....')
        process.exit(0)
      }
      const db_url = process.env.DB_URL ?? ""
      const config = db_url.includes('@localhost:5432')? {} : { ssl:"require" }
      if (db_url === "") {
        console.log('Database URI not found in environment')
        console.log('Export the DB_URL in the local environment or use a .env file at the root of the folder where you are running squils')
        process.exit(1)
      }
      for (let i = 0; i < files.length; i++) {
        const file_name = files[i];
        const sql = postgres(db_url, config)
        console.log(`Running transaction ${file_name.substring(file_name.indexOf('_') + 1)}...`)
        await sql.begin(async sql => {
          await sql.file(`./migrations/${file_name}`)
        })
        console.log(`Done`)
      }
      console.log('All transactions have been run successfuly')
      process.exit(0)
    }
    console.log('Can not find `migrations` folder')
    process.exit(1)
  } catch (err) {
    console.log(err)
    console.log(`Report bugs at https://github.com/TheWisePigeon/squils/issues`)
    process.exit(1)
  }
}

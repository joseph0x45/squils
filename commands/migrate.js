import { existsSync, readFileSync, readdirSync } from "fs"

export async function migrate() {
  try {
    if (existsSync('./migrations')) {
      const files = readdirSync('./migrations')
      const db_url = process.env.DB_URL ?? ""
      if(db_url===""){
        console.log('Database URI not found in environment')
        console.log('Export the DB_URL in the local environment or use a .env file at the root of the folder where you are running squils')
        return
      }
      files.map(file_name => {
        if (file_name.endsWith('.sql')) {
          const raw_sql = readFileSync(`./migrations/${file_name}`, 'utf8')
          console.log(raw_sql)
        }
      })
      return
    }
    console.log('Can not find `migrations` folder')
  } catch (err) {

  }
}

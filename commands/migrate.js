import { existsSync, readFileSync, readdirSync } from "fs"

export async function migrate() {
  try {
    if (existsSync('./migrations')) {
      const files = readdirSync('./migrations')
      const db_url = process.env.DB_URL ?? ""
      if(db_url===""){
        console.log('Database URI not found in environment')
        //Add some help message here
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

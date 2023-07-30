import { existsSync, readFileSync, readdirSync } from "fs"

export async function migrate() {
  try {
    if (existsSync('./migrations')) {
      const files = readdirSync('./migrations')
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

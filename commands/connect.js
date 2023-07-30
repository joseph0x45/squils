import postgres from "postgres"

export async function connect(){
  const sql = postgres("postgres://test:test@localhost:5432/postgres")
  const version = await sql`select version()`
  console.log(version)
}

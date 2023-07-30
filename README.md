# SQUILS (More like SQL Utils)
squils is a set of tools that aim to make working with sql databases easier

## Supported databases
- [x] Postgres
- [ ] SQLite
- [ ] MySQL


## Features
- [x] Migrations
- [ ] Visualize data
- [ ] Seeding
- [ ] Export data


Contributions are welcome :)


## Installation
Download the cli using your favorite
```
pnpm install -g squils
```

## Usage
Only the migration feature is working that the moment. I plan on adding a new feature every week.

## Postgres - Migrations
First of all you will need to create a folder named 'migrations' and you will create your sql files in that folder.
Make sure to follow the naming convention for the files which is the following <migration_version>_<migration_name>.sql
Once done, create a .env file and add your database url inside of it.
```env
DB_URL="postgres://username:password@host/database"
```
Your folder structure should look like this
```
migrations/
    00001_create_users.sql
    00001_create_indexes.sql
.env
```
Now run the `squils migrate` command and you're good to go. Report any errors you encounter [here](https://github.com/TheWisePigeon/squils/issues)

import { DatabaseSync } from 'node:sqlite'
const db = new DatabaseSync('./src/database/leaderboards.sqlite')

db.exec(`CREATE TABLE IF NOT EXISTS reaction_time_leaderboard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        time NUMERIC
    )`)

db.exec(`CREATE TABLE IF NOT EXISTS stopwatch_tester_leaderboard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        time_target NUMERIC,
        achieved_time REAL
    )`)

export default db
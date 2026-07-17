import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import reactionTimeRoutes from './routes/reactionTimeRoutes.js'

const app = express()
const PORT = process.env.PORT || 2020

const __filename = fileURLToPath(import.meta.url)
const __directoryName = path.dirname(__filename)
const publicPath = path.join(__directoryName, '../public')

app.use(express.static(publicPath))
app.use(express.json())

app.use('/reactionTime', reactionTimeRoutes)

app.listen(PORT, () => {
    console.log('Server running at port: ' + PORT)
})
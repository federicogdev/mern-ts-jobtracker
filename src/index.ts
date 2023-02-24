import 'dotenv/config'
import express from 'express'

import env from './util/validate-env'


const PORT = env.PORT

const app = express()

app.use(express.json({limit: '4mb'}))

app.listen(PORT, () => console.log('Server started on PORT: ' + PORT))
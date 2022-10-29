const express = require('express')
require('./db/db')
const userRouter = require('./routers/admin')
const app = express()

app.use(express.json())
app.use(userRouter)

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server is live`)
})




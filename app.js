const express = require('express')
const app = express()
const dbConn = require('./config/db.con')
const logger = require('./middleware/logger')
const cors = require('cors')
const path = require('path');
const lenderRoutes = require('./routes/lender')
const bikeRoutes = require('./routes/bike')
const userRoutes = require('./routes/user')
const historyRoutes = require('./routes/history')



const port = process.env.PORT || 3000

app.use(cors({"origin":"*"}))
app.use(logger)
app.use(express.json())

app.use('/uploads', express.static(path.join('uploads')));

app.use('/lender',  lenderRoutes)
app.use('/bike'  ,  bikeRoutes)
app.use('/user'  ,  userRoutes)
app.use('/history', historyRoutes)


dbConn();
app.listen(port,()=>{
    console.log(`Server is running at port no. ${port}`)
})
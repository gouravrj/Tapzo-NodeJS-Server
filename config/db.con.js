const mongoose = require('mongoose')
const url = "mongodb+srv://gourav_rj:Gourav2001@cluster0.dqg4x.mongodb.net/tapzoo?retryWrites=true&w=majority"

const dbConn = () => {
    mongoose.connect(url)
    .then(()=>{
      console.log("Successfully Connected to the Database ...")
    })
    .catch(()=>{
      console.log('Connection Failed :( ')
    })
}
module.exports = dbConn;
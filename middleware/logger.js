const logger = (req,res,next) => {
    console.log(req.url)
    console.log(req.method)
    
    const d = new Date()
    console.log(d)
    next();              //it says to proceeds furtherrr otherwise it holds at that point
}

module.exports = logger;
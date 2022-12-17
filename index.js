const express = require('express');
const userRouter = require('./routes/admin')
const app = express();
app.use(express.json());
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    next();
  });
app.use('/admin',userRouter);
app.listen(3000,()=>{
    console.log("server listen on port 3000");
})


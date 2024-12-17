const express = require('express')
const dotenv = require('dotenv')
const productRoutes = require('./src/product/product.routes')

dotenv.config()
const port = process.env.PORT;
const app = express();


app.use(express.json())

app.get("/", (req,res)=> {
    res.status(200).json({
        message: "hello world",
    })
})

app.use('/api', productRoutes)
app.listen(port, ()=> {
    console.log('Server runing in port: ' + port)
});


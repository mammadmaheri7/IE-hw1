const express = require('express')
const whiskers = require('whiskers') 

const app = express()
const port = 3000

console.log('--------------------------- NEW APP ')
app.use('/' , (req, res, next)=>{
    console.log('Middleware Called!')
    next();
});

app.get('/', (req, res) => {
    console.log(req.query)
    

    res.send( whiskers.render(`
        <html>
        <body>
        <h1>Hello team a new rendering engine is out!</h1>
        <ul>
            <li>Foo is:{query.foo}</li>
            <li>Bar is:{query.bar}</li>
        <ul>
        </body>
        </html>
    `, req))
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


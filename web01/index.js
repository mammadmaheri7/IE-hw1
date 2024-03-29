const express = require('express')
const whiskers = require('whiskers') 
const bodyParser = require('body-parser')
const fs = require('fs')
const inside = require('point-in-polygon')
const app = express()
const port = 3000

console.log('--------------------------- NEW APP ')

app.use(bodyParser.json())

let polygons;
if (polygons === undefined) {
    console.log('reading new info')
    fs.readFile(`${__dirname}/polygons.json`, (err, data) => {
        if (err) throw err
        polygons = JSON.parse(data)
        
    })
}


app.use('/' , (req, res, next)=>{
    console.log('Middleware Called!')
    next();
});

app.get('/gis/testpoint',(req,res) => {
    let lat = req.query.lat
    let long = req.query.long
    let result = { polygons: [] };
    polygons.features.forEach(element => {
        if (inside([long, lat], element.geometry.coordinates[0])) {
            result.polygons.push(element.properties.name)
        }
    });
    res.send(result) ;
    
});

app.put('/gis/addpolygon',(req,res)=>{
    console.log(req.body)
    polygons.features.push(req.body)
    fs.writeFile(`${__dirname}/polygons.json`,JSON.stringify(polygons),(err)=>{
       if(err) throw err
    })
    res.sendStatus(200)
});

app.get('/', (req, res) => {
    res.send( whiskers.render(`
        <html>
        <body>
        <h1>Hello team a new rendering engine is out!</h1>
            <P>
                welcome {query.name}
            </P>
        </body>
        </html>
    `, req))
});


app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`))


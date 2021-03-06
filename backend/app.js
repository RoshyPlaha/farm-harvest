const express = require('express');
const app = express()
const port = process.env.PORT || "80";

app.get('/', (req, res)=> {
    res.send("Message from node API backend")
})

app.get('/health', (req, res)=> {
    res.send("healthy")
})

app.listen(port, () => {
    console.log(`Application is listening on ${port}`)
})
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3001

app.get('/', express.static(path.join(__dirname, 'client', 'build')))

app.listen(port, () => {
    console.log(`App successfully started on port ${port}!`)
})

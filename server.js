const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('build'));

app.get('*', function(request, response) {
    var indexPath = path.resolve(__dirname, 'build', 'index.html')
    console.log("Request Received, sending back " + indexPath);
    response.sendFile(indexPath);
})

const port = 3000

app.listen(port);
console.log('Server Started on Port: ' + port);
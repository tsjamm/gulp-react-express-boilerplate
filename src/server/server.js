const express = require('express');
const path = require('path');
import { RoutesView } from '../public/react/components/common/RoutesView.jsx';

const app = express();

app.use(express.static(path.resolve(__dirname, '../', 'public')));

app.get('*', function(request, response) {
    var indexPath = path.resolve(__dirname, '../', 'public', 'index.html')
    console.log("Request Received, sending back " + indexPath);
    response.sendFile(indexPath);
})

const port = 3000

app.listen(port);
console.log('Server Started on Port: ' + port);
import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router';
//import { RoutesView } from '../public/react/components/common/RoutesView.jsx';
import { BaseView } from '../public/react/components/common/BaseView.jsx';

const app = express();

app.get('', handleReactPage);
app.get('*.html', handleReactPage);
app.use(express.static(path.resolve(__dirname, '../', 'public')));

const port = 3000

app.listen(port);
console.log('Server Started on Port: ' + port);


function handleReactPage(request, response) {
    var indexPath = path.resolve(__dirname, '../', 'public', 'index.html')
    console.log("Request Received on " + request.url + "\n sending back " + indexPath);
    response.sendFile(indexPath);


    const context = {};
    const html = ReactDOMServer.renderToString(
        <StaticRouter location={request.url} context={context} >
          <BaseView/>
        </StaticRouter>
      )
    
      if (context.url) {
        response.writeHead(301, {
          Location: context.url
        })
        response.end()
      } else {
        response.write(`
        <html>
        
        <head>
            <!-- Meta Tags Begin -->
            <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
            <meta charset="utf-8">
            <link rel="icon" href="assets/img/favicon.ico" type="image/x-icon" />
            <!-- Meta Tags Ends -->
        
            <!-- Page Title -->
            <title>Gulp React Express Boilerplate</title>
        
            <!-- Style Section Begins -->
            <link rel="stylesheet" href="styles/main.css" />
            <!-- Style Section Ends -->
        
        </head>
        
        <body id="body" class="body">
            <div id="bodyWrapper" class="body-wrapper">${html}</div>
        
            <!-- Scripts Section Begins -->
        
            <!-- WebPack Bundle -->
            <script src="react/bundle.js"></script>
            <!-- Scripts -->
            <script src="scripts/index.js"></script>
            <!-- Live Reload -->
            <script src="//localhost:35729/livereload.js"></script>
        
            <!-- Scripts Section Ends -->
        
        </body>
        
        </html>
        `)
        response.end()
      }
}
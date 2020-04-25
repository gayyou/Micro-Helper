const express = require('express');
const fs = require('fs');
const url = require('url');
const request = require('request')

let app = express();

app.post('/api*', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
        res.status = 200;
        res.end();
        return;
    }
    res.status = 200;
    console.log('get request');
    res.end();    
    // // proxy
    // request.get('', (error, response, body)=>{
    //     res.writeHead(200);
    //     res.end(body);    
    // })
})

app.listen(4001, () => {
    console.log('running on port: 4001');
});

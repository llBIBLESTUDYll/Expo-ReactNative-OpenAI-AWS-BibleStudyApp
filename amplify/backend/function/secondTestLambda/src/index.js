const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

const mysql = require('mysql');
const { resolve } = require('path');
const { rejects } = require('assert');

const connection = mysql.createConnection({
  host: 'biblestudy.cjc0iumoqpfh.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '123qweasdzxc',
  database: 'BibleStudy'
})

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context) => {
  // console.log(`EVENT: ${JSON.stringify(event)}`);
  // return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;

  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM test', (error, results) => {
      if(error) {
        reject(error);
      } else {
        resolve({
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow from any origin
            'Access-Control-Allow-Headers': '*', // Allow any headers
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET', // Allow these methods
          },
          body: JSON.stringify(results)
        });
      }
    });
  });
};

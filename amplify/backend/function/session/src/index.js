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

  const method = event.httpMethod; // Get the HTTP method (GET, POST, etc.)
  const path = event.path; // Get the request path
  const queryStringParameters = event.queryStringParameters; // Get query string parameters
  const body = JSON.parse(event.body); // Get the request body (if any)

  console.log('HTTP Method:', method);
  console.log('Path:', path);
  console.log('Query String Parameters:', queryStringParameters);
  console.log('Request Body:', body);
  // return new Promise((resolve, reject) => {
  //   connection.query('SELECT * FROM test', (error, results) => {
  //     if(error) {
  //       reject(error);
  //     } else {
  //       resolve({
  //         statusCode: 200,
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Access-Control-Allow-Origin': '*', // Allow from any origin
  //           'Access-Control-Allow-Headers': '*', // Allow any headers
  //           'Access-Control-Allow-Methods': 'OPTIONS,POST,GET', // Allow these methods
  //         },
  //         body: JSON.stringify(results)
  //       });
  //     }
  //   });
  // });
  return new Promise((resolve, reject) => {
    // Handle different HTTP methods
    resolve({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow from any origin
        'Access-Control-Allow-Headers': '*', // Allow any headers
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET', // Allow these methods
      },
      body: JSON.stringify({method, path, queryStringParameters, body}),
    });

    
    if (method === 'GET') {
      connection.query('SELECT * FROM your_table', (error, results) => {
        if (error) {
          reject({
            statusCode: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*', // Allow from any origin
              'Access-Control-Allow-Headers': '*', // Allow any headers
              'Access-Control-Allow-Methods': 'OPTIONS,POST,GET', // Allow these methods
            },
            body: JSON.stringify(error),
          });
        } else {
          resolve({
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*', // Allow from any origin
              'Access-Control-Allow-Headers': '*', // Allow any headers
              'Access-Control-Allow-Methods': 'OPTIONS,POST,GET', // Allow these methods
            },
            body: JSON.stringify(results),
          });
        }
      });
    } else if (method === 'POST') {
      // Handle POST request
      const { column1, column2 } = body;
      connection.query(
        'INSERT INTO your_table (column1, column2) VALUES (?, ?)',
        [column1, column2],
        (error, results) => {
          if (error) {
            reject({
              statusCode: 500,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
              },
              body: JSON.stringify(error),
            });
          } else {
            resolve({
              statusCode: 201,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
              },
              body: JSON.stringify({ message: 'Record created', results }),
            });
          }
        }
      );
    } else {
      resolve({
        statusCode: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        },
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      });
    }
  });
};

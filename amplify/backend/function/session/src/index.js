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
exports.handler = async (event, context) => {
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

  return new Promise( async (resolve, reject) => {
          // resolve({
          //   statusCode: 200,
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Access-Control-Allow-Origin': '*', // Allow from any origin
          //     'Access-Control-Allow-Headers': '*', // Allow any headers
          //     'Access-Control-Allow-Methods': 'OPTIONS,POST,GET', // Allow these methods
          //   },
          //   body: JSON.stringify(path),
          // });    
    // Handle different HTTP methods    
    if (method === 'GET') {
      if(queryStringParameters.username) {
        connection.query(`SELECT * FROM sessions WHERE username="${queryStringParameters.username}" LIMIT 10 OFFSET ${10 * (queryStringParameters.page - 1)}`, (error, results) => {
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
      }
      
      if(queryStringParameters.session_id && path == '/session/question') {
        connection.query(`SELECT * FROM questions WHERE session_id=${queryStringParameters.session_id}`, (error, results) => {
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
      }     
      if(queryStringParameters.question_id && path == '/session/verses') {
        connection.query(`SELECT * FROM verses WHERE question_id=${queryStringParameters.question_id}`, (error, results) => {
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
      }     
      connection.query('SELECT * FROM sessions', (error, results) => {
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

      const { user, restion, sessionInfo } = body;
      const session_sql = 'INSERT INTO sessions (title, username, groupType, questionCount, versesCount, topic, prefered) VALUES (?, ?, ?, ?, ?, ?, ?)';
      await connection.query(
        session_sql,
        [sessionInfo.title, user.username, sessionInfo.groupType, sessionInfo.numberQuestions, sessionInfo.numberVerses, sessionInfo.focusTopic, sessionInfo.bible],
        async (error, results) => {
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
              try {
                  for (let item of restion) {
                      await connection.query(
                          'INSERT INTO questions (session_id, question) VALUES (?, ?)',
                          [results.insertId, item.question], async (error, results) => {
                            const verses_values = item.verses.map(item => [results.insertId, item.reference, item.text]); // Adjust columns as necessary
                            const verses_sql = 'INSERT INTO verses (question_id, reference, text) VALUES ?'
                            await connection.query(verses_sql, [verses_values])
                          }
                      );
                  }
                  resolve({
                    statusCode: 201,
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Headers': '*',
                      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                    },
                    body: JSON.stringify({ message: 'Record created', restion }),
                  });  
              } catch (error) {
                  console.error('Error inserting data: ', error);
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
              }

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

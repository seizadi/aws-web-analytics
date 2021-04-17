// 'use strict';
//
// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };
//
//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

const AWS = require('aws-sdk');
const { promisify } = require('util');

const kinesis = new AWS.Kinesis();

const putRecord = promisify(kinesis.putRecord.bind(kinesis));

const response = (body, status) => {
  return {
    statusCode: status || 200,
    body: body && JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    }
  }
}

module.exports.collect = async (event, context) => {
  const body = JSON.parse(event.body);
  if (!body.clientId || !body.url || !body.eventType) {
    return response({
      error: 'clientId, url and eventType required'
    }, 400);
  }

  await putRecord({
    Data: JSON.stringify({
      client_id: body.clientId,
      url: body.url,
      event_type: body.eventType,
      event_value: body.eventValue,
      referrer: body.referrer,
      timestamp: (new Date()).toISOString(),
      source_ip: event.requestContext.identity.sourceIp,
      user_agent: event.requestContext.identity.userAgent
    }) + '\n',
    PartitionKey: body.clientId,
    StreamName: 'event-collection'
  });

  return response();
};


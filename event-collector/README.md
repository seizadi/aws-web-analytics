# Reference

This package uses [Serverless Framework](https://serverless.com/) to deploy to AWS.
[Documentation](https://www.serverless.com/framework/docs/providers/aws/).

# Deploy

Installing Serverless Framework:

```
npm install -g serverless
```

Deploying (make sure you have AWS CLI and AWS credentials are set up):

```
serverless deploy -v
```

When you are done...

```bash
serverless remove -v
```

# Test

```bash
curl -d '{}'  https://...........amazonaws.com/dev/collect
curl -d '{}'  https://j9fjje028k.execute-api.us-east-2.amazonaws.com/dev/collect

{"error":"clientId, url and eventType required"}%   
```
Now make sure we setup the Kinesis Stream

```bash
curl -d '{"clientId": "123", "url": "-", "eventType": "pageView"}' https://........amazonaws.com/dev/collect
curl -d '{"clientId": "123", "url": "-", "eventType": "pageView"}'  https://j9fjje028k.execute-api.us-east-2.amazonaws.com/dev/collect

```

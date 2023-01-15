/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as firebase from 'firebase-admin';

import { ServiceAccount } from 'firebase-admin';



async function bootstrap() {
   const serviceAccount:ServiceAccount={
    "projectId": "wordtogether-c49c6",
    "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCkXiQicjkUTFbe\ngIAT5zc6748u/HYtAZPA7tHGa6eAMIrlKLhslcdefEL23NLSJYYmADk9xuEPLxpz\nFT5SgzbUpyNhdPDap5OL7sopgHUa38cUPF9ICZR+OB+7blPBnQPnA/kLt89n/VNj\n/hh87fTCURngqJWxj+qo3faPF5wD2zUBhgdbJ3d7zpQ+bXpLAPY9n5Yyosiz4eFg\nd88idlKrYVrezYaTsY1R9jqiwAGuM/Dcr79T8rtFauJWZfVTeVaQmIPT0rbfPXij\nXlFuLM4BFupyTwr/x+nj+RpSLtWKg7Je+vy3Q1y1jOSsQxaw20djfjoi+eB3vKDQ\nhqKP2NEvAgMBAAECggEAEWFrDMFrS7wuy2RnJrOiYXcHev5zOJscFqCqSgMEOUfo\nyAagScskw9b79cKwAEy7fLU1WFT5Y3Olplmut2bsm1v5H8sP1O83aOqdMfpFZ8wV\n7wvbP3DT5OzmXhlyfdyulvUSlqyfH+3nrYEm8b7vzMRqqhjpi1cehzDBa6whcT7H\nPvBXbsXBvtbECrvKCc0GK59OiME1z/ueYAoIOrYYnUVmoE2VS4LVdKF3vqsWy/QE\n9PcSVys8lHTDnPR6dEXpelCRje0AfX8nBCz3DznlPkcI/tx2T9YAiTE3Cg5hALQw\n8ZM6+TmkrkcB1AMjbxxJZlls3llt6ZcgOP3vT0fgEQKBgQDdpg6fiKwSoVLKrqVK\nuHt6CSaJgqBBGU0PGOrUmw9hJjdcO/PScjBEdQU04CAG/wJ+X0KIZPyZE6Zv9L07\nBQ+BrbpN6DKhNO1vMyhmR7zgtsqAuX2ks/axH6CWjZdXcLfUhk8l/plJxm3da70I\nt/dzTOzvOEo9VvvMGVrIh5Nj5QKBgQC913SCrIlpj1O2AGJGROgLXSCIlbeqp09c\nAfBp11R/eGHHdRwjWzOsU9tcfggsEpuU4eeWmfB0NuOyOcJ13TaRINpfpTIPOBrS\nt4HSwxrfLCT8rSopewQcy6tT2HzIPOuAPzZrpmSOBhwknooQjIQPGJsS7DoCBznI\nOaP43rS3gwKBgQCetlmiQut0K7BtEcGqT4+bQxIlRTQbaVKUjPMaai4JEqRxlzxw\nZPPLEUA5LIPCfrf6ZZvuruFxe3Cimk0mBemkohHV137pkEy0Y516H8RP5JP8uNYP\nKg5rpooHRDwqkLwRolrqifSZr0zcUFl79L9sAJlocpY2diK3czBehzYzQQKBgHPu\nnXInl4rlQkPFHD65WdOGvZVriMwofGg9rumT3EAz7dJ2jAZzbazxUOa8+JShkG1t\nP5ZSz+rIkmiGqWB9BRO/slvycA2nP4orEpb5GvHq7XN49GR8gVhscGY1sI4/1blt\n4PgAlyu8Q3eBceMFTKhDaIA3znzqmLjTqnUS292tAoGBAL56xJx2hbpwM8vi1xyN\n/oAb67MPxhueejznUb0M3fIVhY57ocIfBFpAZMwh+4LiAoM5XeBxQgxkfv3AcWq2\nwBbZbOOzQbo6nWjnv7YS1OybFOiB0aKRm0jsb7oj13a4ZkhHL25ST9oCwncVjnJL\nyRhrhFQIPXDqGinVinlxOe7N\n-----END PRIVATE KEY-----\n",
    "clientEmail": "firebase-adminsdk-mcqqk@wordtogether-c49c6.iam.gserviceaccount.com",
  }

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket:'gs://wordtogether-c49c6.appspot.com/',
  });
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

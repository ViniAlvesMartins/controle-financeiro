import type { AWS } from '@serverless/typescript'

import { categoriaHandler } from '@framework/functions/category/_handler'

const serverlessConfiguration: AWS = {
  service: 'controle-financeiro',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DATABASE_HOST: '127.0.0.1',
      DATABASE_PORT: '33306',
      DATABASE_USER: 'root',
      DATABASE_PASSWORD: 'financeiro',
      DATABASE: 'financeiro'
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { ...categoriaHandler },
}

module.exports = serverlessConfiguration

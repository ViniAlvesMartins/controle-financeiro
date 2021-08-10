import type { AWS } from '@serverless/typescript'

import { categoryHandler } from '@framework/functions/category/_handler'
import { subcategoryHandler } from '@framework/functions/subcategory/_handler'
import { releaseHandler } from '@framework/functions/release/_handler'
import { balanceHandler } from '@framework/functions/balance/_handler'
import { authHandler } from '@framework/functions/auth/_handler'

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
      DATABASE: 'financeiro',
      API_KEY: 'aXRhw7o='
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { 
    ...categoryHandler,
    ...subcategoryHandler,
    ...releaseHandler,
    ...balanceHandler,
    ...authHandler
  },
}

module.exports = serverlessConfiguration

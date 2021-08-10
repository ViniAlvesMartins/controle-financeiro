const funcDir = 'src/4-framework/functions/release'
export const releaseHandler = {
  createRelease: {
    handler: `${funcDir}/createReleaseFunction.handler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'v1/releases',
          cors: true
        }
      }
    ]
  },
  getByIdRelease: {
    handler: `${funcDir}/getByIdReleaseFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'v1/releases/{releaseId}',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              paths : {
                releaseId: true
              }
            }
          }
        }
      }
    ]
  },
  getAllRelease: {
    handler: `${funcDir}/getAllReleaseFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'v1/releases',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              querystrings : {
                name: false,
                startDate:false,
                endDate: false
              }
            }
          }
        }
      }
    ]
  },
  updateRelease: {
    handler: `${funcDir}/updateReleaseFunction.handler`,
    events: [
      {
        http: {
          method: 'put',
          path: 'v1/releases/{releaseId}',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              paths: {
                releaseId: true
              }
            }
          }
        }
      }
    ]
  },
  deleteRelease: {
    handler: `${funcDir}/deleteReleaseFunction.handler`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'v1/releases/{releaseId}',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              paths : {
                releaseId: true
              }
            }
          }
        }
      }
    ]
  },
}
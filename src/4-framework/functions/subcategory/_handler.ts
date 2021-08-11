const funcDir = 'src/4-framework/functions/subcategory'
export const subcategoryHandler = {
  createSubcategory: {
    handler: `${funcDir}/createSubcategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'v1/subcategories',
          cors: true
        }
      }
    ]
  },
  getAllSubcategory: {
    handler: `${funcDir}/getAllSubcategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'v1/subcategories',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              querystrings : {
                name: false
              }
            }
          }
        }
      }
    ]
  },
  getByIdSubcategory: {
    handler: `${funcDir}/getByIdSubcategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'v1/subcategories/{subcategoryId}',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              paths : {
                subcategoryId: true
              }
            }
          }
        }
      }
    ]
  },
  updateSubcategory: {
    handler: `${funcDir}/updateSubcategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'put',
          path: 'v1/subcategories/{subcategoryId}',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              paths: {
                subcategoryId: true
              }
            }
          }
        }
      }
    ]
  },
  deleteSubcategory: {
    handler: `${funcDir}/deleteSubcategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'v1/subcategories/{subcategoryId}',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              paths : {
                subcategoryId: true
              }
            }
          }
        }
      }
    ]
  },
}
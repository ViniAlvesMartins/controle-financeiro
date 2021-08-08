const funcDir = 'src/4-framework/functions/subcategory'
export const subcategoryHandler = {
  createSubcategory: {
    handler: `${funcDir}/createSubcategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'v1/subcategorias',
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
          path: 'v1/subcategorias',
          cors: true,
          request: {
            parameters: {
              querystrings : {
                nome: false
              }
            }
          }
        }
      }
    ]
  },
}
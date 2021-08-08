const funcDir = 'src/4-framework/functions/subcategory'
export const subcategoryHandler = {
  create: {
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
  }
}
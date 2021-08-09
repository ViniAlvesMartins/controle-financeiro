const funcDir = 'src/4-framework/functions/release'
export const releaseHandler = {
  createRelease: {
    handler: `${funcDir}/createReleaseFunction.handler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'v1/lancamentos',
          cors: true
        }
      }
    ]
  }
}
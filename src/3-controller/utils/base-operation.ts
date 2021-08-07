import { ValidationError } from 'class-validator'
import { baseErrorList } from '@domain/utils/base-error-list'
import { actions } from '@business/utils/base-response'

export class BaseOperation<O> {

  protected async makeResponse(output: O | O[] | null, action: actions,
                               hasError = false, 
                               error?: baseErrorList | any): Promise<response>{

    if(hasError){
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: error
        })
      }as response
    }else{
      switch (action) {
        case actions.CREATE:
          return {
            statusCode: 201,
            body: JSON.stringify({
              data: output,
              success: true
            } as success<O>)
          }as response
        case actions.GET:
          if(output === null){
            return {
              statusCode: 204,
              body: JSON.stringify({
                data: output,
                success: true
              })
            }as response
          }
          return {
            statusCode: 200,
            body: JSON.stringify({
              data: output,
              success: true
            })
          }as response
          
        case actions.UPDATE:
        case actions.DELETE:
          return {
            statusCode: 200,
            body: JSON.stringify({
              data: output,
              success: true
            })
          }as response
      }
    }
  }

  protected async makeResponseCatch(err: any, action: actions): Promise<response>{
    let data = null
    if (
      err instanceof Array &&
      err.length &&
      err[0] instanceof ValidationError
    ) {
      data = err.map(i => ({
        property: i.property,
        constraints: i.constraints
      }))
    }
    return this.makeResponse(null, action, true, {data, error:'fail validation'})
  }
}

export interface response {
  statusCode: number,
  body: string
}

interface success<O> {
  success: boolean
  data: O
}
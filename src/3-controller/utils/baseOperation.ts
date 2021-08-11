import { baseErrorList, CodeErrors } from '../../1-domain/utils/baseErrorList'

export enum statusCode {
  SUCCESS = 200,
  CREATED = 201,
  SEE_OTHER = 303,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404
} 

export class BaseOperation {
  protected validations: baseErrorList[] = []

  protected async makeResponse(data: any, statusCode: number ): Promise<response> {
    return {
      statusCode,
      body: JSON.stringify({
        data
      })
    }
  }

  protected async makeResponseError(data: any, statusCode: number ): Promise<response> {
    return {
      statusCode,
      body: JSON.stringify({
        data
      })
    }
  }

  protected async makeResponseValidations(error: baseErrorList[]): Promise<response>{
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: error
        })
      }
  }

  protected async makeInputValidation(message: string, field: string): Promise<void> {
    this.validations.push({
      code: CodeErrors.VALIDATION_ERROR,
      message,
      field
    } as baseErrorList)
  }

}

export interface response {
  statusCode: number,
  body: string
}
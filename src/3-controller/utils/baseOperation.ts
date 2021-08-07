import { baseErrorList } from '@domain/utils/baseErrorList'

export enum statusCode {
  SUCCESS = 200,
  CREATED = 201,
  SEE_OTHER = 303,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404
} 

export class BaseOperation {
  protected validacoes: baseErrorList[] = []

  protected async makeResponse(data: any, statusCode: number ): Promise<response> {
    return {
      statusCode,
      body: JSON.stringify({
        data
      })
    }
  }

  protected async makeResponseValidation(error: baseErrorList[]): Promise<response>{
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: error
        })
      }
  }

  protected async makeInputValidation(mensagem: string): Promise<void> {
    this.validacoes.push({
      codigo: 'erro_validacao',
      mensagem
    } as baseErrorList)
  }

}

export interface response {
  statusCode: number,
  body: string
}
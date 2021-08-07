import { baseErrorList } from '@domain/utils/base-error-list'
import { BaseResponse, actions } from './base-response'

export class BaseUseCase<T> {

  protected async makeResponse(response:  T[] | T | null, method: actions, error?: baseErrorList): Promise<BaseResponse<T>> {
    return {
      body: response,
      hasError: error ? true : false,
      error: error,
      action: method
    } as BaseResponse<T>
  }
}
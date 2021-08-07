import { baseErrorList } from '@domain/utils/baseErrorList'
import { BaseResponse } from './baseResponse'


export class BaseUseCase<Tmodel> {

  protected async makeResponse(response: Tmodel[] | Tmodel | null, error?: baseErrorList): Promise<BaseResponse<Tmodel>> {
    return {
      body: response,
      hasError: error ? true : false,
      error: error,
    } as BaseResponse<Tmodel>
  }
}
import { baseErrorList } from '@domain/utils/base-error-list'

export interface BaseResponse<Tmodel> {
  hasError: boolean
  error?: baseErrorList
  body: Tmodel
}


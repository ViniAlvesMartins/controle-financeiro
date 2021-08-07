import { baseErrorList } from '@domain/utils/baseErrorList'

export interface BaseResponse<Tmodel> {
  hasError: boolean
  error?: baseErrorList
  body: Tmodel
}


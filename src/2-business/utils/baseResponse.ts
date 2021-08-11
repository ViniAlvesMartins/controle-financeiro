import { baseErrorList } from '../../1-domain/utils/baseErrorList'

export interface BaseResponse<Tmodel> {
  hasError: boolean
  error?: baseErrorList
  body: Tmodel
}


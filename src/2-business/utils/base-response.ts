import { baseErrorList } from '@domain/utils/base-error-list'

export interface BaseResponse<Tmodel> {
  hasError: boolean
  error?: baseErrorList
  action: actions
  body: Tmodel
}

export enum actions {
  'CREATE', 'GET', 'UPDATE', 'DELETE'
} 
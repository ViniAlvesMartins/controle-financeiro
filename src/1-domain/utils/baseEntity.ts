import { baseErrorList } from './baseErrorList'

export class BaseEntity { 
  error: baseErrorList
  hasError = false

  setError(error: baseErrorList) {
    this.error = error
    this.hasError = true
  }
}
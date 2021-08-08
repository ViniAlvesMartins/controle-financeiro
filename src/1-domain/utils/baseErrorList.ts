export interface baseErrorList {
  code: string
  message: string
  field: string
}

export enum CodeErrors {
  NON_EXISTENT_VALUE = 'valor_inexistente',
  EXISTING_VALUE = 'valor_existente',
  VALIDATION_ERROR = 'erro_validacao'
}
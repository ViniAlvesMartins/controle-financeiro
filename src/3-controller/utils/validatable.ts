import { validateSync } from 'class-validator'

export class Validatable {
  isValid () {
    const errors = this.errors()
    return !errors || errors.length === 0
  }

  validate () {
    const errors = this.errors()
    if (errors && errors.length > 0) {
      throw errors
    }
  }

  errors () {
    return validateSync(this)
  }
}

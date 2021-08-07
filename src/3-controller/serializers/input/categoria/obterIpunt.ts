import { Validatable } from '@controller/utils/validatable'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class ObterInput extends Validatable {
  
  @IsNotEmpty()
  @IsNumber()
  categoriaId!: number

  constructor (object: Partial<ObterInput>) {
    super()
    Object.assign(this, object)
  }
}
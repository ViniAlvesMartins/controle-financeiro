import { Validatable } from '@controller/utils/validatable'
import { IsOptional, IsString } from 'class-validator'

export class ListarInput extends Validatable {
  
  @IsOptional()
  @IsString()
  nome!: string

  constructor (object: Partial<ListarInput>) {
    super()
    Object.assign(this, object)
  }
}
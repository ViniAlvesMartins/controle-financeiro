export class GetAllSubcategoryInput {
  
  name!: string

  constructor (object: Partial<GetAllSubcategoryInput>) {
    Object.assign(this, object)
  }
}
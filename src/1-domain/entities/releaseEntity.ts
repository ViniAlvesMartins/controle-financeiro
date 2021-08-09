import { BaseEntity } from '@domain/utils/baseEntity'
import { ISubcategory } from './subcategoryEntity'

export interface IRelease {
  releaseId: number,
  value: number,
  date: Date,
  subcategoryId: number,
  Subcategory: ISubcategory,
  comment: string,
  createdAt?: Date,
  updatedAt?: Date
}

export class ReleaseEntity extends BaseEntity implements IRelease {
  releaseId: number
  value: number
  date: Date
  subcategoryId: number
  Subcategory: ISubcategory
  comment: string
  createdAt?: Date
  updatedAt?: Date
  
  setRelease(release: IRelease) {
    this.releaseId = release.releaseId
    this.value = release.value
    this.date = release.date
    this.comment = release.comment
  } 

  setSubcategory(subcategory: ISubcategory) {
    this.Subcategory = subcategory
  }


}
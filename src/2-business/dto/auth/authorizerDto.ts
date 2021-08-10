export class AuthResponse {
  principalId!: string
  policyDocument!: PolicyDocument

  constructor (obj: Partial<AuthResponse>) {
    Object.assign(this, obj)
  }
}

export class PolicyDocument {
  Version!: string
  Statement!: Statement[]

  constructor (obj: Partial<PolicyDocument>) {
    Object.assign(this, obj)
  }
}

export class Statement {
  Action!: string
  Effect!: string
  Resource!: string

  constructor (obj: Partial<Statement>) {
    Object.assign(this, obj)
  }
}

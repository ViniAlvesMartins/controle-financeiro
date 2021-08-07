// eslint-disable-next-line @typescript-eslint/ban-types
export type ExactlySameKeys<T extends {}> = { [key in keyof T]-?: any }
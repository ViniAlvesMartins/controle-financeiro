import { Console } from 'console'
import { Sequelize } from 'sequelize'
import Container from 'typedi'

export default async function init (): Promise<void> {
  const sequelize = new Sequelize(
    process.env.DATABASE || 'financeiro',
    process.env.DATABASE_USER || 'admin',
    process.env.DATABASE_PASSWORD || 'financeiro',{
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    port: Number(process.env.DATABASE_PORT) || 33306,
    pool: {
      max: 5,
      min: 1
    }
  })
  
  Container.set({ id: Sequelize, value: sequelize })                                
  const teste = Container.getMany('models')

  // console.log('TESTE')
  // console.log(teste[0])
}


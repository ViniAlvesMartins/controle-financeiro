import { Sequelize } from 'sequelize'
import * as mysql from 'mysql2/promise'
import Container from 'typedi'

export default async function init (): Promise<void> {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 33306,
    user: process.env.DATABASE_USER || 'admin',
    password: process.env.DATABASE_PASSWORD || 'financeiro'
  })

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE || 'financeiro'}`)

  const sequelize = new Sequelize(
    process.env.DATABASE || 'financeiro',
    process.env.DATABASE_USER || 'admin',
    process.env.DATABASE_PASSWORD || 'financeiro',{
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    port: Number(process.env.DATABASE_PORT) || 33306,
    pool: {
      max: 10,
      min: 1
    }
  })

  Container.set({ id: Sequelize, value: sequelize })                                
  Container.getMany('models')
  await sequelize.sync()
}

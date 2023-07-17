import {Request, Response}  from 'express'
import { db } from '../knex';

export const getAllUsers =  async (req: Request, res: Response) => {
    try {
        const result = await db.select('*').from('users')
        res.status(200).send(result) 
    } catch (error:any) {
        console.log(error)
        res.status(500).send("Algum erro inusitado aconteceu.").send(error.message)
    }
};
import {Request, Response}  from 'express'
import { db } from '../knex';
import { TUsers } from '../../types';

export const createUser = async (req: Request, res: Response) => {
    try {
        const {id, name, email, password, createdAt} = req.body
        const newUser:TUsers = {
            id,
            name,
            email,
            password,
            createdAt
        }
        if (newUser.id!==undefined){
            if(newUser.id && newUser.id[0]!=="u"){
                res.status(400);
                throw new Error('"ID" inválido. Deve iniciar com a letra "u"');
            }
        }
        if (newUser.name!==undefined){
            if (typeof(newUser.name)!=="string"){
                res.status(400)
                throw new Error ("O nome de usuário deve ser composto apenas por letras.")
            }
        }
        if (newUser.email!==undefined){
            if (typeof(newUser.email)!=="string"){
                res.status(400)
                throw new Error ("O email deve ser string.")
            }
        }
        if (newUser.password!==undefined){
            if (typeof(newUser.password)!=="string"){
                res.status(400)
                throw new Error ("A senha deve ser composto apenas por letras.")
            }
        }
        const result= await db('users').insert(newUser);
        console.table(result)
        res.status(201).send('Usuário cadastrado com sucesso!')
    } catch (error) {
        console.log(error)
        res.status(500).send("Algum erro inusitado aconteceu.")
    }
}
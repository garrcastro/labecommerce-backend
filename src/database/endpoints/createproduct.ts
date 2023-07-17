import {Request, Response}  from 'express'
import { db } from '../knex';
import { TProducts } from '../../types';

export const createProduct =  async (req: Request, res: Response) => {
    try {
        const {id, name, price, description, image_url} = req.body
        const newProduct:TProducts = {
            id,
            name,
            price,
            description,
            image_url
        }
        if (newProduct.id!==undefined){
            if(newProduct.id && newProduct.id[0]!=="p" && newProduct.id[1]!=="r" && newProduct.id[2]!=="o" && newProduct.id[3]!=="d"){
                res.status(400);
                throw new Error('"ID" inválido. Deve iniciar com o termo "prod"');
            }
        }
        if (newProduct.name!==undefined){
            if (typeof(newProduct.name)!=="string"){
                res.status(400)
                throw new Error ("O nome do produto deve ser composto apenas por letras.")
            }
        }
        if (newProduct.price!==undefined){
            if (typeof(newProduct.price)!=="number"){
                res.status(422)
                throw new Error ("O valor de Price deve ser numérico.")
            }
            if(newProduct.price<0){
                res.status(400)
                throw new Error ("O valor de Price deve ser maior que zero.")
            }
        }
        const result= await db('products').insert(newProduct)
        res.status(201).send('Produto cadastrado com sucesso!')
        console.table(result)
    } catch (error) {
        console.log(error)
        res.status(500).send("Algum erro inusitado aconteceu.")
    }
}
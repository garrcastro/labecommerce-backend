import {Request, Response}  from 'express'
import { db } from '../knex';

export const getAllProducts =  async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string
        if(name && name.length<1){
            res.status(400)
            throw new Error ("O nome do produto deve ter mais que uma letra.")
        } 
        let query = db.select("*").from('products');
        if(name){
            query = query.whereRaw('LOWER(name) LIKE ?', [`%${name.toLowerCase()}%`]);
        }
        const products = await query
        if (products.length === 0 && name) {
            const allProducts = await db.select('*').from('products');
            res.status(200).send(allProducts);
        }else{
            res.status(200).send(products)
        }    
    } catch (error) {
        console.log(error)
        res.status(500).send("Algum erro inusitado aconteceu.")
    }
}
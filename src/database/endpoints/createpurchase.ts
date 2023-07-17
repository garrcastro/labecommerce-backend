import {Request, Response}  from 'express'
import { db } from '../knex';

export const createPurchase =  async (req: Request, res: Response) => {
    try {
        const purchase = req.body;
        if (!purchase.id || !purchase.buyer || !purchase.products) {
        res.status(400).send("Informações incompletas do pedido.");
        return;
        }
        const total_price = purchase.total_price || 0;
        const existingPurchase = await db('purchases').where('id', purchase.id).first();
        if (existingPurchase) {
        res.status(400).send("Já existe um pedido com este ID.");
        return;
        }
        await db.transaction(async (trx) => {
        await trx('purchases').insert({
            id: purchase.id,
            buyer: purchase.buyer,
            total_price: total_price,
            created_at: new Date().toISOString()
        });
        const orderProducts = purchase.products.map((product: { id: string, quantity: number }) => {
          return {
            purchase_id: purchase.id,
            product_id: product.id,
            quantity: product.quantity
          };
        });
        await trx('purchases_products').insert(orderProducts);
        });      
        res.status(201).send("Pedido realizado com sucesso!");
    } catch (error) {
        console.log(error)
        res.status(500).send("Algum erro inusitado aconteceu.");
    }
  };
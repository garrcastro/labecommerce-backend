import {Request, Response}  from 'express'
import { db } from '../knex';

export const getPurchaseById =  async (req: Request, res: Response) => {
    try {
        const purchaseId = req.params.id;
        if (!purchaseId) {
        res.status(400).send("ID da compra não fornecido.");
        return;
        }
        const purchase = await db('purchases').where('id', purchaseId).first();
        if (!purchase) {
        res.status(404).send("Compra não encontrada.");
        return;
        }
        const products = await db('products')
        .join('purchases_products', 'products.id', 'purchases_products.product_id')
        .where('purchases_products.purchase_id', purchaseId)
        .select('products.*', 'purchases_products.quantity');
        const total_price = products.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
        const purchaseWithProducts = {
            id: purchase.id,
            buyer: purchase.buyer,
            total_price: total_price,
            created_at: purchase.created_at,
            products: products
        };
        res.status(200).send(purchaseWithProducts);
    } catch (error) {
        console.log(error);
        res.status(500).send("Algum erro inusitado aconteceu.");
    }
  };
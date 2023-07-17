import {Request, Response}  from 'express'
import { db } from '../knex';

export const deletePurchaseById =  async (req: Request, res: Response) => {
    const purchaseId = req.params.id
    try {
        const existingPurchase = await db('purchases').where('id', purchaseId).first();
        if (!existingPurchase){
            res.status(404).send("Compra não encontrada.")
            return
        }
    await db('purchases').where('id', purchaseId).del();
    res.status(200).send("Pedido cancelado com sucesso.")
    } catch (error) {
        console.log(error);
        res.status(500).send("Algum erro inusitado aconteceu.")
    }
}
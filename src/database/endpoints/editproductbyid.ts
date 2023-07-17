import {Request, Response}  from 'express'
import { db } from '../knex';

export const editProductById =  async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { newId, newName, newPrice, newDescription, newImageUrl } = req.body;
    try {
        const product = await db('products').where('id', productId).first();
        if (!product) {
        res.status(404).send("Produto não encontrado.")
        return
        }
        const updatedProduct = {
            id: newId || product.id,
            name: newName || product.name,
            price: newPrice !== undefined ? newPrice : product.price,
            description: newDescription || product.description,
            image_url: newImageUrl || product.image_url
        }
    await db('products').where('id', productId).update(updatedProduct);
        res.status(200).send("Produto atualizado com sucesso.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Algum erro inusitado aconteceu.");
    }
}
  
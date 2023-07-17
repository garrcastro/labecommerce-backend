import  express, {Request, Response}  from 'express'
import cors from 'cors' 
import { db } from './database/knex';
import { getAllUsers } from './database/endpoints/getallusers';
import { getAllProducts } from './database/endpoints/getallproducts';
import { createUser } from './database/endpoints/createuser';
import { createProduct } from './database/endpoints/createproduct';
import { editProductById } from './database/endpoints/editproductbyid';
import { createPurchase } from './database/endpoints/createpurchase';
import { deletePurchaseById } from './database/endpoints/deletepurchasebyid';
import { getPurchaseById } from './database/endpoints/getpurchasebyid';

const app = express();

app.use(express.json());
app.use(cors())
app.listen(3003, ()=>{
    console.log('Servidor rodando na porta 3003.')
});


//Endpoint de 'Get All Users'

app.get('/users', getAllUsers);

//Endpoint de 'Create User'

app.post('/users', createUser);

//Endpoint de 'Create Product'

app.post('/products', createProduct);

//Endpoint de 'Get All Products/Search Products'

app.get('/products', getAllProducts);

/* //Endpoint de 'Delete User by Id'

app.delete('/users/:id', async (req:Request, res: Response) => {
    try {
        const id = req.params.id
        if(id && id[0]!=="u"){
            res.status(400);
            throw new Error('"ID" inválido. Deve iniciar com a letra "u"');
        }
        const userIndex = await db('users').where('id', id).first();
        if(userIndex<0){
            res.statusCode=404
            throw new Error('Conta não encontrada! Verifique "ID".')
        }
        await db('users').where('id', id).del()
        res.status(200).send("User apagado com sucesso")
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Algum erro inusitado aconteceu.")
    }
}) */

/* //Endpoint de 'Delete Product by Id'

app.delete('/products/:id', async (req:Request, res: Response) => {
    try {
        const id = req.params.id
        if(id && id[0]!=="p" && id[1]!=="r" && id[2]!=="o" && id[3]!=="d"){
            res.status(400);
            throw new Error('"ID" inválido. Deve iniciar com o termo "prod"');
        }
        const productIndex = await db('products').where('id', id).first();
        if(!productIndex){
            res.statusCode=404
            throw new Error('Produto não encontrado! Verifique "ID".')
        }
        await db('products').where('id', id).del();
        res.status(200).send("Produto apagado com sucesso")
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Algum erro inusitado aconteceu.");
    }
}) */

//Endpoint de 'Edit Product by Id'

app.put('/products/:id', editProductById);

//Endpoint de 'Create Purchase'

app.post('/purchases', createPurchase);

//Endpoint de 'Delete Purchase by ID'

app.delete('/purchases/:id', deletePurchaseById);

//Endpoint de 'Get Purchase by ID'

app.get('/purchases/:id', getPurchaseById);
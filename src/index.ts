import {users, products, createUser, getAllUsers, searchProductsByName} from './database'
import  express, {Request, Response}  from 'express'
import cors from 'cors' 
import { TUsers } from './types';
import { TProducts } from './types';

const app = express();

app.use(express.json());
app.use(cors())
app.listen(3003, ()=>{
    console.log('Servidor rodando na porta 3003.')
});


//Endpoint de 'Get All Users'
app.get('/users',(req: Request, res: Response) => {
    try {
        res.status(200).send(users)
        
    } catch (error) {
        res.status(500).send("Algum erro inusitado aconteceu.")
    }
})

//Endpoint de 'Get All Products/Search Products'

app.get('/products', (req: Request, res: Response) => {
    try {
        const name = req.query.name as string
        if(name.length<1){
            res.status(400)
            throw new Error ("O nome do produto deve ter mais que uma letra.")
        }
        if(name){
            const productsByName = products.filter((product)=>{
                return product.name.toLowerCase().includes(name.toLowerCase())
            })
            res.status(200).send(productsByName)
        }else{
            res.status(200).send(products)
        }
        
    } catch (error) {
        res.status(500).send("Algum erro inusitado aconteceu.")
    }
})

//Endpoint de 'Create User'
app.post('/users', (req: Request, res: Response) => {
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
            /* if (newUser.id===){
                res.status(400)
                throw new Error ("Já existe um usuário com este ID.")
            } */
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
            /* if (newUser.email===){
                res.status(400)
                throw new Error ("Este email já está cadastrado.")
            } */
        }
        if (newUser.password!==undefined){
            if (typeof(newUser.password)!=="string"){
                res.status(400)
                throw new Error ("A senha deve ser composto apenas por letras.")
            }
        }
        
        users.push(newUser)
        res.status(201).send('Usuário cadastrado com sucesso!')
        console.table(users)
        
    } catch (error) {
        res.status(500).send("Algum erro inusitado aconteceu.")
    }
})

//Endpoint de 'Create Product'
app.post('/products', (req: Request, res: Response) => {
    try {
        const {id, name, price, description, imageUrl} = req.body
        const newProduct:TProducts = {
            id,
            name,
            price,
            description,
            imageUrl
        }
        if (newProduct.id!==undefined){
            if(newProduct.id && newProduct.id[0]!=="p" && newProduct.id[1]!=="r" && newProduct.id[2]!=="o" && newProduct.id[3]!=="d"){
                res.status(400);
                throw new Error('"ID" inválido. Deve iniciar com o termo "prod"');
            }
            /* if (newProduct.id===){
                res.status(400)
                throw new Error ("Já existe um produto com este ID.")
            } */
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
        products.push(newProduct)
        res.status(201).send('Produto cadastrado com sucesso!')
        console.table(products)
    } catch (error) {
        res.status(500).send("Algum erro inusitado aconteceu.")
    }
})

//Endpoint de 'Delete User by Id'

app.delete('/users/:id', (req:Request, res: Response) => {
    const id = req.params.id
    if(id && id[0]!=="u"){
        res.status(400);
        throw new Error('"ID" inválido. Deve iniciar com a letra "u"');
    }
    const userIndex = users.findIndex((user) => user.id === id)
    if(userIndex<0){
        res.statusCode=404
        throw new Error('Conta não encontrada! Verifique "ID".')
    }
    users.splice(userIndex, 1)   
    res.status(200).send("User apagado com sucesso")
})

//Endpoint de 'Delete Product by Id'

app.delete('/products/:id', (req:Request, res: Response) => {
    const id = req.params.id
    if(id && id[0]!=="p" && id[1]!=="r" && id[2]!=="o" && id[3]!=="d"){
        res.status(400);
        throw new Error('"ID" inválido. Deve iniciar com o termo "prod"');
    }
    const productIndex = products.findIndex((product) => product.id === id)
    if(productIndex<0){
        res.statusCode=404
        throw new Error('Produto não encontrado! Verifique "ID".')
    }
    products.splice(productIndex, 1)   
    res.status(200).send("Produto apagado com sucesso")
})

//Endpoint de 'Edit Product by Id'
app.put('/products/:id', (req: Request, res: Response) => {
    const newId = req.params.id
    const newName = req.params.name
    const newPrice = req.params.price
    const newDescription = req.params.description
    const newImageUrl = req.params.imageUrl

    if (newId!==undefined){
        if(newId && newId[0]!=="p" && newId[1]!=="r" && newId[2]!=="o" && newId[3]!=="d"){
            res.status(400);
            throw new Error('"ID" inválido. Deve iniciar com o termo "prod"');
        }
    }
    if (newName!==undefined){
        if (typeof(newName)!=="string"){
            res.status(400)
            throw new Error ("O novo nome deve ser string.")
        }
        if(newName.length<2){
            res.status(400)
            throw new Error ("O novo nome deve ser maior que duas letras.")
        }
    }
    if (newPrice!==undefined){
        if (typeof(newPrice)!=="number"){
            res.status(422)
            throw new Error ("O valor de Price deve ser numérico.")
        }
        if(newPrice<0){
            res.status(400)
            throw new Error ("O valor de Price deve ser maior que zero.")
        }
    }


    const product = products.find((product) => product.id === id) 
        if (product) {
            product.id = newId || product.id
            product.name = newName || product.name
            product.price = newPrice>0 ? newPrice : product.price
            product.description = newDescription || product.description
            product.imageUrl = newImageUrl || product.imageUrl
        }
    
        res.status(200).send("Produto atualizado com sucesso")
})




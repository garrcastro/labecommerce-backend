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

//Endpoint de teste 'ping pong'
app.get('/ping',(req: Request, res: Response) =>{
    res.status(200).send('Pong!')
})

//Endpoint de 'Get All Users'
app.get('/users',(req: Request, res: Response) => {
    res.status(200).send(users)
})

//Endpoint de 'Get All Products/Search Products'
/* app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
}) */
app.get('/products', (req: Request, res: Response) => {
    const name = req.query.name as string
    if(name){
        const productsByName = products.filter((product)=>{
            return product.name.toLowerCase().includes(name.toLowerCase())
        })
        res.status(200).send(productsByName)
    }else{
        res.status(200).send(products)
    }
})

//Endpoint de 'Create User'
app.post('/users', (req: Request, res: Response) => {
    const {id, name, email, password, createdAt} = req.body
    const newUser:TUsers = {
        id,
        name,
        email,
        password,
        createdAt
    }
    users.push(newUser)
    res.status(201).send('Usuário cadastrado com sucesso!')
    console.table(users)
})

//Endpoint de 'Create Product'
app.post('/products', (req: Request, res: Response) => {
    const {id, name, price, description, imageUrl} = req.body
    const newProduct:TProducts = {
        id,
        name,
        price,
        description,
        imageUrl
    }
    products.push(newProduct)
    res.status(201).send('Produto cadastrado com sucesso!')
    console.table(products)
})
//console.log('funciona')


//console.log(products)

//createUser('001','Gabriel','garrcastro@gmail.com','1234')

//getAllUsers()



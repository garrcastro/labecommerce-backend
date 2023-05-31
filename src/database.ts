import { TUsers, TProducts } from "./types"

export const users:TUsers[] = [
    {
        id:'u001',
        name:'Fulano',
        email:'fulano@email.com',
        password: 'fulano123',
        createdAt:new Date().toISOString()
    }
    ,{
        id:'u002',
        name:'Beltrana',
        email:'beltrana@email.com',
        password: 'beltrana000',
        createdAt:new Date().toISOString()    
    }
]

export const products:TProducts[] = [
    {
        id:'prod001',
        name:'Mouse gamer',
        price:250,
        description:'Melhor mouse do mercado!',
        imageUrl:'https://picsum.photos/seed/Mouse%20gamer/400'
    },
    {
        id:'prod002',
        name:'Monitor',
        price:900,
        description:'Monitor LED Full HD 24 polegadas',
        imageUrl:'https://picsum.photos/seed/Monitor/400'
    }
]

export function createUser(id:string, name:string, email:string, password:string ):TUsers[]{
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString() 
    }
    users.push(newUser)
    console.log('Cadastro realizado com sucesso')
    return users
}

export function getAllUsers(){
    console.log(users)
}

export function createProduct(id:string, name:string, price:number, description:string, imageUrl:string ):TProducts[]{
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl 
    }
    products.push(newProduct)
    console.log('Lista atualizada de products.')
    return products
}

export function searchProductsByName(name:string):TProducts[]{
    return products.filter(
        (product)=>{
            return product.name.toLowerCase() === name.toLowerCase()
        })
}
const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3001
const users = []

const checkUser = (request, response, next) =>{

    const {id}= request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({message: "User Not Found"})
        
    }

    request.userIndex = index
    request.userId = id

    next()

}

const checkUrl = (request, response, next) =>{

    const method = request.route.methods
    const url = request.route.path
    console.log(method, url)

    next()

}

app.get('/order/', checkUrl,(request, response) =>{

        return response.json(users)
})

app.get('/order/:id', checkUser, checkUrl,(request, response) =>{

    
    const index = request.userIndex
    const id = request.userId


   users[index, id]

    
    return response.json(users)
})

app.post('/order/', checkUrl, (request, response) =>{

    const {name, age,pedidos} = request.body

    const user = {id: uuid.v4(), name, age, pedidos}

    users.push(user)

    
    return response.status(201).json(users)
})

app.put('/order/:id', checkUser, checkUrl, (request, response) =>{

    const {order, clientName, price, status} = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUsers = {id, order,clientName, price, status}

   users[index] = updateUsers

    
    return response.json(updateUsers)
})

app.delete('/order/:id', checkUser, checkUrl, (request, response) =>{

    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json(users)
})

app.patch('/order/:id', checkUser, checkUrl, (request, response) =>{
    const index = request.userIndex
        
   

   users[index].status = "Pronto"

    return response.json(users[index])
})

app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})
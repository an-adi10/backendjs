



// npm init-> initialised repository to run js
// npm install express -> to install express library
// some more packages also gets intalled b'coz express depends on those
// npm install nodemon to automate the run of index.js whenever there is a change in index file

// import express from 'express';
const express = require('express');
// importing express

const app = express();
// created a server to receive request, running api

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//use is a middleware 
// first line is telling that we are expecting a json data
// second line tells that url can have json encoded in it
// middleware fn that runs after receiving request and before running the api 

// we can give our fn definition as we want in middleware
// app.use(()=>{
//    console.log(this is middleware)
// })

app.get('/', (req, res) => {
    res.send('welcome to our api')
})
// creating api
// req-> to receive data request fron frontend
// res->response from backend
// send() method is used to send response

app.get('/profile/:id/:name', (req, res) => {
    console.log(req.params.id, req.params.name)
    console.log('api runned successfully')
    res.send('api runned successfully')
})
// api defined using params to receive data from front end
// it is mandatory to pass params in the order and no. that they are defined
// it is written using /: 
// // "kill -9 $(lsof -ti:3000,3001) && npm start

app.get('/order', (req, res) => {
    console.log(req.query);
    console.log('order placed successfully')
    res.send('api runned successfully')
})

app.get('/payment', (req, res) => {
    console.log(req.query);
    console.log('payment received successfully')
})

app.post('/payment', (req, res) => {
    console.log(req.query);
    console.log(req.query + 'payment received successfully')
    res.send('api runned successfully')
})
// there can be more than one apis with same name but different api methods 

let users = [
    {
        userId: 1,
        name: "Karl",
    }
]
let nextUserId = 2
// read api -> reads data from the db
app.get('/users', (req, res) => {
    res.send(users)
    console.log("hello")
})

app.post('/users', (req, res) => {
    let name = req.body.name
    let user = {
        userId: nextUserId,
        name: name
    }
    users.push(user)
    res.send("data added in api using post method")
    nextUserId++
})

app.patch('/users', (req, res) => {
    let { userId, name } = req.body
    users.map(user => {
        if (user.userId === userId) {
            user.name = name
        }
        return user
    })
    res.send("api updated using patch method")
})

app.put('/users', (req, res) => {
    let { userId, name } = req.body
    let isUpdated = false
    users.map(user => {
        if (user.userId === userId) {
            user.name = name
            isUpdated = true
        }
        return user
    })
    if (isUpdated) {
       return  res.send("api updated using put method")
    }
    else {
        let user = {
            // if we are giving nextUserId to userId every previous data is deleted and again it starts from 2
            userId:nextUserId, 
            name,
        }
        users.push(user)
        res.send("data added in api using post method")
        nextUserId++

    }

})

app.delete('/users', (req, res) => {
    const id = req.body.userId
    users = users.filter(user=>{
        user.userId !== id
    })
    res.send("user deleted successfully")
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})
// listening the server using listen method on a particular port(here 3000)
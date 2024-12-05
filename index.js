const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())



let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/info', (request, response) => {
    const amount = persons.length

    response.send(`<p>Phonebook has info for ${amount} people</p><p>${new Date().toString()}</p>`)


})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {

    let {name, number} =  request.body

    if(name == null || number == null){
      response.status(403).send("need both name and number")
      return
    }

    if(persons.map(person => person.name).includes(name)){
      response.status(403).send("name is already taken")
      return
    }

    let newPerson = {'id':`${ Math.round(Math.random()*100000)}`,"name": name,"number": number}

    persons.push(newPerson)

    console.log(persons)

})



app.get('/api/persons/:id', (request, response) => {
    const id =  request.params.id

    persons.forEach(person => {
        if(person.id === id){
            response.json(person).status(201)
            return;
        }
    })

    response.status(404).end()
 })

app.delete('/api/persons/:id', (request, response) => {
    const id =  request.params.id

    persons = persons.filter((val,ind,arr) =>{
        if(val.id === id){
            response.status(200).end()
            return false
        }
        return true;
    }
    )
    console.log(persons)

    response.status(404).end()
 })
  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


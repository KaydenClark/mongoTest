const express = require('express')
const cors = require('cors')
const app = express()
const {
    testConnection
} = require('./app.js')
const {
    createContact
} = require('./app.js')
const {
    readContacts
} = require('./app.js')
const {
    updateContact
} = require('./app.js')
const {
    deleteContact
} = require('./app.js')

const port = process.env.PORT || 5000

// The "Database"

app.use(express.json())
app.use(cors())

let getContacts = async () => {
    let contacts = await readContacts()
    return contacts
}

app.get('/', async (req, res) => {
    let read = await readContacts()
    res.send(read)
})

app.post('/', async (req, res) => {
    const newContact = req.body
    const contact = await createContact(newContact)
    res.send(contact)
})

app.put('/', async (req, res) => {
    let newinfo = req.body
    let updatedContact = await updateContact(newinfo._id, newinfo)
    res.send(updatedContact)
})

app.patch('/', (req, res) => {
    res.send()
})

app.delete('/', (req, res) => {
    res.send()
})


// req.body Parsing
// Validate the input
// Push the input into the "Database"
// Send a Response
// app.post('/', (req, res) => {
//     const contact = req.body
//     contacts.push(contact)
//     res.send(contact)
// })

// app.put('/:id', (req, res) => {
//     const updatedContact = req.body
//     contacts.forEach((contact, index) => {
//         if(contact.id == req.params.id){
//             updatedContact.id = parseInt(req.params.id)
//             contacts[index] = updatedContact
//         }
//     })
//     res.send(updatedContact)
// })

// app.patch('//:id', (req, res) => {
//     let result = 'Nothing was Updated'
//     contacts.forEach((contact, index) => {
//         if(contact.id == req.params.id){
// String Array of Request Body Properties Names
// const bodyKeys = Object.keys(req.body)
// bodyKeys.forEach(propName => {
// Computed Property Names
//                 contacts[index][propName] = req.body[propName]
//                 result = contacts[index]
//             })
//         }
//     })
//     res.send(result)
// })

// app.delete('/:id', (req, res) => {
//     const updatedContacts = contacts.filter((contact) => contact.id != req.params.id)
//     contacts = updatedContacts
//     res.send(`Deleted Contact with ID ${req.params.id}`)
// })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
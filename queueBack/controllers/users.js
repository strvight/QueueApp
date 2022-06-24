const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!(username && password)) {
      return response.status(400).json({
          error: 'username and password must be given'
      })
  }

  if (username.length <= 3) {
      return response.status(400).json({
          error: 'username must be longer than 3 characters'
      })
  }

  if (password.length <= 3) {
      return response.status(400).json({
          error: 'password must be longer than 3 characters'
      })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('queues', { name: 1, date: 1, queue: 1 })

  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('queues', { name: 1, date: 1, queue: 1 })

  response.json(user)
})

module.exports = usersRouter
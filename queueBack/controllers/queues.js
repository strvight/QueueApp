const queuesRouter = require('express').Router()
const Queue = require('../models/queue')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

queuesRouter.get('/', async (request, response) => {
    const queues = await Queue.find({}).populate('user', {username: 1, name: 1})
    response.json(queues)
})

queuesRouter.get('/:id', async (request, response) => {
    const queue = await Queue.findById(request.params.id)
    response.json(queue)
})

queuesRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const queue = new Queue({
        name: body.name,
        description: body.description,
        date: new Date(),
        queue: body.queue,
        user: user._id
    })

    const savedQueue = await queue.save()

    user.queues = user.queues.concat(savedQueue._id)
    await user.save()

    response.status(201).json(savedQueue)
})

module.exports = queuesRouter
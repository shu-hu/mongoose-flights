import { Destination } from '../models/destination.js'

export {
    newDestination as new,
    create,
}

function create(req, res) {
    // let birthDate = new Date(req.body.born)
    // req.body.born = birthDate.toUTCString()
    if (err) {
        return res.render()
    }
    Destination.create(req.body, function (err, destination) {
        res.redirect('/destinations/new')
    })
}

function newDestination(req, res) {
    Destination.find({}, function (err, destinations) {
        res.render('destinations/new', {
            title: 'Add Destination',
            destinations: destinations,
        })
    })
}
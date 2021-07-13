import { Flight } from '../models/flight.js'
import { Destination } from '../models/destination.js'

export {
    newFlight as new,
    create,
    index,
    show,
    createTicket,
    addToDestinations,
}

function addToDestinations(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.destinations.push(req.body.destinationId)
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`)
        })
    })
}

function createTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.tickets.push(req.body)
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`)
        })
    })
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render("flights/index", {
            err: err,
            flights: flights,
            title: "All Flights",
        })
    })
}

function newFlight(req, res) {
    res.render('flights/new', {
        title: "Add Flight",
    })
}

function show(req, res) {
    Flight.findById(req.params.id)
    .populate('destinations')
    .exec(function(err, flight) {
        Destination.find({_id: {$nin: flight.destinations}}, function(err, destinations) {
            res.render('flights/show', {
                title: 'Flight Detail', 
                flight: flight,
                destinations: destinations,
                err: err,
            })
        })
    })
}
// function show(req, res) {
//     Flight.findById(req.params.id, function (err, flight) {
//         res.render('flights/show', { 
//             title: 'Flight Detail', 
//             flight: flight,
//             err: err,
//         })
//     })
// }

function create(req, res) {
    if (req.body.cast) {
        req.body.cast = req.body.cast.replace(", ", ",")
        req.body.cast = req.body.cast.split(",")
    }
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    const flight = new Flight(req.body)
    flight.save(function(err) {
        if (err) return res.redirect('/flights/new')
        res.redirect(`/flights/${flight._id}`);
    })
}

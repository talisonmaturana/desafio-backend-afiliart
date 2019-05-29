const User = require('../../models/user');
const mongoose = require('mongoose');

module.exports = routes => {

    routes.get('/', (req, res) => {
        res.send('Ok');
    })

    routes.get('/users', (req, res) => {
        User.find()
            .exec()
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error });
            });
    });

    routes.get('/users/:userId', (req, res) => {
        User.findById(req.params.userId)
            .exec()
            .then(doc => {
                console.log("From database ", doc);
                if (doc)
                    res.status(200).json(doc);
                else
                    res.status(404).json({ message: 'No valid entry found for provided ID.' });
            })
            .catch(error => {
                console.log(err);
                res.status(500).send({ error });
            });
    });

    routes.put('/users/:userId/', (req, res) => {
        const id = req.params.userId;
        User.update({ _id: id }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        }, { multi: true })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error });
            });
    });

    routes.delete('/users/:userId', (req, res) => {

        const id = req.params.userId;
        User.deleteOne({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error });
            });
    });

    routes.post('/users', (req, res) => {
        const users = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        users.save()
            .then(result => {
                console.log('User has been saved.');
                console.log('result');
                res.status(201).json({
                    message: 'Handling POST request to /users',
                    createdUser: result
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error });
            });
    });
}
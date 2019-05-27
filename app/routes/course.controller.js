var Course = require('../../models/course');
const mongoose = require('mongoose');

module.exports = routes => {

    routes.get('/', (req, res) => {
        res.send('OK');
    });

    routes.post('/courses', (req, res) => {
        const course = new Course({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            category: req.body.category,
            img: req.body.img,
            link: req.body.link,
            price: req.body.price,
            description: req.body.description
        });

        course.save()
            .then(result => {
                console.log('Client has been saved.');
                console.log('result');
                res.status(201).json({
                    message: 'Handling POST request to /courses',
                    createdCourse: result
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error });
            });
    });

    routes.get('/courses', (req, res) => {
        Course.find()
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

    routes.put('/courses/:courseId', (req, res) => {
        const id = req.params.courseId;
        Course.update({ _id: id }, {
            $set: {
                name: req.body.name,
                category: req.body.category,
                img: req.body.img,
                link: req.body.link,
                price: req.body.price,
                description: req.body.description
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

    routes.delete('/courses/:courseId', (req, res) => {
        const id = req.params.courseId;
        Course.deleteOne({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error });
            });
    });
}
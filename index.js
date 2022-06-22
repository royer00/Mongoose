const mongoose = require('mongoose')
const Campsite = require('./models/campsite')

const url = 'mongodb://localhost:27017/nucampsite'
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

connect.then(() => {
    console.log('Connected correctly to the server')
    //Using Constructor to instantiate
    // const newCampsite = new Campsite({
    //     name: 'React Lake Campground',
    //     description: 'test'
    // })

    //Using create()  --automatically saves the document
    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    })
    //newCampsite.save()
    .then(campsite => {
        console.log(campsite)

        return Campsite.findByIdAndUpdate(campsite._id, 
        {
            $set: {description: 'Updated Test Document'}
        }, 
        {
            new: true//returns updated document rather than original
        }
        )
    })
    .then(campsite => {
        console.log(campsite)

        campsite.comments.push({
            rating: 5,
            text: 'What a magnificent view!',
            author: 'Tinus Lorvaldes'
        })

        return campsite.save()

    })
    .then(campsite => {
        console.log(campsite);
        return Campsite.deleteMany()
    })
    .then(() => {
        return mongoose.connection.close()
    })
    .catch(err => {
        console.log(err)
        mongoose.connection.close()
    })
})
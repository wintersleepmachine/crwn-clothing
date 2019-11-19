const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path')

if(process.env.NODE_ENV !== 'production')require('dotenv').config() //This loads the dotenv into our process enviroment. Which allows our process.env to access the secret key. 

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express() //instantiates new express application
const port = process.env.PORT || 5000 //When deployed to heroku it sets up the process PORT for you.

app.use(bodyParser.json()) //Parses the incoming data to json so we dont have too
app.use(bodyParser.urlencoded({extended: true})) //urlencoded ensures the url strings we get in and pass out do not contain spaces or symbols, if they do they get processed.

app.use(cors())//Cross origin requests: Allows us to make requests to our back end server.

if(process.env.NODE_ENV === 'production'){
    //express.static is a middleware function, it allows us to serve a certain file inside the path we give it.
    //__dirname is the current directory we are currently in and we are pointing to client/build
    // client/build is a folder that will be created when we run build script.
    app.use(express.static(path.join(__dirname, 'client/build'))) 

    //* meanas for any url that the user hits execute this function and send this response.
    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, error => {
    if(error)throw error;

    console.log('Server running on port' + port)
})

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).send({error: stripeErr})
        }else {
            res.status(200).send({success: stripeRes})
        }
    })




})
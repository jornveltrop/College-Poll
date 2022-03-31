// Requires
const { Console } = require('console');
const express = require('express');
const hbs  = require('express-handlebars');
const handlebars = hbs.engine;
require('dotenv').config()

//Variabelen
const app = express();
const port = process.env.PORT;

//BodyParser
app.use(express.urlencoded({ extended: false }));

// Aangeven waar onze statishce files zich bevinden  
app.use(express.static('static'));

// Templating engine
app.engine('hbs', handlebars({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');


//Routing
app.get('/', (req, res) => {
    let questionData = req.body
    let questions = setQuestions(questionData)
    res.render('home', {questions})
});

app.post('/', (req, res) => {
    let questionData = req.body
    let questions = setQuestions(questionData)
    // console.log(questions)
    res.render('home', {questions})
});

app.get('/resultaten', (req, res) => {
    let voteData = req.body
    let voteResults = setResults(voteData)
    // console.log(voteResults)
    res.render('results', {voteResults})
});

app.post('/resultaten', (req, res) => {
    let voteData = req.body
    let voteResults = setResults(voteData)
    // console.log(voteResults)
    res.render('results', {voteResults})
});

app.get('/admin', (req, res) => {
    res.render('admin')
});

// Set server
app.listen(port, () => {
    console.log(`Gebruikte poort:${port}!`)
});


function setResults (voteData) {
    Object.keys(voteData).forEach((key, i) => {
        let value = voteData[key]
        if (value == "a") {
            dataResults[i].a = dataResults[i].a + 1;
        } else if (value == "b") {
            dataResults[i].b = dataResults[i].b + 1;
        }
    });

    return dataResults;
}

function setQuestions (questionData) {
    Object.keys(questionData).forEach((key, i) => {
        let value = questionData[key]
        dataResults[i].question = value;
    });

    return dataResults;
}



let dataResults = [
    {
        id: 1,
        question: 'Vraag 1',
        a: 0,
        b: 0
    },
    {
        id: 2,
        question: 'Vraag 2',
        a: 0,
        b: 0
    },
    {
        id: 3,
        question: 'Vraag 3',
        a: 0,
        b: 0
    },
    {
        id: 4,
        question: 'Vraag 4',
        a: 0,
        b: 0
    },
    {
        id: 5,
        question: 'Vraag 5',
        a: 0,
        b: 0
    },
]
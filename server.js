const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Chalk = require('chalk');
const cors = require('cors');
const axios = require('axios');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');
let schema = require('./schema.js')
const {google} = require('googleapis')

var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const oauth2Client = new google.auth.OAuth2(
  '1006423079166-29b6l3kqc6ftv9hippa50mdegbjnoqnr.apps.googleusercontent.com',
   'mRqVsFhyo18GG0R4x7SSTVur',
  'http://localhost:8080/Callback'
)
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded())
// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  'https://www.googleapis.com/auth/books',
  "https://www.googleapis.com/auth/userinfo.email"
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});

const BooksApi = google.books({
  version: 'v1',
  auth: 'AIzaSyDYY_78p_jz153r_ROXUBTjmP7M54dCjmk'
})

app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/graphql' }));
app.use(cors());

//root resolver
let root = {
  posts: getPost
}
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use('/auth', (req, res) => {
  console.log('req', url)
 res.send(url);
})


const port = 3000;

function getPost(){
  const fs = require('fs');
  let rawdata = fs.readFileSync('./posts.json');
  let posts = JSON.parse(rawdata);
  console.log('POSTS', posts.posts);
      return posts.posts;
}

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '../dist/index.html');
});

app.get('/posts', cors(), (req, res) => {
    const fs = require('fs');
let rawdata = fs.readFileSync('posts.json');
let posts = JSON.parse(rawdata);
console.log('POSTS', posts);
    res.send(posts);
})

app.get('/getCred', cors(), (req ,res) => {
     console.log(req.body.code);
})



app.listen(port, () => console.log(`Started on ${Chalk.underline.blue(`http://localhost:${port}/`)}`))

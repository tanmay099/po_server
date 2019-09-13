const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Chalk = require('chalk');
const cors = require('cors')
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');
let schema = require('./schema.js')
// let getPost = require('./posts.js')

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


const port = 3000;

function getPost(){
  const fs = require('fs');
  let rawdata = fs.readFileSync('./posts.json');
  let posts = JSON.parse(rawdata);
  console.log('POSTS', posts.posts);
      return posts.posts;
}

app.get('/posts', (req, res) => {
    const fs = require('fs');
let rawdata = fs.readFileSync('posts.json');
let posts = JSON.parse(rawdata);
console.log('POSTS', posts);
    res.send(posts);
})



app.listen(port, () => console.log(`Started on ${Chalk.underline.blue(`http://localhost:${port}/`)}`))

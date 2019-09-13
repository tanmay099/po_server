
const getPost = () => {
    const fs = require('fs');
    let rawdata = fs.readFileSync('./posts.json');
    let posts = JSON.parse(rawdata);
    console.log('POSTS', posts);
        return posts;
}

module.exports = getPost;
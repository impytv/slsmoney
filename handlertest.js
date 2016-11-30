var handler = require('./handler.js');

handler.hello(null, null, (context, response) => {
    console.log(response);
});

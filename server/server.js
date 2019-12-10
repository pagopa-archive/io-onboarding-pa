const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();


// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(router);

server.use(jsonServer.rewriter({
    "/public-administrations?search=:searchString": "/administrations?q=:searchString"
}));


server.use((req, res, next) => {
    next()
});

// If you want to target /posts specifically
router.render = (req, res) => {
    if (req.url === '/posts') {
        res.jsonp({
            posts: res.locals.data
        })
    }
    else if (req.url === '/logout') {
        res.sendStatus(204);
    }
    else {
        res.jsonp(res.locals.data)
    }
};

server.listen(3000, () => {
    console.log('JSON Server is running')
});

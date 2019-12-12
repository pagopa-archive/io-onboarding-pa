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
    switch (req.url) {
        case "/logout":
            res.sendStatus(204);
            break;
        case "/profile":
            const profile = {
                "email": "example@email.com",
                "family_name": "Rossi",
                "given_name": "Mario",
                "fiscal_code": "RSSMRA80A01H501U",
                "role": "ORG_DELEGATE"
            };
            if (req.method === "PUT") {
                const tmpWorkMail = req.body;
                req.body = {
                    ...profile,
                    ...tmpWorkMail
                };
                console.log(req.body);
                res.jsonp({...req.body});
            }
            break;
        case "default":
            res.jsonp(res.locals.data);
            break;
    }
};

server.listen(3000, () => {
    console.log('JSON Server is running')
});

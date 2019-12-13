const jsonServer = require('json-server');
const path = require('path');
const fs  = require('fs');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.rewriter({
    "/public-administrations?search=:searchString": "/administrations?q=:searchString"
}));

server.use(router);

const updateDbFile = (key, newData) => {
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
    db[key] = newData;
    router.db.setState(db);
    let newFileData = JSON.stringify(db, null, 2);
    fs.writeFileSync(path.join(__dirname, 'db.json'), newFileData);
};

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
                res.jsonp({
                    ...profile,
                    ...req.body
                });
                updateDbFile("profile", {
                    ...profile,
                    ...req.body
                });
                break;
            }
            /* falls through */
        default:
            console.log(`Enter default case for service ${req.method} ${req.url}`);
            res.jsonp(res.locals.data);
            break;
    }
};

server.listen(3000, () => {
    console.log('JSON Server is running')
});

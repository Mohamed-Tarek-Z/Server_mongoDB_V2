var cors = require('cors');

var whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://localhost:3443', 'http://localhost:4200'];
var corsOptionsDelegate = (req, cb) => {
    let corsOptions;

    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    cb(null, corsOptions);
}

exports.corsWithOptions = cors(corsOptionsDelegate);

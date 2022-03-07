const fs = require('fs');


function logMiddleware (req,res,next) {

    fs.appendFileSync('log.txt', 'se ingreso en la pagina' + req.url+ '\n');

    next();

}

module.exports = logMiddleware;
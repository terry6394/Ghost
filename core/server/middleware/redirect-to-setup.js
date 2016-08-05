var api    = require('../api'),
    utils = require('../utils');

// Redirect to setup if no user exists
function redirectToSetup(req, res, next) {
    var isSetupRequest = req.path.match(/\/setup\//);
    var isOauthAuthorization = req.path.match(/ghost\/$/) && req.query && req.query.code;

    api.authentication.isSetup().then(function then(exists) {
        if (!exists.setup[0].status && !isSetupRequest && !isOauthAuthorization) {
            return res.redirect(utils.url.getSubdir() + '/ghost/setup/');
        }
        next();
    }).catch(function handleError(err) {
        return next(new Error(err));
    });
}

module.exports = redirectToSetup;

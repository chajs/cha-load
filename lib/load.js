var path = require('path');
var findup = require('findup-sync');
var multimatch = require('multimatch');

function arrayify(el) {
    return Array.isArray(el) ? el : [el];
}

module.exports = function (options) {
    options = options || {};

    var pattern = arrayify(options.pattern || ['task-*']);
    var replace = options.replace || 'task-';
    var config = options.config || findup('package.json');
    var scope = arrayify(options.scope || ['dependencies', 'devDependencies', 'peerDependencies']);

    if (typeof config === 'string') {
        config = require(path.resolve(config));
    }

    var names = scope.reduce(function (result, prop) {
        return result.concat(Object.keys(config[prop] || {}));
    }, []);

    var cha = require('cha');

    multimatch(names, pattern).forEach(function(pkgName){
        var taskName = pkgName.replace(replace, '');
        cha.in(taskName, require(pkgName));
    });

    return cha;
};


// Node.js download counter, with LevelDB and Express.js
// Make a directory called 'files', put your stuff in there.

var express = require('express'),
    app = express(),
    fs = require('fs'),
    leveldb = require('leveldb'),
    when = require('when'),
    db,
    filesDir;

app.get('/stats', function(req, res){
    var stats = {};
    fs.readdir(__dirname + '/files', function(err, files){
        when.all(files.map(function(file){
            var d = when.defer();
            db.get(file, function(err, val){
                if (val == null){
                    stats[file] = 0;
                }
                else {
                    stats[file] = parseInt(val, 10);
                }
                return d.resolve();
            });
            return d.promise;
        })).then(function(){
            res.json(stats);
        });
    });

});

app.get('/:filename', function(req, res){
    var filename = __dirname + '/files/' + req.params.filename;
    fs.exists(filename, function(exists){
        if (!exists){
            return res.send(404);
        }
        console.log("downloading " + req.params.filename);
        db.get(req.params.filename, function(err, val){
            if (val == null){
                val = 1;
            }
            else {
                val = parseInt(val, 10);
                val++;
            }
            db.put(req.params.filename, val.toString(), function(err){
                res.download(filename);
            });
        });
    });
});

module.exports.start = function(opts){
    leveldb.open(opts.dbName, {
        create_if_missing: true
    }, function(err, data){
        filesDir = opts.filesDir;
        db = data;
        app.listen(opts.port);
        console.log("listening on " + opts.port);
    });
});

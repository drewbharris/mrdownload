# node-dl

Static file download server and counter.

### install

    npm install node-dl

### usage

    var dl = require('node-dl');
    dl.start({
      dbName: 'downloads.db',
      filesDir: '/files',
      port: 8007
    });
    
        

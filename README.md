# mrdownload

Static file download server and counter.

### install

    npm install mrdownload

### usage

    var mrdl = require('mrdownload');
    mrdl.start({
      dbName: 'downloads.db',
      filesDir: 'files',
      port: 8007
    });
    
        

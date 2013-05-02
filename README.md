# mrdownload

Static file download server and counter.

### Install

    npm install mrdownload

### Usage

Make a directory called "files".  Put some files in there that you'd like to serve.  Run mrdownload with the command below.

Download statistics are served as JSON at /stats.  The files are accessible by filename at /:filename.

    var mrdl = require('mrdownload');
    mrdl.start({
      dbName: 'downloads.db',
      filesDir: 'files',
      port: 8007
    });
    
        

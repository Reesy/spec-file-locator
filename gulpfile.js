const gulp = require('gulp');
const mocha = require('gulp-mocha');
var SpecFileLocator = require('./SpecFileLocator/src/SpecFileLocator');
var specFileLocator = new SpecFileLocator.SpecFileLocator();
gulp.task("runLocalTest", function(done)
{
    var foundSpecFile = specFileLocator.readFileSystemForSpecFile(process.argv[4])
    gulp.src(foundSpecFile, {read: false})
        .pipe(mocha({reporter: 'nyan', exit: true}))
            .on('error', () => {});
    done();
});
const gulp = require("gulp");
const sass = require("gulp-sass");
const postCss = require("gulp-postcss");
const sourceMaps = require("gulp-sourcemaps");

/* Converts styles.scss to css, autoprefixes and minifies
 using postcss and create a sourcemap for the file
*/
gulp.task("scss", done => {
  gulp
    .src("./src/scss/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(sourceMaps.init())
    .pipe(postCss())
    .pipe(sourceMaps.write("."))
    .pipe(gulp.dest("./static/css"));
  done();
});

// Watches src/scss directory\subdirectories for changes to scss files
gulp.task("watch:scss", () => {
  const watcher = gulp.watch("./src/scss/**/*.scss", gulp.series("scss"));
  // Detect file changes and output to console
  watcher.on("change", path => {
    console.log(`File ${path} was changed.`);
  });
  // Detect if file removed and output to console
  watcher.on("unload", path => {
    console.log(`File ${path} was removed.`);
  });
});

gulp.task("default", gulp.series("scss", "watch:scss"));

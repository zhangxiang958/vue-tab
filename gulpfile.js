/**
 * learning-gulp - gulpfile.js
 * Created by mengdesen on 15/4/14.
 * Last modified by nieweidong on 2015/04/15
 */

'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');
// var Webpack = require('webpack');
var named = require('vinyl-named');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');

gulp.task('connect', function(){
	connect.server({
		root: './src',
		port: 8080,
		livereload: true
	});
});

var appList = ['app'];

gulp.task('bundle', function(){
	return gulp.src(mapFiles(appList, 'js'))
				.pipe(named())
				.pipe(webpack({
					entry: {
				        "index": "./src/app.js"
				    },
				    output: {
				    	path: __dirname + '/lib',
				        filename: "app.js",
				        chunkFilename: "[name].js",
				        publicPath:  './lib/'
				    },
					module: {
						loaders: [{
							test: /\.vue$/,
							loader: 'vue'
						}, {
        					test: /\.js$/,
        					loader: 'babel',
        					exclude: /node_modules/,
        					query: {
				                presets: ['es2015']
				            }
      					},{
							test: /\.(png|jpg)$/,
							loader: 'url'
						}]
					},
					resolve: {
    					alias: {vue: 'vue/dist/vue.js'}
  					},
  					babel: {
				    	presets: ['es2015'],
				    	plugins: ['transform-runtime']
				  	},
				  	plugins: [
    					// new Webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  					],
					watch: true
				}))
				// .pipe(uglify())
        		.pipe(gulp.dest('src/lib/'))
				.pipe(connect.reload());
});

gulp.task('uglify', function() {
    return gulp.src(['src/lib/js/fastclick.js'])
    .pipe(uglify())
    .pipe(gulp.dest('src/lib/js/*.min.js'));
});


function mapFiles(list, extname) {
	return list.map(function (app){
		return 'src/' + app + '.' + extname;
	});
};



gulp.task('default', ['bundle', 'connect']);


var gulp = require('gulp'),
	notify = require('gulp-notify'), // 提示信息
	htmlmin = require('gulp-htmlmin'),	// html 压缩
	minifyCSS = require('gulp-minify-css'), // css 压缩
	concat = require('gulp-concat'), // 文件合并
	spriter = require('gulp-css-spriter'), // 雪碧图

	// 	imagemin = require('gulp-imagemin'), // 图片压缩
	// pngcrush = require('imagemin-pngcrush'),
	rename = require('gulp-rename'), // 文件重命名
	uglify = require('gulp-uglify'), // js 压缩
	jshint = require('gulp-jshint'), // js 检测
	browserSync = require('browser-sync'),	// 浏览器刷新
	reload = browserSync.reload;


// html 相关操作
	
	gulp.task('html',function(){
		return gulp.src('app/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist/'))
	});	

// css 相关操作

	/* 	合并CSS文件
	 *
	 *  雪碧图合并
	 *		注意： 不需要的合并的需在css中添加注释如下
	 *		@meta {"spritesheet": {"include": false}} 
	 *
	 *	压缩CSS文件
	 *	
	 */
	gulp.task('CSS',function(){
		return gulp.src('./app/css/**/*.css')
		.pipe(concat('main.css'))
		.pipe(notify('css 合并完成'))
		.pipe(spriter({
			// 雪碧图的名称
			'spriteSheet' : "./dist/images/sprite_css_img.png",
			// 原图文件文件储存位置
			// 输出的雪碧图位置
			'pathToSpriteSheetFromCSS' : '../images/sprite_css_img.png'
		}))
		.pipe(notify('spriter 合并完成'))
		// 压缩
		.pipe(minifyCSS())
		// 更改css 并写入
		.pipe(gulp.dest('./dist/css'))
		.pipe(notify('css 部分完成'))
	});

// js 相关操作

	gulp.task('script',function(){
		return gulp.src('./app/script/**/*.js')
		// .pipe(jshint())
		// .pipe(jshint.reporter('YOUR_REPORTER_HERE'))
		.pipe(concat('main.js'))
		.pipe(notify('js 合并完成'))
		.pipe(gulp.dest('./dist/script'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/script'))
		.pipe(notify('js 部分完成'))
	})


// 网页热加载
	gulp.task('serve',function(){
		browserSync({
			server : {
				baseDir : 'app'
			}
		});

		gulp.watch(['**/*.html','css/**/*.css','scripts/**/*.js'],{cwd: 'app'},reload);
	
	});



gulp.task('default',['html','CSS','script'],function(){
});
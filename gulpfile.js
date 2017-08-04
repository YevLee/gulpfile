var gulp = require('gulp'),
	useref = require('gulp-useref'), // html 路径替换
	notify = require('gulp-notify'), // 提示信息
	htmlmin = require('gulp-htmlmin'),	// html 压缩
	minifyCSS = require('gulp-minify-css'), // css 压缩
	concat = require('gulp-concat'), // 文件合并
	spriter = require('gulp-css-spriter'), // 雪碧图

	clean = require('gulp-clean'),		// 清除原有文件
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'), // 图片压缩
	// pngcrush = require('imagemin-pngcrush'),
	rename = require('gulp-rename'), // 文件重命名
	uglify = require('gulp-uglify'), // js 压缩
	jshint = require('gulp-jshint'), // js 检测
	browserSync = require('browser-sync'),	// 浏览器刷新
	reload = browserSync.reload;


// html 相关操作
	/* 替换路径
	 *
	 *  需要在文件里面添加下面的
	 *	<!-- build:<type>(alternate search path) <path> <parameters> -->
	 *	... HTML Markup, list of script / link tags.
	 *	<!-- endbuild -->
	 *
	 *  如     
	 *  <!-- build:css css/combined.css -->
	 *  	<link href="css/one.css" rel="stylesheet">
	 *  	<link href="css/two.css" rel="stylesheet">
	 *  <!-- endbuild -->
	 *
	 */
	gulp.task('clean',function(){
		return gulp.src('./dist')
		.pipe(clean())
		.pipe(notify('清除原有文件'))
	})

	gulp.task('html',function(){
		return gulp.src('app/**/*.html')
		.pipe (useref())
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
		// .pipe(jshint('.jshintrc'))
		// .pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/script'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/script'))
		.pipe(notify('js 部分完成'))
	});

// 图片品质压缩
	gulp.task('imgMin',function(){
		return gulp.src('./app/images/**/*')	
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('./dist/images/'))
		.pipe(notify('图片压缩部分完成'))
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



gulp.task('default',['clean'],function(){
	gulp.start('html','script','CSS','imgMin');
});
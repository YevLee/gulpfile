# gulp 常用功能整理

## 相关包安装
建议使用cnpm

	npm install --save-dev *****

其中 \*\*\*\*\* 部分表示所需要的包模块，如 gulpfile 中的 require('gulp-useref') 需要之前进行包安装如下：

	npm install --save-dev gulp-useref
	
源文件默认包如下

	 npm install --save-dev gulp gulp-useref gulp-notify gulp-minify-css gulp-concat gulp-css-spriter
	 npm install --save-dev gulp-clean gulp-cache gulp-imagemin gulp-rename gulp-uglify browser-sync 
	 npm i gulp-htmlmin --save-dev
	 npm install jshint gulp-jshint --save-dev
	
## 源文件结构
下面是 gulpfile 中默认的源文件结构

	—— app
	  —— css	// 储存css文件
	     —— **
	       —— * .css
	     —— * .css
	  —— images	// 储存图片
	    —— * .png
	    —— * .jpg
	    —— * .gif
	 —— script	// 储存js文件
	      —— **
	       —— * .js
	     —— * .js
	 —— sprite	// 储存要合成雪碧图的文件
	    —— * .png
	    —— * .jpg
	    —— * .gif
	 —— **
	   —— *.html
	 —— *.html
	 	
## 命令行命令

### gulp clean 
清除dist文件夹中的内容

### gulp serve
网页热加载

### gulp html 
更改html中的路径 并 压缩html

需要在html文件里面添加代码形式如下

	<!-- build:<type>(alternate search path) <path> <parameters> -->
	... HTML Markup, list of script / link tags.
	<!-- endbuild -->
	 
	如     
	<!-- build:css css/combined.css -->
	<link href="css/one.css" rel="stylesheet">
	<link href="css/two.css" rel="stylesheet">
	 <!-- endbuild -->

### gulp CSS
合并CSS文件

雪碧图合并

注意： 不需要的合并的需在css中添加注释如下

	@meta {"spritesheet": {"include": false}} 
	
压缩CSS文件   

### gulp script
合并 js 文件并进行压缩

### gulp imgMin
图片压缩

### gulp (default)
压缩并合并源文件 并 输出到 dist 文件夹


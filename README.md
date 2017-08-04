# gulp 常用配置

## gulp clean 
   清除dist文件夹中的内容

## gulp serve
   网页热加载

## gulp html 
   更改html中的路径
   需要在html文件里面添加代码如下面形式
		<!-- build:<type>(alternate search path)    <path> <parameters> -->
			... HTML Markup, list of script / link tags.
		<!-- endbuild -->
	  
		如     
		<!-- build:css css/combined.css -->
			<link href="css/one.css" rel="stylesheet">
			<link href="css/two.css" rel="stylesheet">
		<!-- endbuild -->
   压缩html
  

   


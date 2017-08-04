
// 新建期刊部分
var newpart = (function(){
	var showdata = {
		// 展示期刊名称
		showName : function(){
			var name = data.name;
			document.querySelector('.j_name').innerHTML = name;
			var clickListenerEvent = function(){
				document.querySelector('.j_name').innerHTML = "<input type='text' class='j_nameinput'>";
				var focusoutListenerEvent = function(){
					if(document.querySelector('.j_nameinput').value !== ''){
						data.name = document.querySelector('.j_nameinput').value;
					}
					showdata.showName();
				}
				var jInput = document.querySelector('.j_nameinput');
				jInput.focus();
				jInput.addEventListener('focusout',focusoutListenerEvent,{once: true});
			}
			document.querySelector('.j_name').addEventListener('click',clickListenerEvent,{once: true});
		},
		// 功能函数 用以展示某版的标题
		showContent : function(bannerId){
			bannerId ? bannerId : bannerId = 0;

			var titleData = data.content[bannerId];
			document.querySelector('.bannerIntroduce').num = bannerId;
			document.querySelector('.expro').innerHTML = '<h3>添加、修改文章</h3>'
			var NodeHtml = document.querySelector('.expro').innerHTML;
			for(var i = 0 ; i < titleData.mainpage.length; i++){
				var childeNode = '<h4><span>'+ (i + 1) +'. </span>' + titleData.mainpage[i].titleName +'</h4>';
				NodeHtml += childeNode;
				document.querySelector('.expro').innerHTML = NodeHtml;
			}
			return titleData.mainpage.length;
		},
		// 功能函数 用以显示某标题下的文章细节
		showTitleContent : function(bannerId,titleNum){
			bannerId ? bannerId : bannerId = 0;
			titleNum ? titleNum : titleNum = 0;
			var title = data.content[bannerId].mainpage[titleNum];
			document.querySelector('.titleName').value = title.titleName;
			document.querySelector('.textId').innerHTML = '文章ID ： ' + title.titleId;
			document.querySelector('.actor').value = title.actor;
			document.querySelector('.webactor').value = title.webactor;
			document.querySelector('.bannerIntroduce').value =  data.content[bannerId].bannerIntroduce;

			var selectArr = [1,2,3,4,5,6,7,8,9,10];
			selectArr = selectArr.filter(function(item,index,array){
					return data.focusTitleId[index] === false;
			});
			selectArr.unshift('');
			data.focusTitleId.forEach(function(item,index){
				if(item === title.titleId){
					selectArr.unshift(index+1);
				}
			})
			// alert(selectArr);
			var focusInnerHtml = []
			selectArr.forEach(function(item){
				focusInnerHtml.push('<option>'+item+'</option>')
			});
			// alert(focusInnerHtml);
			focusInnerHtml = focusInnerHtml.join('');
			document.querySelector('.focusIdS').innerHTML = focusInnerHtml;
		},
		// 更改相应内容
		changTitleContent : function(bannerId,titleNum){
			bannerId ? bannerId : bannerId = 0;
			titleNum ? titleNum : titleNum = 0;
			var title = data.content[bannerId].mainpage[titleNum];
			title.titleName = document.querySelector('.titleName').value;
			document.querySelectorAll('.expro h4')[titleNum].innerHTML = (titleNum+1) + '. ' + title.titleName;
			title.actor = document.querySelector('.actor').value;
			title.webactor = document.querySelector('.webactor').value;
			title.text = ueFunc.getHtml(); 
			title.titleId = bannerId + '' + titleNum;
			var obj = document.querySelector('.focusIdS');
			var index = obj.selectedIndex;
			if(index!==0){
				data.focusTitleId[obj.options[index].text-1] = title.titleId;
			}
		},
		// 删除功能
		deleteTitle : function(bannerId,titleNum){
			var offset = confirm('确定删除本条新闻？');
			// alert(offset);
			if(offset){
				data.content[bannerId].mainpage.splice(titleNum,1);
				alert('删除成功');
			}
			data.focusTitleId = data.focusTitleId.map(function(item,index){
				var obj = document.querySelector('.focusIdS');
				var indexNum = obj.selectedIndex;
				alert(data.focusTitleId);
				if(indexNum == index){
					return false;
				}else{
					return item;
				}
			})
		}
	}

	var qkListener = {

		// 板块点击事件
		bannerFunc : function(){
			var bannerId ,titleAllNum = 0;
			// 初始化
				// 调用
					showdata.showContent(0);
					showdata.showTitleContent(0,0);	
				// ouhe
					qkListener.addTitle(0,1);
					qkListener.saveFunc(0,0);
					qkListener.deleteFunc(0,0);
					qkListener.saveBannerId();

				document.querySelector('#editor').innerHTML = data.content[0].mainpage[0].text;

			document.querySelectorAll('.expro h4')[0].className = 'active';
			for(var i = 0; i < 8 ; i++){
				document.querySelectorAll('.bannerin span')[i].onclick = (function(i){
					return function(){
						for(var j =0 ; j < 8 ; j++ ){
							document.querySelectorAll('.bannerin span')[j].className = '';
						}
						this.className += 'active';
						// 调用
							titleAllNum = showdata.showContent(i);
						document.querySelectorAll('.expro h4')[0].className = 'active';
						// 调用
							showdata.showTitleContent(i,0);			
							UE.getEditor('editor').setContent(data.content[i].mainpage[0].text,false);
						bannerId = i;
						// 耦合
							qkListener.titleFunc(bannerId,titleAllNum);
							qkListener.addTitle(bannerId,titleAllNum);
							qkListener.saveFunc(bannerId,0);
							qkListener.deleteFunc(bannerId,0);
					}
				})(i);
			}
		},

		// 标题点击事件 
		titleFunc : function(bannerId,titleAllNum){
			for(var i = 0; i < titleAllNum ; i++){
				document.querySelectorAll('.expro h4')[i].onclick = (function(i){
					return function(){
						for(var j =0 ; j < titleAllNum ; j++ ){
							document.querySelectorAll('.expro h4')[j].className = '';
						}
						this.className += 'active';
						// 调用
							showdata.showTitleContent(bannerId,i);
							UE.getEditor('editor').setContent(data.content[bannerId].mainpage[i].text,false);
						// 耦合
							qkListener.saveFunc(bannerId,i);
							qkListener.deleteFunc(bannerId,i);
					}
				})(i);
			}
		},
		addTitle : function(bannerId,titleAllNum){
			document.querySelector('.add').onclick = function(){
				var newTitleHtml = {
					'titleId' : '',
					'titleName' : '请输入标题',
					'titletime' : '',
					'actor' : '',
					'webactor' : '',
					'text' : ''
				}
				data.content[bannerId].mainpage.push(newTitleHtml);
				titleAllNum++;
				// 调用
					showdata.showContent(bannerId);
					showdata.showTitleContent(bannerId,titleAllNum-1)
				// 耦合
					qkListener.titleFunc(bannerId,titleAllNum);
				document.querySelectorAll('.expro h4')[titleAllNum-1].className = 'active';
			}
		},
		saveFunc : function(bannerId,titleNum){
			document.querySelector('.saveText').onclick = function(){
				showdata.changTitleContent(bannerId,titleNum);
				alert('保存成功');


				// ajax	
			}
			
		},
		deleteFunc : function(bannerId,titleNum){
			document.querySelector('.delText').onclick = function(){
				showdata.deleteTitle(bannerId,titleNum);
				if(data.content[bannerId].mainpage.length === 0){
					var newTitleHtml = {
						'titleId' : '',
						'titleName' : '请输入标题',
						'titletime' : '',
						'actor' : '',
						'webactor' : '',
						'text' : ''
					}
					data.content[bannerId].mainpage.push(newTitleHtml);
					// 调用
						showdata.showContent(bannerId);
						showdata.showTitleContent(bannerId,0)
					// 耦合
						qkListener.titleFunc(bannerId,1);
						document.querySelectorAll('.expro h4')[0].className = 'active';
				}else{
					showdata.showContent(bannerId);	
					showdata.showTitleContent(bannerId,0)
					qkListener.titleFunc(bannerId,data.content[bannerId].mainpage.length);
					document.querySelectorAll('.expro h4')[0].className = 'active';
				}
			}
		},
		saveBannerId : function(){
			document.querySelector('.bannerIntroduce').addEventListener('focusout' ,function(){
				// alert(this.num);
				data.content[this.num].bannerIntroduce = this.value;
			},{
				capture: true
			});
		}
	}
	showdata.showName();
	qkListener.bannerFunc();
})();
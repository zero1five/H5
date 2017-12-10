window.onload = function(){	
	var img = ['img/1.gif',
	           'img/2.gif',
	           'img/3.gif',
	           'img/4.gif'];

	var num = 0;
	var img1 = document.getElementById('img1');
    var growp = document.getElementById('growp');
    var click = growp.getElementsByTagName('div');
    var photo = growp.getElementsByTagName('img'); 
    var Carousel = document.getElementById('Carousel');
   
    //初始化
    img1.src = img[num];

    for( var i =0; i<img.length; i++) {
    	growp.innerHTML += '<div><img></div>'; 
    }
    click[num].className = 'active';


    for(var i=0; i<img.length; i++) {
        photo[0].src = 'img/1.gif';
        photo[1].src = 'img/2.gif';
        photo[2].src = 'img/3.gif';
        photo[3].src = 'img/4.gif';
    }

    function auto(){
        img1.src = img[num];
        //清除全局active样式再附加
        for(var i=0; i<img.length; i++){
    		click[i].className = '';
    	}  
    	click[num].className = 'active';              
    }; 

    for(var i=0; i<click.length; i++){
    	click[i].index = i;  
    	click[i].onclick = function(){

    		img1.src = img[this.index];
    		num = this.index;
    		for(var i=0; i<img.length; i++){
    			click[i].className = '';
    		}
    		this.className = 'active';
    	}
    }   


    //轮播代码
    var timer =null;
    
    	timer = setInterval(function(){
    	   num ++;
    	   num%=img.length;
    	   auto();
    	},3000);
    

    Carousel.onmouseover = function(){
    	clearInterval(timer);
    }
    growp.onmouseover = function(){
    	clearInterval(timer);
    }
    Carousel.onmouseout = function(){
           clearInterval(timer);
    	   timer = setInterval(function(){
    	   num ++;
    	   num%=img.length;
    	   auto();
    	},3000);
    };


    //

}
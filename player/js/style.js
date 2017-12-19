window.onload = function(){
    var LC = document.getElementById('LC');
    var touchstart = 'touchstart';
    var touchmove = 'touchmove';
    var touchend = 'touchend';
    var isMobile = /Mobile/i.test(navigator.userAgent); 
    
    if(!isMobile){
        touchstart = 'mousedown';
        touchmove = 'mousemove';
        touchend = 'mouseup';
    }

    var musicList = (function(){   //填充数据

        function data(){
            $.ajax({
                url:'musicList.php',
                type: 'GET',
                dataType: 'json',
                success: function(data){
                    $.each(data,function(i,obj){
                        var li = '<li><div class="musictext"><h3>'+ (obj.musicName)+'</h3><p>'+(obj.name) +'</p></div></li>';
                        LC.innerHTML += li;
                    });
                }
            });
        };
        data();
    })();
    
    
}
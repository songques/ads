avalon.ready(function(){

	if(isExitsFunction("OnCreate"))
	{
		OnCreate();	
	}
	avalon.scan();
	if( isExitsFunction('onResume')){
    	onResume();
	}
});



function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


//是否存在指定函数 
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch(e) {}
    return false;
}


//是否存在指定变量 
function isExitsVariable(variableName) {
    try {
        if (typeof(variableName) == "undefined") {
            //alert("value is undefined"); 
            return false;
        } else {
            //alert("value is true"); 
            return true;
        }
    } catch(e) {}
    return false;
}

$(window).bind('resize load', function(){
	if(isExitsFunction("windowsResize")){
		var width=$(window).width();
		var height=$(window).height();
		windowsResize(width,height);
	}
	remSetup();
});

function windowsResize(width,height){

}

function remSetup(){
	(function (doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;
			  //console.log(clientWidth)
              docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
            };

          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);	
}


function imitateClick(oElement, iClientX, iClientY) {  
	var oEvent;  
	if (document.createEventObject) { //For IE  
		oEvent = document.createEventObject();  
		oEvent.clientX = iClientX;  
		oEvent.clientY = iClientY;  
		oElement.fireEvent("onclick", oEvent);     
	} else {  
		oEvent = document.createEvent("MouseEvents");  
		oEvent.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0,   
								iClientX, iClientY/*, false, false, false, false, 0, null*/);   
		oElement.dispatchEvent(oEvent);  
	}  
}  


var form_main;
function OnCreate(){
	form_main=avalon.define({
			$id:"form_main",
			winWidth:0,
			winHeight:0,
			ShowType:[],
			btn_test_Event:btn_test_Event_Delegate,
		});	
	
	form_main.ShowType=new Array();
	//加载url参数集
	var sw_array=GetQueryString("SW");
	if(sw_array!=null )
	{
		sw_array=sw_array.split("|");
		for(value in sw_array){
			console.log("value:"+sw_array[value]);
			form_main.ShowType[sw_array[value]]=true;
		}	
	}
	//加载offer模板
	$("#div_aff_developer").append(affHTMLDeveloperTag);
	var affHTMLDeveloperTag="<iframe id=\"aff_developer_frame\" style=\"\" allowTransparency=\"true\" border=\"0\" frameborder=\"0\" scrolling=\"yes\" src=\"\"/> "
	$("#div_aff_developer").append(affHTMLDeveloperTag);
	$("#aff_developer_frame").load(aff_developer_frame_onload_Event);
	$("#aff_developer_frame").attr("src","index.html");
	
	//加载offer生产
	var affHTMLProduceTag="<iframe id=\"aff_procduce_frame\" style=\"\" allowTransparency=\"true\" border=\"0\" frameborder=\"0\" scrolling=\"yes\" src=\"\"/> "
	$("#div_aff_produce").append(affHTMLProduceTag);
	
}

function windowsResize(w,h){
	form_main.winWidth=w;
	form_main.winHeight=h;
}

function aff_developer_frame_onload_Event(){
	var aff_template_window=document.getElementById("aff_developer_frame").contentWindow
	var aff_template_height=$("#wrap",aff_template_window.document).height();
	$("#aff_developer_frame").css("height",aff_template_height).css("width",form_main.winWidth);
	$("#aff_procduce_frame").css("height",aff_template_height).css("width",form_main.winWidth);
	//显示测试
	//$("#div_aff_developer").css("z-index",1000);
	//$("#div_aff_developer").css("opacity",1);
	//开始加载offer生产的src
	//$("#aff_procduce_frame").load(div_aff_produce_onload_Event);
	//$("#aff_procduce_frame").attr("src","http://heimvideos.mobi/page?cam=492&country=de&pub=46&clickid=5235716474&subid=43472");
	
}
function div_aff_produce_onload_Event(){
	console.log(html_developer);
	//if(form_main.ShowType["P"]==true){
		$("#div_aff_produce").css("z-index",1000);
		$("#div_aff_produce").css("opacity",0.3);	
	//}
}

function btn_test_Event_Delegate(){
	//开始加载offer生产的src
	$("#aff_procduce_frame").load(div_aff_produce_onload_Event);
	$("#aff_procduce_frame").attr("src","http://heimvideos.mobi/page?cam=492&country=de&pub=46&clickid=5235716474&subid=43472");
}

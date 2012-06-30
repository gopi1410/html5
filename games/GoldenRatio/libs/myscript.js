var ratio_lowerLimit=1.4;
var ratio_upperLimit=1.8;
var inverseRatio_lowerLimit=0.55;
var inverseRatio_upperLimit=0.71;
var rect_sides=[[250,25],[230,70],[210,105],[195,130],[180,111],[111,180],[130,195],[105,210],[70,230],[25,250]];

var pidTimer;
var tmp=1;
var canvas;
var context;
var loop2=0,loop3=0,loop4=0;

//returning value to parent
var completed=0, totalTimeTaken=1, score=0, extraParameters="Ended before selecting the rectangle";

//for dynamic load i.e. other game parts would be loaded only when initial two frames have been loaded.
$(document).ready(function() {
	setTimeout(dynamicLoad,3000);
	sessionStorage.clear();
	localStorage.clear();
	sessionStorage.rect_size="1";
	numberInput('c3_inp1');
	numberInput('c3_inp2');
	numberInput('c3_ratio');
	numberInput('c5_inp1');
	numberInput('c5_inp2');
	numberInput('c5_inp5');
	numberInput('c5_inp6');
	numberInput('c5_ratio1');
	numberInput('c5_ratio3');
	numberInput('c8_inp1');
	numberInput('c8_inp2');
	numberInput('c8_inp3');
	numberInput('c8_inp4');
	numberInput('c8_ratio1');
	numberInput('c8_ratio2');
	numberInput('c10_inp');
	numberInput('c12_ratio');
	numberInput('c14_ratio');
	pidTimer=setInterval(function() {
		totalTimeTaken+=1;
	}, 1000);
});

function dynamicLoad()
{
	$('#mycanvas4').load('ajax/canvas4.html', function() {load0();});
	function load0()
	{
		$('#mycanvas5').load('ajax/canvas5.html', function() {load1();});
	}
	function load1()
	{
		$("#c5_hl1_wrap").draggable({axis:"y", containment: [0,100,0,360], drag: function(event,ui) { move_c5(); }, stop: function(event,ui) { move_c5(); }, cursor:"crosshair"});
		$("#c5_hl2_wrap").draggable({axis:"y", containment: [0,100,0,360], drag: function(event,ui) { move_c5(); }, stop: function(event,ui) { move_c5(); }, cursor:"crosshair"});
		
		$('#mycanvas6').load('ajax/canvas6.html', function() {load2();});
	}
	function load2()
	{
		$('#mycanvas7').load('ajax/canvas7.html', function() {loadthree();});
	}
	function loadthree()
	{
		$('#mycanvas8').load('ajax/canvas8.html', function() {load3();});
	}
	function load3()
	{
		$("#c8_hl1_wrap").draggable({axis:"y", containment: [0,100,0,360], drag: function(event,ui) { move_c8(); }, stop: function(event,ui) { move_c8(); }, cursor:"crosshair"});
		$("#c8_hl2_wrap").draggable({axis:"y", containment: [0,100,0,360], drag: function(event,ui) { move_c8(); }, stop: function(event,ui) { move_c8(); }, cursor:"crosshair"});
		
		$('#mycanvas9').load('ajax/canvas9.html', function() {load4();});
	}
	function load4()
	{
		$('#mycanvas10').load('ajax/canvas10.html', function() {load5();});
	}
	function load5()
	{
		$('#mycanvas11').load('ajax/canvas11.html', function() {load6();});
	}
	function load6()
	{
		$('#mycanvas12').load('ajax/canvas12.html', function() {load7();});
	}
	function load7()
	{
		$('#mycanvas14').load('ajax/canvas14.html', function() {load8();});
	}
	function load8()
	{
		$('#mycanvas15').load('ajax/canvas15.html', function() {load9();});
	}
	function load9()
	{
		$('#mycanvas16').load('ajax/canvas16.html');
	}
}

$(function() {
	$("#c1_slider").slider({ animate:true, min:1, max:10, step:1, value:1, slide: function(ui,event) { draw_rect(); }, stop:function(ui,event) { draw_rect(); } });
});


function draw_rect()
{
	slider_val=$("#c1_slider").slider("value");
	//$("#rectang").css({'width': rect_sides[slider_val-1][0]+'px', 'height': rect_sides[slider_val-1][1]+'px'});
	$("#rectang").animate({
		width: rect_sides[slider_val-1][0]+'px',
		height: rect_sides[slider_val-1][1]+'px'
	}, "slow");
	/*ctx=cnvs.getContext("2d");
	ctx.clearRect(0,0,cnvs.width,cnvs.height);
	ctx.beginPath();
	ctx.rect(0,200-(25*slider_val),37.5*(9-slider_val),25*slider_val);
	ctx.fillStyle='#8ED6FF';
	ctx.fill();
	ctx.lineWidth=1;
	ctx.strokeStyle='black';
	ctx.stroke();*/
}

function level1()
{
	var selectVal=$("#c1_slider").slider("value");
	extraParameters=rect_sides[selectVal-1][0]/rect_sides[selectVal-1][1];
	if(typeof(Storage)!=="undefined")
	{
		sessionStorage.rect_size=$("#c1_slider").slider("value");
	}

	$("#c1_prompt").show();
	$("#c1_next").html("NEXT");
	$("#c1_link").attr('onclick', "level2()");
	$("#c1_slider").slider('disable');
}

function level2()
{
	if(typeof(Storage)!=="undefined")
	{
		sessionStorage.rect_size=$("#c1_slider").slider("value");
	}
	
	$("#sideico1").css('opacity', 1);
	$("#c1_h1").remove();
	$("#c1_h2").remove();
	$("#c1_canvas_wrap").remove();
	$("#slider_wrap").remove();
	$("#c1_bottom").remove();
	$("#mycanvas1").hide();
	$("#mycanvas1").fadeIn(1000);
	
	//LEVEL 3 code
	$("#level3_text").show();
	$("#sideicons > img").css("cursor", "pointer");
	for(i=0;i<100;i++)
		$("#sideico1").fadeTo('slow', 0.1).fadeTo('slow', 1.0);
	$("#sideico1").click(function() {
		loadStage('mycanvas1', 'mycanvas2');
		$("#sideico1").unbind('click');
	});
	//setInterval('$("#sideico1").toggle()',1000);
}

function level4()
{
	loadStage('mycanvas2', 'mycanvas3');
	$("#c3_calc").load('ajax/calc.html', function() {$("#c3_calc").draggable();});
	$("#c3_cloud").fadeIn("slow");
}

function level5()
{
	$("#mycanvas3 input").attr('disabled', 'disabled');
	$("#c3_cloud").fadeOut("slow");
	$("#hl1_wrap").draggable({ disabled: true });
	$("#hl2_wrap").draggable({ disabled: true });
	$("#vl1_wrap").draggable({ disabled: true });
	$("#vl2_wrap").draggable({ disabled: true });
	$("#c3_prompt").show();
	$("#c3_next").html('NEXT');
	$("#c3_link")[0].href="javascript:level6();";
	var ratio=parseFloat($("#c3_ratio")[0].value);
	if(ratio>=ratio_lowerLimit && ratio<=ratio_upperLimit)
	{
		
	}
	else
	{
		$("#c3_prompt > span").html('The correct<br/>ratio is 1.625')
	}
	if($("#c3_inp1")[0].value==="")
	{
		$("#c3_inp1")[0].value=120;
	}
	if($("#c3_inp2")[0].value==="")
	{
		$("#c3_inp2")[0].value=195;
	}
	if($("#c3_ratio")[0].value==="")
	{
		$("#c3_ratio")[0].value=1.625;
	}
}

function level6()
{
	loadStage('mycanvas3', 'mycanvas0');
	$("#c0_sideico2").css('opacity', 1);
	function blink2()
	{
		$("#c0_sideico2").fadeTo('slow', 0.1).fadeTo('slow', 1.0, function() {
			if(loop2==1)
				return;
			else
				blink2();
		});
	}
	blink2();
	
	//LEVEL 7 code
	$("#c0_sideico2").click(function() {
		loop2=1;
		$("#c0_sideico2").css('opacity', 0.4);
		$("#mycanvas0").fadeOut(100);
		$("#mycanvas4").fadeIn(1000);
		$("#c0_sideico2").unbind('click');
		$("#c0_sideico2").unbind('fadeTo');
	});
}

function level8()
{
	loadStage('mycanvas4', 'mycanvas5');
	$("#c5_calc").load('ajax/calc.html', function() {
		$("#c3_calc_form").attr('id', 'c5_calc_form');
		$("#c5_calc").draggable();
	});
}

function level9()
{
	$("#mycanvas5 input").attr('disabled', 'disabled');
	$("#c5_hl1_wrap").draggable({ disabled: true });
	$("#c5_hl2_wrap").draggable({ disabled: true });
	$("#c5_link")[0].href="javascript:void 0;";
	$("#c5_prompt").attr('class', 'prompt');
	$("#c5_prompt > span").css('width', '124px');
	$("#c5_prompt > span").css('height', '60px');
	$("#c5_prompt > span").css('line-height', '25px');
	$("#c5_next").show();
	var ratio1=parseFloat($("#c5_ratio1")[0].value);
	var ratio3=parseFloat($("#c5_ratio3")[0].value);
	if((ratio1>=ratio_lowerLimit && ratio1<=ratio_upperLimit) && (ratio3>=ratio_lowerLimit && ratio3<=ratio_upperLimit))
	{
		$("#c5_prompt > span").html("That's right!!<br/>Note the ratio.");
	}
	else
	{
		$("#c5_prompt > span").html('The correct<br/>ratio is 1.618');
	}
	if($("#c5_inp1")[0].value==="")
	{
		$("#c5_inp1")[0].value=77;
	}
	if($("#c5_inp2")[0].value==="")
	{
		$("#c5_inp2")[0].value=125;
	}
	if($("#c5_inp5")[0].value==="")
	{
		$("#c5_inp5")[0].value=8;
	}
	if($("#c5_inp6")[0].value==="")
	{
		$("#c5_inp6")[0].value=13;
	}
	if($("#c5_ratio1")[0].value==="")
	{
		$("#c5_ratio1")[0].value=1.623;
	}
	if($("#c5_ratio3")[0].value==="")
	{
		$("#c5_ratio3")[0].value=1.625;
	}
}

function level10()
{
	loadStage('mycanvas5', 'mycanvas6');
}
function init11()
{
	$("#c6_display").show();
	$("#c6_cloud").fadeIn("slow");
	$("#c6_display").css("cursor", "crosshair");
	$("#c6_display").resizable({aspectRatio:1, maxHeight: 220, maxWidth:220, minHeight:100, minWidth:100});
	
	$("#c6_link_1")[0].href="javascript:void 0;";
	$("#c6_link_2")[0].href="javascript:level11();";
	$("#c6_link_1 > button").attr('class', 'norm_button');
}
function level11()
{
	$("#c6_cloud").fadeOut("slow");
	$("#c6_link_2")[0].href="javascript:void 0;";
	$("#c6_link_1 > button").attr('class', 'faded_button');
	$("#c6_link_2 > button").attr('class', 'norm_button');
	var wd=$("#c6_display").css("width");
	var ht=$("#c6_display").css("height");
	var lt=$("#c6_display").css("margin-left");
	$("#c6_display").remove();
	$("#c6_canvas_container").append('<canvas id="c6_rect" width="'+wd+'" height="'+ht+'" style="position:relative; margin-left: '+lt+'; border:2px solid red; display:block;"></canvas>');
	$("#c6_rect").animate({
		'left': '50%',
		'margin-left': -$('#c6_rect').width()/2
	}, {
		'duration': 1000,
		'complete': function() {temp();}
	});
	function temp()
	{
		var cnvs=document.getElementById("c6_rect");
		cnvs.animateLine(cnvs.width/2,0,cnvs.width/2,cnvs.height,{'lineColour': 'red', 'lineWidth': 2, 'stop': function() {$("#c6_link_3")[0].href="javascript:level12();";}});
	}
}

function level12()
{
	$("#c6_link_3")[0].href="javascript:void 0;";
	$("#c6_link_2 > button").attr('class', 'faded_button');
	$("#c6_link_3 > button").attr('class', 'norm_button');
	
	var cnvs=document.getElementById("c6_rect");
	cnvs.animateLine(cnvs.width,0,cnvs.width/2,cnvs.height,{'lineColour': 'red', 'lineWidth': 2, 'stop': function() {$("#c6_link_4")[0].href="javascript:level13();";}});
}

function level13()
{
	$("#c6_link_3")[0].href="javascript:void 0;";
	$("#c6_link_4")[0].href="javascript:void 0;();";
	$("#c6_link_3 > button").attr('class', 'faded_button');
	$("#c6_link_4 > button").attr('class', 'norm_button');
	
	var cnvs=document.getElementById("c6_rect");
	var ctx=cnvs.getContext('2d');
	var old_wd=cnvs.width;
	cnvs.width=old_wd*(1.618);
	$("#c6_rect").css('border', 'none');
	function drawRect()
	{
		ctx.strokeStyle="#FF0000";
		ctx.lineWidth=2;
		ctx.beginPath();
		//ctx.moveTo(old_wd/2,0);
		//ctx.lineTo(old_wd/2,cnvs.height);
		//ctx.moveTo(old_wd,0);
		//ctx.lineTo(old_wd,cnvs.height);
		ctx.moveTo(0,0);
		ctx.lineTo(old_wd,0);
		ctx.lineTo(old_wd,cnvs.height);
		ctx.lineTo(0,cnvs.height);
		ctx.lineTo(0,0);
		ctx.stroke();
		ctx.closePath();
	}
	var r=Math.sqrt((Math.pow(old_wd/2,2))+(Math.pow(cnvs.height,2)));
	var ang=Math.atan(2);
	var data=[];
	for(i=0;i<=100;i++)
	{
		data[i]=ang-(i*ang/100);
	}
	ctx.strokeStyle="#FF0000";
	ctx.lineWidth=2;
	ctx.beginPath();
	i=0;
	//cnvs.animateArc(old_wd/2,cnvs.height,r,2*Math.PI-Math.atan(2),2*Math.PI,'clockwise',{'stop': function() {level14();}});
	var pid=setInterval(function() {
		cnvs.width=cnvs.width;
		drawRect();
		ctx.moveTo(old_wd/2,cnvs.height);
		ctx.lineTo(old_wd/2+(r*Math.cos(data[i])),cnvs.height-(r*Math.sin(data[i])));
		ctx.stroke();
		if(i++===data.length)
		{
			ctx.moveTo(old_wd/2,cnvs.height);
			ctx.lineTo(cnvs.width,cnvs.height);
			ctx.stroke();
			ctx.closePath();
			clearInterval(pid);
			init14();
		}
	}, 10);
	function init14()
	{
		var pointsArr=[[cnvs.width,cnvs.height], [cnvs.width,0], [old_wd,0]];
		cnvs.animateLines(pointsArr,{'lineWidth': 2, 'lineColour': 'red', 'stop': function() {level14();}});
	}
}

function level14()
{
	$("#c6_rect").css({'left': '0px', 'margin-left': '0px', 'border': '2px solid green'});
	$("#c6_canvas_container").attr('align', 'center');
	$("#c6_buttons").remove();
	$("#c6_disp1").show();
}
function level15init()
{
	$("#mycanvas6").fadeOut(100).fadeIn(900);
	var c6Txt="<p style='margin:5%;'><b>The Golden Spiral</b>, sometimes called the Golden Round, is a spiral with proportions similar to the Golden Rectangle. This spiral is actually only a series of quarter-circles drawn in squares. These squares have been inscribed in the Golden Rectangle as shown.</p>";
	$("#c6_h1 > p").remove();
	$("#c6_disp1 >p").remove();
	$("#rect_container").after(c6Txt);
	$("#c6_link")[0].href="javascript:void 0;";
	var canv=document.getElementById("c6_rect");
	canv.width=1.618*canv.height;
	function draw()
	{
		var tmpx=(0.618/1.618)*(0.618/1.618)*canv.width+(canv.width/1.618);
		var tmpy=((0.618*(0.618/1.618)*canv.height)+(canv.height*(0.618/Math.pow(1.618,2))))/1.618;
		var points=[[canv.width/1.618,canv.height],[canv.width/1.618,0],[canv.width/1.618,(0.618/1.618)*canv.height],[canv.width,(0.618/1.618)*canv.height],[tmpx,(0.618/1.618)*canv.height],[tmpx,0],[tmpx,canv.height*(0.618/Math.pow(1.618,2))],[canv.width/1.618,canv.height*(0.618/Math.pow(1.618,2))],[((0.618/1.618)*canv.width+tmpx)/1.618,canv.height*(0.618/Math.pow(1.618,2))],[((0.618/1.618)*canv.width+tmpx)/1.618,(0.618/1.618)*canv.height],[((0.618/1.618)*canv.width+tmpx)/1.618,tmpy],[tmpx,tmpy],[((((0.618/1.618)*canv.width+tmpx)/1.618)+(0.618*tmpx))/1.618,tmpy],[((((0.618/1.618)*canv.width+tmpx)/1.618)+(0.618*tmpx))/1.618,canv.height*(0.618/Math.pow(1.618,2))]];
		canv.animatePoints(points,{'lineWidth':1, 'stop':function() {temp1();}});
		function temp1()
		{
			canv.animateArc(canv.width/1.618,0,(canv.width/1.618)-1,Math.PI,Math.PI/2,'anticlockwise',{'lineWidth':1, 'stop':function() {temp2();}});
		}
		function temp2()
		{
			canv.animateArc(canv.width/1.618,(0.618/1.618)*canv.height,(canv.height)-((0.618/1.618)*canv.height)-1,Math.PI/2,0,'anticlockwise',{'lineWidth':1, 'stop':function() {temp3();}});
		}
		function temp3()
		{
			canv.animateArc(tmpx,(0.618/1.618)*canv.height,((0.618/1.618)*canv.height)-1,2*Math.PI,1.5*Math.PI,'anticlockwise',{'lineWidth':1, 'stop':function() {temp4();}});
		}
		function temp4()
		{
			canv.animateArc(tmpx,canv.height*(0.618/Math.pow(1.618,2)),(tmpx-(canv.width/1.618))-1,1.5*Math.PI,Math.PI,'anticlockwise',{'lineWidth':1, 'stop':function() {temp5();}});
		}
		function temp5()
		{
			canv.animateArc(((0.618/1.618)*canv.width+tmpx)/1.618,canv.height*(0.618/Math.pow(1.618,2)),((((0.618/1.618)*canv.width+tmpx)/1.618)-(canv.width/1.618))-2,Math.PI,Math.PI/2,'anticlockwise',{'lineWidth':1, 'stop':function() {temp6();}});
		}
		function temp6()
		{
			canv.animateArc(((0.618/1.618)*canv.width+tmpx)/1.618,tmpy,(tmpx-(((0.618/1.618)*canv.width+tmpx)/1.618))-2,Math.PI/2,0,'anticlockwise',{'lineWidth':1, 'stop': function() {$("#c6_link")[0].href="javascript:level15();";}});
		}
	}
	draw();
}
function level15()
{
	$("#c6_disp1").remove();
	$("#c6_rect").remove();
	$("#c6_disp2").show();
	$("#c6_disp2 > a").hide();
	var canv=document.getElementById("c6_canv");
	canv.animateRect(1,1,canv.width-1,canv.height-1,{'stop': function() {draw();}});
	function draw()
	{
		var tmpx=(0.618/1.618)*(0.618/1.618)*canv.width+(canv.width/1.618);
		var tmpy=((0.618*(0.618/1.618)*canv.height)+(canv.height*(0.618/Math.pow(1.618,2))))/1.618;
		var points=[[canv.width/1.618,canv.height],[canv.width/1.618,0],[canv.width/1.618,(0.618/1.618)*canv.height],[canv.width,(0.618/1.618)*canv.height],[tmpx,(0.618/1.618)*canv.height],[tmpx,0],[tmpx,canv.height*(0.618/Math.pow(1.618,2))],[canv.width/1.618,canv.height*(0.618/Math.pow(1.618,2))],[((0.618/1.618)*canv.width+tmpx)/1.618,canv.height*(0.618/Math.pow(1.618,2))],[((0.618/1.618)*canv.width+tmpx)/1.618,(0.618/1.618)*canv.height],[((0.618/1.618)*canv.width+tmpx)/1.618,tmpy],[tmpx,tmpy],[((((0.618/1.618)*canv.width+tmpx)/1.618)+(0.618*tmpx))/1.618,tmpy],[((((0.618/1.618)*canv.width+tmpx)/1.618)+(0.618*tmpx))/1.618,canv.height*(0.618/Math.pow(1.618,2))]];
		canv.animatePoints(points,{'stop': function() {$("#c6_disp2 > a").show();}});
	}
}

function level16()
{
	loadStage('mycanvas6', 'mycanvas0');
	$("#c0_sideico3").css('opacity', 1);
	function blink3()
	{
		$("#c0_sideico3").fadeTo('slow', 0.1).fadeTo('slow', 1.0, function() {
			if(loop3==1)
				return;
			else
				blink3();
		});
	}
	blink3();
	
	//LEVEL 17 code
	$("#c0_sideico3").click(function() {
		loop3=1;
		$("#c0_sideico3").css('opacity', 0.4);
		$("#mycanvas0").fadeOut(100);
		$("#mycanvas7").fadeIn(1000);
		$("#c0_sideico3").unbind('click');
	});
}

function level18()
{
	loadStage('mycanvas7', 'mycanvas8');
	$("#c8_calc").load('ajax/calc.html', function() {
		$("#c3_calc_form").attr('id', 'c8_calc_form');
		$("#c8_calc").draggable();
	});
}

function level19()
{
	$("#mycanvas8 input").attr('disabled' ,'disabled');
	$("#c8_hl1_wrap").draggable({ disabled: true });
	$("#c8_hl2_wrap").draggable({ disabled: true });
	$("#c8_prompt").show();
	$("#c8_link")[0].href="javascript:level20();";
	$("#c8_next").html('NEXT');
	
	var ratio1=parseFloat($("#c8_ratio1")[0].value);
	var ratio2=parseFloat($("#c8_ratio2")[0].value);
	if(((ratio1>=ratio_lowerLimit && ratio1<=ratio_upperLimit) && (ratio2>=ratio_lowerLimit && ratio2<=ratio_upperLimit)) || ((ratio1>=inverseRatio_lowerLimit && ratio1<=inverseRatio_upperLimit) && (ratio2>=inverseRatio_lowerLimit && ratio2<=inverseRatio_upperLimit)))
	{
		
	}
	else
	{
		$("#c8_prompt > button > span").html('The correct<br/>ratio is 1.618');
		$("#c8_prompt > button > span").css({'width': '150px', 'height': '60px', 'line-height': '27px'});
	}
	if($("#c8_inp1").val()==="")
		$("#c8_inp1").val(78);
	if($("#c8_inp2").val()==="")
		$("#c8_inp2").val(48);
	if($("#c8_ratio1").val()==="")
		$("#c8_ratio1").val(1.625);
	if($("#c8_inp3").val()==="")
		$("#c8_inp3").val(18);
	if($("#c8_inp4").val()==="")
		$("#c8_inp4").val(11);
	if($("#c8_ratio2").val()==="")
		$("#c8_ratio2").val(1.636);
}

function level20()
{
	loadStage('mycanvas8', 'mycanvas0');
	$("#c0_sideico4").css('opacity', 1);
	function blink4()
	{
		$("#c0_sideico4").fadeTo('slow', 0.1).fadeTo('slow', 1.0, function() {
			if(loop4==1)
				return;
			else
				blink4();
		});
	}
	blink4();
	
	//LEVEL 21 code
	$("#c0_sideico4").click(function() {
		loop4=1;
		$("#c0_sideico4").css('opacity', 0.4);
		$("#mycanvas0").fadeOut(100);
		$("#mycanvas9").fadeIn(1000);
		$("#c0_sideico4").unbind('click');
		$("#c9_img1").css('cursor', 'pointer');
		$("#c9_img1").click(function() {
			$("#c9_img1").unbind('click');
			c9_draw1();
		});
	});
}
function c9_draw1()
{
	$('#c9_right_canv1').show();
	var canv=$('#c9_right_canv1')[0];
	var ctx=canv.getContext('2d');
	//ctx.drawImage($("#c9_img1")[0],0,0,canv.width,canv.height);
	canv.animateRect(1,1,canv.width-1,canv.height-1,{'stop': function() {draw();}});
	function draw()
	{
		var tmpx=(0.618/1.618)*(0.618/1.618)*canv.width+(canv.width/1.618);
		var tmpy=((0.618*(0.618/1.618)*canv.height)+(canv.height*(0.618/Math.pow(1.618,2))))/1.618;
		var points=[[canv.width/1.618,canv.height],[canv.width/1.618,0],[canv.width/1.618,(0.618/1.618)*canv.height],[canv.width,(0.618/1.618)*canv.height],[tmpx,(0.618/1.618)*canv.height],[tmpx,0],[tmpx,canv.height*(0.618/Math.pow(1.618,2))],[canv.width/1.618,canv.height*(0.618/Math.pow(1.618,2))],[((0.618/1.618)*canv.width+tmpx)/1.618,canv.height*(0.618/Math.pow(1.618,2))],[((0.618/1.618)*canv.width+tmpx)/1.618,(0.618/1.618)*canv.height],[((0.618/1.618)*canv.width+tmpx)/1.618,tmpy],[tmpx,tmpy],[((((0.618/1.618)*canv.width+tmpx)/1.618)+(0.618*tmpx))/1.618,tmpy],[((((0.618/1.618)*canv.width+tmpx)/1.618)+(0.618*tmpx))/1.618,canv.height*(0.618/Math.pow(1.618,2))]];
		canv.animatePoints(points,{'stop':function() {temp1();}});
		function temp1()
		{
			canv.animateArc(canv.width/1.618,0,(canv.width/1.618)-3,Math.PI,Math.PI/2,'anticlockwise',{'stop':function() {temp2();}});
		}
		function temp2()
		{
			canv.animateArc(canv.width/1.618,(0.618/1.618)*canv.height,(canv.height)-((0.618/1.618)*canv.height)-3,Math.PI/2,0,'anticlockwise',{'stop':function() {temp3();}});
		}
		function temp3()
		{
			canv.animateArc(tmpx,(0.618/1.618)*canv.height,((0.618/1.618)*canv.height)-3,2*Math.PI,1.5*Math.PI,'anticlockwise',{'stop':function() {temp4();}});
		}
		function temp4()
		{
			canv.animateArc(tmpx,canv.height*(0.618/Math.pow(1.618,2)),(tmpx-(canv.width/1.618))-3,1.5*Math.PI,Math.PI,'anticlockwise',{'stop':function() {temp5();}});
		}
		function temp5()
		{
			canv.animateArc(((0.618/1.618)*canv.width+tmpx)/1.618,canv.height*(0.618/Math.pow(1.618,2)),((((0.618/1.618)*canv.width+tmpx)/1.618)-(canv.width/1.618))-2,Math.PI,Math.PI/2,'anticlockwise',{'stop':function() {temp6();}});
		}
		function temp6()
		{
			canv.animateArc(((0.618/1.618)*canv.width+tmpx)/1.618,tmpy,(tmpx-(((0.618/1.618)*canv.width+tmpx)/1.618))-2,Math.PI/2,0,'anticlockwise',{'stop': function() {c9_init2();}});
		}
	}
}
function c9_init2()
{
	$("#c9_img1").css('cursor', 'default');
	$("#c9_img2").css('cursor', 'pointer');
	$("#c9_img2").click(function() {
		$("#c9_img2").unbind('click');
		$('#c9_right_canv2').show();
		c9_draw2();
	});
}
function c9_draw2()
{
	var canv=document.getElementById('c9_right_canv2');
	canv.animateRect(1,1,canv.width-1,canv.height-1,{'stop': function() {draw();}});
	function draw()
	{
		var tmpx=(0.618/1.618)*(0.618/1.618)*canv.width+(canv.width/1.618);
		var tmpy=((0.618*(0.618/1.618)*canv.height)+(canv.height*(0.618/Math.pow(1.618,2))))/1.618;
		var points=[[canv.width/1.618,canv.height],[canv.width/1.618,0],[canv.width/1.618,(0.618/1.618)*canv.height],[canv.width,(0.618/1.618)*canv.height],[tmpx,(0.618/1.618)*canv.height],[tmpx,0],[tmpx,canv.height*(0.618/Math.pow(1.618,2))],[canv.width/1.618,canv.height*(0.618/Math.pow(1.618,2))],[((0.618/1.618)*canv.width+tmpx)/1.618,canv.height*(0.618/Math.pow(1.618,2))],[((0.618/1.618)*canv.width+tmpx)/1.618,(0.618/1.618)*canv.height],[((0.618/1.618)*canv.width+tmpx)/1.618,tmpy],[tmpx,tmpy],[((((0.618/1.618)*canv.width+tmpx)/1.618)+(0.618*tmpx))/1.618,tmpy],[((((0.618/1.618)*canv.width+tmpx)/1.618)+(0.618*tmpx))/1.618,canv.height*(0.618/Math.pow(1.618,2))]];
		canv.animatePoints(points,{'stop':function() {temp1();}});
		function temp1()
		{
			canv.animateArc(canv.width/1.618,0,(canv.width/1.618)-3,Math.PI,Math.PI/2,'anticlockwise',{'stop':function() {temp2();}});
		}
		function temp2()
		{
			canv.animateArc(canv.width/1.618,(0.618/1.618)*canv.height,(canv.height)-((0.618/1.618)*canv.height)-3,Math.PI/2,0,'anticlockwise',{'stop':function() {temp3();}});
		}
		function temp3()
		{
			canv.animateArc(tmpx,(0.618/1.618)*canv.height,((0.618/1.618)*canv.height)-3,2*Math.PI,1.5*Math.PI,'anticlockwise',{'stop':function() {temp4();}});
		}
		function temp4()
		{
			canv.animateArc(tmpx,canv.height*(0.618/Math.pow(1.618,2)),(tmpx-(canv.width/1.618))-3,1.5*Math.PI,Math.PI,'anticlockwise',{'stop':function() {temp5();}});
		}
		function temp5()
		{
			canv.animateArc(((0.618/1.618)*canv.width+tmpx)/1.618,canv.height*(0.618/Math.pow(1.618,2)),((((0.618/1.618)*canv.width+tmpx)/1.618)-(canv.width/1.618))-2,Math.PI,Math.PI/2,'anticlockwise',{'stop':function() {temp6();}});
		}
		function temp6()
		{
			canv.animateArc(((0.618/1.618)*canv.width+tmpx)/1.618,tmpy,(tmpx-(((0.618/1.618)*canv.width+tmpx)/1.618))-2,Math.PI/2,0,'anticlockwise',{'stop': function() {c9_init3();}});
		}
	}
}
function c9_init3()
{
	$("#c9_img2").css('cursor', 'default');
	$("#c9_img3").css('cursor', 'pointer');
	$("#c9_img3").click(function() {
		$("#c9_img3").unbind('click');
		c9_draw3();
	});
}
function c9_draw3()
{
	$("#c9_right_canv3").css('background-color', 'white');
	var canv=document.getElementById('c9_right_canv3');
	var ctx=canv.getContext('2d');
	ctx.beginPath();
	var image=$("#c9_img3")[0];
	ctx.drawImage(image,6,6,canv.width-12,canv.height-12);
	ctx.closePath();
	canv.animateRect(6,6,canv.width-6,canv.height-6,{'lineColour':'green' ,'stop': function() {$("#c9_right").show();}});
}
function level22()
{
	loadStage('mycanvas9', 'mycanvas10');
}
function tempLevel22()
{
	$("#mycanvas10 input").attr('disabled', 'disabled');
	$("#c10_link")[0].href="javascript:level23();";
	$("#c10_next > span").html("NEXT");
	$("#c10_link").unbind('click');
	$("#c10_prompt").show();
	var ratio=parseFloat($("#c10_inp")[0].value);
	if(ratio>=ratio_lowerLimit && ratio<=ratio_upperLimit)
	{
		$("#c10_prompt > span").html("That's<br/>correct!");
	}
	else
	{
		
	}
	if($("#c10_inp").val()==="")
		$("#c10_inp").val(1.618);
}
function level23()
{
	loadStage('mycanvas10', 'mycanvas11');
}

function level24()
{
	$("#mycanvas11").fadeOut(100).fadeIn(1000);
	var content='Here is the mathematical derivation of the Golden Ratio -\
	<br/><br/>\
	Two quantities are in golden ratio if:<br/><br/>\
	<img src="../assets/maths1.png" /><br/><br/>\
	Now, simplifying the fraction, <br/><br/>\
	<img src="../assets/maths2.png" /><br/>\
	<br/>\
	<a href="javascript:level25();">\
	<button type="submit" class="norm_button">\
		<span>NEXT</span>\
	</button>\
	</a>';
	$("#c11_content_right").html(content);
	$("#c11_content_right").css('float', 'left');
	$("#c11_content_xtreme_right").show();
}

function level25()
{
	$("#mycanvas11").fadeOut(100).fadeIn(1000);
	$("#c11_content_right").css('float', 'none');
	$("#c11_content_xtreme_right").hide();
	var content='The Fibonacci series is a series, where every term is the sum of the previous 2 terms(first 2 terms being 0 and 1).\
	<br/><br/>\
	1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, ...\
	<br/><br/><br/>\
	For very large values, the ratio of 2 successive terms comes close to the <b>golden ratio.</b>\
	<br/><br/>\
	<img src="../assets/maths3.png" /><br/><br/>\
	The <b>Golden Ratio</b> can also be expressed as a continued fraction -\
	<br/><br/>\
	<img src="../assets/maths6.png" /><br/><br/>\
	<a href="javascript:level26();">\
	<button type="submit" class="norm_button">\
		<span>NEXT</span>\
	</button>\
	</a>';
	$("#c11_content_right").html(content);
}

function level26()
{
	loadStage('mycanvas11', 'mycanvas12');
	$("#c12_right").load('ajax/calc.html', function() {$("#c3_calc").draggable();});
}
function fill1()
{
	$("#c12_inp1")[0].value="8.411";
}
function fill2()
{
	$("#c12_inp2")[0].value="8.411";
}
function fill3()
{
	$("#c12_inp3")[0].value="5.2";
}
function level27()
{
	$("#mycanvas12 input").attr('disabled', 'disabled');
	if($("#c12_ratio")[0].value>=ratio_lowerLimit && $("#c12_ratio")[0].value<=ratio_upperLimit)
	{
		$("#c12_prompt > span").html('You are<br/>correct!');
	}
	if($("#c12_ratio")[0].value=="")
	{
		fill1();
		fill2();
		fill3();
		$("#c12_ratio")[0].value="1.618"
	}
	$("#c12_prompt").show();
	$("#c12_link > button > span").html('NEXT');
	$("#c12_link")[0].href="javascript:level28();";
}

function level28()
{
	loadStage('mycanvas12', 'mycanvas14');
}
function init29()
{
	$("#c14_circle_container").show();
	$("#c14_link_1")[0].href="javascript:void 0;";
	$("#c14_link_2")[0].href="javascript:level29();";
	$("#c14_link_1 > button").attr('class', 'norm_button');
	$("#c14_cloud").fadeIn("slow");
	$("#c14_circle_container").resizable({aspectRatio:1, maxHeight: 270, maxWidth:270, minHeight:100, minWidth:100});
}
function level29()
{
	$("#c14_cloud").fadeOut("slow");
	$("#c14_link_2")[0].href="javascript:void 0;";
	$("#c14_link_1 > button").attr('class', 'faded_button');
	$("#c14_link_2 > button").attr('class', 'norm_button');
	
	var wd=$("#c14_circle_container").css('height');
	$("#c14_circle_container").remove();
	$("#c14_canvas_container").append('<canvas id="c14_cnvs" width="'+wd+'" height="'+wd+'" style="position:relative;"></canvas>');
	$("#c14_cnvs").animate({
		'left': '50%',
		'margin-left': -$('#c14_cnvs').width()/2
	}, 1000);
	
	var canv=document.getElementById('c14_cnvs');
	var contx=canv.getContext('2d');
	contx.fillStyle="rgb(212,236,186)";
	contx.beginPath();
	contx.arc(canv.width/2,canv.width/2,canv.width/2,0,2*Math.PI,true);
	contx.fill();
	contx.lineWidth=1;
	contx.strokeStyle="rgb(211,72,23)";
	contx.stroke();
	contx.closePath();
	
	var eq=Math.sqrt(3)*canv.width/2;
	canv.animateTriangle(canv.width/2,0,(canv.width/2)-(eq/2),(3/4)*canv.width,(canv.width/2)+(eq/2),(3/4)*canv.width,{'lineColour': 'rgb(211,72,23)', 'fill': 'fillAfter', 'fillColour': '#FAD9CD', 'stop': function() {temp();}});
	function temp()
	{
		contx.beginPath();
		contx.font="15pt Calibri";
		contx.fillStyle="black";
		contx.fillText("A", canv.width/2-15,15);
		contx.fillText("D", (canv.width/2)-(eq/2),(3/4)*canv.width-24);
		contx.fillText("E", (canv.width/2)+(eq/2)-12,(3/4)*canv.width-12);
		contx.closePath();
		$("#c14_link_3")[0].href="javascript:level30();";
	}
}

function level30()
{
	$("#c14_link_3")[0].href="javascript:void 0;";
	$("#c14_link_2 > button").attr('class', 'faded_button');
	$("#c14_link_3 > button").attr('class', 'norm_button');
	
	var canv=document.getElementById('c14_cnvs');
	var contx=canv.getContext('2d');
	var eq=Math.sqrt(3)*canv.width/2;
	canv.animateLine((canv.width/2)-(eq/4),(3/8)*canv.width,(canv.width/2)+(eq/4),(3/8)*canv.width,{'lineColour': 'rgb(211,72,23)', 'stop': function() {temp();}});
	function temp()
	{
		contx.beginPath();
		contx.font="15pt Calibri";
		contx.fillStyle="black";
		contx.fillText("B", (canv.width/2)-(eq/4)-12,(3/8)*canv.width);
		contx.fillText("F", (canv.width/2)+(eq/4)+12,(3/8)*canv.width-5);
		contx.closePath();
		$("#c14_link_4")[0].href="javascript:level31();";
	}
}

function level31()
{
	$("#c14_link_4")[0].href="javascript:void 0;";
	$("#c14_link_3 > button").attr('class', 'faded_button');
	$("#c14_link_4 > button").attr('class', 'norm_button');
	
	var canv=document.getElementById('c14_cnvs');
	var contx=canv.getContext('2d');
	var eq=Math.sqrt(3)*canv.width/2;
	canv.animateLine((canv.width/2)+(eq/4),(3/8)*canv.width,(4+Math.sqrt(15))*canv.width/8,(3/8)*canv.width,{'lineColour': 'rgb(211,72,23)', 'stop': function() {temp();}});
	function temp()
	{
		contx.beginPath();
		contx.font="15pt Calibri";
		contx.fillStyle="black";
		contx.fillText("C", (4+Math.sqrt(15))*canv.width/8-10,(3/8)*canv.width-10);
		contx.closePath();
		$('#c14_cnvs').css({'left': '0px', 'margin-left': '0px'});
		$('#c14_canvas_container').attr('align', 'center');
		$('#c14_canvas_container').append('<div style="clear:right"><b>BF:FC = BC:BF = </b><input id="c14_ratio" type="text" maxlength="5" /></div>');
		$('#c14_next').show();
	}
}

function level32()
{
	$("#mycanvas14 input").attr('disabled', 'disabled');
	$("#c14_prompt").show();
	$("#c14_link")[0].href="javascript:level33();";
	$("#c14_link > button >span").html('NEXT');
	var ratio=parseFloat($("#c14_ratio")[0].value);
	if(ratio>=ratio_lowerLimit && ratio <=ratio_upperLimit)
	{
		
	}
	else
	{
		$("#c14_prompt > button > span").html('The correct<br/>ratio is<br/>1.618');
	}
	if($("#c14_ratio").val()==="")
		$("#c14_ratio").val(1.618);
}
function level33()
{
	var userRect=sessionStorage.rect_size;
	$("#c15_userRect").css({'width': rect_sides[userRect-1][0]+'px', 'height': rect_sides[userRect-1][1]+'px'});
	$("#mycanvas14").fadeOut(100);
	setTimeout(function() {
		$("#mycanvas14").remove();
	}, 500);
	if(userRect>5)
	{
		$("#mycanvas15").fadeIn(1000);
		$("#c15_goldenRect").css({'width': '111px', 'height': '180px'})
	}
	if(userRect==4 || userRect==7)
	{
		$("#mycanvas15").fadeIn(1000);
		$("#c15_prompt > button > span").html('You were very close to the<br/>golden rectangle. Most<br/>people consider it as the<br/>most appealing rectangle.');
	}
	else if(userRect==5 || userRect==6)
	{
		$("#mycanvas15").fadeIn(1000);
		$("#c15_prompt > button > span").html('You chose exactly the<br/>golden rectangle. Most<br/>people consider it as the<br/>most appealing rectangle.');
	}
	else
	{
		level34();
	}
}
function level34()
{
	loadStage('mycanvas15', 'mycanvas16');
}
function endGame()
{
	score=1;
	clearInterval(pidTimer);
	completed=1;
}


function clearCanvas()
{
	context.clearRect(0,0,canvas.width,canvas.height);
	$('#mycanvas1 > div').map(function(){
		$("#"+this.id).remove();
	});
}


function move()
{
	var top_hl1=$("#hl1_wrap").css('top');
	var top_hl2=$("#hl2_wrap").css('top');
	var d1=parseInt(top_hl1.substr(0,top_hl1.length-2));
	var d2=parseInt(top_hl2.substr(0,top_hl2.length-2));
	
	$("#dist12").css('top', Math.ceil((196+d1+d2)/2)+"px");  //setting zero errors by adding 22 to 1200
	$("#dist12").html(Math.abs(d1-d2-24));   //setting zero error by subtracting 15 (by trial)
}
function vert_move()
{
	var left_vl1=$("#vl1_wrap").css('left');
	var left_vl2=$("#vl2_wrap").css('left');
	var d1=parseInt(left_vl1.substr(0,left_vl1.length-2));
	var d2=parseInt(left_vl2.substr(0,left_vl2.length-2));
	
	$("#distv12").css('left', Math.ceil((1310+d1+d2)/2)+"px");  //setting zero errors by adding 22 to 1200
	$("#distv12").html(Math.abs(d1-d2-16));   //setting zero error by subtracting 15 (by trial)
}

function move_c5()
{
	var top_hl1=$("#c5_hl1_wrap").css('top');
	var top_hl2=$("#c5_hl2_wrap").css('top');
	var d1=parseInt(top_hl1.substr(0,top_hl1.length-2));
	var d2=parseInt(top_hl2.substr(0,top_hl2.length-2));
	
	$("#c5_dist12").css('top', Math.ceil((d1+d2)/2)+"px");  //setting zero errors by adding 22 to 1200
	$("#c5_dist12").html(Math.abs(d1-d2));   //setting zero error by subtracting 15 (by trial)
}
function move_c8()
{
	var top_hl1=$("#c8_hl1_wrap").css('top');
	var top_hl2=$("#c8_hl2_wrap").css('top');
	var d1=parseInt(top_hl1.substr(0,top_hl1.length-2));
	var d2=parseInt(top_hl2.substr(0,top_hl2.length-2));
	
	$("#c8_dist12").css('top', Math.ceil((d1+d2)/2)+"px");  //setting zero errors by adding 22 to 1200
	$("#c8_dist12").html(Math.abs(d1-d2));   //setting zero error by subtracting 15 (by trial)
}
function vert_move_c8()
{
	var left_vl1=$("#c8_vl1_wrap").css('left');
	var left_vl2=$("#c8_vl2_wrap").css('left');
	var d1=parseInt(left_vl1.substr(0,left_vl1.length-2));
	var d2=parseInt(left_vl2.substr(0,left_vl2.length-2));
	
	$("#c8_distv12").css('left', Math.ceil((d1+d2)/2)+"px");  //setting zero errors by adding 22 to 1200
	$("#c8_distv12").html(Math.abs(d1-d2));   //setting zero error by subtracting 15 (by trial)
}

function toggleLine()
{
	$("#hl1_wrap").toggle();
	$("#hl2_wrap").toggle();
	$("#vl1_wrap").toggle();
	$("#vl2_wrap").toggle();
	$("#dist12").toggle();
	$("#distv12").toggle();
	if($("#hl1_wrap").css("display")=="none")
	{
		$("#c3_bottom").css("top", "25px");
	}
	else
	{
		$("#c3_bottom").css("top", "-30px");
	}
}
function toggleLine_c5()
{
	$("#c5_hl1_wrap").toggle();
	$("#c5_hl2_wrap").toggle();
	$("#c5_dist12").toggle();
}
function toggleLine_c8()
{
	$("#c8_hl1_wrap").toggle();
	$("#c8_hl2_wrap").toggle();
	$("#c8_dist12").toggle();
}

function toggleCalc()
{
	$("#c3_calc_form").toggle();
}

function toggleCalc_c5()
{
	$("#c5_calc_form").toggle();
}

function toggleCalc_c8()
{
	$("#c8_calc_form").toggle();
}



/* CALCULATOR FUNCTIONS */

function func()
{
	document.calc.ans.value=eval(document.calc.ans.value).toFixed(3);
	tmp=0;
}

function mycalc(x)
{
	if(tmp==0)
	{
		if(x=='/'||x=='*'||x=='+'||x=='-')
		{
			tmp=1;	
		}
		else
		{
			document.calc.ans.value='';
			tmp=1;
		}
		
	}
	document.calc.ans.value+=x;
}

function animateLine(x1,y1,x2,y2,callbackFunc)
{
	var canv=document.getElementById('c14_cnvs');
	var contx=canv.getContext('2d');
	contx.moveTo(x1,y1);
	var data=[];
	var i=0;
	data[0]=new Array();
	data[1]=new Array();
	var xInt=(x2-x1)/100;
	var yInt=(y2-y1)/100;
	for(i=0;i<=100;i++)
	{
		data[0][i]=x1+(i*xInt);
		data[1][i]=y1+(i*yInt);
	}
	
	i=0;
	var length=data[0].length;
	var id = setInterval(function(){
		contx.lineTo(data[0][i],data[1][i]);
		contx.stroke();
		if(i++===length)
		{
			clearInterval(id);
			callbackFunc();
		}
	},10);
}
function numberInput(id)
{
	$("#"+id).keydown(function() {
		// Allow: backspace, delete, tab, escape, and enter
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
             // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) || 
             // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ) && (event.keyCode!=190)) {
                event.preventDefault(); 
            }
		}
	});
}
function loadStage(id1, id2)
{
	$("#"+id1).fadeOut(100);
	setTimeout(function() {
		$("#"+id1).remove();
	}, 500);
	$("#"+id2).fadeIn(1000);
}
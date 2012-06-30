var bg1,bg2,bg3;
var min=5;
var sec=0;
var tid;
var guess=0, guessTime=6000; //for checking if he makes random guesses
var helpTime=15000;
var blinkTime=59; //seconds before the timer should start blinking (should be less than 60)
var timerRunning=false;
var blinkDeal;
var timerBlink;
var tmp=1; // for Calculator
var total1=458, total2=255.5, total3=490; //total money for each shop
var shopCloseImg, noMoneyImg, goodJobImg, finalImg1, finalImg2;

//for returning final value on exit
var totalTimeTaken=1, completed=0, score="", extraParameters="game left incomplete";

//Images of items
// s1 means shop 1, i1 denotes item 1 thus s2.i3 means item 3 in shop 2
var itemImages={};
itemImages.s1={};
itemImages.s2={};
itemImages.s3={};
itemImages.s1.i1={};
itemImages.s1.i2={};
itemImages.s1.i3={};
itemImages.s1.i4={};

itemImages.s1.i1={sx1:1, sy1:201, w1:176, h1:135, sx2:1, sy2:201, w2:176, h2:135};
itemImages.s1.i2={sx1:0, sy1:402, w1:120, h1:134, sx2:0, sy2:401, w2:120, h2:134};
itemImages.s1.i3={sx1:796, sy1:201, w1:150, h1:153, sx2:796, sy2:201, w2:150, h2:153};
itemImages.s1.i4={sx1:301, sy1:402, w1:120, h1:133, sx2:301, sy2:402, w2:120, h2:133};

itemImages.s2.i1={sx1:1301, sy1:2, w1:184, h1:134, sx2:1301, sy2:2, w2:184, h2:134};
itemImages.s2.i2={sx1:601, sy1:402, w1:120, h1:134, sx2:601, sy2:402, w2:120, h2:134};
itemImages.s2.i3={sx1:601, sy1:201, w1:100, h1:129, sx2:601, sy2:201, w2:100, h2:129};
itemImages.s2.i4={sx1:1304, sy1:200, w1:130, h1:129, sx2:1304, sy2:200, w2:130, h2:129};

itemImages.s3.i1={sx1:1003, sy1:403, w1:222, h1:133, sx2:1003, sy2:403, w2:222, h2:133};
itemImages.s3.i2={sx1:301, sy1:1, w1:184, h1:133, sx2:301, sy2:1, w2:184, h2:133};
itemImages.s3.i3={sx1:1005, sy1:212, w1:216, h1:100, sx2:301, sy2:201, w2:205, h2:138};
itemImages.s3.i4={sx1:1012, sy1:0, w1:167, h1:129, sx2:812, sy2:400, w2:128, h2:129};

$(document).ready(function() {
	$("#overlay1").fadeTo(1000,0.1).fadeTo(1000,0.7);
	$("#overlay2").fadeTo(1000,0.1).fadeTo(1000,0.7);
	$("#overlay3").fadeTo(1000,0.1).fadeTo(1000,0.7);
	setInterval(function() {
		$("#overlay1").fadeTo(1000,0.1).fadeTo(1000,0.7);
		$("#overlay2").fadeTo(1000,0.1).fadeTo(1000,0.7);
		$("#overlay3").fadeTo(1000,0.1).fadeTo(1000,0.7);
	}, 2000);
	$("#overlay1").click(function() {
		loadRules('1');
	});
	$("#overlay2").click(function() {
		loadRules('2');
	});
	$("#overlay3").click(function() {
		loadRules('3');
	});
	//$(".map").maphilight();
	sessionStorage.clear();
	localStorage.clear();
});

function onXMLload()
{
	$(document).ready(function() {
		$("#frontpage_bg")[0].src=miscArr['frontPageBg'];
		document.title=miscArr['title'];
	});
}

//function to be called when user clicks '=' in calculator
function func()
{
	var finalAns=eval(document.calc.ans.value);
	finalAns=finalAns.toString();
	if(finalAns.indexOf('.')!=-1)
	{
		finalAns=parseFloat(finalAns).toFixed(2);
	}
	tmp=0;
	$('#roughWork').append('='+finalAns+'<br>');
	$("#ans").val(finalAns);
}

//disabling entry via keyboard in calculator
function calcKey(e)
{
	e.preventDefault();
	/*if(((e.keyCode>=48 && e.keyCode<=57) || (e.keyCode>=96 && e.keyCode<=105)) && (e.shiftKey==false))
	{
		$('#roughWork').append(e.keyCode-48);
	}
	else if (e.shiftKey==true && (e.keyCode==187 || e.keyCode==56))
	{
		if(e.keyCode==187)
			$('#roughWork').append('+');
		if(e.keyCode==189)
			$('#roughWork').append('-');
		if(e.keyCode==56)
			$('#roughWork').append('*');
	}
	else if (e.keyCode==189)
	{
		$('#roughWork').append('-');
	}
	else if (e.keyCode==191)
	{
		$('#roughWork').append('/');
	}
	else if (e.keyCode==187 || e.keyCode==13)
	{
		$("#ans").val('');
	}
	else
	{
		window.event.preventDefault();
	}*/
}
function mycalc(x)
{
	if(tmp==0)
	{
		if(x=='/'||x=='*'||x=='+'||x=='-')
		{
			tmp=1;
			$('#roughWork').append(document.calc.ans.value);
			$('#roughWork').animate({ scrollTop: $(document).height() }, "slow");
		}
		else
		{
			document.calc.ans.value='';
			tmp=1;
			$('#roughWork').animate({ scrollTop: $(document).height() }, "slow");
		}
		
	}
	document.calc.ans.value+=x;
	$('#roughWork').append(x);
}
function toggleCalc()
{
	$('#calc').toggle();
	document.calc.ans.value='';
	var curhtml=$("#roughWork").html().trim();
	if(curhtml.length>4)
	{
		if(curhtml.slice(curhtml.length-4,curhtml.length)==="<br>")
		{
			
		}
		else
		{
			$('#roughWork').append('<br/>');
		}
	}
}

function startTimer()
{
	timerRunning=true;
	tid=setInterval(function() {
		if(sec==blinkTime && min==0)
		{
			$("#timeLeft").fadeOut(900).fadeIn(900);
			$("#timeLeft").css('color', 'red');
			timerBlink=setInterval(function() {
				$("#timeLeft").fadeOut(900).fadeIn(900);
			}, 1800);
		}
		totalTimeTaken=300-((min*60)+sec);
		
		if(sec===0)
		{
			$('#timerSec').html('0'+sec);
			if(min<=9)
			{
				$('#timerMin').html('0'+min);
			}
			else
			{
				$('#timerMin').html(min);
			}
			sec=59;
			min-=1;
			if(min===-1)
			{
				clearInterval(tid);
				endGame('noTime');
			}
		}
		else if(sec===59)
		{
			$('#timerSec').html(sec--);
			if(min<=9)
			{
				$('#timerMin').html('0'+min);
			}
			else
			{
				$('#timerMin').html(min);
			}
		}
		else
		{
			if(sec<=9)
			{
				$('#timerSec').html('0'+sec);
			}
			else
			{
				$('#timerSec').html(sec);
			}
			sec=sec-1;
		}
	}, 1000);
}
function pauseTimer()
{
	timerRunning=false;
	clearInterval(tid);
}
function resumeTimer()
{
	if(!timerRunning)
		startTimer();
}


function loadImages()
{
	bg1=new Image();
	bg1.src=miscArr['Shop1Bg'];
	bg2=new Image();
	bg2.src=miscArr['Shop2Bg'];
	bg3=new Image();
	bg3.src=miscArr['Shop3Bg'];
	bg1.width="800";
	bg2.width="800";
	bg3.width="800";
	bg1.height="600";
	bg2.height="600";
	bg3.height="600";
	$('body > script').remove();
	setTimeout(function() {
		shopCloseImg=new Image();
		noMoneyImg=new Image();
		goodJobImg=new Image();
		finalImg1=new Image();
		finalImg2=new Image();
		shopCloseImg.src=miscArr['timeUpImg'];
		noMoneyImg.src=miscArr['noMoneyImg'];
		goodJobImg.src=miscArr['goodJobImg'];
		finalImg1.src="../assets/money-man.png";
		finalImg2.src="../assets/lady-diana.png";
		shopCloseImg.width=150;
		shopCloseImg.height=120;
	},1000);
}

function loadRules(shopId)
{
	sessionStorage.correct="0";
	sessionStorage.wrong=0;
	sessionStorage.help=0;
	sessionStorage.roughWork="";
	sessionStorage.helpItems="";
	sessionStorage.correctItems="";
	sessionStorage.wrongItems="";
	//$('body').css('overflow', 'hidden');
	$("#mainBody").fadeTo("slow", 0.9);
	$("#gameRules").fadeIn("slow");
	$("#rules_content > button").attr('onclick', 'loadStage("'+shopId+'")');
	if(typeof(Storage)!=="undefined")
	{
		sessionStorage.shop=shopId;
		if(shopId==="1")
			sessionStorage.shopTotal=total1;
		else if(shopId==="2")
			sessionStorage.shopTotal=total2;
		else if(shopId==="3")
			sessionStorage.shopTotal=total3;
		
		sessionStorage.money=sessionStorage.shopTotal;
		$("#moneyCount").html(roundInt(sessionStorage.shopTotal));
		$("#rules_content li")[0].innerHTML=instArr['i201'];
		$("#rules_content li")[1].innerHTML=instArr['i202'];
		$("#rules_content li")[2].innerHTML=instArr['i203'];
		$("#rules_content li")[3].innerHTML=instArr['i204'];
		$("#rules_content > p")[0].innerHTML=instArr['i205shop'+sessionStorage.shop];
		$("#rules_content > p")[1].innerHTML=instArr['i206'];
	}
}

function loadStage(shopId)
{
	$("#timeText").html(miscArr['timeText']);
	$("#moneyText").html(miscArr['moneyText']);
	$("#dealHeader > p").html(miscArr['dealHeader']);
	$("#helpName > h2").html(miscArr['helpText']);
	$("#itemHeader").html(miscArr['itemHeader']);
	//$('body').css('overflow', 'auto');
	showOnlyItemBar();
	
	$("#imgDeal1")[0].width=$("#deal1img").width();
	$("#imgDeal1")[0].height=$("#deal1img").height();
	$("#imgDeal2")[0].width=$("#deal2img").width();
	$("#imgDeal2")[0].height=$("#deal2img").height();
	
	if(shopId==='1')
		$("#mainStage").css('background', 'url("'+bg1.src+'")');
	else if(shopId==='2')
		$("#mainStage").css('background', 'url("'+bg2.src+'")');
	else if(shopId==='3')
		$("#mainStage").css('background', 'url("'+bg3.src+'")');
	
	var childItem=$(".eachItem").children("p");
	for(i=0;i<4;i++)
	{
		childItem[i].innerHTML=miscArr['shop'+sessionStorage.shop+'item'+(i+1)];
	}
}

//function called when user clicks on a item
function checkImg(iD, itemId)
{
	moveItemBar();
	setTimeout(function() {
		sessionStorage.currentItem=itemId;
		guess=1;
		setTimeout(function() {
			guess=0;
		}, guessTime);
		$(".eachItem > p").css('color', 'black');
		$(".eachItem > p")[itemId-1].style.color="red";
		$("#helpDisplay").hide();
		
		//clear blinking of selected deal
		clearInterval(blinkDeal);
		//for additional security purposes
		setTimeout(function() {
			$("#deal1").show();
			$("#deal2").show();
		}, 1000);
		resumeTimer();
		$("#display").html('');
		iD.src="../assets/check.png"
		$("#deal1txt").html(quesArr['s'+sessionStorage.shop+'i'+itemId+'d1']);
		$("#deal2txt").html(quesArr['s'+sessionStorage.shop+'i'+itemId+'d2']);
		var canvas1=$("#imgDeal1")[0];
		var canvas2=$("#imgDeal2")[0];
		img1=new Image();
		img1.src="../assets/objects.png";
		img2=new Image();
		img2.src="../assets/objects.png";
		
		if(sessionStorage.shop=="1")
			shopObj="s1";
		else if(sessionStorage.shop=="2")
			shopObj="s2";
		else
			shopObj="s3";
		itemObj="i"+itemId;
		
		img1.onload=function() {
			drawImg(canvas1,img1,itemImages[shopObj][itemObj]['sx1'],itemImages[shopObj][itemObj]['sy1'],itemImages[shopObj][itemObj]['w1'],itemImages[shopObj][itemObj]['h1']);
		};
		img2.onload=function() {
			drawImg(canvas2,img2,itemImages[shopObj][itemObj]['sx2'],itemImages[shopObj][itemObj]['sy2'],itemImages[shopObj][itemObj]['w2'],itemImages[shopObj][itemObj]['h2']);
		};
		
		$("#deal1Amt").val(quesArr['s'+sessionStorage.shop+'i'+itemId+'d1Val']);
		$("#deal2Amt").val(quesArr['s'+sessionStorage.shop+'i'+itemId+'d2Val']);
		if(parseFloat(quesArr['s'+sessionStorage.shop+'i'+itemId+'d1Val']) > parseFloat(quesArr['s'+sessionStorage.shop+'i'+itemId+'d2Val']))
			$("#dealCorrect").val('d2');
		else if(parseFloat(quesArr['s'+sessionStorage.shop+'i'+itemId+'d1Val']) < parseFloat(quesArr['s'+sessionStorage.shop+'i'+itemId+'d2Val']))
			$("#dealCorrect").val('d1');
		else
			$("#dealCorrect").val('both');
		
		disableItemClick();
		enableDealClick();
		enableHelp(itemId);
		enableCalc();
		clearRough();
	}, 1000);
}
function clearRough()
{
	// if needed we can store the rough work done by the student here
	sessionStorage.roughWork=sessionStorage.roughWork+$("#roughWork").html();
	$("#roughWork").html('');
}
function drawImg(canvas,image,sx,sy,w,h)
{
	canvas.width="180";
	canvas.height="130";
	var context=canvas.getContext('2d');
	context.beginPath();
	context.drawImage(image,sx,sy,w,h,0,0,canvas.width,canvas.height);
	context.closePath();
}
function disableItemClick()
{
	$(".eachItem > img").attr('onclick', 'void 0;');
}
function enableDealClick()
{
	$("#deal1").css('cursor', 'pointer');
	$("#deal2").css('cursor', 'pointer');
	$("#deal1").click(function() {
		onDealClick('d1');
	});
	$("#deal2").click(function() {
		onDealClick('d2');
	});
}
function enableItemClick()
{
	$(".eachItem > img").each(function(i,element) {
		if($(element).attr('src').search('un')!==-1) {
			$(element).attr('onclick', 'checkImg(this,'+(i+1)+')');
		}
	});
}
function onDealClick(deal)
{
	$("#calc").hide();
	
	if(guess===1)
	{
		$("#display").html(promptArr['guess']);
		$("#display").attr('class', 'spin');
		$("#display").css('color', '#BD0808');
		setTimeout(function() {
			$("#display").attr('class', '');
			if($("#display").html()==promptArr['guess'])
			{
				$("#display").html('');
			}
		}, 2000);
		return;
	}
	
	$("#helpDisplay").hide();
	pauseTimer();
	
	//for blinking of selected deal
	var dealId, dealAmt;
	if(deal=="d1")
	{
		dealId="deal1";
		dealAmt="deal1Amt";
	}
	else
	{
		dealId="deal2";
		dealAmt="deal2Amt";
	}
	$("#"+dealId).fadeOut(800).fadeIn(800);
	blinkDeal=setInterval(function() {
		$("#"+dealId).fadeOut(800).fadeIn(800);
	}, 2000);
	
	if($("#dealCorrect").val()==deal || $("#dealCorrect").val()=="both")
	{
		//case when he selects correct deal
		sessionStorage.currentAns=1;
		sessionStorage.correctItems+="Shop "+sessionStorage.shop+" Item "+sessionStorage.currentItem+";  ";
		sessionStorage.correct=parseInt(sessionStorage.correct)+1;
		$("#display").html(promptArr['correctAnsPrompt']);
		if($("#dealCorrect").val()=="both")
		{
			$("#display").html(promptArr['bothCorrect']);
		}
		if(checkIfLast()===1)
		{
			$("#display").html(promptArr['lastCorrectAns']);
		}
		$("#display").attr('class', 'spin');
		$("#display").css('color', '#087C08');
		setTimeout(function() {
			$("#display").attr('class', '');
		}, 2000);
	}
	else
	{
		//case when he selects wrong deal
		sessionStorage.currentAns=0;
		sessionStorage.wrongItems+="Shop "+sessionStorage.shop+" Item "+sessionStorage.currentItem+";  ";
		sessionStorage.wrong=parseInt(sessionStorage.wrong)+1;
		$("#display").html(promptArr['wrongAnsPrompt']);
		if(checkIfLast()===1)
		{
			$("#display").html(promptArr['lastWrongAns']);
		}
		$("#display").attr('class', 'spin');
		$("#display").css('color', '#BD0808');
		setTimeout(function() {
			$("#display").attr('class', '');
		}, 1500);
	}
	
	if(sessionStorage.money>=parseFloat($("#"+dealAmt).val()))
	{
		sessionStorage.money-=parseFloat($("#"+dealAmt).val());
		if(sessionStorage.correct=="4" && sessionStorage.wrong=="0")
		{
			setTimeout(function() {
				endGame('win');
			}, 2500);
			return;
		}
	}
	else
	{
		/*setTimeout(function() {
			endGame('noMoney');
		}, 2500);*/
		endGame('noMoney');
		return;
	}
	$("#moneyCount").html(roundInt(sessionStorage.money));
	
	$(".deal").unbind('click'); //disable click on deal items
	$(".deal").css('cursor', 'default');
	setTimeout(function() {
		showOnlyItemBar();
		enableItemClick();
		disableCalc();
		disableHelp();
	}, 6000);
}
function disableCalc()
{
	$("#calc").hide();
	$("#calcIcon > img").attr('onclick', '');
	$("#calcIcon > img").css('cursor', 'default');
}
function enableCalc()
{
	$("#calcIcon > img").attr('onclick', 'toggleCalc()');
	$("#calcIcon > img").css('cursor', 'pointer');
}
function disableHelp()
{
	$("#help").unbind('click');
	$("#help").css('cursor', 'default');
}
function enableHelp(itemId)
{
	sessionStorage.helpText=promptArr['s'+sessionStorage.shop+'i'+itemId+'h'];
	var tmpStrArr=sessionStorage.helpText.split("**");
	sessionStorage.helpList=JSON.stringify(tmpStrArr);
	$("#help").css('cursor', 'pointer');
	
	$("#help").click(function() {
		sessionStorage.help=parseInt(sessionStorage.help)+1;
		if(sessionStorage.help>2)
		{
			disableHelp();
			$("#helpDisplay").show();
			$("#helpDisplay").html(promptArr['noHelp']);
			$("#helpDisplay").css('color', 'red');
		}
		else
		{
			sessionStorage.currentHelp=0;
			getHelp(0,sessionStorage.currentItem);
			$("#help").css('cursor', 'default');
			$("#help").unbind('click');
		}
	});
}
function getHelp(helpId, itemId)
{
	//alert(itemId+'-------'+sessionStorage.currentItem);
	if(itemId!=sessionStorage.currentItem)
		return;
	
	sessionStorage.helpItems+="Shop "+sessionStorage.shop+" Item "+itemId+";  ";
	if(helpId>=JSON.parse(sessionStorage.helpList).length)
	{
		//alert('last hint');
		//case checked for below
	}
	else if(parseInt(sessionStorage.currentHelp)==parseInt(helpId))
	{
		$("#helpDisplay").show();
		$("#helpDisplay").fadeOut('slow').fadeIn('slow');
		$("#helpDisplay").css('color', 'black');
		$("#helpDisplay").html('<br/>'+JSON.parse(sessionStorage.helpList)[helpId]);
		sessionStorage.currentHelp=helpId+1;
		var oldItemId=sessionStorage.currentItem;
		setTimeout(function() {
			//alert(sessionStorage.currentItem);
			getHelp(helpId+1,oldItemId);
		}, helpTime);
		if((helpId+1)==JSON.parse(sessionStorage.helpList).length)
		{
			//last hint
			$("#helpDisplay").append('<br/><br/>');
		}
		else
		{
			$("#helpDisplay").append('<br><a href="javascript:getHelp('+(helpId+1)+','+sessionStorage.currentItem+');">Show Next hint</a><br/><br/><br/>');
		}
	}
}
function checkIfLast()
{
	if(parseInt(sessionStorage.correct)+parseInt(sessionStorage.wrong)===4)
		return 1
	else
		return 0;
}
function endGame(endHow)
{
	/********************************************************
	Returns "noMoney", "noTime" or "win": Do not change this values, as it is also the attribute name in XML
	********************************************************/
	clearInterval(blinkDeal);
	setTimeout(function() {
		$("#deal1").show();
		$("#deal2").show();
	}, 1000);
	disableHelp();
	disableCalc();
	$("#helpDisplay").hide();
	$(".eachItem > p").css('color', 'black');
	
	if(endHow==="noTime")
	{
		$(".deal").remove();
		$("#dealScreen").attr('align', 'center');
		$("#dealScreen").attr('class', 'gameEndDealScreen');
		$("#dealScreen").html('<br/>');
		$("#dealScreen").append(promptArr[endHow]);
		$("#dealScreen").hide();
		$("#dealScreen").fadeIn("slow");
		document.getElementById("display").appendChild(shopCloseImg);
		$("#display > img").css({'margin-top': '11%', 'margin-left': '-12%'});
		$("#display").attr('class', 'spin');
		setTimeout(function() {
			$("#display").attr('class', '');
		}, 1500);
	}
	else if(endHow==="noMoney")
	{
		$("#dealScreen").attr('align', 'center');
		$("#dealScreen").html('<br/><br/>');
		document.getElementById("dealScreen").appendChild(noMoneyImg);
		$("#dealScreen").hide();
		$("#dealScreen").fadeIn("slow");
		if(sessionStorage.currentAns==="1")
		{
			$("#display").css('color', '#087C08');
			$("#display").html(promptArr['noMoneyCorrect']);
		}
		else
		{
			$("#display").css('color', '#BD0808');
			$("#display").html(promptArr['noMoneyWrong']);
		}
		$("#display").attr('class', 'spin');
		setTimeout(function() {
			$("#display").attr('class', '');
		}, 1500);
	}
	else if(endHow==="win")
	{
		$("#dealScreen").attr('align', 'center');
		$("#dealScreen").attr('class', 'gameEndDealScreen');
		$("#dealScreen").html('<br/>');
		document.getElementById("dealScreen").appendChild(goodJobImg);
		$("#dealScreen").hide();
		$("#dealScreen").fadeIn("slow");
		$("#display").html(promptArr['s'+sessionStorage.shop+endHow]);
		$("#display").attr('class', 'spin');
		$("#display").css('color', '#BD0808');
		setTimeout(function() {
			$("#display").attr('class', '');
		}, 1500);
		$("#item").html('');
		$("#rough").html('');
		$("#rough").attr('class', 'gameEndRough');
		document.getElementById("item").appendChild(finalImg2);
		document.getElementById("rough").appendChild(finalImg1);
		$("#item").css({'background-color': 'transparent', 'border': 'none'});
		$("#rough").css({'background-color': 'transparent', 'border': 'none'});
		//initsnow();
	}
	setTimeout(sendData, 2000);
}
function sendData()
{
	extraParameters="correct Answers: "+sessionStorage.correctItems+"||wrong Answers: "+sessionStorage.wrongItems+"|| Help Items: "+sessionStorage.helpItems+"|| Rough Work: "+sessionStorage.roughWork;
	completed=1;
}

function roundInt(n)
{
	n=parseFloat(n);
	return n.toFixed(2);
}
function moveItemBar() {
	$(".item").animate({
		'top': '60%',
		'left': '1%'
	}, 900, function() {
		$(".item").removeClass('screenCentered');
		$(".item").attr('id', 'item');
		$("#item").removeAttr('style');
		$("#item").removeClass('item');
		$("#mainBody").remove();
		$("#gameRules").remove();
		$("#gameParameters").show();
		$("#dealScreen").show();
		$("#helpName").show();
		$("#help").show();
		$("#helpDisplay").show();
		$("#displayContent").show();
		$("#rough").show();
	});
}
function showOnlyItemBar() {
	$("#mainBody").remove();
	$("#gameRules").remove();
	$("#mainStage").show();
	$("#gameParameters").hide();
	$("#dealScreen").hide();
	$("#helpName").hide();
	$("#help").hide();
	$("#helpDisplay").hide();
	$("#displayContent").hide();
	$("#rough").hide();
	$("#item").addClass('screenCentered');
	$("#item").addClass('item');
	$(".item").removeAttr('id');
	
	var t;
	$(".eachItem").each(function(index,element) {
		t=$(element);
		imgSrc=t.find('img')[0].src;
		if(imgSrc.indexOf('uncheck')!==-1) {
			for(j=0;j<3;j++) {
				t.fadeOut(500).fadeIn(500);
			}
		}
	});
}
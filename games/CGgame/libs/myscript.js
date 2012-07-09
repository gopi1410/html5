var tempCharArr=[];
var charArr=[];
var imgDoorStatic, imgDoorGif;
var help1Obj, help2Obj, help3Obj, help4Obj, stage1LastPoint;
var allowedError=0.1; //used in stage 1 ques 3 & stage2; allowed error for the distance between points.

//variables to be read by iframe
var totalTimeTaken=1, score="", completed=0, extraParameters="";
//valid set of points in the quadrants
var quad1=[[8,8], [8,7], [8,6], [8,5], [8,4], [8,3], [8,2], [7,8], [7,7], [7,6], [7,5], [7,4], [7,3], [7,2], [6,8], [6,7], [6,6], [6,5], [6,4], [6,3], [5,8], [5,7], [5,6], [5,5], [4,8], [4,7], [4,6], [3,8], [3,7], [3,6]];
var quad2=[[8,-8], [8,-7], [8,-6], [8,-5], [8,-4], [8,-3], [8,-2], [7,-8], [7,-7], [7,-6], [7,-5], [7,-4], [7,-3], [7,-2], [6,-8], [6,-7], [6,-6], [6,-5], [6,-4], [6,-3], [5,-8], [5,-7], [5,-6], [5,-5], [4,-8], [4,-7], [4,-6], [3,-8], [3,-7], [3,-6]];
var quad3=[[-8,-8], [-8,-7], [-8,-6], [-8,-5], [-8,-4], [-8,-3], [-8,-2], [-7,-8], [-7,-7], [-7,-6], [-7,-5], [-7,-4], [-7,-3], [-7,-2], [-6,-8], [-6,-7], [-6,-6], [-6,-5], [-6,-4], [-6,-3], [-5,-8], [-5,-7], [-5,-6], [-5,-5], [-4,-8], [-4,-7], [-4,-6], [-3,-8], [-3,-7], [-3,-6]];
var quad4=[[-8,8], [-8,7], [-8,6], [-8,5], [-8,4], [-8,3], [-8,2], [-7,8], [-7,7], [-7,6], [-7,5], [-7,4], [-7,3], [-7,2], [-6,8], [-6,7], [-6,6], [-6,5], [-6,4], [-6,3], [-5,8], [-5,7], [-5,6], [-5,5], [-4,8], [-4,7], [-4,6], [-3,8], [-3,7], [-3,6]];
var question2Point=[];
function makeQues2Points() {
	for(i=-9;i<=-6;i++) {
		question2Point.push([i,1], [i,-1], [-i,1], [-i,-1]);
	}
	for(i=1;i<=3;i++) {
		question2Point.push([-5,i], [-5,-i], [5,i], [5,-i]);
	}
	for(i=1;i<=4;i++) {
		question2Point.push([-4,i], [-4,-i], [4,i], [4,-i]);
	}
	for(i=1;i<=5;i++) {
		question2Point.push([-3,i], [-2,i], [-3,-i], [-2,-i], [3,i], [2,i], [3,-i], [2,-i]);
	}
	for(i=1;i<=9;i++) {
		question2Point.push([1,i], [1,-i], [-1,i], [-1,-i]);
	}
}

$(document).ready(function() {
	sessionStorage.clear();
	localStorage.clear();
	sessionStorage.wrong=0;
	sessionStorage.correct=0;
	sessionStorage.attempts=0;
	sessionStorage.currentPoint="";
	sessionStorage.secondPoint="";
	sessionStorage.helps="";
	sessionStorage.end="";
	makeQues2Points();
	setTimeout(loadImages, 2000);
	setInterval(function() {
		totalTimeTaken+=3;
	},3000);
});
function onXMLload() {
	$(document).ready(function() {
		document.title=miscArr.title;
        
        $("#mainHeader > h1").html(miscArr.frontpageHeader);
        $("#mainText").html(miscArr.frontpageText);
        $("#startButton > button > span").html(miscArr.startButtonText);
		$("#startButton > button").focus();
        
        initScientist();
	});
}
function loadImages() {
	imgDoorStatic=new Image();
	imgDoorGif=new Image();
	imgDoorStatic.src="../assets/door.png";
	imgDoorGif.src="../assets/door.gif";
	imgDoorStatic.width=imgDoorGif.width="490";
	imgDoorStatic.height=imgDoorGif.height="600";
}

function startGame() {
    loadStage("main1","stage1");
	$("#prompt1 > button:last").hide();
	$("#prompt1 > p").html("<br>"+instArr.inst1);
	$("#prompt1 span:first").html(miscArr.proceedButtonText1);
	setTimeout(function() {
		$("#prompt1 > button:first").focus();
	}, 1000);
}
function proceed1() {
	$("#prompt1").fadeOut(1000);
	$("#coordinatesDisp").fadeIn(2000, function() {
		activateClick();
	});
	$("#questionDisp").fadeIn(1000);
	$("#questionDisp").html(quesArr.q1);
	$(".point:lt(3)").show();
	setPoints();
}
function correctPoint() {
	sessionStorage.correct=parseInt(sessionStorage.correct, 10)+1;
	$("#prompt1 span").css('width', '90px');
	$("#prompt1 > p").css('font-size', '20px');
	$("#prompt1 > button:last").hide();
	$("#prompt1").fadeIn(1000, function() {
		$("#prompt1 > button:first").focus();
	});
	$("#prompt1 > button").attr('onclick', 'proceed2();');
	$("#prompt1 > p").html("<br>"+promptArr.correctAns1);
	$("#prompt1 span:first").html(miscArr.proceedButtonText1);
	if(sessionStorage.correct==="1") {
		dropChar(charArr[0], '1');
	}
	else if(sessionStorage.correct==="2") {
		dropChar(charArr[1], '2');
	}
	else if(sessionStorage.correct==="3") {
		dropChar(charArr[2], '3');
	}
	else {
		
	}
}
function wrongPoint() {
	sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
	$("#prompt1 span").css('width', '90px');
	$("#prompt1 > p").css('font-size', '20px');
	$("#prompt1").fadeIn(1000, function() {
		$("#prompt1 > button:first").focus();
	});
	$("#prompt1 > button:first").attr('onclick', 'proceed2();');
	if(sessionStorage.wrong==="1") {
		$("#prompt1 > p").html("<br>"+promptArr.wrongAns1);
		$("#prompt1 span:first").html(miscArr.proceedButtonText2);
		$("#prompt1 span").css('width', 'auto');
		$("#prompt1 > button:last").hide();
	}
	else if(sessionStorage.wrong==="2") {
		$("#prompt1 > p").html(promptArr.wrongAns2);
		$("#prompt1 > p").css('font-size', '18px');
		$("#prompt1 span:first").html(miscArr.proceedButtonText2);
		$("#prompt1 > button:last").show();
		$("#prompt1 > button:last").attr('onclick', 'help1Obj=new help1();');
		$("#prompt1 span:last").html(miscArr.helpText);
		$("#prompt1 span").css('width', 'auto');
	}
	else {
		extraParameters+=" Game ended at Stage1 Ques1(marking coordinates on the grid)";
		$("#prompt1 > p").html("<br>"+promptArr.wrongAns3);
		$("#prompt1 > button").show();
		$("#prompt1 > button > span").css('width', 'auto');
		$("#prompt1 > button > span:first").html(miscArr.proceedButtonText5);
		$("#prompt1 > button > span:last").html(miscArr.proceedButtonText6);
		$("#prompt1 > button:first").attr('onclick', 'window.location.reload()');
		$("#prompt1 > button:last").attr('onclick', "gameEnd('Stage1 Ques1(marking coordinates on the grid)')");
	}
}
function proceed2() {
	if(sessionStorage.correct==="3") {
		//proceeding to question 2
		$("#prompt1").hide();
		$("#prompt1").fadeIn(1000, function() {
			$("#prompt1 > button:first").focus();
		});
		stage1LastPoint.removeClass('clicked-point');
		$(".clicked-point").remove();
		$("#secondPoint").show();
		makePoint2('secondPoint');
		$("#secondPoint").css('background-color', 'red');
		stage1LastPoint.addClass('man');
		$(".man").css('opacity', 1);
		while(($(".man").css('top')===$("#secondPoint").css('top')) || ($(".man").css('left')===$("#secondPoint").css('left'))) {
			makePoint2('secondPoint');
		}
		var cloudLeft=$(".man")[0].style.left.substr(0,$(".man")[0].style.left.length-1)-18;
		var cloudTop=$(".man")[0].style.top.substr(0,$(".man")[0].style.top.length-1)-12;
		$("#cloud").fadeIn(1000);
		$("#cloud > p").html(promptArr.cloudText);
		$("#cloud").css({'left': cloudLeft+"%", 'top': cloudTop+"%"});
		$("#questionDisp").html('');
		$("#coordinatesDisp").remove();
		$("#prompt1 > p").html('<br>'+promptArr.p1);
		$("#prompt1 > button:first").attr('onclick', 'proceed3();');
		$("#prompt1 span:first").html(miscArr.proceedButtonText1);
		$("#prompt1 span:first").css('width', '90px');
		$("#prompt1 > button:last").hide();
	}
	else {
		$("#prompt1").fadeOut(1000, function() {
			setTimeout(activateClick, 300);
		});
	}
}
function proceed3() {
	$("#prompt1").fadeOut(1000);
	$("#stepDisp").fadeIn(200);
	$("#questionDisp").html(quesArr.q2);
	$("#step1Disp > input:first").focus();
	sessionStorage.correct=0;
	sessionStorage.wrong=0;
	sessionStorage.attempts=0;
}
function proceed4() {
	var value1=$("#step1Disp > input:first").val();
	var value2=$("#step1Disp > input:last").val();
	if(sessionStorage.attempts==="1" || sessionStorage.attempts==="4") {
		value1=$("#step2Disp > input:first").val();
		value2=$("#step2Disp > input:last").val();
	}
	else if(sessionStorage.attempts==="2") {
		value1=$("#step3Disp > input:first").val();
		value2=$("#step3Disp > input:last").val();
	}
	
	if($.trim(value1)==="" || $.trim(value2)==="") {
		return;
	}
	else if(value1>10 || value1<-10 || value2>10 || value2<-10) {
		alert(promptArr.gridOut);
		return;
	}
	else {
		$("#cloud").hide();
		var t=calcDist(parseInt(value1, 10), parseInt(value2, 10));
		if(($(".man")[0].style.top!=$("#secondPoint")[0].style.top && $(".man")[0].style.left!=$("#secondPoint")[0].style.left) && (t.top+"%"===$("#secondPoint")[0].style.top && t.left+"%"===$("#secondPoint")[0].style.left)) {
			alert(promptArr.p24);
			return;
		}
		
		if((t.top+"%"===$(".man")[0].style.top) && (t.left+"%"===$(".man")[0].style.left)) {
			alert('you are the same point already');
			return;
		}
		else if(t.top+"%"===$(".man")[0].style.top) {
			sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
			$(".man").animate({
				'left': t.left+"%"
			}, 1000);
			if((t.top+"%"===$("#secondPoint")[0].style.top) && (t.left+"%"===$("#secondPoint")[0].style.left)) {
				setTimeout(function() {
					proceed6();
				}, 1200);
				return;
			}
			if(sessionStorage.attempts==="1" || sessionStorage.attempts==="4") {
				$("#step2Disp").fadeIn(600);
				$("#step2Disp > input:first").focus();
			}
			else if(sessionStorage.attempts==="2") {
				$("#step3Disp").fadeIn(600);
				$("#step3Disp > input:first").focus();
			}
			else if(sessionStorage.attempts==="3") {  //show help button
				setTimeout(function() {
					$("#prompt1").fadeIn(600, function() {
						$("#prompt1 > button:first").focus();
					});
				}, 1000);
				$("#prompt1 > p").html("<br>"+promptArr.p3);
				$("#prompt1 > p").css({'font-size': '18px', 'margin-bottom': '0px'});
				$("#prompt1 > button:first").show();
				$("#prompt1 > button:last").show();
				$("#prompt1 > button:first").attr('onclick', 'proceed5();');
				$("#prompt1 > button:last").attr('onclick', 'help2Obj=new help2();');
				$("#prompt1 span:first").html(miscArr.proceedButtonText2);
				$("#prompt1 span:last").html(miscArr.helpText);
				$("#prompt1 span").css('width', 'auto');
				$("#doneButton > button").hide();
				return;
			}
			else if(sessionStorage.attempts==="5") { //game over after 5 tries
				extraParameters+=" Game ended at Stage1 Ques2(moving to the specified coordinates)";
				$("#prompt1").fadeIn(600, function() {
					$("#prompt1 > button:first").focus();
				});
				$("#prompt1 > p").html("<br>"+promptArr.wrongAns3);
				$("#prompt1 > p").css({'font-size': '20px', 'margin-bottom': ''});
				$("#doneButton > button").hide();
				$("#prompt1 > button").show();
				$("#prompt1 > button > span").css('width', 'auto');
				$("#prompt1 > button > span:first").html(miscArr.proceedButtonText5);
				$("#prompt1 > button > span:last").html(miscArr.proceedButtonText6);
				$("#prompt1 > button:first").attr('onclick', 'window.location.reload()');
				$("#prompt1 > button:last").attr('onclick', "gameEnd('Stage1 Ques2(moving to the specified coordinates)')");
			}
		}
		else if(t.left+"%"===$(".man")[0].style.left) {
			sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
			$(".man").animate({
				'top': t.top+"%"
			}, 1000);
			if((t.top+"%"===$("#secondPoint")[0].style.top) && (t.left+"%"===$("#secondPoint")[0].style.left)) {
				setTimeout(function() {
					proceed6();
				}, 1200);
				return;
			}
			if(sessionStorage.attempts==="1" || sessionStorage.attempts==="4") {
				$("#step2Disp").fadeIn(600);
				$("#step2Disp > input:first").focus();
			}
			else if(sessionStorage.attempts==="2") {
				$("#step3Disp").fadeIn(600);
				$("#step3Disp > input:first").focus();
			}
			else if(sessionStorage.attempts==="3") { //show help button
				setTimeout(function() {
					$("#prompt1").fadeIn(600, function() {
						$("#prompt1 > button:first").focus();
					});
				}, 1000);
				$("#prompt1 > p").html("<br>"+promptArr.p3);
				$("#prompt1 > p").css({'font-size': '18px', 'margin-bottom': '0px'});
				$("#prompt1 > button:first").show();
				$("#prompt1 > button:last").show();
				$("#prompt1 > button:first").attr('onclick', 'proceed5();');
				$("#prompt1 > button:last").attr('onclick', 'help2Obj=new help2();');
				$("#prompt1 span:first").html(miscArr.proceedButtonText2);
				$("#prompt1 span:last").html(miscArr.helpText);
				$("#prompt1 span").css('width', 'auto');
				$("#doneButton > button").hide();
				return;
			}
			else if(sessionStorage.attempts==="5") { //game over after 5 tries
				extraParameters+=" Game ended at Stage1 Ques2(moving to the specified coordinates)";
				$("#prompt1").fadeIn(600, function() {
					$("#prompt1 > button:first").focus();
				});
				$("#prompt1 > p").html("<br>"+promptArr.wrongAns3);
				$("#prompt1 > p").css({'font-size': '20px', 'margin-bottom': ''});
				$("#doneButton > button").hide();
				$("#prompt1 > button").show();
				$("#prompt1 > button > span").css('width', 'auto');
				$("#prompt1 > button > span:first").html(miscArr.proceedButtonText5);
				$("#prompt1 > button > span:last").html(miscArr.proceedButtonText6);
				$("#prompt1 > button:first").attr('onclick', 'window.location.reload()');
				$("#prompt1 > button:last").attr('onclick', "gameEnd('Stage1 Ques2(moving to the specified coordinates)')");
			}
		}
		else {
			sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
			alert(promptArr.p2);
			return;
		}
	}
}
function proceed5() {
	$("#prompt1").fadeOut(600);
	$("#doneButton > button").show();
	$('input').val('');
	$("#step1Disp > input:first").focus();
	$("#step2Disp").hide();
	$("#step3Disp").hide();
}
function proceed6() {
	dropChar(charArr[3], '4');
	$("#doneButton > button").hide();
	$("#prompt1").fadeIn(600, function() {
		$("#prompt1 > button:first").focus();
	});
	$("#prompt1 > p").html("<br>"+promptArr.p4);
	$("#prompt1 > p").css({'font-size': '20px', 'margin-bottom': ''});
	$("#prompt1 > button:first").show();
	$("#prompt1 > button:last").hide();
	$("#prompt1 > button:first").attr('onclick', 'proceed7();');
	$("#prompt1 span:first").html(miscArr.proceedButtonText2);
	$("#prompt1 span").css('width', 'auto');
}
function proceed7() {
	sessionStorage.currentPoint=sessionStorage.secondPoint;
	sessionStorage.secondPoint="";
	sessionStorage.attempts=0;
	sessionStorage.correct=0;
	sessionStorage.wrong=0;
	disableGridClick();
	$("#secondPoint").hide();
	$("#prompt1").fadeOut(600);
	$("#questionDisp").html(quesArr.q3);
	$("#stepDisp").remove();
	$("#step3").show();
	$("#ropeLength > p").html(instArr.ropeDecimal);
	$("#step3 > img:last").click(function() {
		$("#ropeLength > p").toggle();
		$("#step3Calc").toggle();
		$("#step3Calc > input[type='text']:first").focus();
	});
	$("#ropeLength > input[type='text']:first").focus();
	
	var quad=getQuad(".man");
	var temp=(quad===1 || quad===2) ? quad+2 : quad-2 ;
	makePoint3(temp, "secondPoint");
	$("#secondPoint").show();
}
function proceed8() {
	var val=$.trim($("#ropeLength > input[type='text']:first").val());
	if(val==="") {
		return;
	}
	val=parseFloat(val);
	var point1=JSON.parse(sessionStorage.currentPoint);
	var point2=JSON.parse(sessionStorage.secondPoint);
	var dist=Math.sqrt(Math.pow((point1[0]-point2[0]),2)+Math.pow((point1[1]-point2[1]),2));
	dist=dist.toFixed(2);
	var err=Math.abs(val-dist);
	if(err<=allowedError) {
		//correct Ans
		dropChar(charArr[4], '5');
		$("#prompt1").fadeIn(1000, function() {
			$("#prompt1 > button:first").focus();
		});
		$("#ropeLength > button").attr('onclick', 'void 0;');
		$("#prompt1 > p").css('font-size', '20px');
		$("#prompt1 > p").html("<br><br>"+promptArr.p4);
		$("#prompt1 > button:first").show();
		$("#prompt1 > button:first").attr('onclick', 'proceed9();');
		$("#prompt1 > button:last").hide();
		$("#prompt1 > button > span:first").html(miscArr.proceedButtonText3);
		$("#prompt1 > button > span:first").css('width', '90px');
		sessionStorage.wrong=0;
	}
	else {
		//wrong ans
		sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
		if(sessionStorage.wrong==="1") {
			//prompt
			$("#prompt1").fadeIn(1000, function() {
				$("#prompt1 > button:first").focus();
			});
			$("#ropeLength > button").attr('onclick', 'void 0;');
			$("#prompt1 > p").html("<br>"+promptArr.p5);
			$("#prompt1 > p").css('font-size', '16px');
			$("#prompt1 > button").show();
			$("#prompt1 > button:first").attr('onclick', 'proceed9();');
			$("#prompt1 > button:last").attr('onclick', 'help3Obj=new help3();');
			$("#prompt1 > button > span:first").html(miscArr.proceedButtonText2);
			$("#prompt1 > button > span:last").html(miscArr.helpText);
			$("#prompt1 > button > span").css('width', 'auto');
		}
		else {
			//game end
			extraParameters+=" Game ended at Stage1 Ques3(finding length)";
			$("#prompt1").fadeIn(1000, function() {
				$("#prompt1 > button:first").focus();
			});
			$("#ropeLength > button").attr('onclick', 'void 0;');
			$("#prompt1 > p").html("<br>"+promptArr.wrongAns3);
			$("#prompt1 > p").css('font-size', '20px');
			$("#prompt1 > button").show();
			$("#prompt1 > button > span").css('width', 'auto');
			$("#prompt1 > button > span:first").html(miscArr.proceedButtonText5);
			$("#prompt1 > button > span:last").html(miscArr.proceedButtonText6);
			$("#prompt1 > button:first").attr('onclick', 'window.location.reload()');
			$("#prompt1 > button:last").attr('onclick', "gameEnd('Stage1 Ques3(finding length)')");
		}
	}
}
function proceed9() {
	if(sessionStorage.wrong==="1") {
		$("#ropeLength > input[type='text']:first").val('');
		$("#ropeLength > input[type='text']:first").focus();
		$("#prompt1").fadeOut(800, function() {
			$("#ropeLength > button").attr('onclick', 'proceed8();');
		});
	}
	else {
		//proceed to next level i.e. question 4
		sessionStorage.secondPoint="";
		sessionStorage.attempts=0;
		sessionStorage.correct=0;
		sessionStorage.wrong=0;
		$("#secondPoint").hide();
		$("#prompt1").fadeOut(600);
		$("#secondPoint").remove();
		$("#step3").remove();
		//select a random number to be used (5,10 or 13: pyhtagorean triplets)
		var temp=getRandomInt(1,2);
		if(temp===1) {
			sessionStorage.distance=5;
			$("#questionDisp").html(quesArr.q4_5);
		}
		else {
			sessionStorage.distance=10;
			$("#questionDisp").html(quesArr.q4_10);
		}
		/* else of q4_13 (removed) */ 
		$(".man").attr('id', '');
		makeQues4Points();
		disableGridClick();
		activateClick4();
	}
}
function proceed10() {
	//hide prompt
	$("#prompt1").fadeOut(600, function() {
		activateClick4();
	});
}
function proceed11() {
	$("#prompt1").fadeOut(600);
	//drop characters
	for(var i=5;i<charArr.length;i++) {
		dropChar(charArr[i], (i+1));
	}
	setTimeout(function() {
		proceed12();
	}, 2400);
}
function proceed12() {
	tempCharArr=[3,1,5,4];
	for(var j=6;j<=charArr.length;j++) {
		tempCharArr.push(j);
	}
	tempCharArr.push(2);
	$("#stage1").fadeTo(900, 0.4);
	$("#password-area").fadeIn(1000, function() {
		moveChar();
	});
}
function proceed13() {
	$("#pwdDisp").fadeOut(1000, function() {
		$("#password-area").remove();
		$("#endOverlay").slideDown(1500, function() {
			$("#rightStage > #overlay").remove();
			$("#rightStage > #gridImg").remove();
			$("#rightStage > #gridStage").remove();
			$("#stage1").addClass('stage1-end');
			$("#stage1").css('opacity', 1);
			$(".alpha-code").css('color', 'white');
			$("#gardenImg").html(imgDoorStatic);
			$("#gardenImg > img").css('opacity', 1);
			$("#questionDisp").css('top', '36%');
			$("#questionDisp").html(quesArr.q5);
			$("#pwdInputBox").fadeIn(200);
			$("#endOverlay").remove();
			$("#stage1").removeAttr('id');
		});
		sessionStorage.correct=0;
		sessionStorage.wrong=0;
		sessionStorage.attempts=0;
	});
}
function proceed14() {
	var value=$.trim($("#pwdInputBox > input:first").val());
	if(value.toLowerCase()===sessionStorage.name.toLowerCase()) {
		//correct password
		$("#pwdInputBox > button").attr('onclick', 'void 0;');
		$("#prompt1").fadeIn(1000, function() {
			$("#prompt1 > button:first").focus();
		});
		$("#prompt1 > p").css('font-size', '20px');
		$("#prompt1 > p").html("<br>"+promptArr.p10);
		$("#prompt1 > button:first").show();
		$("#prompt1 > button:first").attr('onclick', 'proceed16();');
		$("#prompt1 > button:last").hide();
		$("#prompt1 > button > span:first").html(miscArr.proceedButtonText2);
		$("#prompt1 > button > span:first").css('width', '90px');
		$("#bottomPane").remove();
	}
	else {
		//wrong password
		$("#pwdInputBox > button").attr('onclick', 'void 0;');
		sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
		if(sessionStorage.wrong==="1") {
			//first mistake
			$("#prompt1").fadeIn(1000, function() {
				$("#prompt1 > button:first").focus();
			});
			$("#prompt1 > p").css('font-size', '20px');
			$("#prompt1 > p").html("<br>"+promptArr.p9);
			$("#prompt1 > button:first").show();
			$("#prompt1 > button:first").attr('onclick', 'proceed15();');
			$("#prompt1 > button:last").hide();
			$("#prompt1 > button > span:first").html(miscArr.proceedButtonText1);
			$("#prompt1 > button > span:first").css('width', '90px');
		}
		else {
			//game ends
			extraParameters+=" Game ended at Stage1 Password Area";
			$("#prompt1").fadeIn(1000, function() {
				$("#prompt1 > button:first").focus();
			});
			$("#prompt1 > p").css('font-size', '20px');
			$("#prompt1 > p").html("<br>"+promptArr.wrongAns3);
			$("#prompt1 > button").show();
			$("#prompt1 > button > span").css('width', 'auto');
			$("#prompt1 > button > span:first").html(miscArr.proceedButtonText5);
			$("#prompt1 > button > span:last").html(miscArr.proceedButtonText6);
			$("#prompt1 > button:first").attr('onclick', 'window.location.reload()');
			$("#prompt1 > button:last").attr('onclick', "gameEnd('Stage1 Password Area')");
		}
	}
}
function proceed15() {
	$("#prompt1").fadeOut(1000, function() {
		$("#pwdInputBox > button").attr('onclick', 'proceed14();');
	});
}
function proceed16() {
	$("#prompt1").fadeOut(1000, function() {
		$("#gardenImg").html(imgDoorGif);
		$("#gardenImg > img").css('opacity', 1);
		setTimeout(function() {
			loadStage("mainBody1", "mainBody2");
			proceed2_1();
		}, 1000);
	});
}
function moveChar() {
	$("#charId"+tempCharArr[0]).clone().removeAttr('id').css('opacity', 0).prependTo('#rightBottom').animate({
		'top':'-300px',
		'opacity': 1,
		'left': (-60+((charArr.length-tempCharArr.length)*10))+'%'
	}, 300, function() {
		$("#rightBottom > div:first").css({'top': '', 'left': '0%', 'width': '50px'}).appendTo('#pwdDisp');
		tempCharArr=tempCharArr.slice(1);
		if(tempCharArr==false) { //when all the letters have been placed
			$("#pwdDisp").css('margin-left', (400-(charArr.length*25))+'px');
			setTimeout(proceed13, 1000);
		}
		setTimeout(moveChar, 300);
	});
}
function help1() {
	sessionStorage.helps=sessionStorage.helps+"Stage1 help1; ";
	extraParameters=sessionStorage.helps;
	$("#stage1").fadeTo(2000, 0.1);
	$("#help1").fadeIn(1000);
	$("#help1Next > button > span").html(miscArr.proceedButtonText3);
	
	this.step1=function() {
		$("#helpSubHeader > p:first").fadeIn(1200);
		$("#helpSubHeader > img:first").fadeIn(1200);
		$("#help1Next > button").attr('onclick', 'help1Obj.step2();');
		$("#helpCoordinates > h1:first > span:first").css('color', '#8F0F01');
		for(var i=0;i<3;i++) {
			$("#helpCoordinates > h1:first > span:first").fadeOut(1000).fadeIn(1000);
		}
	};
	this.step2=function() {
		$("#xLine").show();
		$("#help1Next > button").attr('onclick', 'void 0;');
		$("#xLine").animate({
			width: '71px'
		}, 1000, function() {
			$("#xNumber").fadeIn(500);
			$("#help1Next > button").attr('onclick', 'help1Obj.step3();');
		});
	};
	this.step3=function() {
		$("#helpSubHeader > p:last").fadeIn(1200);
		$("#helpSubHeader > img:last").fadeIn(1200);
		$("#help1Next > button").attr('onclick', 'help1Obj.step4();');
		$("#helpCoordinates > h1:first > span:last").css('color', '#01B124');
		for(var i=0;i<3;i++) {
			$("#helpCoordinates > h1:first > span:last").fadeOut(1000).fadeIn(1000);
		}
	};
	this.step4=function() {
		$("#yLine").show();
		$("#help1Next > button").attr('onclick', 'void 0;');
		$("#yLine").animate({
			height: '98px',
			top: '32%'
		}, 1000, function() {
			$("#yNumber").fadeIn(500);
			$("#help1Next > button").attr('onclick', 'help1Obj.step5();');
		});
	};
	this.step5=function() {
		$("#xLine1").fadeIn(400);
		$("#yLine1").fadeIn(400);
		$("#help1Point").fadeIn(800);
		$("#help1Next > button > span").html('CONTINUE');
		$("#help1Next > button > span").css('width', 'auto');
		$("#help1Next > button").attr('onclick', 'help1Obj.step6();');
	};
	this.step6=function() {
		$("#help1").fadeOut(1000);
		$("#stage1").fadeTo(1000,1.0);
		setTimeout(function() {
			$("#help1").remove();
		}, 1200);
		proceed2();
	};
}
function help2() {
	sessionStorage.helps=sessionStorage.helps+"Stage1 help2; ";
	extraParameters=sessionStorage.helps;
	$("#stage1").fadeTo(2000, 0.1);
	$("#help2").fadeIn(1000);
	$("#help2Next > button > span").html(miscArr.proceedButtonText3);
	$("#dispPointCoord").html(promptArr.pointDisp0);
	$("#dispPointCoord").fadeIn(600);
	
	this.step1=function() {
		$("#help2Next > button").attr('onclick', 'void 0;');
		$("#xDisp2").html(promptArr.xHelp);
		$("#xDisp2").fadeIn(1000, function() {
			$("#help2Next > button").attr('onclick', 'help2Obj.step2();');
		});
	};
	this.step2=function() {
		$("#help2Line1").show();
		$("#help2Next > button").attr('onclick', 'void 0;');
		$("#help2Line1").animate({
			'width': '160px'
		}, 1000, function() {
			$("#help2Next > button").attr('onclick', 'help2Obj.step3();');
		});
	};
	this.step3=function() {
		$("#help2Next > button").attr('onclick', 'void 0;');
		$("#help2Line3").show();
		$("#help2Line3").animate({
			'top': '57%'
		}, 1000, function() {
			$("#xUnits").fadeIn(500);
			$("#dispPointCoord").html(promptArr.pointDisp1);
			$("#dispPointCoord").fadeIn(600,function() {
				$("#help2Next > button").attr('onclick', 'help2Obj.step4();');
			});
		});
	};
	this.step4=function() {
		$("#help2Line3").remove();
		$("#help2Line1").hide();
		$("#help2Next > button").attr('onclick', 'void 0;');
		$("#xDisp2").fadeOut(200, function() {
			$("#xDisp2").html(promptArr.yHelp);
			$("#xDisp2").css({'top': '44%', 'left': '75%'});
			$("#xDisp2").fadeIn(1000, function() {
				$("#help2Next > button").attr('onclick', 'help2Obj.step5();');
			});
		});
	};
	this.step5=function() {
		$("#help2Line2").show();
		$("#help2Next > button").attr('onclick', 'void 0;');
		$("#help2Line2").animate({
			'height': '72px'
		}, 1000, function() {
			$("#help2Next > button").attr('onclick', 'help2Obj.step6();');
		});
	};
	this.step6=function() {
		$("#help2Next > button").attr('onclick', 'void 0;');
		$("#help2Line4").show();
		$("#help2Line4").animate({
			'left': '51%'
		}, 1000, function() {
			$("#dispPointCoord").html(promptArr.pointDisp2);
			$("#yUnits").fadeIn(500, function() {
				$("#help2Next > button").attr('onclick', 'help2Obj.step7();');
			});
		});
	};
	this.step7=function() {
		$("#xDisp2").fadeOut(500);
		$("#help2Next > button").attr('onclick', 'void 0;');
		$("#help2Line1").show();
		$("#help2Line4").remove();
		$("#help2Next > button > span").html(miscArr.proceedButtonText2);
		$("#help2Next > button > span").css('width', 'auto');
		$("#dispPointCoord").fadeIn(600, function() {
			$("#help2Next > button").attr('onclick', 'help2Obj.step8();');
		});
	};
	this.step8=function() {
		$("#help2").fadeOut(1000);
		$("#stage1").fadeTo(1000,1.0);
		setTimeout(function() {
			$("#help2").remove();
		}, 1200);
		proceed5();
	};
}
function help3() {
	sessionStorage.helps=sessionStorage.helps+"Stage1 help3; ";
	extraParameters=sessionStorage.helps;
	$("#stage1").fadeTo(2000, 0.1);
	$("#help3").fadeIn(1000);
	$("#help3 > p:eq(0)").html('<br><br>'+instArr.help3_1);
	$("#help3 > p:eq(1)").html(instArr.help3_2);
	$("#help3 > p:eq(2)").html(instArr.help3_3);
	$("#help3Next > button > span").css({'width': '245px', 'height': '63px', 'line-height': '30px'});
	$("#help3Next > button:first > span").html(miscArr.help3ButtonText1);
	$("#help3Next > button:last > span").html(miscArr.help3ButtonText2);
	
	this.step1=function() {
		$("#help3 > p").fadeOut(1000,function() {
			$("#help3 > img").fadeIn(600);
			$("#help3 > p").remove();
		});
		$("#help3Next > button:last").remove();
		$("#help3Next > button > span").css({'width': 'auto', 'height': 'auto', 'line-height': '40px'});
		$("#help3Next > button > span").html(miscArr.proceedButtonText2);
	};
	this.step2=function() {
		$("#help3").fadeOut(1000);
		$("#stage1").fadeTo(1000,1.0);
		setTimeout(function() {
			$("#help3").remove();
		}, 1200);
		proceed9();
	};
}
function gameEnd(stage) {
	sessionStorage.end=stage;
	if(stage==="win") {
		extraParameters+=" Game won! ";
	}
	else {
		//extraParameters+=" Game ended at "+stage;
	}
	disableGridClick();
	//alert('game ended');
	completed=1;
}

function initScientist() {
    var nameArr=miscArr.names.split(",");
    var l=nameArr.length;
    var rand=getRandomInt(0,l-1);
    sessionStorage.name=nameArr[rand].toUpperCase();
	
	//extracting random characters from name
	var fullName=nameArr[rand].toUpperCase();
	var char1=fullName.charAt(1);
	var char2=fullName.charAt(fullName.length-1);
	var char3=fullName.charAt(0);
	charArr.push(char1, char2, char3);
	var char4=fullName.charAt(3);
	var char5=fullName.charAt(2);
	charArr.push(char4, char5);
	for(var i=4;i<=fullName.length-2;i++) {
		charArr.push(fullName.charAt(i));
	}
}
function dropChar(ch, id) {
	$("#rightBottom").append('<div id="charId'+id+'" class="alpha-code rounded-corners">'+ch+'</div>');
	$("#charId"+id).animate({
		left: '0%',
		'font-size' : '63px',
		opacity: 1.0
	}, 2000);
}
function setPoints() {
	var quads=selectRandomQuadrants(getRandomInt(1,4)); //selects 3 arrays randomly from quad1, quad2, quad3, quad4
	var point1=quads[0][getRandomInt(0,quads[0].length-1)]; //gets a random entry from quad1 or quad2 or quad3 or quad4 arrays
	makePoint('point1', point1[0], point1[1]);
	var point2=quads[1][getRandomInt(0,quads[1].length-1)];
	makePoint('point2', point2[0], point2[1]);
	var point3=quads[2][getRandomInt(0,quads[2].length-1)];
	makePoint('point3', point3[0], point3[1]);
	$("#coordinatesDisp > #point1Disp").html('('+point1[0]+','+point1[1]+')');
	$("#coordinatesDisp > #point2Disp").html('('+point2[0]+','+point2[1]+')');
	$("#coordinatesDisp > #point3Disp").html('('+point3[0]+','+point3[1]+')');
}
function selectRandomQuadrants(n) {
	var ret=[];
	if(n!==1) {
		ret.push(quad1);
	}
	if(n!==2) {
		ret.push(quad2);
	}
	if(n!==3) {
		ret.push(quad3);
	}
	if(n!==4) {
		ret.push(quad4);
	}
	return ret;
}
//calculates & returns top & left (in %) on the grid based on the coordinate values passed
function calcDist(x,y) {
	var ret={};
	x+=9; //to make counting start from x=-9 eq to 0.
	y=9-y;
	ret.left=(x*5)+3;
	ret.top=(y*5)+3;
	return ret;
}
function makePoint(id,x,y) {
	if(x<-10 || x>10 || y<-10 || y>10) {
		return 0;
	}
	var t=calcDist(x,y);
	$("#"+id).css({'top': t.top+"%", 'left': t.left+"%"});
	return 1;
}
function makePoint2(id) {
	var tempIndex=getRandomInt(0, question2Point.length-1);
	var secondPoint=question2Point[tempIndex];
	sessionStorage.secondPoint=JSON.stringify(secondPoint);
	var t=calcDist(secondPoint[0],secondPoint[1]);
	$("#"+id).css({'top': t.top+"%", 'left': t.left+"%"});
}
function activateClick() {
	$(".point").click(function(e) {
		disableGridClick();
		stage1LastPoint=$(this);
		$(this).css('background-color', 'red');
		$(this).removeClass('point');
		$(this).addClass('clicked-point');
		$(this).unbind('click');
		$(this).fadeTo(500,0.7);
		correctPoint();
		e.stopPropagation();
	});
	$("#gridStage").click(function() {
		disableGridClick();
		wrongPoint();
	});
}
function disableGridClick() {
	$(".point").unbind('click');
	$("#gridStage").unbind('click');
}
//returns random integers between min & max values specified, including both
function getRandomInt(minVal, maxVal) {
    return Math.floor(Math.random() * (maxVal - minVal+1) + minVal);
}
//removes the previous div and displays the next div
function loadStage(id1, id2) {
    $("#"+id1).fadeOut(200,function() {
       $("#"+id2).fadeIn(1300);
       $("#"+id1).remove();
    });
}
function squareCalc() {
	var num=$("#step3Calc > input[type='text']:first").val();
	var ans=Math.sqrt(num);
	ans=ans+"";
	if(ans.indexOf('.')===-1) {
		$("#step3Calc > input[type='text']:last").val(ans);
		$("#ropeLength > input[type='text']:first").val(ans);
		$("#ropeLength > input[type='text']:first").focus();
		return;
	}
	else {
		ans=parseFloat(ans);
		ans=ans.toFixed(2);
		$("#step3Calc > input[type='text']:last").val(ans);
		$("#ropeLength > input[type='text']:first").val(ans);
		$("#ropeLength > input[type='text']:first").focus();
		return;
	}
}
function getQuad(id) { //returns quadrant of a point given its id as #id or .class
	var t=$(id)[0].style.top;
	var l=$(id)[0].style.left;
	t=t.substr(0,t.length-1);
	l=l.substr(0,l.length-1);
	if(t<50 && l>=50) {
		return 1;
	}
	else if(t>=50 && l>=50) {
		return 2;
	}
	else if(t>=50 && l<50) {
		return 3;
	}
	else if(t<50 && l<50) {
		return 4;
	}
	else {
		return 0;
	}
}
function makePoint3(quad, id) { //makes point in a specified quadrant
	var point=[];
	if(quad===1) {
		point=quad1[getRandomInt(0, quad1.length-1)];
	}
	else if(quad===2) {
		point=quad2[getRandomInt(0, quad2.length-1)];
	}
	else if(quad===3) {
		point=quad3[getRandomInt(0, quad3.length-1)];
	}
	else if(quad===4) {
		point=quad4[getRandomInt(0, quad4.length-1)];
	}
	var temp=JSON.stringify(point);
	sessionStorage.secondPoint=temp;
	makePoint(id, point[0], point[1]);
}
function makeQues4Points() {
	var current=JSON.parse(sessionStorage.currentPoint);
	var x=current[0];
	var y=current[1];
	var pointCount=4;
	var tempArr1=[[x-5,y], [x+5,y], [x,y-5], [x,y+5], [x+4,y+3], [x+3,y+4], [x+4,y-3], [x+3,y-4], [x-3,y-4], [x-4,y-3], [x-4,y+3], [x-3,y+4]];
	var tempArr2=[[x-10,y], [x+10,y], [x,y-10], [x,y+10], [x+8,y+6], [x+6,y+8], [x+8,y-6], [x+6,y-8], [x-6,y-8], [x-8,y-6], [x-8,y+6], [x-6,y+8]];
	//var tempArr3=[[x-13,y], [x+13,y], [x,y-13], [x,y+13], [x+12,y+5], [x+5,y+12], [x+12,y-5], [x+5,y-12], [x-5,y-12], [x-12,y-5], [x-12,y+5], [x-5,y+12]];
	if(sessionStorage.distance==="5") {
		sessionStorage.reqdClicks=6;
		for(coord in tempArr1) {
			if(makePoint("point"+pointCount, tempArr1[coord][0], tempArr1[coord][1])) {
				$("#point"+pointCount).show();
				pointCount+=1;
			}
		}
	}
	else {
		sessionStorage.reqdClicks=4;
		for(coord in tempArr2) {
			if(makePoint("point"+pointCount, tempArr2[coord][0], tempArr2[coord][1])) {
				$("#point"+pointCount).show();
				pointCount+=1;
			}
		}
	}
	/*else {
		sessionStorage.reqdClicks=3;
		for(coord in tempArr3) {
			if(makePoint("point"+pointCount, tempArr3[coord][0], tempArr3[coord][1])) {
				$("#point"+pointCount).show();
				pointCount+=1;
			}
		}
	}*/
}
function activateClick4() { //for checking clicks on stage 1 ques 4
	$(".point").click(function(e) {
		disableGridClick();
		sessionStorage.correct=parseInt(sessionStorage.correct, 10)+1;
		sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
		$(this).hide().fadeIn(500);
		$(this).css({'background-color': 'red', 'opacity': 0.8});
		$(this).removeClass('point');
		$(this).addClass('clicked-point');
		$(this).unbind('click');
		e.stopPropagation();
		if(sessionStorage.correct===sessionStorage.reqdClicks) {
			//win game
			$("#prompt1").fadeIn(1000, function() {
				$("#prompt1 > button:first").focus();
			});
			$("#prompt1 > p").css('font-size', '20px');
			$("#prompt1 > p").html("<br>"+promptArr.p7);
			$("#prompt1 > button:first").show();
			$("#prompt1 > button:first").attr('onclick', 'proceed11();');
			$("#prompt1 > button:last").hide();
			$("#prompt1 > button > span:first").html(miscArr.proceedButtonText3);
			$("#prompt1 > button > span:first").css('width', '90px');
		}
		else {
			//prompt for correct answer
			proceed10();
			/*$("#prompt1").fadeIn(1000);
			$("#prompt1 > p").css('font-size', '20px');
			$("#prompt1 > p").html("<br>"+promptArr.p4);
			$("#prompt1 > button:first").show();
			$("#prompt1 > button:first").attr('onclick', 'proceed10();');
			$("#prompt1 > button:last").hide();
			$("#prompt1 > button > span:first").html(miscArr.proceedButtonText3);
			$("#prompt1 > button > span:first").css('width', '90px');*/
		}
	});
	$("#gridStage").click(function() {
		disableGridClick();
		sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
		sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
		if(sessionStorage.wrong==="2") {
			//game end (loses games)
			extraParameters+=" Game ended at Stage1 Ques4(plotting points at specified distance)";
			$("#prompt1").fadeIn(1000, function() {
				$("#prompt1 > button:first").focus();
			});
			$("#prompt1 > p").css('font-size', '20px');
			$("#prompt1 > p").html("<br>"+promptArr.wrongAns3);
			$("#prompt1 > button").show();
			$("#prompt1 > button > span").css('width', 'auto');
			$("#prompt1 > button > span:first").html(miscArr.proceedButtonText5);
			$("#prompt1 > button > span:last").html(miscArr.proceedButtonText6);
			$("#prompt1 > button:first").attr('onclick', 'window.location.reload()');
			$("#prompt1 > button:last").attr('onclick', "gameEnd('Stage1 Ques4(plotting points at specified distance)')");
		}
		else {
			//prompt for last chance
			$("#prompt1").fadeIn(1000, function() {
				$("#prompt1 > button:first").focus();
			});
			$("#prompt1 > p").css('font-size', '18px');
			$("#prompt1 > p").html("<br>"+promptArr.p6);
			$("#prompt1 > button:first").show();
			$("#prompt1 > button:first").attr('onclick', 'proceed10();');
			$("#prompt1 > button:last").hide();
			$("#prompt1 > button > span:first").html(miscArr.proceedButtonText1);
			$("#prompt1 > button > span:first").css('width', '90px');
		}
	});
}
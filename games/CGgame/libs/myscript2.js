var mainCanvasId, mainCanvasCtx;
var helpObj2_1, helpObj2_2, helpObj2_3, helpObj2_4, helpObj2_5, helpObj2_6;
var manDirn='front', showGrid=true, showCoords=true;
//array for path. Its an array of the coordinates of each level as per figure 1
var validPoints=[];
/*var validPoints=[[[2,0], [3,2], [6,2], [4,4], [-5,4], [-2,8], [0,8], [1,6], [3,6], [5,10], [6,10], [2,12]],
                 [[2,0], [3,2], [5,2], [3,4], [-5,4], [-2,8], [0,8], [1,6], [3,6], [5,10], [6,10], [2,12]],
                 [[1,0], [2,2], [6,2], [4,4], [-5,4], [-2,8], [0,8], [1,6], [3,6], [5,10], [6,10], [2,12]],
                 [[1,0], [2,2], [5,2], [3,4], [-5,4], [-2,8], [0,8], [1,6], [3,6], [5,10], [6,10], [2,12]],
                 [[1,0], [2,2], [4,2], [2,4], [-5,4], [-2,8], [0,8], [1,6], [3,6], [5,10], [6,10], [2,12]],
                 [[0,0], [1,2], [6,2], [4,4], [-5,4], [-2,8], [0,8], [1,6], [3,6], [5,10], [6,10], [2,12]],
                 [[0,0], [1,2], [5,2], [3,4], [-5,4], [-2,8], [0,8], [1,6], [3,6], [5,10], [6,10], [2,12]],
                 [[0,0], [1,2], [4,2], [2,4], [-5,4], [-2,8], [0,8], [1,6], [3,6], [5,10], [6,10], [2,12]],
                 [[0,0], [1,2], [3,2], [1,4], [-5,4], [-2,8], [0,8], [1,6], [3,6], [5,10], [6,10], [2,12]],
                 [[0,0], [1,2], [3,2], [1,4], [-5,4], [-2,8], [0,8], [1,6], [3,6], [5,10], [6,10], [2,12]],
                 ];*/
var manImg=new Image();
var manImg1=new Image();
manImg.src="../assets/man.png";
manImg1.src="../assets/man1.png";
var man={
    x: -6,
    y: 0,
    width: 15,
    height:25,
    draw: function() {
        drawMan();
    }
    };

function proceed2_1() {
    $("#main2 > h1").html(miscArr.stage2Header);
    $("#main2 > p").html(miscArr.stage2Text);
    $("#startButton2 > button > span").html(miscArr.startButtonText);
    makePointsArr();
    sessionStorage.correct=0;
    sessionStorage.wrong=0;
    sessionStorage.attempts=0;
}
function proceed2_2() {
    $("#main2").fadeOut(600, function() {
        $("#stage2").fadeIn(500);
    });
    canvas_init();
    ladder_init();
    $("#left2Top > p").html(quesArr.q2_1);
    $("#left2Bot > p").html(instArr.inst2_1);
    $("#left2Bot > b").html(miscArr.inputText1);
    $("#left2Bot > button > span").html(miscArr.proceedButtonText4);
}
function proceed2_3() {
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    $("#ladderCanvas").css('position', 'absolute');
    $("#ladderCanvas").animate({
       'top': '380px',
       'left': 467+(42*selectedPoints[0][0])+'px'
    }, 2000, function() {
        if($("#left2Bot > input").val()==="2") {
            drawLineByActualGrid(selectedPoints[0][0],selectedPoints[0][1],selectedPoints[1][0],selectedPoints[1][1],true);
            $("#ladderCanvas").hide();
            $("#ladderCanvas").css({'position': 'relative', 'top': '0px', 'left': '0px'});
            $("#prompt2").fadeIn(1000);
            $("#prompt2 > p").html('<br><br>'+promptArr.p12);
            $("#prompt2 > p").css('font-size', '21px');
            $("#prompt2 > button > span").css('width', '90px');
            $("#prompt2 > button:first > span").html(miscArr.proceedButtonText3);
            $("#prompt2 > button:last").hide();
            $("#prompt2 > button:first").attr('onclick', 'proceed2_4();');
        }
        else {
            //show prompt & after clicking ok on prompt, take ladder to original position.
            sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
            if(sessionStorage.wrong==="1") {
                $("#prompt2").fadeIn(1000);
                $("#prompt2 > p").html('<br>'+promptArr.p11);
                $("#prompt2 > p").css('font-size', '19px');
                $("#prompt2 > button").show();
                $("#prompt2 > button > span").css('width', 'auto');
                $("#prompt2 > button:first > span").html(miscArr.proceedButtonText2);
                $("#prompt2 > button:last > span").html(miscArr.helpText);
                $("#prompt2 > button:first").attr('onclick', 'resetLadder();');
                $("#prompt2 > button:last").attr('onclick', 'helpObj2_1=new help2_1();');
            }
            else {
                $("#prompt2").fadeIn(1000);
                $("#prompt2 > p").html('<br><br>'+promptArr.wrongAns3);
                $("#prompt2 > p").css('font-size', '20px');
                $("#prompt2 > button").hide();
                gameEnd("Stage2 Ques1");
            }
        }
    });
}
function proceed2_4() {
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    $("#prompt2").fadeOut(1000, function() {
        moveMan(1, function() {
            //change question
            $("#left2Top > p").html(quesArr.q2_2);
            $("#buttonsContainer > button:first > span").html(miscArr.positiveText);
            $("#buttonsContainer > button:last > span").html(miscArr.negativeText);
            $("#left2Bot").hide();
            $("#buttonsContainer > button:first").attr('onclick', 'wrongSlope(2);');
            $("#buttonsContainer > button:last").attr('onclick', 'correctSlope(2);');
            $("#buttonsContainer").fadeIn(1000);
            manDirn='back';
            showCoords=false;
            clearMainCanvas();
            if(showGrid) {
                draw_grid();
            }
            prepareStage();
            for(var j=1; j<=2; j+=2) {
               drawLineByActualGrid(selectedPoints[j-1][0],selectedPoints[j-1][1],selectedPoints[j][0],selectedPoints[j][1],true);
            }
            drawMajorDots(selectedPoints[2][0],selectedPoints[2][1],selectedPoints[3][0],selectedPoints[3][1]);
            drawLineByActualGrid(selectedPoints[2][0],selectedPoints[2][1],selectedPoints[3][0],selectedPoints[3][1],true);
            man.draw();
        });
        sessionStorage.correct=0;
        sessionStorage.wrong=0;
        sessionStorage.attempts=0;
    });
}
function proceed2_5() {
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    $("#prompt2").fadeOut(1000, function() {
        moveMan(2, function() {
            //change question
            $("#left2Top > p").html(quesArr.q2_3);
            $("#left2Bot > input").val('');
            $("#ladderCanvas").attr({'height': '200', 'width': '200'});
            $("#ladderCanvas").css('transform', '');
            $("#ladderCanvas").css('-ms-transform', '');
            $("#ladderCanvas").css('-moz-transform', '');
            $("#ladderCanvas").css('-o-transform', '');
            $("#ladderCanvas").css('-webkit-transform', '');
            $("#ladderCanvas").show();
            $("#buttonsContainer").hide();
            $("#left2Bot > b").html(miscArr.inputText2);
            $("#left2Bot > p").html(instArr.inst2_2);
            $("#left2Bot > p").insertAfter($("#left2Bot > button"));
            $("#left2Bot").show();
            $("#left2Bot > input").attr('onkeyup', "adjustLadder('scale');");
            $("#left2Bot > button").attr('onclick', 'proceed2_7();');
            $("#left2Bot > img:last").show();
            $('<br>').insertAfter($("#step3Calc > input:first"));
            $("#step3Calc").css('top', '74%');
            $("#step3Calc > input[type='submit']").css('width', '74px');
            $("#left2Bot > img:last").click(function() {
                $("#step3Calc").toggle();
                $("#step3Calc > input[type='text']:first").focus();
            });
            manDirn='front';
            showGrid=false;
            showCoords=true;
            clearMainCanvas();
            if(showGrid) {
                draw_grid();
            }
            prepareStage();
            for(var j=1; j<=4; j+=2) {
               drawLineByActualGrid(selectedPoints[j-1][0],selectedPoints[j-1][1],selectedPoints[j][0],selectedPoints[j][1],true);
            }
            drawMajorDots(selectedPoints[4][0],selectedPoints[4][1],selectedPoints[5][0],selectedPoints[5][1]);
            man.draw();
        });
        sessionStorage.correct=0;
        sessionStorage.wrong=0;
        sessionStorage.attempts=0;
    });
}
function proceed2_6() {
    $("#prompt2").fadeOut(1000);
}
function proceed2_7() {
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    $("#step3Calc").hide();
    $("#ladderCanvas").css('position', 'absolute');
    $("#ladderCanvas").animate({
        'top': '103px',
        'left': 283+((selectedPoints[4][0]+5)*42)+'px'
    }, 1000, function() {
        if($("#left2Bot > input").val()==="5") {
            drawLineByActualGrid(selectedPoints[4][0],selectedPoints[4][1],selectedPoints[5][0],selectedPoints[5][1],true);
            $("#ladderCanvas").hide();
            $("#ladderCanvas").css({'position': 'relative', 'top': '0px', 'left': '0px'});
            $("#prompt2").fadeIn(1000);
            $("#prompt2 > p").html('<br><br>'+promptArr.p12);
            $("#prompt2 > p").css('font-size', '21px');
            $("#prompt2 > button > span").css('width', '90px');
            $("#prompt2 > button:first > span").html(miscArr.proceedButtonText3);
            $("#prompt2 > button:last").hide();
            $("#prompt2 > button:first").attr('onclick', 'proceed2_8();');
        }
        else {
            //show prompt & after clicking ok on prompt, take ladder to original position.
            sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
            if(sessionStorage.wrong==="1") {
                $("#prompt2").fadeIn(1000);
                $("#prompt2 > p").html('<br>'+promptArr.p11);
                $("#prompt2 > p").css('font-size', '19px');
                $("#prompt2 > button").show();
                $("#prompt2 > button > span").css('width', 'auto');
                $("#prompt2 > button:first > span").html(miscArr.proceedButtonText2);
                $("#prompt2 > button:last > span").html(miscArr.helpText);
                $("#prompt2 > button:first").attr('onclick', 'resetLadder();');
                $("#prompt2 > button:last").attr('onclick', 'helpObj2_3=new help2_3();');
            }
            else {
                $("#prompt2").fadeIn(1000);
                $("#prompt2 > p").html('<br><br>'+promptArr.wrongAns3);
                $("#prompt2 > p").css('font-size', '20px');
                $("#prompt2 > button").hide();
                gameEnd("Stage2 Ques3");
            }
        }
    });
}
function proceed2_8() {
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    $("#prompt2").fadeOut(1000, function() {
        moveMan(3, function() {
            //change question
            $("#left2Bot > img:last").hide();
            $("#step3Calc").hide();
            $("#left2Top > p").html(quesArr.q2_2);
            $("#buttonsContainer > button:first > span").html(miscArr.positiveText);
            $("#buttonsContainer > button:last > span").html(miscArr.negativeText);
            $("#left2Bot").hide();
            $("#buttonsContainer > button:first").attr('onclick', 'void 0;');
            $("#buttonsContainer > button:last").attr('onclick', 'void 0;');
            $("#buttonsContainer").fadeIn(1000);
            $("#prompt2").fadeIn(1000);
            $("#prompt2 > p").html('<br>'+promptArr.p15);
            $("#prompt2 > p").css('font-size', '20px');
            $("#prompt2 > button:first").show();
            $("#prompt2 > button:last").hide();
            $("#prompt2 > button > span").css('width', '90px');
            $("#prompt2 > button:first > span").html(miscArr.proceedButtonText1);
            $("#prompt2 > button:first").attr('onclick', 'proceed2_9();');
            showGrid=true;
            showCoords=false;
            clearMainCanvas();
            if(showGrid) {
                draw_grid();
            }
            prepareStage();
            for(var j=1; j<=6; j+=2) {
               drawLineByActualGrid(selectedPoints[j-1][0],selectedPoints[j-1][1],selectedPoints[j][0],selectedPoints[j][1],true);
            }
            drawMajorDots(selectedPoints[6][0],selectedPoints[6][1],selectedPoints[7][0],selectedPoints[7][1]);
            drawLineByActualGrid(selectedPoints[6][0],selectedPoints[6][1],selectedPoints[7][0],selectedPoints[7][1],true);
            man.draw();
        });
        sessionStorage.correct=0;
        sessionStorage.wrong=0;
        sessionStorage.attempts=0;
    });
}
function proceed2_9() {
    $('#prompt2').fadeOut(600, function() {
        $('#buttonsContainer > button:first').attr('onclick', 'wrongSlope(4);');
        $('#buttonsContainer > button:last').attr('onclick', 'correctSlope(4);');
    });
}
function proceed2_10() {
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    $("#prompt2").fadeOut(1000, function() {
        moveMan(4, function() {
            //change question
            drawMajorDots(selectedPoints[8][0],selectedPoints[8][1],selectedPoints[9][0],selectedPoints[9][1]);
            drawLineByActualGrid(selectedPoints[8][0],selectedPoints[8][1],selectedPoints[9][0],selectedPoints[9][1],true);
            $("#left2Top > p").html(quesArr.q2_2);
            $("#buttonsContainer > button:first > span").html(miscArr.positiveText);
            $("#buttonsContainer > button:last > span").html(miscArr.negativeText);
            $("#left2Bot").hide();
            $("#buttonsContainer > button:first").attr('onclick', 'void 0;');
            $("#buttonsContainer > button:last").attr('onclick', 'void 0;');
            $("#prompt2").fadeIn(1000);
            $("#prompt2 > p").html('<br>'+promptArr.p15);
            $("#prompt2 > p").css('font-size', '20px');
            $("#prompt2 > button:first").show();
            $("#prompt2 > button:last").hide();
            $("#prompt2 > button > span").css('width', '90px');
            $("#prompt2 > button:first > span").html(miscArr.proceedButtonText1);
            $("#prompt2 > button:first").attr('onclick', 'proceed2_11();');
        });
        sessionStorage.correct=0;
        sessionStorage.wrong=0;
        sessionStorage.attempts=0;
    });
}
function proceed2_11() {
    $('#prompt2').fadeOut(600, function() {
        $('#buttonsContainer > button:first').attr('onclick', 'correctSlope(5);');
        $('#buttonsContainer > button:last').attr('onclick', 'wrongSlope(5);');
    });
}
function proceed2_12(){
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    $("#prompt2").fadeOut(1000, function() {
        moveMan(5, function() {
            //change question
            $("#left2Top > p").html(quesArr.q2_6);
            $("#ladderCanvas").show();
            $("#ladderCanvas").attr('height', '100');
            $("#buttonsContainer").hide();
            $("#left2Bot").show();
            $("#left2Bot > input").val('');
            $("#left2Bot > input").attr('onkeyup', 'adjustLadder("both");');
            $("#left2Bot").prepend('<b>'+miscArr.inputText1+'</b><input type="text" maxlength="5" onkeyup="adjustLadder(\'both\')"><br>');
            $("#left2Bot > button").attr('onclick', 'proceed2_13();');
            $("#left2Bot > img:last").show();
            $("#step3Calc").css('top', '69%');
            manDirn='back';
            showCoords=true;
            showGrid=false;
            clearMainCanvas();
            if(showGrid) {
                draw_grid();
            }
            prepareStage();
            for(var j=1; j<=10; j+=2) {
               drawLineByActualGrid(selectedPoints[j-1][0],selectedPoints[j-1][1],selectedPoints[j][0],selectedPoints[j][1],true);
            }
            drawMajorDots(selectedPoints[10][0],selectedPoints[10][1],selectedPoints[11][0],selectedPoints[11][1]);
            man.draw();
        });
        sessionStorage.correct=0;
        sessionStorage.wrong=0;
        sessionStorage.attempts=0;
    });
}
function proceed2_13() {
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    $("#ladderCanvas").css('position', 'absolute');
    $("#ladderCanvas").animate({
        'top': '-90px',
        'left': '566px'
    }, 1000, function() {
        if(eval($("#left2Bot > input:first").val())===-0.5 && Math.abs(eval($("#left2Bot > input:last").val())-4.47)<=allowedError) {
            drawLineByActualGrid(selectedPoints[10][0],selectedPoints[10][1],selectedPoints[11][0],selectedPoints[11][1],true);
            $("#ladderCanvas").hide();
            $("#ladderCanvas").css({'position': 'relative', 'top': '0px', 'left': '0px'});
            $("#prompt2").fadeIn(1000);
            $("#prompt2 > p").html('<br><br>'+promptArr.p12);
            $("#prompt2 > p").css('font-size', '21px');
            $("#prompt2 > button > span").css('width', '90px');
            $("#prompt2 > button:first > span").html(miscArr.proceedButtonText3);
            $("#prompt2 > button:last").hide();
            $("#prompt2 > button:first").attr('onclick', 'proceed2_14();');
        }
        else {
            //show prompt & after clicking ok on prompt, take ladder to original position.
            sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
            if(sessionStorage.wrong==="1") {
                $("#prompt2").fadeIn(1000);
                $("#prompt2 > p").html('<br>'+promptArr.p11);
                $("#prompt2 > p").css('font-size', '19px');
                $("#prompt2 > button:first").show();
                $("#prompt2 > button:last").hide();
                $("#prompt2 > button > span").css('width', 'auto');
                $("#prompt2 > button:first > span").html(miscArr.proceedButtonText2);
                $("#prompt2 > button:first").attr('onclick', 'resetLadder();');
            }
            else {
                $("#prompt2").fadeIn(1000);
                $("#prompt2 > p").html('<br><br>'+promptArr.wrongAns3);
                $("#prompt2 > p").css('font-size', '20px');
                $("#prompt2 > button").hide();
                gameEnd("Stage2 Ques6");
            }
        }
    });
}
function proceed2_14() {
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    $("#prompt2").fadeOut(1000, function() {
        moveMan(6, function() {
            sessionStorage.wrong=0;
            sessionStorage.correct=0;
            sessionStorage.attempts=0;
            setTimeout(function() {
                loadStage("mainBody2", "mainBody3");
                proceed3_1();
            }, 1500);
        });
    });
}

function help2_1()  {
    sessionStorage.helps=sessionStorage.helps+"Stage2 help1; ";
    extraParameters=sessionStorage.helps;
    $("#stage2").fadeTo(2000, 0.1);
	$("#help2_1").fadeIn(1000);
    $("#help2_1 > p:eq(0)").html(instArr.help2_1_1);
    $("#help2_1 > p:eq(1)").html(instArr.help2_1_2);
    $("#help2_1 > p:eq(2)").html(instArr.help2_1_3);
    $("#help2_1 > button > span").html(miscArr.proceedButtonText2);
    
    this.step1=function() {
        $("#help2_1").fadeOut(1000);
		$("#stage2").fadeTo(1000,1.0);
		setTimeout(function() {
			$("#help2_1").remove();
		}, 1200);
		resetLadder();
    };
}
function help2_2() {
    sessionStorage.helps=sessionStorage.helps+"Stage2 help2; ";
    extraParameters=sessionStorage.helps;
    $("#stage2").fadeTo(2000, 0.1);
	$("#help2_2").fadeIn(1000);
}
function help2_3() {
    sessionStorage.helps=sessionStorage.helps+"Stage2 help3; ";
    extraParameters=sessionStorage.helps;
    $("#stage2").fadeTo(2000, 0.1);
	$("#help2_3").fadeIn(1000);
    $("#help2_3 > p:eq(0)").html('<br><br>'+instArr.help2_3_1);
	$("#help2_3 > p:eq(1)").html(instArr.help3_2);
	$("#help2_3 > p:eq(2)").html(instArr.help3_3);
	$("#helpNext2_3 > button > span").css({'width': '245px', 'height': '63px', 'line-height': '30px'});
	$("#helpNext2_3 > button:first > span").html(miscArr.help3ButtonText1);
	$("#helpNext2_3 > button:last > span").html(miscArr.help3ButtonText2);
    
    this.step1=function() {
        $("#help2_3 > p").fadeOut(1000,function() {
			$("#help2_3 > img").fadeIn(600);
			$("#help2_3 > p").remove();
		});
		$("#helpNext2_3 > button:last").remove();
		$("#helpNext2_3 > button > span").css({'width': 'auto', 'height': 'auto', 'line-height': '40px'});
		$("#helpNext2_3 > button > span").html(miscArr.proceedButtonText2);
    };
    this.step2=function() {
        $("#help2_3").fadeOut(1000);
		$("#stage2").fadeTo(1000,1.0);
		setTimeout(function() {
			$("#help2_3").remove();
		}, 1200);
		resetLadder();
    };
}

function correctSlope(level) {
    $("#prompt2").fadeIn(1000);
    $("#prompt2 > p").html('<br><br>'+promptArr.p13);
    $("#prompt2 > p").css('font-size', '20px');
    $("#prompt2 > button > span").css('width', '90px');
    $("#prompt2 > button:first > span").html(miscArr.proceedButtonText3);
    $("#prompt2 > button:last").hide();
    if(level===2) {
        $("#prompt2 > button:first").attr('onclick', 'proceed2_5();');
    }
    else if(level===4) {
        $("#prompt2 > button:first").attr('onclick', 'proceed2_10();');
    }
    else if(level===5) {
        $("#prompt2 > button:first").attr('onclick', 'proceed2_12();');
    }
}
function wrongSlope(level) {
    sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
    if(sessionStorage.wrong==="2" || level===4 || level===5) {
        $("#prompt2").fadeIn(1000);
        $("#prompt2 > p").html('<br><br>'+promptArr.wrongAns3);
        $("#prompt2 > p").css('font-size', '20px');
        $("#prompt2 > button").hide();
        gameEnd("Stage2 Ques"+level);
    }
    else {
        $("#prompt2").fadeIn(1000);
        $("#prompt2 > p").html('<br>'+promptArr.p14);
        $("#prompt2 > p").css('font-size', '20px');
        $("#prompt2 > button").show();
        $("#prompt2 > button > span").css('width', 'auto');
        $("#prompt2 > button:first > span").html(miscArr.proceedButtonText2);
        $("#prompt2 > button:last > span").html(miscArr.helpText);
        $("#prompt2 > button:first").attr('onclick', 'proceed2_6();'); //proceed2_6() just fades out the prompt
        $("#prompt2 > button:last").attr('onclick', 'helpObj2_2=new help2_2();');
    }
}

function resetLadder() {
    $("#prompt2").fadeOut(1000, function() {
        $("#ladderCanvas").css({'position': 'relative', 'top': '0px', 'left': '0px'});
    });
}
function moveMan(level,func) {
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    moveManByCoord(man.x,man.y,selectedPoints[(2*level)-1][0],selectedPoints[(2*level)-1][1],level,function() {
        if(level===6) {
            moveManByCoord(man.x,man.y,-4,12,level,func);
        }
        else {
            moveManByCoord(man.x,man.y,selectedPoints[2*level][0],selectedPoints[2*level][1],level,func);
        }
    });
}
function moveManByCoord(x1,y1,x2,y2,level,func) {
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    man.x=x1;
    man.y=y1;
    var initialPos={x:x1, y:y1};
    var finalPos={x:x2, y:y2};
    var xInt=(finalPos.x-initialPos.x)/20;
    var yInt=(finalPos.y-initialPos.y)/20;
    var data=[], tempObj={}, j=0;
    for(var j=0;j<=20;j++) {
        tempObj={};
        tempObj.x=initialPos.x+(j*xInt);
        tempObj.y=initialPos.y+(j*yInt);
        data.push(tempObj);
    }
    //console.log(data);
    var i=0;
    var pid=setInterval(function() {
        clearMainCanvas();
        if(showGrid) {
            draw_grid();
        }
        prepareStage();
        for(var j=1; j<=2*level; j+=2) {
            drawLineByActualGrid(selectedPoints[j-1][0],selectedPoints[j-1][1],selectedPoints[j][0],selectedPoints[j][1],true);
        }
        man.x=data[i].x;
        man.y=data[i].y;
        man.draw(manDirn);
        if(i++===data.length-1) {
            clearInterval(pid);
            if(func) {
                func();
            }
        }
    },90);
}
function ladder_init() {
    var ladderCanv=$("#ladderCanvas")[0];
    var ladderCtx=ladderCanv.getContext('2d');
    ladderCtx.strokeStyle="blue";
    ladderCtx.lineWidth=5;
    ladderCtx.beginPath();
    ladderCtx.moveTo(0,ladderCanv.height/2);
    ladderCtx.lineTo(ladderCanv.width,ladderCanv.height/2);
    ladderCtx.closePath();
    ladderCtx.stroke();
}
function adjustLadder(param) {
    if(param==="rotate") {
        var value=$("#left2Bot > input").val();
        if(value==="") {
            value=0;
        }
        var angle=Math.atan(value);
        $("#ladderCanvas").css('transform', 'rotate('+(-angle)+'rad)');
        $("#ladderCanvas").css('-ms-transform', 'rotate('+(-angle)+'rad)');
        $("#ladderCanvas").css('-moz-transform', 'rotate('+(-angle)+'rad)');
        $("#ladderCanvas").css('-o-transform', 'rotate('+(-angle)+'rad)');
        $("#ladderCanvas").css('-webkit-transform', 'rotate('+(-angle)+'rad)');
    }
    else if(param==="scale") {
        var value=$("#left2Bot > input").val();
        if(value==="") {
            value=0;
        }
        var angle=Math.atan(4/3);
        var ladderCanv=$("#ladderCanvas")[0];
        var ladderCtx=ladderCanv.getContext('2d');
        ladderCanv.width=ladderCanv.width;
        var actualLen=42.5*value;
        ladderCtx.strokeStyle="blue";
        ladderCtx.lineWidth=5;
        ladderCtx.beginPath();
        ladderCtx.moveTo(0,ladderCanv.height);
        ladderCtx.lineTo(actualLen*Math.cos(angle), ladderCanv.height-(actualLen*Math.sin(angle)));
        ladderCtx.closePath();
        ladderCtx.stroke();
    }
    else if(param==="both") {
        var slope=$("#left2Bot > input:first").val();
        var len=$("#left2Bot > input:last").val();
        var ladderCanv=$("#ladderCanvas")[0];
        var ladderCtx=ladderCanv.getContext('2d');
        ladderCanv.width=ladderCanv.width;
        var actualLen=42.5*len;
        ladderCtx.strokeStyle="blue";
        ladderCtx.lineWidth=5;
        ladderCtx.beginPath();
        ladderCtx.moveTo((ladderCanv.width-actualLen)/2,ladderCanv.height/2);
        ladderCtx.lineTo((ladderCanv.width+actualLen)/2, ladderCanv.height/2);
        ladderCtx.closePath();
        ladderCtx.stroke();
        
        var angle=Math.atan(slope);
        $("#ladderCanvas").css('transform', 'rotate('+(-angle)+'rad)');
        $("#ladderCanvas").css('-ms-transform', 'rotate('+(-angle)+'rad)');
        $("#ladderCanvas").css('-moz-transform', 'rotate('+(-angle)+'rad)');
        $("#ladderCanvas").css('-o-transform', 'rotate('+(-angle)+'rad)');
        $("#ladderCanvas").css('-webkit-transform', 'rotate('+(-angle)+'rad)');
    }
}
function canvas_init() {
    mainCanvasId=$("#stage2Canvas")[0];
    mainCanvasCtx=mainCanvasId.getContext('2d');
    sessionStorage.selectedPoints=JSON.stringify(validPoints);
    draw_grid();
    prepareStage();
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    man.x=selectedPoints[0][0];
    man.y=selectedPoints[0][1];
    man.draw('front');
    drawMajorDots(selectedPoints[0][0], selectedPoints[0][1], selectedPoints[1][0], selectedPoints[1][1]);
}
function draw_grid() {
    mainCanvasCtx.strokeStyle="blue";
    mainCanvasCtx.lineWidth=1;
    mainCanvasCtx.beginPath();
    for(var i=0;i<=14;i++) {
        mainCanvasCtx.moveTo(0, i*(595/14));
        mainCanvasCtx.lineTo(mainCanvasId.width, i*(595/14));
        mainCanvasCtx.stroke();
    }
    mainCanvasCtx.closePath();
    mainCanvasCtx.beginPath();
    for(var i=0;i<=13;i++) {
        var xInterval=mainCanvasId.width/10;
        mainCanvasCtx.moveTo(i*(595/14), 0);
        mainCanvasCtx.lineTo(i*(595/14), mainCanvasId.height);
        mainCanvasCtx.stroke();
    }
    mainCanvasCtx.closePath();
}
function drawAxes() {
    drawLineByActualGrid(-6,0,7,0);
    drawLineByActualGrid(0,0,0,13.5);
    drawLineByActualGrid(7,0,6.3,0.4);
    drawLineByActualGrid(7,0,6.3,-0.4);
    drawLineByActualGrid(0,13.5,0.4,12.8);
    drawLineByActualGrid(0,13.5,-0.4,12.8);
    drawText('X',6,0.5,'axis');
    drawText('Y',0.3,13.2,'axis');
}
function drawLine(x1,y1,x2,y2,param) {
    if(param) { //for drawing ladders
        mainCanvasCtx.strokeStyle="#C303FF";
    }
    else {
        mainCanvasCtx.strokeStyle="black";
    }
    mainCanvasCtx.lineWidth=5;
    mainCanvasCtx.beginPath();
    mainCanvasCtx.moveTo(x1,y1);
    mainCanvasCtx.lineTo(x2,y2);
    mainCanvasCtx.closePath();
    mainCanvasCtx.stroke();
}
function drawText(text, x, y, param) {
    var coord=getActualCoordinates(x,y);
    mainCanvasCtx.fillStyle="black";
    if(param==="axis") {
        mainCanvasCtx.font='25pt "Comic Sans MS", cursive, sans-serif';
        mainCanvasCtx.fillText(text,coord.x,coord.y);
    }
    else {
        mainCanvasCtx.font='10pt "Comic Sans MS", cursive, sans-serif';
        mainCanvasCtx.fillText(text,coord.x,coord.y-7);
    }
}
function drawLineByGrid(x1,y1,x2,y2,param) { //draws lines by origin at top left
    x1*=42.5;
    y1*=42.5;
    x2*=42.5;
    y2*=42.5;
    if(param) {
        drawLine(x1,y1,x2,y2,param);
    }
    else {
        drawLine(x1,y1,x2,y2);
    }
}
function drawLineByActualGrid(x1,y1,x2,y2,param) { //draws lines by considering the grid as in ppt
    x1+=6;
    x2+=6;
    y1=14-y1;
    y2=14-y2;
    if(param) {
        drawLineByGrid(x1,y1,x2,y2,param);
    }
    else {
        drawLineByGrid(x1,y1,x2,y2);
    }
}
function drawMan() {
    var coord=getActualCoordinates(man.x, man.y);
    if(manDirn==="front") {
        mainCanvasCtx.drawImage(manImg, (coord.x)-(man.width), (coord.y)-(man.height), man.width, man.height);
    }
    else if(manDirn==="back") {
        mainCanvasCtx.drawImage(manImg1, (coord.x), (coord.y)-(man.height), man.width, man.height);
    }
}
function drawDots() {
    mainCanvasCtx.fillStyle="blue";
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    for(var i=0; i<selectedPoints.length;  i++) {
        var coord=getActualCoordinates(selectedPoints[i][0], selectedPoints[i][1]);
        mainCanvasCtx.beginPath();
        mainCanvasCtx.arc(coord.x,coord.y,5,0,Math.PI*2);
        mainCanvasCtx.closePath();
        mainCanvasCtx.fill();
    }
}
function prepareStage() {
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    //draw bottom line
    drawLineByActualGrid(-6,0,7,0);
    //draw level1 line
    drawLineByActualGrid(-6,2,selectedPoints[1][0]-1,2);
    drawLineByActualGrid(selectedPoints[1][0],2,7,2);
    //draw level2 line
    drawLineByActualGrid(-6,4,selectedPoints[3][0],4);
    drawLineByActualGrid(selectedPoints[3][0]+1,4,7,4);
    //draw level3 line
    drawLineByActualGrid(selectedPoints[7][0]-1,6,7,6);
    //draw level4 line
    drawLineByActualGrid(-6,8,selectedPoints[5][0]-1,8);
    drawLineByActualGrid(selectedPoints[5][0],8,selectedPoints[6][0],8);
    drawLineByActualGrid(selectedPoints[6][0],8,selectedPoints[6][0],6);
    //draw level5 line
    drawLineByActualGrid(-6,10,selectedPoints[9][0]-1,10);
    drawLineByActualGrid(selectedPoints[9][0],10,7,10);
    //draw level6 line
    drawLineByActualGrid(-6,12,selectedPoints[11][0],12);
    drawLineByActualGrid(selectedPoints[11][0]+1,12,7,12);
    drawDots();
    if(showCoords) {
        mark_points();
    }
    drawAxes();
}
function mark_points() {
    var selectedPoints=JSON.parse(sessionStorage.selectedPoints);
    var text;
    for(var i=0;i<selectedPoints.length;i++) {
        text="("+selectedPoints[i][0]+","+selectedPoints[i][1]+")";
        drawText(text, selectedPoints[i][0], selectedPoints[i][1]);
    }
}
function drawMajorDots(x1,y1,x2,y2) {
    var coord1=getActualCoordinates(x1, y1);
    var coord2=getActualCoordinates(x2, y2);
    mainCanvasCtx.fillStyle="red";
    mainCanvasCtx.beginPath();
    mainCanvasCtx.arc(coord1.x,coord1.y,7,0,Math.PI*2);
    mainCanvasCtx.closePath();
    mainCanvasCtx.fill();
    mainCanvasCtx.beginPath();
    mainCanvasCtx.arc(coord2.x,coord2.y,7,0,Math.PI*2);
    mainCanvasCtx.closePath();
    mainCanvasCtx.fill();
}
function clearMainCanvas() {
    mainCanvasId.width=mainCanvasId.width;
}
function getActualCoordinates(x,y) {
    var ret={};
    ret.x=(x+6)*42.5;
    ret.y=(14-y)*42.5;
    return ret;
}
function makePointsArr() {
    var lvl1=[[0,0], [1,0], [2,0]];
    var lvl2=[[4,2], [5,2], [6,2]];
    var lvl3=[[-5,4], [-4,4]];
    var lvl4=[[0,8], [1,8]];
    var lvl5=[[3,6]];
    var lvl6=[[6,10]];
    var t1=lvl1[getRandomInt(0,lvl1.length-1)];
    validPoints.push(t1);
    var t2=[t1[0]+1, t1[1]+2];
    validPoints.push(t2);
    var t3=lvl2[getRandomInt(0,lvl2.length-1)];
    validPoints.push(t3);
    var t4=[t3[0]-2, t3[1]+2];
    validPoints.push(t4);
    var t5=lvl3[getRandomInt(0,lvl3.length-1)];
    validPoints.push(t5);
    var t6=[t5[0]+3, t5[1]+4];
    validPoints.push(t6);
    var t7=lvl4[getRandomInt(0,lvl4.length-1)];
    validPoints.push(t7);
    var t8=[t7[0]+1, t7[1]-2];
    validPoints.push(t8);
    var t9=lvl5[getRandomInt(0,lvl5.length-1)];
    validPoints.push(t9);
    var t10=[t9[0]+2, t9[1]+4];
    validPoints.push(t10);
    var t11=lvl6[getRandomInt(0,lvl6.length-1)];
    validPoints.push(t11);
    var t12=[t11[0]-4, t11[1]+2];
    validPoints.push(t12);
}
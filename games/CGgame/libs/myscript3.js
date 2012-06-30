var linesCanv, linesCtx;
var slopeArr=[], interceptArr=[], labelArr=[];

function proceed3_1() {
    $("#main3 > h1").html(miscArr.stage3Header);
    $("#main3 > p").html(miscArr.stage3Text);
    $("#startButton3 > button > span").html(miscArr.startButtonText);
    sessionStorage.correct=0;
    sessionStorage.wrong=0;
    sessionStorage.attempts=0;
    labelArr=shuffle([1,2,3,4,5]);
}
function proceed3_2() {
    $("#main3").fadeOut(600, function() {
        $("#stage3").fadeIn(500);
        $("#ansArea > input").focus();
    });
    linesInit();
    $("#quesArea > p").html(quesArr.q3_1+" "+labelArr[0]+" ?");
}
function proceed3_3() {
    if($.trim($("#ansArea > input").val())==="") {
        return;
    }
    var enteredVal=parseFloat($("#ansArea > input").val());
    if(enteredVal===interceptArr[0]) {
        sessionStorage.correct=parseInt(sessionStorage.correct, 10)+1;
        sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
        $("#prompt3").fadeIn(1000);
        $("#prompt3 > p").html('<br><br>'+promptArr.p16);
        $("#prompt3 > button").attr('onclick', 'proceed3_4();');
    }
    else {
        sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
        sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
        if(sessionStorage.wrong==="1") {
            //give one more chance
            $("#prompt3").fadeIn(1000);
            $("#prompt3 > p").html('<br>'+promptArr.p20);
            $("#prompt3 > button").show();
            $("#prompt3 > button").attr('onclick', 'hidePrompt();');
        }
        else if(sessionStorage.wrong==="2") {
            //game end
            $("#prompt3").fadeIn(1000);
            $("#prompt3 > p").html('<br><br>'+promptArr.wrongAns3);
            $("#prompt3 > button").hide();
            gameEnd("Stage3 Ques1");
        }
    }
}
function proceed3_4() {
    $("#prompt3").fadeOut(600, function() {
        //redraw canvas
        clearCanvas3();
        for(var i=1;i<5;i++) {
            drawLineWithLimit(slopeArr[i], interceptArr[i]);
        }
        generateLabels(1);
    });
    //change question
    $("#ansArea > button").attr('onclick', 'proceed3_5();');
    $("#ansArea > input").val('');
    $("#ansArea > input").focus();
    $("#quesArea > p").html(quesArr.q3_2_1+" y = "+slopeArr[1]+"x. "+quesArr.q3_2_2);
    sessionStorage.correct=0;
    sessionStorage.wrong=0;
    sessionStorage.attempts=0;
}
function proceed3_5() {
    if($.trim($("#ansArea > input").val())==="") {
        return;
    }
    var enteredVal=parseFloat($("#ansArea > input").val());
    if(enteredVal===labelArr[1]) {
        sessionStorage.correct=parseInt(sessionStorage.correct, 10)+1;
        sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
        $("#prompt3").fadeIn(1000);
        $("#prompt3 > p").html('<br><br>'+promptArr.p17);
        $("#prompt3 > button").attr('onclick', 'proceed3_6();');
    }
    else {
        sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
        sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
        if(sessionStorage.wrong==="1") {
            //give one more chance
            $("#prompt3").fadeIn(1000);
            $("#prompt3 > p").html('<br>'+promptArr.p21);
            $("#prompt3 > button").show();
            $("#prompt3 > button").attr('onclick', 'hidePrompt();');
        }
        else if(sessionStorage.wrong==="2") {
            //game end
            $("#prompt3").fadeIn(1000);
            $("#prompt3 > p").html('<br><br>'+promptArr.wrongAns3);
            $("#prompt3 > button").hide();
            gameEnd("Stage3 Ques2");
        }
    }
}
function proceed3_6() {
    $("#prompt3").fadeOut(600, function() {
        //redraw canvas
        clearCanvas3();
        for(var i=2;i<5;i++) {
            drawLineWithLimit(slopeArr[i], interceptArr[i]);
        }
        generateLabels(2);
    });
    //change question
    $("#ansArea > button").attr('onclick', 'proceed3_7();');
    $("#ansArea > input").remove();
    $("#ansArea > #ansInput").show();
    $("#ansInput > input:eq(0)").focus();
    $("#ansInput > input:eq(0)").attr('onkeydown', 'handleKeyPress(window.event,0);');
    $("#ansInput > input:eq(0)").attr('onkeyup', 'handleKeyUp(window.event,0);');
    $("#ansInput > input:eq(1)").attr('onkeydown', 'handleKeyPress(window.event,1);');
    $("#ansInput > input:eq(1)").attr('onkeyup', 'handleKeyUp(window.event,1);');
    $("#ansInput > input:eq(2)").attr('onkeydown', 'handleKeyPress(window.event,2);');
    $("#ansInput > input:eq(2)").attr('onkeyup', 'handleKeyUp(window.event,2);');
    $("#quesArea > p").html(quesArr.q3_3+" "+slopeArr[2]);
    sessionStorage.correct=0;
    sessionStorage.wrong=0;
    sessionStorage.attempts=0;
}
function proceed3_7() {
    if($.trim($("#ansInput > input:eq(0)").val())==="" || $.trim($("#ansInput > input:eq(1)").val())==="" || $.trim($("#ansInput > input:eq(2)").val())==="") {
        return;
    }
    var enteredVal1=$("#ansInput > input:eq(0)").val();
    var enteredVal2=$("#ansInput > input:eq(1)").val();
    var enteredVal3=$("#ansInput > input:eq(2)").val();
    var sign=(interceptArr[2]>0) ? '+' : '-';
    if((enteredVal1==slopeArr[2]) && (enteredVal2===sign) && (enteredVal3==Math.abs(interceptArr[2]))) {
        sessionStorage.correct=parseInt(sessionStorage.correct, 10)+1;
        sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
        $("#prompt3").fadeIn(1000);
        $("#prompt3 > p").html('<br><br>'+promptArr.p18);
        $("#prompt3 > button").attr('onclick', 'proceed3_8();');
    }
    else {
        sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
        sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
        if(sessionStorage.wrong==="1") {
            //give one more chance
            $("#prompt3").fadeIn(1000);
            $("#prompt3 > p").html('<br>'+promptArr.p22);
            $("#prompt3 > button").show();
            $("#prompt3 > button").attr('onclick', 'hidePrompt();');
        }
        else if(sessionStorage.wrong==="2") {
            //game end
            $("#prompt3").fadeIn(1000);
            $("#prompt3 > p").html('<br><br>'+promptArr.wrongAns3);
            $("#prompt3 > button").hide();
            gameEnd("Stage3 Ques3");
        }
    }
}
function proceed3_8() {
    $("#prompt3").fadeOut(600, function() {
        //redraw canvas
        clearCanvas3();
        for(var i=3;i<5;i++) {
            drawLineWithLimit(slopeArr[i], interceptArr[i]);
        }
        generateLabels(3);
    });
    //change question
    $("#ansArea > button").attr('onclick', 'proceed3_9();');
    $("#ansInput > input").val('');
    $("#ansInput > input:eq(0)").focus();
    $("#quesArea > p").html(quesArr.q3_4+" "+interceptArr[3]);
    sessionStorage.correct=0;
    sessionStorage.wrong=0;
    sessionStorage.attempts=0;
}
function proceed3_9() {
    if($.trim($("#ansInput > input:eq(0)").val())==="" || $.trim($("#ansInput > input:eq(1)").val())==="" || $.trim($("#ansInput > input:eq(2)").val())==="") {
        return;
    }
    var enteredVal1=$("#ansInput > input:eq(0)").val();
    var enteredVal2=$("#ansInput > input:eq(1)").val();
    var enteredVal3=$("#ansInput > input:eq(2)").val();
    var sign=(interceptArr[3]>0) ? '+' : '-';
    if((enteredVal1==slopeArr[3]) && (enteredVal2===sign) && (enteredVal3==Math.abs(interceptArr[3]))) {
        sessionStorage.correct=parseInt(sessionStorage.correct, 10)+1;
        sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
        $("#prompt3").fadeIn(1000);
        $("#prompt3 > p").html('<br><br>'+promptArr.p19);
        $("#prompt3 > button").attr('onclick', 'proceed3_10();');
    }
    else {
        sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
        sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
        if(sessionStorage.wrong==="1") {
            //give one more chance
            $("#prompt3").fadeIn(1000);
            $("#prompt3 > p").html('<br>'+promptArr.p22);
            $("#prompt3 > button").show();
            $("#prompt3 > button").attr('onclick', 'hidePrompt();');
        }
        else if(sessionStorage.wrong==="2") {
            //game end
            $("#prompt3").fadeIn(1000);
            $("#prompt3 > p").html('<br><br>'+promptArr.wrongAns3);
            $("#prompt3 > button").hide();
            gameEnd("Stage3 Ques4");
        }
    }
}
function proceed3_10() {
    $("#prompt3").fadeOut(600, function() {
        //redraw canvas
        clearCanvas3();
        for(var i=4;i<5;i++) {
            drawLineWithLimit(slopeArr[i], interceptArr[i]);
        }
        generateLabels(4);
    });
    //change question
    $("#ansArea > button").attr('onclick', 'proceed3_11();');
    $("#ansInput > input").val('');
    $("#ansInput > input:eq(0)").focus();
    $("#quesArea > p").html(quesArr.q3_5);
    sessionStorage.correct=0;
    sessionStorage.wrong=0;
    sessionStorage.attempts=0;
}
function proceed3_11() {
    if($.trim($("#ansInput > input:eq(0)").val())==="" || $.trim($("#ansInput > input:eq(1)").val())==="" || $.trim($("#ansInput > input:eq(2)").val())==="") {
        return;
    }
    var enteredVal1=$("#ansInput > input:eq(0)").val();
    var enteredVal2=$("#ansInput > input:eq(1)").val();
    var enteredVal3=$("#ansInput > input:eq(2)").val();
    var sign=(interceptArr[4]>0) ? '+' : '-';
    if((enteredVal1==slopeArr[4]) && (enteredVal2===sign) && (enteredVal3==Math.abs(interceptArr[4]))) {
        sessionStorage.correct=parseInt(sessionStorage.correct, 10)+1;
        sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
        $("#prompt3").fadeIn(1000);
        $("#prompt3 > p").html('<br><br>'+promptArr.p23);
        $("#prompt3 > button").attr('onclick', 'proceed3_12();');
    }
    else {
        sessionStorage.wrong=parseInt(sessionStorage.wrong, 10)+1;
        sessionStorage.attempts=parseInt(sessionStorage.attempts, 10)+1;
        if(sessionStorage.wrong==="1") {
            //give one more chance
            $("#prompt3").fadeIn(1000);
            $("#prompt3 > p").html('<br>'+promptArr.p22);
            $("#prompt3 > button").show();
            $("#prompt3 > button").attr('onclick', 'hidePrompt();');
        }
        else if(sessionStorage.wrong==="2") {
            //game end
            $("#prompt3").fadeIn(1000);
            $("#prompt3 > p").html('<br><br>'+promptArr.wrongAns3);
            $("#prompt3 > button").hide();
            gameEnd("Stage3 Ques5");
        }
    }
}
function proceed3_12() {
    $("#prompt3").fadeOut(500, function() {
        $("#mainBody3").slideUp(1000, function() {
            extraParameters+=" Game won! ";
        });
        $("#gameEndDisplay").show();
    });
}

function hidePrompt() {
    $("#prompt3").fadeOut(500, function() {
        $("#ansArea > input").focus();
    });
}
function linesInit() {
    linesCanv=$("#linesCanvas")[0];
    linesCtx=linesCanv.getContext('2d');
    generateLines();
    generateLabels(0);
}
function drawLine3(x1,y1,x2,y2,param) {
    var t1=getActualCoordinates3(x1,y1);
    var t2=getActualCoordinates3(x2,y2);
    x1=t1.x;
    y1=t1.y;
    x2=t2.x;
    y2=t2.y;
    if(param) {
        
    }
    else {
        linesCtx.strokeStyle="red";
    }
    linesCtx.lineWidth=2;
    linesCtx.beginPath();
    linesCtx.moveTo(x1,y1);
    linesCtx.lineTo(x2,y2);
    linesCtx.closePath();
    linesCtx.stroke();
}
function drawLineWithLimit(m,c,param) {
    var y1=c-(m*10);
    var y2=c+(m*10);
    if(param) {
        drawLine3(-10,y1,10,y2,param);
    }
    else {
        drawLine3(-10,y1,10,y2);
    }
}
function drawLabel(ch,x,y) {
    var t=getActualCoordinates3(x,y);
    /*linesCtx.fillStyle="white";
    linesCtx.beginPath();
    linesCtx.fillRect(t.x-10,t.y-10,20,20);
    linesCtx.closePath();*/
    linesCtx.strokeStyle="white";
    linesCtx.fillStyle="white";
    linesCtx.font="20pt Arial";
    linesCtx.beginPath();
    linesCtx.fillText(ch,t.x-10,t.y+10);
    linesCtx.closePath();
    linesCtx.stroke();
}
//gets actual coordinates as per the canvas given the visible coordinates as per the grid
function getActualCoordinates3(x,y) {
    var ret={};
    ret.x=14+((x+10)*28.35);
    ret.y=16+((10-y)*28.35);
    return ret;
}
function generateLines() {
    slopeArr.push(getRandomInt(-3,3));
    var c1=getRandomInt(-8,8);
    while(c1===0) {
        c1=getRandomInt(-8,8);
    }
    interceptArr.push(c1, 0);
    var m2=getRandomInt(-3,3);
    while(m2===0 || in_array(slopeArr,m2)) {
        m2=getRandomInt(-3,3);
    }
    slopeArr.push(m2);
    var m3=getRandomInt(-3,3);
    while(m3===0 || in_array(slopeArr,m3)) {
        m3=getRandomInt(-3,3);
    }
    var c3=getRandomInt(-8,8);
    while(in_array(interceptArr,c3)) {
        c3=getRandomInt(-8,8);
    }
    slopeArr.push(m3);
    interceptArr.push(c3);
    var m4=getRandomInt(-3,3);
    while(m4===0 || in_array(slopeArr,m4)) {
        m4=getRandomInt(-3,3);
    }
    var c4=getRandomInt(-4,4);
    while(c4===0 || in_array(interceptArr,c4)) {
        c4=getRandomInt(-4,4);
    }
    slopeArr.push(m4);
    interceptArr.push(c4);
    var m5=getRandomInt(-3,3);
    while(in_array(slopeArr,m5)) {
        m5=getRandomInt(-3,3);
    }
    var c5=getRandomInt(-8,8);
    while(c5===0 || in_array(interceptArr,c5)) {
        c5=getRandomInt(-8,8);
    }
    slopeArr.push(m5);
    interceptArr.push(c5);
    for(var i=0;i<5;i++) {
        drawLineWithLimit(slopeArr[i], interceptArr[i]);
    }
}
function generateLabels(param) {
    for(var i=param;i<5;i++) {
        if(slopeArr[i]===0) {
            drawLabel(labelArr[i],-10,interceptArr[i]);
            continue;
        }
        //compute x by taking y=-10
        var x=-(10+interceptArr[i])/slopeArr[i];
        if(x>=-10 && x<=10) {
            drawLabel(labelArr[i],x,-10);
            continue;
        }
        //compute y by taking x=-10 then taking x=10
        var y1=interceptArr[i]-(10*slopeArr[i]);
        var y2=interceptArr[i]+(10*slopeArr[i]);
        if(y1<0) {
            drawLabel(labelArr[i],-10,y1);
        }
        else if(y2<0) {
            drawLabel(labelArr[i],10,y2);
        }
        else {
            drawLabel(labelArr[i],-10,y1);
        }
    }
}
function shuffle(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
}
//removes 'px' from the attribute value i.e. returns 245 from '245px'
function removePx(s) {
    return parseFloat(s.substr(0,s.length-2));
}
//checks if a value is present in the array or not
function in_array(arr,val) {
    for(var i=0;i<arr.length;i++) {
        if(arr[i]==val) {
            return true;
        }
    }
    return false;
}
function clearCanvas3() {
    linesCanv.width=linesCanv.width;
}
function handleKeyUp(e,id) {
    if(id===0) {
        var val=$("#ansInput > input:eq(0)").val();
        if(val!="" && isFinite(val)) {
            $("#ansInput > input:eq(1)").focus();
        }
    }
    else if(id===1) {
        var val=$("#ansInput > input:eq(1)").val();
        if(val==='+' || val==='-') {
            $("#ansInput > input:eq(2)").focus();
        }
    }
    else if(id===2) {
        var val=$("#ansInput > input:eq(2)").val();
        if(val!="" && isFinite(val)) {
            $("#ansArea > button").focus();
        }
    }
}
function handleKeyPress(e,id) {
    validateInput(e,id);
}
function validateInput(event,id) {
    // Allow: F5, backspace, delete, tab, escape, and enter
    if (event.keyCode==116 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
         // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        //allow shift+tab
        (event.shiftKey==true && event.keyCode==9) ||
        //allow ctrl+F5
        (event.ctrlKey==true && event.keyCode==116) ||
         // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    else {
        if(id===0) {
            //shift & = i.e +
            if(event.shiftKey && event.keyCode==187) {
                return;
            }
            // Ensure that it is a number and stop the keypress (107/109 for +/-)
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ) && (event.keyCode!=107) && (event.keyCode!=109) && (event.keyCode!=189)) {
                event.preventDefault(); 
            }
        }
        else if(id===1) { //allow only + or -
            //shift & = i.e +
            if(event.shiftKey && event.keyCode==187) {
                return;
            }
            if(event.keyCode!=107 && event.keyCode!=109 && event.keyCode!=189) {
                event.preventDefault();
            }
        }
        else if(id===2) {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }
        }
    }
}

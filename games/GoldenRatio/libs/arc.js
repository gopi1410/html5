/****************************************************************************
PARAMETERS: lineWidth, lineColour, divisions, duration, fill, fillColour, start, draw, stop

NOTE THAT divisions/totalTime should not exceed 100.
*****************************************************************************/

HTMLCanvasElement.prototype.animateArc=function(x,y,r,sa,ea,dirn,params) {
	if(params)
		initArc(this,x,y,r,sa,ea,dirn,params.lineColour,params.lineWidth,params.divisions,params.duration,params.start,params.draw,params.stop);
	else
		initArc(this,x,y,r,sa,ea,dirn);
};

function initArc(id,x,y,r,sa,ea,dirn,lineColor,lineWidth,interval,totalTime,start,draw,stop)
{
	var context=id.getContext('2d');
	var data=[];
	var i=0, direction, diff, interval;
	if(!interval)
		interval=100;
	if(!totalTime)
		totalTime=1;
	dirn=dirn.toLowerCase();
	if(dirn==="clockwise")
	{
		direction=false;
		diff=(ea-sa)/interval;
	}
	else if(dirn==="anticlockwise" || dirn==="anti-clockwise")
	{
		direction=true;
		diff=(ea-sa)/interval;
	}
	else
	{
		alert("Direction parameter can only be clockwise or anticlockwise");
		return;
	}
	for(i=0;i<=interval;i++)
	{
		data[i]=sa+(i*diff);
	}
	var i=0;
	if(start)
		start();
	context.beginPath();
	if(lineColor)
		context.strokeStyle=lineColor;
	if(lineWidth)
		context.lineWidth=lineWidth;
	else
		lineWidth=1;
	var length=data.length;
	var pid = setInterval(function() {
		context.arc(x,y,r,data[i],data[i+1],direction);
		context.stroke();
		if(draw)
			draw();
		if(i++===length)
		{
			context.closePath();
			clearInterval(pid);
			if(stop)
			{
				stop();
			}
		}
	}, (1000*totalTime/interval));
}
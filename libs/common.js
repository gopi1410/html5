//This file includes all common functions that can be used across game.

function hasItoccuredBefore(value,arr)//if flag==1 that means value already exists in arr
{
	var flag = 0;
	
	for(i=0; i<arr.length; i++)
	{
		if(arr[i].toString()==value.toString())
		{
			flag = 1;
		}
	} 
	
	return flag;
}


function arrayShuffle(oldArray) { //shuffle the aray
	var newArray = oldArray.slice();
 	var len = newArray.length;
	var i = len;
	 while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = newArray[i];
  		newArray[i] = newArray[p];
	  	newArray[p] = t;
 	}
	return newArray; 
};

function calculateDistanceBetween2Points(sX,sY,dX,dY) //calculates distance between centers of two equal circles.
{
	var d = Math.sqrt(Math.pow((dX-sX),2)+Math.pow((dY-sY),2));
	
	return d;	
}

function  svgAnimateAttributes (target,attributeName,begin,to,dur,ifFreeze,repeatCount) {
    // create the fade animation
    var animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animation.setAttributeNS(null, 'attributeName', attributeName);
    animation.setAttributeNS(null, 'begin', begin);
    animation.setAttributeNS(null, 'to', to);
    animation.setAttributeNS(null, 'dur', dur);
    if(ifFreeze=='yes')
    	animation.setAttributeNS(null, 'fill', 'freeze');
    animation.setAttributeNS(null, 'repeatCount', repeatCount);
    // link the animation to the target
    target.appendChild(animation);
    // start the animation
    animation.beginElement();
}

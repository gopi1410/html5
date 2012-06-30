//declare your default xml file in case the specified xml is not found
//include this js file in all main html files
/*
 * add this in main html file window.onload=function() {
		loadXML("nameOfXML.XML",passtheFunctionYouWantToCallAfterLoadingXMLFile);
	};
 * 
 */

var defaultXml='sampleXMl.XML';
//var defaultFunc=function() {
	//				start(); //we should function start in all html files from where we have to proceed in that.
		//		};

var quesArr=new Array();
var promptArr=new Array;
var instArr=new Array;
var miscArr=new Array;
var xmlDoc;
var params = {};

function loadXML(xmlFileName,defaultFunc)
{
	var query = window.location.search.substring(1);//window.location.search gives the the string from ? in the address bar.
	
	var vars = query.split("&");  //if multiple parameters passed
	
	for (var i=0;i<vars.length;i++)
	{
		var pair = vars[i].split("=");
		params[pair[0]] = pair[1];
	}
	
	if(params.language)
	{
		parse(params.language,xmlFileName,defaultFunc);
	}
	else
	{
		parse('english',xmlFileName,defaultFunc); //we can also pass sml file name name by passing params.xmlfileName instead of xmlFileName.
	} 
}

function loadXMLDoc(dname)
{	
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",dname,false);
	
	/*if(xhttp.status==404)
	{
		alert('XML not found');
		document.getElementsByTagName('body')[0].innerHTML="";
		return;
	}*/
	
	xhttp.send();
	//may check for 404 error using xhttp.status but not necessary
	return xhttp.responseXML;
}

function parse(lang,fname,defaultFunc)
{
	quesArr=[];
	promptArr=[];
	instArr=[];
	miscArr=[];
	xmlDoc=loadXMLDoc(fname);
	
	if(xmlDoc==null)
		return;
		//xmlDoc=loadXMLDoc(defaultXml);
	
	x=xmlDoc.getElementsByTagName(lang);
	if(x.length==0)
	{
		x=xmlDoc.getElementsByTagName('english')[0];
	}
	else
	{
		x=x[0];
	}
	
	x1=x.getElementsByTagName("que");
	for(i=0;i<x1.length;i++)
	{
		quesArr[x1[i].getAttribute('name')] = x1[i].getAttribute('text');
	}
	
	x2=x.getElementsByTagName("prompt");
	for(j=0;j<x2.length;j++)
	{
		promptArr[x2[j].getAttribute('name')]=x2[j].getAttribute('text');
	}
	
	x3=x.getElementsByTagName("instruction");
	for(k=0;k<x3.length;k++)
	{
		instArr[x3[k].getAttribute('name')]=x3[k].getAttribute('text');
	}
	
	x4=x.getElementsByTagName("misc");
	for(l=0;l<x4.length;l++)
	{
		miscArr[x4[l].getAttribute('name')]=x4[l].getAttribute('text');
	}
	
	defaultFunc();
}
//include this in the main html file. <script src="../../../libs/eventhandle.js"></script>
// use this to add any event on any object $E.add(objectOnWhichEventNeedsToBeAdded,'eventName',FunctionNameToBeCalledOnThatEvent);


$E = {
	o : function(o) {
		return (o.obj) ? o.obj : o;
	},
	add : function() {
	},
	remove : function() {
	}
};
if(window.addEventListener) {
	$E.add = function(ob, type, fn) {
		this.o(ob).addEventListener(type, fn, false);
	};
	$E.remove = function(ob, type, fn) {
		this.o(ob).removeEventListener(type, fn, false);
	};
} else if(document.attachEvent) {
	$E.add = function(ob, type, fn) {
		vareProp = type + fn;
		var o = this.o(ob);
		o['e' + eProp] = fn;
		o[eProp] = function() {
			o['e'+eProp](window.event);
		};
		o.attachEvent('on' + type, o[eProp]);
	};
	$E.remove = function(ob, type, fn) {
		vareProp = type + fn;
		var o = this.o(ob);
		o.detachEvent('on' + type, o[eProp]);
		o[eProp] = null;
		o["e" + eProp] = null;
	};
}


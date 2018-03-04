function getStyle(obj,name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name]
	}
	else
	{
		return getComputedStyle(obj,false)[name]
	}
}
function startMove(obj,json,fnEnd)
{
	clearInterval(obj.timer)
	obj.timer=setInterval(function()
	{
		var bStop=true
		for(var attr in json)
		{
			var cur;
			if(attr=='opacity')
			{
				cur=parseFloat(getStyle(obj,attr))*100
			}
			else
			{
				cur=parseInt(getStyle(obj,attr))
			}
			var speed=(json[attr]-cur)/4
			speed=speed>0?Math.ceil(speed):Math.floor(speed)
			if(cur!=json[attr])
				bStop=false
			if(attr=='opacity')
			{
				obj.style.fliter='alpha(opacity:'+cur+speed+')'
				obj.style.opacity=(cur+speed)/100
			}
			obj.style[attr]=cur+speed+'px'
		}
		if(bStop)
		{
			clearInterval(obj.timer)
			if(fnEnd)fnEnd()
		}
	},30)
}
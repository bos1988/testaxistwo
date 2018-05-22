$(document).ready(
	function()
	{
		//скрываем стрелки
		$(".arrow").hide();
		
		// задаем случайное уравнение в соответствии с условиями
		var a = 6 + Math.round(Math.random() * 3);
		var c = 11 + Math.round(Math.random() * 3);
		var b = c - a;
		
		//настройки Canvas
		var lineW = 2.5;
		var canvas1 = document.getElementById('canvas1');
		var canvas2 = document.getElementById('canvas2');
		var ctx1 = canvas1.getContext('2d');
		var ctx2 = canvas2.getContext('2d');
		//размеры стрелок в соответствии с выпавшим уравнением
		var size1 = {w: 39*a,h: 15*a};
		var size2 = {w: 39*b,h: 15*b};
		canvas1.width = size1.w;
		canvas1.height = size1.h;
		canvas2.width = size2.w;
		canvas2.height = size2.h;
		$("#arrow2").css({left:35+a*39});
		
		//рисуем стрелки
		function drawArrow(ctx, W, H)
		{
			ctx.beginPath();
			ctx.strokeStyle = 'rgb(81%, 34%, 55%)';
			ctx.lineWidth = lineW;
			ctx.moveTo(0,H);
			ctx.bezierCurveTo(W*0.15, -H*0.1, W*0.85, -H*0.1, W, H);
			ctx.lineTo(W*0.95, H*0.91);
			ctx.moveTo(W, H);
			ctx.lineTo(W*1.00, H*0.85);
			ctx.stroke();
			ctx.closePath();
		}
		drawArrow(ctx1, size1.w-lineW/2, size1.h);
		drawArrow(ctx2, size2.w-lineW/2, size2.h);
		
		//уменьшаем стрелки для анимации
		$(".arrow canvas").css({width: "18", height: "7"});
		
		//текст на странице
		$("#example").find("span").eq(0).html(a);
		$("#example").find("span").eq(1).html(b);
		$("#example input").val('?');
		$(".arrow input").val('');
		
		//анимация первой стрелки
		$("#arrow1").fadeIn("fast");
		$("#canvas1").animate({width: size1.w, height: size1.h}, 1000);
		
		$('input').focus(function(){
			$(this).val('');
		});
		$('#arrow1 input').change(function(){
			if($(this).val() == a)
			{
				$(this).removeClass('redtext');
				$("#example").find("span").eq(0).removeClass('yellowback');
				$(this).attr('disabled','disabled');
				$(this).addClass('done');
				$("#arrow2").fadeIn("fast");
				$("#canvas2").animate({width: size2.w, height: size2.h}, 1000);
			}
			else
			{
				$("#example").find("span").eq(0).addClass('yellowback');
				$(this).addClass('redtext');
			}
		});
		$('#arrow2 input').change(function(){
			if($(this).val() == b)
			{
				$(this).removeClass('redtext');
				$("#example").find("span").eq(1).removeClass('yellowback');
				$(this).attr('disabled','disabled');
				$(this).addClass('done');
				$("#example input").removeClass('done').removeAttr('disabled').val('');
			}
			else
			{
				$(this).addClass('redtext');
				$("#example").find("span").eq(1).addClass('yellowback');
			}
		});
		$('#example input').change(function(){
			if($(this).val() == c)
			{
				$(this).removeClass('redtext');
				$(this).attr('disabled','disabled');
				$(this).addClass('done');
			}
			else
			{
				$(this).addClass('redtext');
			}
		});
		
		
	}
);

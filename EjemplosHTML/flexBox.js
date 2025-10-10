function cambiarFlexDirection(){
	var aFlexDirection = ['row','column','row-reverse','column-reverse'];
	var contenedor = document.querySelector(".contenedor");
	var actual = aFlexDirection.indexOf(contenedor.style.flexDirection);
	var index = (actual=="undefined"  || actual==-1 || (++actual)>(aFlexDirection.length-1))?0:actual++;
	var propiedad = aFlexDirection[index];
	contenedor.style.height=null;
	contenedor.style.flexDirection=propiedad;
	document.querySelector("#camFDir").innerHTML=propiedad;
}
function cambiarFlexWrap(){
	var aFlexWrap = ['nowrap','wrap','wrap-reverse'];
	var contenedor = document.querySelector(".contenedor");
	var actual = aFlexWrap.indexOf(contenedor.style.flexWrap);
	var index = (actual=="undefined" || actual==-1 || (++actual)>(aFlexWrap.length-1))?0:actual++;
	var propiedad = aFlexWrap[index];
	if (propiedad.includes("nowrap")) {
    	noWrap();
    	document.getElementById("camAC").setAttribute('disabled','');
	} else {
    	wrap();
    	document.getElementById("camAC").removeAttribute('disabled');
	}
	contenedor.style.height=null;
	contenedor.style.flexWrap=propiedad;
	document.querySelector("#camFWr").innerHTML=propiedad;
}
function cambiarJustifyContent(){
	var aJustifyContent = ['flex-start','flex-end','center','space-around','space-between','space-evenly'];
	var contenedor = document.querySelector(".contenedor");
	var actual = aJustifyContent.indexOf(contenedor.style.justifyContent);
	var index = (actual=="undefined"  || actual==-1 || (++actual)>(aJustifyContent.length-1))?0:actual++;
	var propiedad = aJustifyContent[index];
	contenedor.style.height=null;
	contenedor.style.justifyContent=propiedad;
	document.querySelector("#camJCnt").innerHTML=propiedad;
}
function cambiarAlignItems(){
	var aAlignItems = ['flex-start','flex-end','center'];
	var contenedor = document.querySelector(".contenedor");
	var actual = aAlignItems.indexOf(contenedor.style.alignItems);
	var index = (actual=="undefined"  || actual==-1 || (++actual)>(aAlignItems.length-1))?0:actual++;
	var propiedad = aAlignItems[index];
	contenedor.style.height="50vh";
	contenedor.style.alignItems=propiedad;
	document.querySelector("#camAIt").innerHTML=propiedad;
}
function cambiarAlignContent(){
	var aAlignContent = ['flex-start','flex-end','center'];
	var contenedor = document.querySelector(".contenedor");
	var actual = aAlignContent.indexOf(contenedor.style.alignContent);
	var index = (actual=="undefined"  || actual==-1 || (++actual)>(aAlignContent.length-1))?0:actual++;
	var propiedad = aAlignContent[index];
	contenedor.style.height="70vh";
	contenedor.style.alignContent=propiedad;
	document.querySelector("#camAC").innerHTML=propiedad;
}
function noWrap(){
	document.querySelector(".contenedor").innerHTML="<div class='elemento e1' onclick='modificar(this)'>1</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e2' onclick='modificar(this)'>2</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e3' onclick='modificar(this)'>3</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e4' onclick='modificar(this)'>4</div>";
}
function wrap() {
	document.querySelector(".contenedor").innerHTML="<div class='elemento e1' onclick='modificar(this)'>1</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e2' onclick='modificar(this)'>2</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e3' onclick='modificar(this)'>3</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e4' onclick='modificar(this)'>4</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e5' onclick='modificar(this)'>5</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e6' onclick='modificar(this)'>6</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e7' onclick='modificar(this)'>7</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e8' onclick='modificar(this)'>8</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e9' onclick='modificar(this)'>9</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e10' onclick='modificar(this)'>10</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e11' onclick='modificar(this)'>11</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e12' onclick='modificar(this)'>12</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e13' onclick='modificar(this)'>13</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e14' onclick='modificar(this)'>14</div>";
	document.querySelector(".contenedor").innerHTML+="<div class='elemento e15' onclick='modificar(this)'>15</div>";
}

function modificar(elemento){
	var grow = elemento.style.flexGrow;
	if (!grow || isNaN(parseInt(grow))) {
    	elemento.style.flexGrow=0;
	} else {
    	if (grow == 0) {
        	elemento.style.flexGrow++;
    	}
    	else {
        	elemento.style.flexGrow--;
    	}
	}
}
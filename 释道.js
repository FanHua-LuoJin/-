let modal1 = document.getElementById("mapEx1")

let img=document.getElementById("map")
let modalimg=document.getElementById("pic01")
let caption=document.getElementById("caption")

img.onclick=function(){
    modal1.style.display="block";
    modalimg.src=this.src;
    modalimg.alt=this.alt;
    caption.innerHTML=this.alt;
} 

let span1=document.getElementsByClassName("close")[0];

span1.onclick=function(){
     modal1.style.display="none";
}
// 释道版面图模态窗口的代码

let modal2 = document.getElementById("mapEx2")

let img1=document.getElementById("cards")
let modalimg1=document.getElementById("pic02")
let caption1=document.getElementById("caption1")

img1.onclick=function(){
    modal2.style.display="block";
    modalimg1.src=this.src;
    modalimg1.alt=this.alt;
    caption1.innerHTML=this.alt;
} 

let span2=document.getElementsByClassName("close")[1];

span2.onclick=function(){
     modal2.style.display="none";
}

// 卡片示例窗口



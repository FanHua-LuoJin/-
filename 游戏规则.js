let word = document.getElementById("daiBiao")
let wordContainer = document.querySelector(".daiBiaoRen")

function showFunction(){
        wordContainer.style.display = "flex";
        word.disabled=true;
        word.style.display ="none"
    }

function hideFunction(){
        wordContainer.style.display = "none";
        word.disabled=false;
        word.style.display="flex"
}

let word1 = document.getElementById("xuanJiang")
let wordContainer1 = document.querySelector(".xuanJiangEX")
function showFunction1(){
        wordContainer1.style.display = "flex";
        word1.disabled=true;
        word1.style.display ="none"
    }

function hideFunction1(){
        wordContainer1.style.display = "none";
        word1.disabled=false;
        word1.style.display="flex"
}

let word2 = document.getElementById("bianLun")
let wordContainer2 = document.querySelector(".bianLunEX")
function showFunction2(){
        wordContainer2.style.display = "flex";
        word2.disabled=true;
        word2.style.display ="none"
    }

function hideFunction2(){
        wordContainer2.style.display = "none";
        word2.disabled=false;
        word2.style.display="flex"
}
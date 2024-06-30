const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const sliderWindow = document.querySelector(".slider");

let sliderNum = 1;
let imagesLength = document.querySelectorAll(".image").length;

rightArrow.addEventListener("click", ()=>{
	console.log("clicked");
	
	if(sliderNum < imagesLength){
		sliderWindow.style.transform = `translate(${-800 * sliderNum}px)`;
		sliderNum++;
	}
	else{
		sliderNum = 1;
		sliderWindow.style.transform = `translate(0px)`;
	}
	
})
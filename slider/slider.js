const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const sliderWindow = document.querySelector(".slider");

let sliderNum = 1;
let imagesLength = document.querySelectorAll(".image").length;

let nextSlide = () =>{
	sliderWindow.style.transform = `translate(${-800 * sliderNum}px)`;
	sliderNum++;

}

let previousSlide = () => {
	sliderNum = 1;
	sliderWindow.style.transform = `translate(0px)`;

}

rightArrow.addEventListener("click", ()=>{
	console.log("clicked");
	
	sliderNum < imagesLength ? nextSlide() : previousSlide();
})


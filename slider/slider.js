const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const sliderWindow = document.querySelector(".slider");

let sliderNum = 1;
let imagesLength = document.querySelectorAll(".image").length;

let nextSlide = () =>{
	sliderWindow.style.transform = `translate(${-800 * sliderNum}px)`;
	sliderNum++;

}
let previousSlide = () =>{
	sliderWindow.style.transform = `translate(-${800 * (sliderNum-2)}px)`;
	sliderNum--;
	
}


const getFirstSlide = () => {
	sliderNum = 1;
	sliderWindow.style.transform = `translate(0px)`;

}

/* from 1st slide to 2nd slide - 800 = 800 x 1
   from 1st slide to 3rd slide - 1600 = 800 x 2 = 800 x (total number of slides - 1)
	 total number of slides = 3
*/
const getLastSlide = () => {
	sliderWindow.style.transform = `translate(-${(imagesLength-1) * 800}px)`;
	sliderNum = imagesLength;
}

rightArrow.addEventListener("click", ()=>{
	console.log("right clicked");
	
	//show next slide until reach last slide and then show first slide
	sliderNum < imagesLength ? nextSlide() : getFirstSlide();
})


//click left arrow on first slide would show last slide
leftArrow.addEventListener("click", () => {
	console.log("left click");
  //show previous slide until reach first slide and then show last slide
  sliderNum  > 1 ? previousSlide() : getLastSlide();
})




/*************************************** start of code for top slider  ***********************************************************************/

const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const sliderWindow = document.querySelector(".slider");

let sliderNum = 1;
let imagesLength = document.querySelectorAll(".image").length;

let currentImageColor = document.querySelector("document.body")

let colorsList = ["#9333FF", "#00ff6c",  "#1d2c73", "#a5533f" ] ;

let framewidth = document.querySelector(".frame").clientWidth;

const bottom = document.querySelector(".bottom");

//create divs for buttons dynamically
for (let i=0; i < imagesLength; i++){
	const div = document.createElement("div");
	div.className = "button" ;
	bottom.appendChild(div) ;
}

//create event listner for each of buttons
const buttons = document.querySelectorAll(".button") ;
buttons[0].style.backgroundColor = "#FFFFFF";

//reset background color when clicked next button
const resetBackgroundColor = () =>{
	buttons.forEach((button) =>{
    button.style.backgroundColor = "transparent" ;
	});
}


buttons.forEach( (button, i) =>{
	button.addEventListener("click", ()=>{
		resetBackgroundColor();
		sliderWindow.style.transform = `translate(-${i * framewidth}px)` ;
		sliderNum = i+1;
    button.style.backgroundColor = "#FFFFFF";

	})
})


let nextSlide = () =>{
	sliderWindow.style.transform = `translate(${-framewidth * sliderNum}px)`;
	sliderNum++;

}
let previousSlide = () =>{
	sliderWindow.style.transform = `translate(-${framewidth * (sliderNum-2)}px)`;
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
	sliderWindow.style.transform = `translate(-${(imagesLength-1) * framewidth}px)`;
	sliderNum = imagesLength;
}


const changeButtonColor = () => {
	resetBackgroundColor();
	buttons[sliderNum-1].style.backgroundColor= "#FFFFFF";
}


rightArrow.addEventListener("click", ()=>{
	console.log("right clicked");
	
	//show next slide until reach last slide and then show first slide
	if( sliderNum < imagesLength) {
		document.body.style.backgroundColor = colorsList[sliderNum  ];
		nextSlide() ;
    

	}else {
		document.body.style.backgroundColor = colorsList[imagesLength - sliderNum];
		getFirstSlide();
		
	}

  changeButtonColor();
})


//click left arrow on first slide would show last slide
leftArrow.addEventListener("click", () => {
	console.log("left click");
  //show previous slide until reach first slide and then show last slide
  if (sliderNum  > 1){
		document.body.style.backgroundColor = colorsList[sliderNum -2];
		previousSlide();
	} else{
		getLastSlide();
		document.body.style.backgroundColor = colorsList[imagesLength-1];
	} 

	changeButtonColor();
})
/*************************************** end of code for top slider  ***********************************************************************/



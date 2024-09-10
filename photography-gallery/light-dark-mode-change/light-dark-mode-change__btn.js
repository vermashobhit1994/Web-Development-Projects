


const toggleBtn = document.querySelector(".light-dark-mode-change__btn");

const addLightDarkMode = "light-dark-mode-change_toggle" ;

const lightMode = "light-mode";
const darkMode = "dark-mode" ;

const photographyGallery = document.querySelector(".photography-gallery");

function initital_state(){
  photographyGallery.classList.add(darkMode);
	toggleBtn.classList.add(addLightDarkMode);
}

function changeMode(){
  toggleBtn.addEventListener("click", (e) => {


		toggleBtn.classList.toggle(addLightDarkMode);


    photographyGallery.classList.toggle(lightMode);
		photographyGallery.classList.toggle(darkMode);	
	})
}

initital_state();
changeMode();



import {
  photographyGallery,
  darkMode,
  toggleBtn,
  addLightDarkMode,
  darkModeTextColor,
	navigationBar,
	lightMode
} from "../common/export-nodes.js";


export function modeChange(){

	toggleBtn.classList.toggle(addLightDarkMode);

	photographyGallery.classList.toggle(lightMode);
	photographyGallery.classList.toggle(darkMode);
	
	navigationBar.classList.toggle(darkModeTextColor);

}


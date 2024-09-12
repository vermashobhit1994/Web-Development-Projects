import {
  photographyGallery,
  darkMode,
  toggleBtn,
  addLightDarkMode,
  darkModeTextColor,
	navigationBar,
} from "./export-nodes.js";

export function init_app() {
  photographyGallery.classList.add(darkMode);
  toggleBtn.classList.add(addLightDarkMode);

  navigationBar.classList.add(darkModeTextColor);
}




//single event listner to common parent element
const allImagesContainer = document.querySelectorAll(".photography-gallery__image-wrapper");

const allimages = document.querySelectorAll(".photography-gallery__image");


allImagesContainer.forEach(  (imageContainer) =>  {
    const currentImage = imageContainer.querySelector("img");
    currentImage.addEventListener("load", (ev) => {
        currentImage.classList.add("photography-gallery--image-loaded");
        currentImage.style.display = "block";
        currentImage.style.backgroundImage = "none";
    })

})


const imagesCount = allimages.length;

const imageCategories = ["adventure", "landscape-travel", "real-estate"];

//don't even need to hard code values


// const IMAGE_URLs = {imageCategories[0]: "./images/adventure/1/DSC01016_20x30.jpeg"  ,
//                     imageCategories[0]: "./images/adventure/2/DSC06386_20x13.jpeg" ,
//                     imageCategories[0]: "./images/adventure/3/DSC07486_20x13.jpeg" ,
//                     imageCategories[0]: "./images/adventure/4/DSC07571_20x13.jpeg" ,
//                     imageCategories[0]: "./images/adventure/5/DSC08444_20x13.jpeg" , 
//                    };



//add class when image gets fully loaded
// switch(imagesCount){
//     case 0: {
//         allimages[0].style.backgroundImage = url("./images/adventure/1/DSC01016_20x30.jpeg");
//     }
//     default: 
// }

//add background image 

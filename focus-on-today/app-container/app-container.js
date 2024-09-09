/* Description : this file 
   1. appear error message when user clicks on checkbox button
	 2. display tick mark only if all input fields are filed.
	 3. update localStorage with user entered goal name and complete status
	 4. prevent user from writing to input field when specific goal entery is already
	    filled and also tick checkmark also appear. 
*/

/*************** nodes corresponding to UI screen *******************************************/

//select all checkbox
const checkBoxList = document.querySelectorAll(
  ".app-container__custom-radio-button"
);

//select input fields
const goalInputFields = document.querySelectorAll(".app-container__goal-input");

//select error label
const errorLabel = document.querySelector(".app-container__error-label");

//select progress
const progressBar = document.querySelector(".app-container__progress-bar");

//select progressvalue shown on progress bar
const progressValue = document.querySelector(".app-container__progress-value");

//select label shown above progress bar
const progressLabel = document.querySelector(".app-container__progress-label");

//quotes shown above progress bar
const quotes = [
  "Raise the bar, by completing your goals",
  "Well begun is half done",
  "Just a step away, keep going",
  "Whoa! You just completed, all goals, time for chill",
];


/****************************************************************************************************/


/************************** goals related  ****************************************************************/

/* store text that user enter into goals ****************************************************/
// NOTE: here hard code values are removed so that any new tasks can be added dynamically
let allGoals =
  JSON.parse(window.localStorage.getItem("allGoals")) ||
  {
    // "goal-first": {
    // 	name: "",
    // 	completed: false,
    // }
    // ,
    // "goal-second": {
    // 	name: "",
    // 	completed: false,
    // }
    // ,
    // "goal-third": {
    // 	name: "",
    // 	completed: false,
    // }
  };

//find number of completed goals
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
/****************************************************************************************************************/


function initial_state_on_reload() {
  //reload state
  progressValue.firstElementChild.innerText = `${completedGoalsCount}/${goalInputFields.length} completed`;

  progressValue.style.width = `${
    (completedGoalsCount / goalInputFields.length) * 100
  }%`;

  progressLabel.innerText = quotes[completedGoalsCount];
}



checkBoxList.forEach((checkbox) => {


	//when user clicks on checkbox
  checkbox.addEventListener("click", () => {
    

		//check if input isn't empty
		//getting all values for key in localStorage
    const allGoalsAdded = [...goalInputFields].every((inputField) => {
      return inputField.value;
    });
		// ******************************************************************************************************/

		
		//if user already written goal and then tick mark it
		//if entry for completed key is true in localStorage
    if (allGoalsAdded) {

			/* toggle checkbox tickmark ***********************************/
      const checkbox_Parent = checkbox.parentNode;
      checkbox_Parent.classList.toggle("app-container_completed");
			/***************************************************************/


      // ** update the complete status of input goal in object ********************/
      const inputId = checkbox.nextElementSibling.name;
      allGoals[inputId].completed = !allGoals[inputId].completed;
			// **************************************************************************/


			// ********** get number of goals count which are completed  ********************/
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
			// ****************************************************************************/


			/*************** update progress bar  *********************************/
      progressValue.style.width = 
			` ${ (completedGoalsCount / goalInputFields.length) * 100}% ` ;
			/**********************************************************************/


			// ***************** update progress bar inner text **********************************************************************/
      progressValue.firstElementChild.innerText = `${completedGoalsCount} /${goalInputFields.length} completed`;
			// ********************************************************************************************************************* */

			// ******** update quote written above progress bar **********************************/
			progressLabel.innerText = quotes[completedGoalsCount];
			// ************************************************************************************/

			// ** update the complete status of input goal in localStorage ********************/
      window.localStorage.setItem("allGoals", JSON.stringify(allGoals));
			// ************************************************************************************/


    } else {

      // it isn't a good practice to write inline style using javascript
      //  errorLabel.style.display = "block" ;

      // ************  show error label if all goals isn't added  *************************/
      const errorLabel_Parent = errorLabel.parentNode;
      errorLabel_Parent.classList.add("app-container_show-error");
			// **********************************************************************************/
    }
  });
});


/*********************** when user write in checkbox **************************************/
goalInputFields.forEach((input) => {
  
	//if user is entering goals for first time
	//check what goal user has selected
	if (allGoals[input.name]) {

    // ******** update data entered to window screen ************************************/
    input.value = allGoals[input.name].name;
		// **********************************************************************************/


    // ********** update the tick mark *************************************************/
    if (allGoals[input.name].completed) {
			console.log("hell");

			//TODO: understand why added tick mark
      const parentInput = input.parentElement;
      parentInput.classList.add("app-container_completed");
    }
		// *********************************************************************************/
  }

	// ************ remove error label when user click on input  ********************/
  input.addEventListener("focus", () => {
    progressBar.classList.remove("app-container_show-error");
  });
	// *******************************************************************************/


  // **** store goal text input to local storage when user write something to input text box ****************/
  input.addEventListener("input", (e) => {
    
		


		// ****** prevent user from writing to input if it's already filled and checkmark is also ticked. **********/
    //save user entered goal into array of objects
		//if there's entry for goal name in localStorage and goals complete status is true
    if (allGoals[input.name] && allGoals[input.name].completed) {
      input.value = allGoals[input.name].name;
      return;
    }
		// *******************************************************************************************************/

		// ***************** user entered goal other than first time *****************/
    // if there's value for name in localStorage
		if (allGoals[input.name]) {
			//update object with user entered input goal
      allGoals[input.name].name = input.value;
    } 
		
		else {
			//create entry in object for user entered input corresponding to user entered text box
      allGoals[input.name] = {
        name: input.value,
        completed: false,
      };
    }

		//update localStorage with user entered goal name and goal status
    window.localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});


//default state when user enters 
initial_state_on_reload();
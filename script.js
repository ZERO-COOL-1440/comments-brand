/*-----------------------------------*\
  #script.js
\*-----------------------------------*/

const textareaEL = document.querySelector(".form__textarea");
const counterEL = document.querySelector(".counter");

const inputHandler = () => {
  const maxChars = 150;

  const CharsTyped = textareaEL.value.length;

  const charsLeft = maxChars - CharsTyped;

  // number of charaters left
  counterEL.textContent = charsLeft;
};

textareaEL.addEventListener("input", inputHandler);

//submit component
const formEL = document.querySelector(".form");

const submitHandler = (event) => {
  event.preventDefault();
};

textareaEL.addEventListener("submit", submitHandler);

/*-----------------------------------*\
  #script.js
\*-----------------------------------*/
// -- Global --
const timer = 2000;
const MAX_CHARS = 150;
const BASE_API_URL = "https://bytegrad.com/course-assets/js/1/api";

const textareaEL = document.querySelector(".form__textarea");
const counterEL = document.querySelector(".counter");
const formEL = document.querySelector(".form");
const feedsEL = document.querySelector(".feedbacks");
const submitEL = document.querySelector(".submit-btn");
const spinnerEL = document.querySelector(".spinner");

const renderFeedbackItem = (feedback) => {
  const feedItem = `
    <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${feedback.upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${feedback.badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${feedback.company}</p>
            <p class="feedback__text">${feedback.text}</p>
        </div>
        <p class="feedback__date">${
          feedback.daysAgo === 0 ? "NEW" : `${feedback.daysAgo}d`
        }</p>
    </li>
`;
  feedsEL.insertAdjacentHTML("beforeend", feedItem);
};

const inputHandler = () => {
  const CharsTyped = textareaEL.value.length;

  const charsLeft = MAX_CHARS - CharsTyped;

  // number of charaters left
  counterEL.textContent = charsLeft;
};

textareaEL.addEventListener("input", inputHandler);

//form component

const submitHandler = (event) => {
  event.preventDefault();
  const text = textareaEL.value;

  if (text.includes("#") && text.length >= 5) {
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");
    textareaEL.focus();
    return;
  }

  //to do job

  const hashtag = text.split(" ").find((word) => word.includes("#"));
  const company = hashtag.substring(1);
  const badgeLetter = company.substring(0, 1).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;

  // --feedbacks

  const feed = {
    upvoteCount: upvoteCount,
    daysAgo: daysAgo,
    company: company,
    badgeLetter: badgeLetter,
    text: text,
  };
  renderFeedbackItem(feed);

  // --send feedback item to server
  fetch(`${BASE_API_URL}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feed),
    headers: {
      Accept: "aplication/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Something went wrong");
        return;
      }
      console.log("Successfuly submitted");
    })
    .catch((error) => console.log(error));

  textareaEL.value = "";
  submitEL.blur();
  counterEL.textContent = MAX_CHARS;
};

const showVisualIndicator = (textCheck) => {
  const className = textCheck === "valid" ? "form--valid" : "form--invalid";
  formEL.classList.add(className);
  setTimeout(() => {
    formEL.classList.remove(className);
  }, timer);
};

formEL.addEventListener("submit", submitHandler);

fetch(`${BASE_API_URL}/feedbacks`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    spinnerEL.remove();
    data.feedbacks.forEach((feedItem) => {
      renderFeedbackItem(feedItem);
    });
  })
  .catch((error) => {
    feedsEL.textContent = `failed to fetch feedback items. Error message: ${error.message}`;
  });

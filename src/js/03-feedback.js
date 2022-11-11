import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const textInput = document.querySelector('textarea');
const submitBtn = document.querySelector('button');

feedbackForm.addEventListener('input', throttle(onInput, 500));
submitBtn.addEventListener('click', onSubmitBtnClick);

const FEEDBACK_KEY = 'feedback-form-state';
const feedbackObject = {};

function onInput(evt) {
    feedbackObject[evt.target.name] = evt.target.value;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackObject));
}

function onSubmitBtnClick(evt) {
    evt.preventDefault();
    console.log(JSON.parse(localStorage.getItem(FEEDBACK_KEY)));
    feedbackForm.reset();
    localStorage.clear();
}

function onRestart() {
    const parsedSettings = JSON.parse(localStorage.getItem(FEEDBACK_KEY));
    if (parsedSettings) {
        emailInput.value = parsedSettings.email || '';
        textInput.value = parsedSettings.message || '';
    }
}

onRestart();

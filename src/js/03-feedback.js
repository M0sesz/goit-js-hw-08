import throttle from 'lodash.throttle';

const FEEDBACK_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form  textarea'),
  email: document.querySelector('.feedback-form input[name="email"]'),
};

const formData = {};

refs.form.addEventListener('input', throttle(addInputDataToLocalStorage, 500));
refs.form.addEventListener('submit', onFormSubmit);

function addInputDataToLocalStorage(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(formData));
}

function onTextAreaInput() {
  const localStorageData = JSON.parse(localStorage.getItem(FEEDBACK_KEY));

  if (localStorageData.message) {
    refs.textarea.value = localStorageData.message;
  }

  if (localStorageData.email) {
    refs.email.value = localStorageData.email;
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  const userEmail = e.target.email.value;
  const userMessage = e.target.message.value;

  if (userEmail === '' || userMessage === '') {
    return false;
  }

  e.target.reset();
  const localStorageData = JSON.parse(localStorage.getItem(FEEDBACK_KEY));

  if (localStorageData) {
    console.log(localStorageData);
  }

  localStorage.removeItem(FEEDBACK_KEY);
}

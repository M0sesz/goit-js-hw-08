import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
let feedbackFormState = JSON.parse(
  localStorage.getItem('feedback-form-state')
) || { email: '', message: '' };

formEl.email.value = feedbackFormState.email;
formEl.message.value = feedbackFormState.message;
formEl.addEventListener(
  'input',
  throttle(event => {
    feedbackFormState[event.target.name] = event.target.value;
    localStorage.setItem(
      'feedback-form-state',
      JSON.stringify(feedbackFormState)
    );
  }, 500)
);

formEl.addEventListener('submit', event => {
  event.preventDefault();
  if (formEl.email.value === '' || formEl.message.value === '') {
    return alert('Всі поля мають бути заповнені !');
  }
  console.log(feedbackFormState);
  event.target.reset();
  localStorage.removeItem('feedback-form-state');
});

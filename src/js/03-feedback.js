import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

function saveFormData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onInput(event) {
  formData[event.target.name] = event.target.value;
  saveFormData();
}

function populateForm() {
  if (formData.email) {
    form.elements.email.value = formData.email;
  }
  if (formData.message) {
    form.elements.message.value = formData.message;
  }
}

function onSubmit(event) {
  event.preventDefault();
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  event.target.reset();
  Object.keys(formData).forEach((key) => (formData[key] = ''));
}

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

populateForm();


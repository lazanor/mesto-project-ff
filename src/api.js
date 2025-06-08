//Конфиг для валидации и API
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
  const apiProfileURL = 'https://nomoreparties.co/v1/wff-cohort-39/users/me';
  const apiCardURL = 'https://nomoreparties.co/v1/wff-cohort-39/cards';
  const apiToken = 'bc5ec85e-2904-4d40-86fe-731d5cf8c1ff';

  export { config, apiProfileURL, apiCardURL, apiToken }
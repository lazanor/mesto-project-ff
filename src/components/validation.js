/**
 * -------------------------------------
 * ВАЛИДАЦИЯ ФОРМ
 * -------------------------------------
 */

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      const buttonElement = formElement.querySelector(config.submitButtonSelector);    
      const elementList = Array.from(formElement.querySelectorAll(config.inputSelector));
      //toggleButtonState(elementList, buttonElement, config.inactiveButtonClass);
      elementList.forEach((input) => {
        input.addEventListener('input', function() {
          checkInputValidity(formElement, input, config);
          toggleButtonState(elementList, buttonElement, config.inactiveButtonClass);
        });
      })
    });
  }
  
  const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`${config.inputSelector}_type_${inputElement.name}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    //errorElement.classList.add('form__input-error_active');
  }
  
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`${config.inputSelector}_type_${inputElement.name}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    //errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  }

  const diactivateButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }

  const activateButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      //console.log(inputElement.validity);
      return !inputElement.validity.valid;    
    });
  };
  
  const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
      //console.log('has input errors');
      diactivateButton(buttonElement, inactiveButtonClass);
    } else {
      //console.log('no input errors');
      activateButton(buttonElement, inactiveButtonClass);
    }
  };
  
  const checkInputValidity = (form, input, config) => {
    //console.log(input.validity);
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity('');
    }
    if (!input.validity.valid) {
      showInputError(form, input, input.validationMessage, config);
    } else {
      hideInputError(form, input, config);
    }
  }
  
  const clearValidation = (formElement, config) => {
    //console.log('вызов очистки валидации');
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    diactivateButton(buttonElement, config.inactiveButtonClass);
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
    })
  }
  
  /**
   * -------------------------------------
   * ЗАКОНЧИЛИ С ВАЛИДАЦИЕЙ
   * -------------------------------------
   */

  export { clearValidation, enableValidation };
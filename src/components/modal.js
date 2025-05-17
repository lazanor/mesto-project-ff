import { handleMouseOverlayClick } from "../index.js";

/** Открытие попапа */
  function openPopup(obj) {
    obj.classList.add('popup_is-opened');    
    obj.classList.remove('popup_is-animated');
    obj.addEventListener('click', handleMouseOverlayClick);
    
  }

  function openProfilePopup(obj) {
    obj.classList.add("popup_is-opened");
    obj.classList.remove('popup_is-animated');
    const profileForm = document.forms['edit-profile'];
    let profileName = profileForm.elements.name;
    let profileDescription = profileForm.elements.description;

    profileName.value = document.querySelector('.profile__title').textContent;
    profileDescription.value = document.querySelector('.profile__description').textContent;
    obj.addEventListener('click', handleMouseOverlayClick);
  }
  
  /** Закрытие попапа и очистка полей */
  function closePopup(popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.remove("popup_is-opened");
    clearPopupFields(popup);
    popup.removeEventListener('click', handleMouseOverlayClick);
  }

  /** Отдельно очистка полей */
  function clearPopupFields(popup) {
    popup.querySelectorAll(".popup__input").forEach((item) => (item.value = ""));
  }


export { openPopup, openProfilePopup, closePopup, clearPopupFields }
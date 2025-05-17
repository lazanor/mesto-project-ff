import './pages/index.css';
import {initialCards} from './cards.js';
import { initCards, createCard, viewImage } from './components/card.js';
import { openPopup, openProfilePopup, closePopup, clearPopupFields } from './components/modal.js';

// DOM узлы
/** Найдем нужные нам узлы */
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");



/** 

+-----------------------------------------------------+
|                                                     |
| Набор вспомогательных функций для обработки событий |
|                                                     |
+-----------------------------------------------------+

*/  

  /** Обработка нажатия Escape */
  function handleEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        openedPopup.classList.remove('popup_is-opened');
      }
    }
  }

  /** Обработка клика на оверлей */
  function handleMouseOverlayClick(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      if (!evt.composedPath().includes(openedPopup.querySelector('.popup__content')))
      {
        openedPopup.classList.remove('popup_is-opened');
      }
    }
  }

/**
---------------------------------------
  КОНЕЦ БЛОКА ВСПОМОГАТЕЛЬНЫХ ФУНКЦИЙ
---------------------------------------
 */



/** 

+-------------------+
|                   |
| Инициируем кнопки |
|                   |
+-------------------+

*/
function initButtons() {
  /** Инициируем кнопки */
  const cardAddButton = content.querySelector(".profile__add-button");
  const profileEditButton = content.querySelector(".profile__edit-button");

  const newCardCloseButton = document.querySelector(".popup_type_new-card .popup__content .popup__close");
  const profileEditCloseButton = document.querySelector(".popup_type_edit .popup__content .popup__close");
  const imageCardCloseButton = document.querySelector(".popup_type_image .popup__content .popup__close");
  
  const newCardSafeButton = document.querySelector(".popup_type_new-card .popup__button");
    
  /** Добавим слушателей для открытия попапов */
  cardAddButton.addEventListener("click", () => openPopup(newCardPopup));  
  profileEditButton.addEventListener("click", () => openProfilePopup(editProfilePopup));
  
  /** Добавим слушателей для закрытия попапов */
  newCardCloseButton.addEventListener("click", () => closePopup(newCardPopup));
  profileEditCloseButton.addEventListener("click", () => closePopup(editProfilePopup));
  imageCardCloseButton.addEventListener("click", () => closePopup(imagePopup));

  /** Добавим слушаетль для обработки Escape */
  document.addEventListener('keydown', handleEscape);

  /**
  ---------------------------------------
    НОВАЯ КАРТОЧКА
  ---------------------------------------
  */

  /** Функция для добавления новой карточки */

  const newCardForm = document.forms['new-place'];

  function addNewCard(evt) {
    evt.preventDefault();    
    const placeName = newCardForm.elements['place-name'].value;
    const placePictureLink = newCardForm.elements.link.value;

    const cardElement = createCard(placeName, placePictureLink, viewImage);
    placesList.prepend(cardElement);
    closePopup(newCardPopup);
  }
  
  /** Добавим слушатель для кнопки сохранения новой карточки */
  newCardForm.addEventListener("submit", (evt) => addNewCard(evt));

  /**
  ---------------------------------------
    РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  ---------------------------------------
 */

  //Подключение формы редактирования профиля
  const profileForm = document.forms['edit-profile'];
  let profileName = profileForm.elements.name;
  let profileDescription = profileForm.elements.description;

  profileName.value = content.querySelector('.profile__title').textContent;
  profileDescription.value = content.querySelector('.profile__description').textContent;

  function submitEditProfile(evt, editProfilePopup, profileName, profileDescription){
    evt.preventDefault();
    content.querySelector('.profile__title').textContent = profileName;
    content.querySelector('.profile__description').textContent = profileDescription;    
    closePopup(editProfilePopup);
  }

  profileForm.addEventListener('submit', (evt) => submitEditProfile(evt, editProfilePopup, profileName.value, profileDescription.value));

}

/**
---------------------------------------
  ЗАКОНЧИЛИ С КНОПКАМИ
---------------------------------------
 */



initButtons();
initCards(initialCards, placesList);

export { handleMouseOverlayClick }
import { handleMouseOverlayClick } from "../index.js";

/** 

+-----------------------------------+
|                                   |
| Набор функций работы с карточками |
|                                   |
+-----------------------------------+

*/

// Темплейт карточки
function getTemplate(templateID, elementID) {
    const cardTemplate = document.querySelector(templateID).content;
    return cardTemplate.querySelector(elementID).cloneNode(true);
  }
  
  // Функция открытия картинки
  
  function viewImage(link) {
    const imagePopup = document.querySelector(".popup_type_image");
    imagePopup.classList.add("popup_is-opened");   
    imagePopup.querySelector('.popup__image').src = link;
    imagePopup.addEventListener('click', handleMouseOverlayClick);
  }
  
  // Функция лайка карточки
  
  function likeCard(likeIcon) {  
    likeIcon.classList.toggle('card__like-button_is-active');
  }
  
  // Функция создания карточки
  
  function createCard(name, link, imageClickFunction, likeFunction) {
    const cardElement = getTemplate("#card-template", ".card");
  
    //Задаем параметры карточки
    cardElement.querySelector(".card__title").textContent = name;
    cardElement.querySelector(".card__image").src = link;
  
    //Инициируеим кнопку удаления карточки
    const cardDelButton = cardElement.querySelector(".card__delete-button");
    cardDelButton.addEventListener("click", () =>
      delCard(cardDelButton.closest(".card"))
    );
  
    //Задаем обработку нажатия на картинку
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => imageClickFunction(link));
  
    //Задаем обработку лайка
    const likeIcon = cardElement.querySelector('.card__like-button');
    likeIcon.addEventListener('click', () => likeFunction(likeIcon));
  
    return cardElement;
  }
  
  // Функция удаления карточки
  function delCard(card) {
    card.remove();
  }
  
  // Вывести карточки на страницу
  function initCards(collection, placesList) {
    collection.forEach((item) => {
      const cardElement = createCard(item.name, item.link, viewImage, likeCard);
      placesList.append(cardElement);
    });
  }
  
  /**
  ---------------------------------------
    КОНЕЦ БЛОКА РАБОТЫ С КАРТОЧКАМИ
  ---------------------------------------
   */

  export { createCard, initCards , viewImage };
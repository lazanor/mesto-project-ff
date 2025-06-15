/** 

+-----------------------------------+
|                                   |
| Набор функций работы с карточками |
|                                   |
+-----------------------------------+

*/

import { likeCardAPI, delCardAPI } from "./api.js";

// Темплейт карточки
const getTemplate = (templateID, elementID) => {
  const cardTemplate = document.querySelector(templateID).content;
  return cardTemplate.querySelector(elementID).cloneNode(true);
};

// Функция создания карточки

const createCard = (
  cardID,
  name,
  link,
  likeCounter,
  imageClickFunction,
  likeFunction,
  delFunction,
  isMine
) => {
  const cardElement = getTemplate("#card-template", ".card");
  const cardImage = cardElement.querySelector(".card__image");

  //Задаем параметры карточки
  cardElement.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = `Фотография места: ${name}`;
  cardElement.querySelector(".card__like-counter").textContent = likeCounter;

  //Инициируеим кнопку удаления карточки
  const cardDelButton = cardElement.querySelector(".card__delete-button");
  if (isMine) {    
    cardDelButton.addEventListener("click", () =>
      delFunction(cardDelButton.closest(".card"), cardID)
    );
  } else {
    cardDelButton.classList.add('card__delete-button-disabled');
  }

  //Задаем обработку нажатия на картинку
  
  cardImage.addEventListener("click", () => imageClickFunction(link, name));

  //Задаем обработку лайка
  const likeIcon = cardElement.querySelector(".card__like-button");
  likeIcon.addEventListener("click", () => likeFunction(cardID, cardElement));

  return cardElement;
};

const isCardLiked = (cardElement) => {
  return cardElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active');
}

const markCardAsLiked = (cardElement) => {
  cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
}

const markCardAsUnliked = (cardElement) => {  
  cardElement.querySelector('.card__like-button').classList.remove('card__like-button_is-active');
}

const setLikeStatus = (card, user, cardElement) => {
  if (card.likes.some(userItem => userItem._id === user._id)) {
    markCardAsLiked(cardElement);
  }
}

// Функция лайка карточки
const likeCard = (cardID, cardElement) => {
  if (isCardLiked(cardElement)) {
    likeCardAPI(cardID, true)
    .then(result => {
      markCardAsUnliked(cardElement);
      cardElement.querySelector('.card__like-counter').textContent = result.likes.length;
    })
    .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error));
  } else {
    likeCardAPI(cardID, false)
    .then(result => {
      markCardAsLiked(cardElement);
      cardElement.querySelector('.card__like-counter').textContent = result.likes.length;
    })
    .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error));
  }
};

// Функция удаления карточки
const delCard = (card, cardID) => {
  delCardAPI(cardID)
  .then(result => card.remove())
  .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error));
};

/**
  ---------------------------------------
    КОНЕЦ БЛОКА РАБОТЫ С КАРТОЧКАМИ
  ---------------------------------------
   */

export { createCard, likeCard, delCard, setLikeStatus };

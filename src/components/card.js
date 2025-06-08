/** 

+-----------------------------------+
|                                   |
| Набор функций работы с карточками |
|                                   |
+-----------------------------------+

*/

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
  isMine,
  apiCardURL,
  apiToken  
) => {
  const cardElement = getTemplate("#card-template", ".card");

  //Задаем параметры карточки
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = `Фотография места: ${name}`;
  cardElement.querySelector(".card__like-counter").textContent = likeCounter;

  //Инициируеим кнопку удаления карточки
  const cardDelButton = cardElement.querySelector(".card__delete-button");
  if (isMine) {    
    cardDelButton.addEventListener("click", () =>
      delFunction(cardDelButton.closest(".card"), cardID, apiCardURL, apiToken)
    );
  } else {
    cardDelButton.classList.add('card__delete-button-disabled');
  }

  //Задаем обработку нажатия на картинку
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => imageClickFunction(link, name));

  //Задаем обработку лайка
  const likeIcon = cardElement.querySelector(".card__like-button");
  likeIcon.addEventListener("click", () => likeFunction(likeIcon, cardID, apiCardURL, apiToken));

  return cardElement;
};

// Функция лайка карточки
const likeCard = (likeIcon, cardID, apiCardURL, apiToken) => {
  //likeIcon.classList.toggle("card__like-button_is-active");
  if (likeIcon.classList.contains('card__like-button_is-active')) {
    fetch(`${apiCardURL}/likes/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: apiToken
      }
    })
    .then(res => {
      if (res.ok) {                
        return res.json();
      } 
      return Promise.reject(`Ошибка запроса: ${res.status}`);
    })
    .then(result => {
      likeIcon.classList.remove('card__like-button_is-active');
      //console.log(likeIcon.parentNode);
      likeIcon.parentNode.querySelector('.card__like-counter').textContent = result.likes.length;
    })
    .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error));
  } else {
    fetch(`${apiCardURL}/likes/${cardID}`, {
      method: 'PUT',
      headers: {
        authorization: apiToken
      }
    })
    .then(res => {
      if (res.ok) {                
        return res.json();
      } 
      return Promise.reject(`Ошибка запроса: ${res.status}`);
    })
    .then(result => {
      likeIcon.classList.add('card__like-button_is-active');
      //console.log(likeIcon.parentNode);
      likeIcon.parentNode.querySelector('.card__like-counter').textContent = result.likes.length;
    })
    .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error));
  }
};

// Функция удаления карточки
const delCard = (card, cardID, apiCardURL, apiToken) => {
  fetch(`${apiCardURL}/${cardID}`, {
    method: 'DELETE',
      headers: {
        authorization: apiToken
      }
  })
  .then(res => {
    if (res.ok) {                
      return res.json();
    } 
    return Promise.reject(`Ошибка запроса: ${res.status}`);
  })
  .then(result => card.remove())
  .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error));
};

/**
  ---------------------------------------
    КОНЕЦ БЛОКА РАБОТЫ С КАРТОЧКАМИ
  ---------------------------------------
   */

export { createCard, likeCard, delCard };

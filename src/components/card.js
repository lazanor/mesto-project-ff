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
  name,
  link,
  imageClickFunction,
  likeFunction,
  delFunction
) => {
  const cardElement = getTemplate("#card-template", ".card");

  //Задаем параметры карточки
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = `Фотография места: ${name}`;

  //Инициируеим кнопку удаления карточки
  const cardDelButton = cardElement.querySelector(".card__delete-button");
  cardDelButton.addEventListener("click", () =>
    delFunction(cardDelButton.closest(".card"))
  );

  //Задаем обработку нажатия на картинку
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => imageClickFunction(link, name));

  //Задаем обработку лайка
  const likeIcon = cardElement.querySelector(".card__like-button");
  likeIcon.addEventListener("click", () => likeFunction(likeIcon));

  return cardElement;
};

// Функция лайка карточки
const likeCard = (likeIcon) => {
  likeIcon.classList.toggle("card__like-button_is-active");
};

// Функция удаления карточки
const delCard = (card) => {
  card.remove();
};

/**
  ---------------------------------------
    КОНЕЦ БЛОКА РАБОТЫ С КАРТОЧКАМИ
  ---------------------------------------
   */

export { createCard, likeCard, delCard };

// @todo: Темплейт карточки
function getTemplate(templateID, elementID) {
  const cardTemplate = document.querySelector(templateID).content;
  return (cardElement = cardTemplate.querySelector(elementID).cloneNode(true));
}
// @todo: DOM узлы
/** Найдем нужные нам узлы */
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const newCardPopup = document.querySelector(".popup_type_new-card");

/** Проинициируем все кнопки */
function initButtons() {
  const cardAddButton = content.querySelector(".profile__add-button");
  const profileEditButton = content.querySelector(".profile__edit-button");
  const newCardCloseButton = document.querySelector(
    ".popup_type_new-card .popup__content .popup__close"
  );
  const newCardSafeButton = document.querySelector(
    ".popup_type_new-card .popup__button"
  );

  cardAddButton.addEventListener("click", () =>
    newCardPopup.classList.add("popup_is-opened")
  );

  newCardCloseButton.addEventListener("click", () => closePopup(newCardPopup));

  newCardSafeButton.addEventListener("click", function () {
    const placeName = newCardPopup.querySelector(
      ".popup__input_type_card-name"
    ).value;
    const placePictureLink = newCardPopup.querySelector(
      ".popup__input_type_url"
    ).value;

    const cardElement = createCard(placeName, placePictureLink);
    placesList.prepend(cardElement);
    closePopup(newCardPopup);
  });
}

/** Вспомогательные функции */
/** Закрытие и очистка полей */
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  clearPopupFields(popup);
}

/** Отдельно очистка полей */
function clearPopupFields(popup) {
  popup.querySelectorAll(".popup__input").forEach((item) => (item.value = ""));
}

// @todo: Функция создания карточки

function createCard(name, link) {
  const cardElement = getTemplate("#card-template", ".card");

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  const cardDelButton = cardElement.querySelector(".card__delete-button");
  cardDelButton.addEventListener("click", () =>
    delCard(cardDelButton.closest(".card"))
  );
  return cardElement;
}

// @todo: Функция удаления карточки
function delCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
function initCards(collection) {
  collection.forEach((item) => {
    const cardElement = createCard(item.name, item.link);
    placesList.append(cardElement);
  });
}

initButtons();
initCards(initialCards);

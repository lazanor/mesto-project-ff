import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, likeCard, delCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

// DOM узлы
/** Найдем нужные нам узлы */
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");

/** 

+-------------------+
|                   |
| Инициируем кнопки |
|                   |
+-------------------+

*/
const initButtons = () => {
  /** Инициируем кнопки */
  const cardAddButton = content.querySelector(".profile__add-button");
  const profileEditButton = content.querySelector(".profile__edit-button");

  const newCardCloseButton = document.querySelector(
    ".popup_type_new-card .popup__content .popup__close"
  );
  const profileEditCloseButton = document.querySelector(
    ".popup_type_edit .popup__content .popup__close"
  );
  const imageCardCloseButton = document.querySelector(
    ".popup_type_image .popup__content .popup__close"
  );

  const newCardSafeButton = document.querySelector(
    ".popup_type_new-card .popup__button"
  );

  /** Добавим слушателей для открытия попапов */
  cardAddButton.addEventListener("click", () => openPopup(newCardPopup));
  profileEditButton.addEventListener("click", () =>
    openProfilePopup(editProfilePopup)
  );

  /** Добавим слушателей для закрытия попапов */
  newCardCloseButton.addEventListener("click", () => closePopup(newCardPopup));
  profileEditCloseButton.addEventListener("click", () =>
    closePopup(editProfilePopup)
  );
  imageCardCloseButton.addEventListener("click", () => closePopup(imagePopup));

  //

  /**
  ---------------------------------------
    НОВАЯ КАРТОЧКА
  ---------------------------------------
  */

  /** Функция для добавления новой карточки */

  const newCardForm = document.forms["new-place"];

  const addNewCard = (evt) => {
    evt.preventDefault();
    const placeName = newCardForm.elements["place-name"].value;
    const placePictureLink = newCardForm.elements.link.value;

    const cardElement = createCard(
      placeName,
      placePictureLink,
      viewImage,
      likeCard,
      delCard
    );
    placesList.prepend(cardElement);
    closePopup(newCardPopup);
    newCardForm.reset();
  };

  /** Добавим слушатель для кнопки сохранения новой карточки */
  newCardForm.addEventListener("submit", (evt) => addNewCard(evt));

  /**
  ---------------------------------------
    РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  ---------------------------------------
 */

  //Открываем попап редактирования профиле
  const openProfilePopup = (obj) => {
    openPopup(obj);
    const profileForm = document.forms["edit-profile"];
    let profileName = profileForm.elements.name;
    let profileDescription = profileForm.elements.description;
    profileName.value = document.querySelector(".profile__title").textContent;
    profileDescription.value = document.querySelector(
      ".profile__description"
    ).textContent;
  };

  //Подключение формы редактирования профиля
  const profileForm = document.forms["edit-profile"];
  let profileName = profileForm.elements.name;
  let profileDescription = profileForm.elements.description;

  const submitEditProfile = (
    evt,
    editProfilePopup,
    profileName,
    profileDescription
  ) => {
    evt.preventDefault();
    content.querySelector(".profile__title").textContent = profileName;
    content.querySelector(".profile__description").textContent =
      profileDescription;
    closePopup(editProfilePopup);
    profileForm.reset();
  };

  profileForm.addEventListener("submit", (evt) =>
    submitEditProfile(
      evt,
      editProfilePopup,
      profileName.value,
      profileDescription.value
    )
  );
};

/**
---------------------------------------
  ЗАКОНЧИЛИ С КНОПКАМИ
---------------------------------------
 */

// Функция открытия картинки
const viewImage = (link, name) => {
  openPopup(imagePopup);
  const image = imagePopup.querySelector(".popup__image");
  image.src = link;
  image.alt = `Фотография места: ${name}`;
  const imageTitle = imagePopup.querySelector(".popup__caption");
  imageTitle.textContent = name;
};

// Вывести карточки на страницу
const initCards = (collection, placesList) => {
  collection.forEach((item) => {
    const cardElement = createCard(
      item.name,
      item.link,
      viewImage,
      likeCard,
      delCard
    );
    placesList.append(cardElement);
  });
};

initButtons();
initCards(initialCards, placesList);

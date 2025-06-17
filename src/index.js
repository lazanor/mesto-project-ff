import "./pages/index.css";
import { createCard, likeCard, delCard, setLikeStatus } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import { apiProfileURL, apiCardURL, apiToken, getUser, getCards, newCard, updateProfile, updateProfileAvatar } from "./components/api.js";

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// DOM узлы
/** Найдем нужные нам узлы */
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
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
  const avatarEditButton = content.querySelector(".profile__image-edit");

  const newCardCloseButton = document.querySelector(
    ".popup_type_new-card .popup__content .popup__close"
  );
  const profileEditCloseButton = document.querySelector(
    ".popup_type_edit .popup__content .popup__close"
  );
  const avatarCloseButton = document.querySelector(
    ".popup_type_edit-avatar .popup__content .popup__close"
  );
  const imageCardCloseButton = document.querySelector(
    ".popup_type_image .popup__content .popup__close"
  );

  const newCardSafeButton = document.querySelector(
    ".popup_type_new-card .popup__button"
  );
  const editProfileSafeButton = document.querySelector(
    ".popup_type_edit .popup__button"
  );
  const editAvatarSafeButton = document.querySelector(
    ".popup_type_edit-avatar .popup__button"
  );

  /** Добавим слушателей для открытия попапов */
  cardAddButton.addEventListener("click", () => {
    newCardForm.reset();
    openPopup(newCardPopup);    
    clearValidation(newCardPopup, config);
  });
  profileEditButton.addEventListener("click", () => {
    openPopup(editProfilePopup);
    clearValidation(editProfilePopup, config);
    profileName.value = document.querySelector(".profile__title").textContent;
    profileDescription.value = document.querySelector(
      ".profile__description"
    ).textContent;
  });

  avatarEditButton.addEventListener("click", () => {
    //console.log('edit ava click');
    openPopup(editAvatarPopup);
    clearValidation(editAvatarPopup, config);
  });

  /** Добавим слушателей для закрытия попапов */
  newCardCloseButton.addEventListener("click", () => closePopup(newCardPopup));
  profileEditCloseButton.addEventListener("click", () =>
    closePopup(editProfilePopup)
  );
  avatarCloseButton.addEventListener("click", () =>
    closePopup(editAvatarPopup)
  );
  imageCardCloseButton.addEventListener("click", () => closePopup(imagePopup));

  const setSavingStatus = (buttonElement, saving) => {
    if (saving) {
      buttonElement.textContent = 'Сохранение...';
    } else {
      buttonElement.textContent = 'Сохранить';
    }
  }

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
    setSavingStatus(newCardSafeButton, 1);
    //отправим на сервер
    newCard(placeName, placePictureLink)
    .then((result) => {
      //Добавим новую карточку
      const cardElement = createCard(
        result._id,
        result.name,
        result.link,
        0,
        viewImage,
        likeCard,
        delCard,
        1
      );
      placesList.prepend(cardElement);
      closePopup(newCardPopup);
      newCardForm.reset();
    })
    .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error))    
    .finally(setSavingStatus(newCardSafeButton, 0));

    
  };

  /** Добавим слушатель для кнопки сохранения новой карточки */
  newCardForm.addEventListener("submit", (evt) => addNewCard(evt));

  /**
  ---------------------------------------
    РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  ---------------------------------------
 */

  //Подключение формы редактирования профиля
  const profileForm = document.forms["edit-profile"];
  const profileName = profileForm.elements.name;
  const profileDescription = profileForm.elements.description;

  //Подтверждаем редактирование профиля
  const submitEditProfile = (
    evt,
    editProfilePopup,
    profileName,
    profileDescription
  ) => {
    evt.preventDefault();
    
    // Отправим на сервер
    setSavingStatus(editProfileSafeButton, 1);
    updateProfile(profileName, profileDescription)
    .then(result => {      
      content.querySelector(".profile__title").textContent = result.name;
      content.querySelector(".profile__description").textContent = result.about; 
      closePopup(editProfilePopup);
      profileForm.reset();     
    })
    .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error))
    .finally(setSavingStatus(editProfileSafeButton, 0));
  };

  profileForm.addEventListener("submit", (evt) =>
    submitEditProfile(
      evt,
      editProfilePopup,
      profileName.value,
      profileDescription.value
    )
  );

  /**
  ---------------------------------------
    РЕДАКТИРОВАНИЕ АВАТАРКИ
  ---------------------------------------
 */

  const avatarForm = document.forms["edit-avatar"];
  const submitEditAvatar = (
    evt,
    editAvatarPopup
  ) => {
    evt.preventDefault();
    setSavingStatus(editAvatarSafeButton, 1);
    // Отправим на сервер
    updateProfileAvatar(avatarForm.elements.link.value)
    .then(result => {
      document.querySelector(".profile__image").style.backgroundImage = `url(${result.avatar})`;            
      closePopup(editAvatarPopup);
      profileForm.reset();
    })    
    .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error))
    .finally(setSavingStatus(editAvatarSafeButton, 0));
  }

  avatarForm.addEventListener("submit", (evt) =>
    submitEditAvatar(
      evt,
      editAvatarPopup
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
const initCards = (placesList, user, cardsData) => {
  cardsData.forEach((item) => {
    const cardElement = createCard(
      item._id,
      item.name,
      item.link,
      item.likes.length,
      viewImage,
      likeCard,
      delCard,
      (user._id === item.owner._id)
    );
    placesList.append(cardElement);
    //Проставим сердечки там где мы уже лайкали
    setLikeStatus(item, user, cardElement);
  });  
};

//Инициируем кнопки
initButtons();

//Выполняем запросы
Promise.all([getUser(), getCards()])
.then(([userData, cardsData]) => {
  document.querySelector(".profile__title").textContent = userData.name;
  document.querySelector(".profile__description").textContent = userData.about;
  document.querySelector(".profile__image").style.backgroundImage = `url(${userData.avatar})`;
  initCards(placesList, userData, cardsData);
})
.catch(error => console.log('Ошибка. Запрос не выполнен. ' + error));

//Инициируем валидацию
enableValidation(config);



import "./pages/index.css";
import { createCard, likeCard, delCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validarion.js";
import { config, apiProfileURL, apiCardURL, apiToken } from "./api.js";

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
    openPopup(newCardPopup);
    clearValidation(newCardPopup, config);
  });
  profileEditButton.addEventListener("click", () =>
    openProfilePopup(editProfilePopup)
  );

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

    //отправим на сервер
    fetch(apiCardURL, {
      method: 'POST',
      headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: placeName,
        link: placePictureLink
      })
    })
    .then(res => {
      if (res.ok) {        
        newCardSafeButton.textContent = 'Сохранение...';
        return res.json();
      } 
      return Promise.reject(`Ошибка запроса: ${res.status}`);
    })
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
        1,
        apiCardURL,
        apiToken
      );
      placesList.prepend(cardElement);
      newCardSafeButton.textContent = 'Сохранить';
    })
    .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error));

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
    clearValidation(obj, config);
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
    
    // Отправим на сервер
    
    fetch(apiProfileURL, {
      method: 'PATCH',
      headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: profileName,
        about: profileDescription
      })
    })
    .then(res => {
      if (res.ok) {        
        editProfileSafeButton.textContent = 'Сохранение...';
        return res.json();
      } 
      return Promise.reject(`Ошибка запроса: ${res.status}`);
    })
    .then(result => {      
      content.querySelector(".profile__title").textContent = result.name;
      content.querySelector(".profile__description").textContent = result.about;
      editProfileSafeButton.textContent = 'Сохранить';
    })
    .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error));

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
    // Отправим на сервер
    fetch(`${apiProfileURL}/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarForm.elements.link.value
      })
    })
    .then(res => {
      if (res.ok) {        
        editAvatarSafeButton.textContent = 'Сохранение...';
        return res.json();
      } 
      return Promise.reject(`Ошибка запроса: ${res.status}`);
    })
    .then(result => {
      document.querySelector(".profile__image").style.backgroundImage = `url(${result.avatar})`;
      editAvatarSafeButton.textContent = 'Сохранить';
    })
    .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error));

    closePopup(editAvatarPopup);
    profileForm.reset();
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
const initCards = (placesList) => {
  fetch(apiCardURL,{
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
  .then((result) => {
    //console.log(result);
    result.forEach((item) => {
      const cardElement = createCard(
        item._id,
        item.name,
        item.link,
        item.likes.length,
        viewImage,
        likeCard,
        delCard,
        (user._id === item.owner._id),
        apiCardURL,
        apiToken
      );
      placesList.append(cardElement);
      //Проставим сердечки там где мы уже лайкали
      if (item.likes.some(userItem => userItem._id === user._id)) {
        cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
      }
    });
  })
  .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error));
  
};

/**
 * ---------------------------------------
 * ФУНКЦИИ ДЛЯ ЗАБОР ДАННЫХ С СЕРВЕРА
 * ---------------------------------------
 */

const getUser = (url, token) => {
  return fetch(url,{
    headers: {
      authorization: token
    }
  })
  .then(res => {
    if (res.ok) {                
      return res.json();
    } 
    return Promise.reject(`Ошибка запроса: ${res.status}`);
  })
  .then((result) => {    
    user = result;
    document.querySelector(".profile__title").textContent = result.name;
    document.querySelector(".profile__description").textContent = result.about;
    document.querySelector(".profile__image").style.backgroundImage = `url(${result.avatar})`;
    return result;
  })
  .catch(error => console.log('Ошибка. Запрос не выполнен. ' + error));
}



/**
 * ---------------------------------------
 * ЗАКОНЧИЛИ С СЕРВЕРОМ
 * ---------------------------------------
 */

initButtons();
let user = null;
getUser(apiProfileURL, apiToken)
.then(res => {
  user = res;
  //console.log(user._id);
  initCards(placesList);
});

enableValidation(config);



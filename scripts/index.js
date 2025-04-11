// @todo: Темплейт карточки
function getTemplate() {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('card').cloneNode(true);
}
// @todo: DOM узлы
/** Найдем нужные нам узлы */
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const newCardPopup = document.querySelector('.popup_type_new-card');



/** Проинициируем все кнопки */ 
function initButtons(){
    const cardAddButton = content.querySelector('.profile__add-button');
    const profileEditButton = content.querySelector('.profile__edit-button');
    const newCardCloseButton = document.querySelector('.popup_type_new-card .popup__content .popup__close');
    const newCardSafeButton = document.querySelector('.popup_type_new-card .popup__button');    
    
    cardAddButton.addEventListener('click', () => newCardPopup.classList.add('popup_is-opened'));
    
    newCardCloseButton.addEventListener('click', () => closePopup(newCardPopup));

    newCardSafeButton.addEventListener('click', function(){
        const placeName = newCardPopup.querySelector('.popup__input_type_card-name').value;
        const placePictureLink = newCardPopup.querySelector('.popup__input_type_url').value;

        addCard(placeName, placePictureLink);
        closePopup(newCardPopup);
    })
}

/** Вспомогательные функции */
/** Закрытие и очистка полей */
function closePopup(popup) {    
    popup.classList.remove('popup_is-opened');
    clearPopupFields(popup);
}

/** Отдельно очистка полей */
function clearPopupFields(popup) {
    popup.querySelectorAll('.popup__input').forEach( (item) => item.value = '');
}

// @todo: Функция создания карточки

function addCard(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    const cardDelButton = cardElement.querySelector('.card__delete-button');
    cardDelButton.addEventListener('click', () => delCard(cardDelButton));
    //cardDelButton.addEventListener('click', () => cardDelButton.closest('.card').remove());
    placesList.append(cardElement);
}

// @todo: Функция удаления карточки
function delCard(btn){
    btn.closest('.card').remove()
};

// @todo: Вывести карточки на страницу
function initCards(collection) {
    collection.forEach((item) => addCard(item.name, item.link));
}

initButtons();
initCards(initialCards);

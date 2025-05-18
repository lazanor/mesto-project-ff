/** Открытие попапа */
const openPopup = (obj) => {
  obj.classList.add("popup_is-opened");
  obj.addEventListener("click", handleMouseOverlayClick);
  /** Добавим слушатель для обработки Escape */
  document.addEventListener("keydown", handleEscape);
};

/** Закрытие попапа и очистка полей */
const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", handleMouseOverlayClick);
  /** Уберем слушатель для обработки Escape */
  document.removeEventListener("keydown", handleEscape);
};

/** Обработка нажатия Escape */
const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

/** Обработка клика на оверлей */
const handleMouseOverlayClick = (evt) => {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    if (
      !evt.composedPath().includes(openedPopup.querySelector(".popup__content"))
    ) {
      closePopup(openedPopup);
    }
  }
};

export { openPopup, closePopup, handleEscape, handleMouseOverlayClick };

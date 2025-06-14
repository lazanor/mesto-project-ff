//Конфиг для валидации и API
const apiConfig = {  
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
    headers: {
      authorization: 'bc5ec85e-2904-4d40-86fe-731d5cf8c1ff',
      'Content-Type': 'application/json'
    }
  };

const apiProfileURL = `${apiConfig.baseUrl}/users/me`;
const apiCardURL = `${apiConfig.baseUrl}/cards`;
const apiToken = apiConfig.headers.authorization;

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка запроса: ${res.status}`);
}

const getUser = () => {
  return fetch(apiProfileURL,{
    headers: apiConfig.headers
  })
  .then(getResponseData)
}

const getCards = () => {
  return fetch(apiCardURL,{
    headers: apiConfig.headers
  })
  .then(getResponseData)
}

const newCard = (placeName, placePictureLink) => {
  return fetch(apiCardURL, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: placeName,
      link: placePictureLink
    })
  })
  .then(getResponseData)
}

const updateProfile = (profileName, profileDescription) => {
  return fetch(apiProfileURL, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileDescription
    })
  })
  .then(getResponseData)
}

const updateProfileAvatar = (newAvatarURL) => {
  return fetch(`${apiProfileURL}/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: newAvatarURL
    })
  })
  .then(getResponseData)
}

const likeCardAPI = (cardID, isLiked) => {
  const method = isLiked ? 'DELETE' : 'PUT';
  return fetch(`${apiCardURL}/likes/${cardID}`, {
    method: method,
    headers: apiConfig.headers
  })
  .then(getResponseData)
}

const delCardAPI = (cardID) => {
  return fetch(`${apiCardURL}/${cardID}`, {
    method: 'DELETE',
      headers: apiConfig.headers
  })
  .then(getResponseData)
}

export { apiProfileURL, apiCardURL, apiToken, apiConfig, getUser, getCards, newCard, updateProfile, updateProfileAvatar, likeCardAPI, delCardAPI }
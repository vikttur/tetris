// import { currentScore } from '../main.js';
let currentScore = 0;

let key = 'hightScore';

function startSetLocalStorage( key, value) {
  if(!localStorage.getItem (key)) {
    localStorage.setItem( key, value);
    return;
  }

  displayOfhightScore();
}

function displayOfhightScore() {
  document.querySelector('.hight-score').innerHTML = localStorage.getItem (key);
}

function setLocalStorage( key, value) {
  localStorage.setItem( key, value);
}

function getLocalStorage(key) {
  return localStorage.getItem(key);
}

function saveInLocalStorage() {
  console.log(currentScore);
  const maxScore = getLocalStorage(key);
  console.log(maxScore);
  if(maxScore > currentScore) return;
  setLocalStorage(key, currentScore);
}
 
export {
  startSetLocalStorage,
  setLocalStorage,
  getLocalStorage,
  saveInLocalStorage,
}

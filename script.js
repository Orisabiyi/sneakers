'use strict';
const header = document.querySelector('.header');
const headerCartPopup = document.querySelector('.header__cart-popup');
const headerCartMain = document.querySelector('.header__cart-main');
const cartValue = document.querySelector('.cart__value');
const cartCount = document.querySelector('.cart__count');
const cartBtn = document.querySelector('.cart__btn');


const sliderList = document.querySelector('.slider__list');
const sliderItem = [...document.querySelectorAll('.slider__item')];
const slider = document.querySelector('.slider');

const overlay = document.querySelector('.overlay');
const overlayList = document.querySelector('.overlay__list');
const overlayItem = [...document.querySelectorAll('.overlay__item')]
const overlaySlides = document.querySelectorAll('.overlay__figure');

let curNum = 0;
cartValue.textContent = curNum;

let curSlide = 0;
const totalSlide = overlaySlides.length - 1;

const saveToLocalstorage = function (number) {
  const task = [number];
  localStorage.setItem('task', JSON.stringify(task));
}

const getItemLocalStorage = function () {
  const task = localStorage.getItem('task');
  if (!task) return;

  const [taskItem] = JSON.parse(task);
  renderListItem(taskItem);
  headerCartPopup.textContent = taskItem;
  headerCartPopup.classList.remove('hidden');
}

const loadPage = function () {
  getItemLocalStorage();
}

// 0%, 100%, 200%, 300%
const transformImg = function (className, value) {
  const figure = document.querySelectorAll(`.${className}`);
  figure.forEach((item, i) => {
    item.style.transform = `translateX(${100 * (i + value)}%)`;
    item.style.transition = 'all 1s';
  })
}

// Display Image on Click
const displayImageOnClick = function (className, e) {
  const item1 = document.querySelectorAll(`.${className}__item`);
  const active = e.target.classList.contains(`${className}__item--active`);
  if (active || e.target.classList.contains(`${className}__list`)) return;

  // remove existing active class from element
  item1.forEach(item => item.classList.remove(`${className}__item--active`));

  // Add active class to target element
  e.target.classList.add(`${className}__item--active`);
  curSlide = +e.target.dataset.id;
  transformImg(`${className}__figure`, -curSlide);

  if (curSlide === '' && className !== 'slider') return;
  // Remove existing active class
  overlayItem.forEach(item => item.classList.remove('overlay__item--active'));

  const item2 = overlayItem.find(item => Number(item.dataset.id) === curSlide);
  transformImg('overlay__figure', -curSlide);
  item2.classList.add('overlay__item--active');

  if (curSlide === '' && className !== 'overlay') return;
  // Remove existing active class
  sliderItem.forEach(item => item.classList.remove('slider__item--active'));

  const item3 = sliderItem.find(item => Number(item.dataset.id) === curSlide);
  transformImg('slider__figure', -curSlide);
  item3.classList.add('slider__item--active');
}

// Increase and Decrease Number
const increaseDecreaseNumber = function (e) {
  if (e.target.classList.contains('cart__icon--1')) {
    curNum--;
    if (curNum < 0) curNum = 0;
    cartValue.textContent = curNum;
  }

  if (e.target.classList.contains('cart__icon--2')) {
    curNum++;
    cartValue.textContent = curNum;
  }
}

const showBasket = function (e) {
  const target = e.target.closest('.header__cart-img');

  if (!target) return;
  e.currentTarget.querySelector('.header__cart-basket').classList.toggle('hidden');
}

const renderListItem = function (currentNum, currentPrice = 125) {
  headerCartMain.innerHTML = '';
  const html = `
      <div class="header__cart-item">
        <div class="header__cart-img--1">
          <img src="images/image-product-1-thumbnail.jpg" alt="sneakers image" class="header__cart-icon header__cart-icon--3">
        </div>
        <p class="header__cart-description">
          Fall Limited Edition Sneakers $${currentPrice.toFixed(2)} x ${currentNum} 
          <strong>$${(currentPrice * currentNum).toFixed(2)}</strong>
        </p>
        <div class="header__cart-img--2">
          <img src="images/icon-delete.svg" alt="delete icon" class="header__cart-icon">
        </div>
      </div>
      
      <button class="btn btn--1">Checkout</button>`;

  headerCartMain.insertAdjacentHTML('afterbegin', html);
  headerCartMain.style.justifyContent = 'space-between';
}

const addToCart = function (e) {

  if (curNum === 0) return;
  headerCartPopup.classList.remove('hidden');
  headerCartPopup.textContent = curNum;

  // Render List and Save to Storage
  renderListItem(curNum);
  saveToLocalstorage(curNum);
}

const deleteCartItem = function (e) {
  e = event;
  const target = e.target.classList.contains('header__cart-icon')
  if (!target) return;

  e.target.closest('.header__cart-item').remove();
  document.querySelector('.btn--1').remove();

  // Clear Local Storage
  localStorage.clear();
  headerCartPopup.textContent = 0;
  headerCartPopup.classList.add('hidden');
}

const closePopup = function (e) {
  if (!e.target.closest('.btn__close')) return;
  overlay.classList.add('hidden');
}

const displayPopup = function (e) {
  if (!e.target.closest('.slider__product')) return;
  overlay.classList.remove('hidden');
}


transformImg('slider__figure', 0);
transformImg('overlay__figure', 0);

// Event Listener
document.addEventListener('DOMContentLoaded', loadPage);

cartBtn.addEventListener('click', addToCart);
header.addEventListener('click', showBasket);
headerCartMain.addEventListener('click', deleteCartItem);
sliderList.addEventListener('click', displayImageOnClick.bind(this, 'slider'));
overlayList.addEventListener('click', displayImageOnClick.bind(this, 'overlay'));
cartCount.addEventListener('click', increaseDecreaseNumber);

overlay.addEventListener('click', closePopup);
slider.addEventListener('click', displayPopup);
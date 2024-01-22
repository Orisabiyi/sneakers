'use strict';
const cartValue = document.querySelector('.cart__value');
const header = document.querySelector('.header');
const headerCartMain = document.querySelector('.header__cart-main');

let curNum = 0;
cartValue.textContent = curNum;

document.addEventListener("DOMContentLoaded", (e) => {
  const [taskItem] = JSON.parse(localStorage.getItem('task'));
  renderListItem(taskItem)
});

const saveToLocalstorage = function (number) {
  const task = [number];
  localStorage.setItem('task', JSON.stringify(task));
}

const renderListItem = function (currentNum, currentPrice = 125) {
  headerCartMain.innerHTML = '';
  const html = `
      <div class="header__cart-item">
        <div class="header__cart-img--1">
          <img src="images/image-product-1-thumbnail.jpg" alt="sneakers image" class="header__cart-icon header__cart-icon--3">
        </div>
        <p class="header__cart-description">Fall Limited Edition Sneakers $${currentPrice.toFixed(2)} x ${currentNum} <strong>$${(currentPrice * currentNum).toFixed(2)}</strong></p>
        <div class="header__cart-img--2">
          <img src="images/icon-delete.svg" alt="delete icon" class="header__cart-icon">
        </div>
      </div>
      
      <button class="btn btn--1">Checkout</button>`;

  headerCartMain.insertAdjacentHTML('afterbegin', html);
  headerCartMain.style.justifyContent = 'space-between';
}


// 0%, 100%, 200%, 300%
const transformFigure = function (value) {
  const productFigure = document.querySelectorAll('.product__figure');
  productFigure.forEach((item, i) => {
    item.style.transform = `translateX(${100 * (i + value)}%)`;
    item.style.transition = 'all 1s';
  })
}

transformFigure(0);

const activateImage = function () {
  const productList = document.querySelector('.product__list');
  const productItem = document.querySelectorAll('.product__item');
  const productImg = document.querySelectorAll('.product__img');

  productList.addEventListener('click', function (e) {
    const productItemActive = e.target.closest('.product__item').classList.contains('product__item--active');
    const productImgActive = e.target.classList.contains('product__img--active');

    const clickedItem = e.target.closest('.product__item');

    // if active class is present
    if (productItemActive && productImgActive) return;

    // Removing existing active class
    productItem.forEach(item => item.classList.remove('product__item--active'));
    productImg.forEach(item => item.classList.remove('product__img--active'));

    // Adding active class to clicked item and image
    clickedItem.classList.add('product__item--active');
    e.target.classList.add('product__img--active');

    // Transform to product image
    transformFigure(-clickedItem.dataset.id + 1);
  })
}

activateImage();

const increaseAndDecreaseNumber = function () {
  const cartCount = document.querySelector('.cart__count');

  cartCount.addEventListener('click', function (e) {
    if (e.target.classList.contains('cart__icon--1')) {
      curNum--;
      if (curNum < 0) curNum = 0;
      cartValue.textContent = curNum;
    }

    if (e.target.classList.contains('cart__icon--2')) {
      curNum++;
      cartValue.textContent = curNum;
    }
  })
}

increaseAndDecreaseNumber();

const addToCart = function () {
  const cartBtn = document.querySelector('.cart__btn');
  const headerCartPopup = document.querySelector('.header__cart-popup');

  cartBtn.addEventListener('click', function (e) {
    if (curNum === 0) return;
    headerCartPopup.classList.remove('hidden');
    headerCartPopup.textContent = curNum;

    // render List of item
    renderListItem(curNum);

    // storage
    saveToLocalstorage(curNum);
  })
}

addToCart();

const deleteCartItem = function () {
  headerCartMain.addEventListener('click', function (e) {
    const target = e.target.classList.contains('header__cart-icon')
    if (target) {
      e.target.closest('.header__cart-item').remove();
      document.querySelector('.btn--1').remove();
      localStorage.clear();
    }
  })
}

deleteCartItem();

const displayBasket = function () {
  header.addEventListener('click', function (e) {
    const target = e.target.closest('.header__cart-img');
    if (!target) return;
    e.currentTarget.querySelector('.header__cart-basket').classList.toggle('hidden');
  })
}

displayBasket();
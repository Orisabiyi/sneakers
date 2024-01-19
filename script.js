'use strict';
const cartValue = document.querySelector('.cart__value');

let curNum = 0;
cartValue.textContent = curNum;

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
  const headerCartMain = document.querySelector('.header__cart-main');

  cartBtn.addEventListener('click', function (e) {
    if (curNum === 0) return;
    headerCartPopup.classList.remove('hidden');
    headerCartPopup.textContent = curNum;
    headerCartMain.innerHTML = '';
  })
}

addToCart();
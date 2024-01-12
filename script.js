'use strict';
const productFigure = document.querySelectorAll('.product__figure');

// 0%, 100%, 200%, 300%
const transformFigure = function (value) {
  productFigure.forEach((item, i) => {
    item.style.transform = `translateX(${100 * (i + value)}%)`;
    item.style.transition = 'all 1s';
  })
}

transformFigure(0);

const activeImage = function () {
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

activeImage();
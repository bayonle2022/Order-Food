const productButtons = document.querySelectorAll('.add-to-cart');
const productImages = document.querySelectorAll('.dessert-image');
const cartSpanValue = document.querySelector('.cart-header-value');
const cartSectionOne = document.querySelector('.cart-section-1');
const cartSectionTwo = document.querySelector('.cart-section-2');
const cartSectionThree = document.querySelector('.cart-section-3');
const totalOrder = document.querySelector('.total');
const buttonConfirm = document.querySelector('.confirm-order');
const modalWindow = document.querySelector('.modal-window');
const orderConfirmed = document.querySelector('.order-confirmed');
const newOrder = document.querySelector('.new-order')

function updateCartCount() {
    const counts = document.querySelectorAll('.count');
    let totalItems = 0;
    let totalPrice = 0;

    counts.forEach((span) => {
        const count = parseInt(span.textContent);
        totalItems += count;

        const parentCard = span.closest('.dessert');
        const priceText = parentCard?.querySelector('.price')?.textContent;
        const price = parseFloat(priceText);
        if (!isNaN(price)) {
            totalPrice += count * price;
        }
    });

    cartSpanValue.textContent = totalItems;

    cartSectionOne.style.display = totalItems === 0 ? 'flex' : 'none';
    cartSectionThree.style.display = totalItems === 0 ? 'none' : 'block';

    if (totalOrder) {
        totalOrder.textContent = `${totalPrice.toFixed(2)}`;
    }
}

productButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (button.classList.contains('added-to-cart')) return;

        const associatedImage = productImages[index];
        associatedImage.style.border = '2px solid hsl(14, 86%, 42%)';

        button.classList.add('added-to-cart');
        button.style.backgroundColor = 'hsl(14, 86%, 42%)';
        button.style.display = 'flex';
        button.style.justifyContent = 'space-between';
        button.style.alignItems = 'center';
        button.style.padding = '10px 10px';
        button.style.border = '1px solid hsl(14, 86%, 42%)';

        button.innerHTML = `
            <div class="decrement" style="width: 20px; height: 20px; border: thin solid white; border-radius: 50%; display: flex; justify-content: center; align-items: center; padding: 4px;">
                <img src="/assets/images/icon-decrement-quantity.svg" alt="" style="width: 100%; margin: 0 auto;">
            </div>
            <span class="count" style="color: white;">1</span>
            <div class="increment" style="width: 20px; height: 20px; border: thin solid white; border-radius: 50%; display: flex; justify-content: center; align-items: center; padding: 4px;">
                <img src="/assets/images/icon-increment-quantity.svg" alt="" style="width: 100%; margin: 0 auto;">
            </div>
        `;

        const countSpan = button.querySelector('.count');
        const incrementBtn = button.querySelector('.increment');
        const decrementBtn = button.querySelector('.decrement');
        let count = 1;

        const productCard = button.closest('.dessert');
        const productName = productCard?.querySelector('.name')?.textContent;
        const productPrice = parseFloat(productCard?.querySelector('.price')?.textContent);
        const productImgSrc = productCard?.querySelector('.dessert-image')?.src;

        let existingCartItem = [...cartSectionTwo.children].find(item =>
            item.querySelector('.product-name')?.textContent === productName
        );

        if (!existingCartItem) {
            const newDiv = document.createElement('div');
            newDiv.style.animation = 'fadeIn 0.3s ease-in-out';
            newDiv.classList.add('new-box');
            newDiv.innerHTML = `
                <div style="border-bottom: 2px solid whitesmoke; display: flex; width: 100%; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${productImgSrc}" alt="${productName}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; display: none;">
                        <div>
                            <div><h5 class="product-name">${productName}</h5></div>
                            <div class="product-info" style="display: flex; justify-content: space-between; color: hsl(0, 0%, 50%); font-size: 16px; font-family: 'Red Hat Text', sans-serif;">
                                <p>
                                    <span class="product-number" style="color: #F47C20;">1</span>
                                    <span style="color: #F47C20; padding-right: 3px;">x</span>
                                    @<span class="product-amount" style="padding-right: 3px;">$${productPrice.toFixed(2)}</span>
                                    $<span class="product-ttl-amount">${productPrice.toFixed(2)}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <img src="/assets/images/icon-remove-item.svg" alt="" class="delete" style="cursor: pointer;">
                </div>
            `;
            cartSectionTwo.appendChild(newDiv);
            existingCartItem = newDiv;

            newDiv.querySelector('.delete').addEventListener('click', () => {
                newDiv.remove();
                count = 0;
                button.classList.remove('added-to-cart');
                button.innerHTML = 'Add to Cart';
                button.style = '';
                associatedImage.style.border = 'none';
                updateCartCount();
            });
        }

        const productQtySpan = existingCartItem.querySelector('.product-number');
        const totalPriceSpan = existingCartItem.querySelector('.product-ttl-amount');

        incrementBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            count++;
            countSpan.textContent = count;
            productQtySpan.textContent = count;
            totalPriceSpan.textContent = (productPrice * count).toFixed(2);
            updateCartCount();
        });

        decrementBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (count > 1) {
                count--;
                countSpan.textContent = count;
                productQtySpan.textContent = count;
                totalPriceSpan.textContent = (productPrice * count).toFixed(2);
                updateCartCount();
            }
        });

        updateCartCount();
    });
});

buttonConfirm.addEventListener('click', () => {
    modalWindow.style.display = 'flex';
    orderConfirmed.innerHTML = '';

    [...cartSectionTwo.children].forEach(cartItem => {
        const name = cartItem.querySelector('.product-name')?.textContent;
        const number = cartItem.querySelector('.product-number')?.textContent;
        const amount = cartItem.querySelector('.product-amount')?.textContent;
        const total = cartItem.querySelector('.product-ttl-amount')?.textContent;
        const imgSrc = cartItem.querySelector('img')?.src;

        const newDiv = document.createElement('div');
        newDiv.classList.add('order-box');
        newDiv.innerHTML = `
            <div style="display: flex; width: 100%; justify-content: space-between; align-items: center; background-color: hsl(13, 31%, 94%); padding: 20px; margin: 0px;">

    <div style="display: flex;">
      <img src="${imgSrc}" alt="${name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; margin-right: 5px; ">
      <div>
        <h5 class="product-name">${name}</h5>
        <div class="product-info" style="display: flex; justify-content: space-between; color: hsl(0, 0%, 50%); font-size: 16px; font-family: 'Red Hat Text', sans-serif;">
          <p>
              <span class="product-number" style="color: #F47C20;">${number}</span>
              <span style="color: #F47C20; padding-right: 3px;">x</span>
              @<span class="product-amount" style="padding-right: 3px;">${amount}</span>
          </p>
      </div>
      </div>
    </div>

    <h5> $<span class="product-ttl-amount">${total}</span></h5>

  </div>
        `;
        newOrder.addEventListener('click', () => {
            location.reload();
        });
        orderConfirmed.appendChild(newDiv);
    });
});
console.log(cartSectionOne.children)


     const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('mobile-log');

let isOpen = false;

function openMenu() {
  navLinks.classList.remove('hide');
  navLinks.classList.add('show');
  navLinks.style.display = 'flex';
  isOpen = true;
}

function closeMenu() {
  navLinks.classList.remove('show');
  navLinks.classList.add('hide');
  setTimeout(() => {
    navLinks.style.display = 'none';
  }, 400);
  isOpen = false;
}

hamburger.addEventListener('click', (e) => {
  e.stopPropagation(); // stop click bubbling so document listener no fire here
  if (!isOpen) {
    openMenu();
  } else {
    closeMenu();
  }
});

// Listen for clicks anywhere on the document
document.addEventListener('click', (event) => {
  // If menu is open AND click target is NOT inside navLinks or hamburger, close menu
  if (isOpen && !navLinks.contains(event.target) && event.target !== hamburger) {
    closeMenu();
  }
});


 

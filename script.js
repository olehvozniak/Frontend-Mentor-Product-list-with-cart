// import data from "/data.json" with { type: "json" };

data = [
  {
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

const bpDesktop = 1200;
const bpTablet = 920;
const bpMobile = 480;

const menu = document.querySelector(".menu__list");
let order = [];

for (let i = 0; i < data.length; i++) {
  data[i].id = i;
  data[i].count = 0;
}

function createItem(obj) {
  const li = document.createElement("li");
  li.className = "item";

  const img = document.createElement("img");
  img.className = "item__image";
  img.id = "img-" + obj.id;
  if (window.innerWidth < bpMobile) {
    img.setAttribute("src", obj.image.mobile);
  } else if (window.innerWidth < bpTablet) {
    img.setAttribute("src", obj.image.tablet);
  } else {
    img.setAttribute("src", obj.image.desktop);
  }
  img.setAttribute("alt", obj.name);

  const div = document.createElement("div");
  div.className = "item__content";

  const buyButton = document.createElement("div");
  buyButton.classList = ["item__button buy-button"];
  buyButton.setAttribute("type", "button");

  const addToCartButton = document.createElement("button");
  addToCartButton.className = "buy-button__add-to-cart-button";
  addToCartButton.id = "add-to-cart-button-" + obj.id;
  addToCartButton.innerHTML = `
    <img class="buy-button__icon"
    src = "assets/images/icon-add-to-cart.svg">
    Add to Cart`;
  buyButton.append(addToCartButton);

  addToCartButton.addEventListener("click", (event) => {
    data[obj.id].count = 1;
    const img_ = document.getElementById("img-" + obj.id);
    img_.classList.toggle("item__image--selected");

    const addToCartButton_ = document.getElementById(
      "add-to-cart-button-" + obj.id
    );
    addToCartButton_.style.display = "none";

    const count = document.getElementById("item-count-" + obj.id);
    count.textContent = 1;

    const controlPanel_ = document.getElementById("control-panel-" + obj.id);
    controlPanel_.style.display = "flex";

    const cartTitle = document.querySelector(".cart__title");
    const total = Number(cartTitle.textContent.match(/\d+/)[0]);
    cartTitle.textContent = `Your Cart (${total + 1})`;

    order.push({ ...data[obj.id] });
    drawCart();
  });

  const controlPanel = document.createElement("div");
  controlPanel.className = "buy-button__control-panel control-panel";
  controlPanel.id = "control-panel-" + obj.id;
  controlPanel.style.display = "none";

  const minusButton = document.createElement("button");
  minusButton.className = "control-panel__button";
  minusButton.innerHTML = `
  <img class="control-panel__button-icon"
    src = "assets/images/icon-decrement-quantity.svg">
  `;

  minusButton.addEventListener("click", (event) => {
    data[obj.id].count -= 1;

    if (data[obj.id].count === 0) {
      const img = document.getElementById("img-" + obj.id);
      img.classList.toggle("item__image--selected");

      const addToCartButton_ = document.getElementById(
        "add-to-cart-button-" + obj.id
      );
      addToCartButton_.style.display = "flex";

      const controlPanel = document.getElementById("control-panel-" + obj.id);
      controlPanel.style.display = "none";
    }
    const count = document.getElementById("item-count-" + obj.id);
    count.textContent = Number(count.textContent) - 1;

    const cartTitle = document.querySelector(".cart__title");
    const total = Number(cartTitle.textContent.match(/\d+/)[0]);
    cartTitle.textContent = `Your Cart (${total - 1})`;

    for (let i = 0; i < order.length; i++) {
      if (order[i].id === obj.id) {
        if (order[i].count === 1) {
          order.splice(i, 1);
        } else {
          order[i].count -= 1;
        }
        drawCart();
        break;
      }
    }
  });

  const plusButton = document.createElement("button");
  plusButton.className = "control-panel__button";
  plusButton.innerHTML = `
  <img class="control-panel__button-icon"
    src = "assets/images/icon-increment-quantity.svg">
  `;

  plusButton.addEventListener("click", (event) => {
    data[obj.id].count += 1;
    const count = document.getElementById("item-count-" + obj.id);
    count.textContent = Number(count.textContent) + 1;

    const cartTitle = document.querySelector(".cart__title");
    const total = Number(cartTitle.textContent.match(/\d+/)[0]);
    cartTitle.textContent = `Your Cart (${total + 1})`;

    for (let i = 0; i < order.length; i++) {
      if (order[i].id === obj.id) {
        order[i].count += 1;
        drawCart();
        break;
      }
    }
  });

  const itemCount = document.createElement("p");
  itemCount.id = "item-count-" + obj.id;
  itemCount.className = "control-panel__item-count";
  itemCount.textContent = 0;

  controlPanel.append(minusButton);
  controlPanel.append(itemCount);
  controlPanel.append(plusButton);
  buyButton.append(controlPanel);

  const category = document.createElement("p");
  category.className = "item__category";
  category.textContent = obj.category;

  const name = document.createElement("h3");
  name.className = "item__name";
  name.textContent = obj.name;

  const price = document.createElement("p");
  price.className = "item__price";
  price.textContent = obj.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  li.append(img);
  li.append(div);
  div.append(buyButton);
  div.append(category);
  div.append(name);
  div.append(price);

  return li;
}

function drawMenu() {
  menu.innerHTML = ``;
  for (let i = 0; i < data.length; i++) {
    menu.append(createItem(data[i]));
  }
}
drawMenu();

const cart = document.querySelector(".cart");
const cartDefaultWindow = document.querySelector(".cart__default-window");
const cartList = document.createElement("ul");
cartList.className = "cart__buy-window";
cartList.style.display = "none";
cart.append(cartList);

function drawCart() {
  if (order.length === 0) {
    cartDefaultWindow.style.display = "block";
    cartList.style.display = "none";
  } else {
    cartList.innerHTML = "";
    let orderSum = 0;
    order.forEach((item) => {
      orderSum += item.price * item.count;

      const li = document.createElement("li");
      li.className = "order-item";

      const itemContainer = document.createElement("div");
      itemContainer.className = "order-item__container";

      const itemAttributes = document.createElement("div");
      itemAttributes.className = "order-item__attributes";

      const itemName = document.createElement("h3");
      itemName.className = "order-item__name";
      itemName.textContent = item.name;

      const itemInfo = document.createElement("div");
      itemInfo.className = "order-item__info";

      const itemCount = document.createElement("p");
      itemCount.className = "order-item__count";
      itemCount.textContent = item.count + "x";

      const itemPrice = document.createElement("p");
      itemPrice.className = "order-item__price";
      itemPrice.textContent =
        "@ " +
        item.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });

      const itemCost = document.createElement("p");
      itemCost.className = "order-item__cost";
      itemCost.textContent = (item.price * item.count).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      itemInfo.append(itemCount);
      itemInfo.append(itemPrice);
      itemInfo.append(itemCost);

      itemAttributes.append(itemName);
      itemAttributes.append(itemInfo);

      const deleteButton = document.createElement("button");
      deleteButton.className = "order-item__delete-button";
      deleteButton.innerHTML = `<img src = "assets/images/icon-remove-item.svg">`;

      deleteButton.addEventListener("click", (event) => {
        data[item.id].count = 0;

        const img = document.getElementById("img-" + item.id);
        img.classList.toggle("item__image--selected");

        const addToCartButton_ = document.getElementById(
          "add-to-cart-button-" + item.id
        );
        addToCartButton_.style.display = "flex";

        const controlPanel = document.getElementById(
          "control-panel-" + item.id
        );
        controlPanel.style.display = "none";

        const count = document.getElementById("item-count-" + item.id);
        count.textContent = 0;

        const cartTitle = document.querySelector(".cart__title");
        const total = Number(cartTitle.textContent.match(/\d+/)[0]);
        cartTitle.textContent = `Your Cart (${total - item.count})`;

        for (let i = 0; i < order.length; i++) {
          if (order[i].id === item.id) {
            order.splice(i, 1);
            drawCart();
            break;
          }
        }
      });

      itemContainer.append(itemAttributes);
      itemContainer.append(deleteButton);

      const line = document.createElement("hr");
      line.className = "cart__line";

      li.append(itemContainer);
      li.append(line);

      cartList.append(li);
    });

    const orderTotal = document.createElement("div");
    orderTotal.className = "cart__order-total";

    const text = document.createElement("p");
    text.className = "cart__text";
    text.textContent = "Order Total";

    const sum = document.createElement("p");
    sum.className = "cart__sum";
    sum.textContent = orderSum.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    orderTotal.append(text);
    orderTotal.append(sum);

    cartList.append(orderTotal);

    const ecoComment = document.createElement("div");
    ecoComment.classList = "cart__comment eco-comment";

    const ecoIcon = document.createElement("img");
    ecoIcon.className = "eco-comment__image";
    ecoIcon.setAttribute("src", "assets/images/icon-carbon-neutral.svg");

    const ecoText = document.createElement("p");
    ecoText.className = "eco-comment__text";
    ecoText.innerHTML = `This is a <span style="font-weight: 600">carbon neutral</span> delivery`;

    ecoComment.append(ecoIcon);
    ecoComment.append(ecoText);

    cartList.append(ecoComment);

    const orderButton = document.createElement("button");
    orderButton.setAttribute("type", "submit");
    orderButton.className = "cart__order-button";

    orderButton.textContent = "Confirm Order";

    orderButton.addEventListener("click", (event) => {
      const backdrop = document.querySelector(".backdrop");
      backdrop.classList.toggle("backdrop--is-hidden");

      const modalOrder = document.querySelector(".modal__order");
      order.forEach((item) => {
        const li = document.createElement("li");
        li.className = "modal-item";

        const itemImage = document.createElement("img");
        itemImage.setAttribute("src", item.image.thumbnail);
        itemImage.setAttribute("alt", item.name);
        itemImage.className = "modal-item__image";

        const itemTextData = document.createElement("div");
        itemTextData.className = "modal-item__text-data";

        const itemAttributes = document.createElement("div");
        itemAttributes.className = "modal-item__attributes";

        const itemName = document.createElement("h3");
        itemName.className = "modal-item__name";
        itemName.textContent = item.name;

        const itemInfo = document.createElement("div");
        itemInfo.className = "modal-item__info";

        const itemCount = document.createElement("p");
        itemCount.className = "modal-item__count";
        itemCount.textContent = item.count + "x";

        const itemPrice = document.createElement("p");
        itemPrice.className = "modal-item__price";
        itemPrice.textContent =
          "@ " +
          item.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          });

        itemInfo.append(itemCount);
        itemInfo.append(itemPrice);

        itemAttributes.append(itemName);
        itemAttributes.append(itemInfo);

        const itemCost = document.createElement("p");
        itemCost.className = "modal-item__cost";
        itemCost.textContent = (item.price * item.count).toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        );

        itemTextData.append(itemAttributes);
        itemTextData.append(itemCost);

        li.append(itemImage);
        li.append(itemTextData);

        modalOrder.append(li);
      });

      const modalTotal = document.createElement("div");
      modalTotal.className = "modal__order-total";

      const text = document.createElement("p");
      text.className = "modal__order-text";
      text.textContent = "Order Total";

      const sum = document.createElement("p");
      sum.className = "modal__sum";
      sum.textContent = orderSum.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      modalTotal.append(text);
      modalTotal.append(sum);

      modalOrder.append(modalTotal);
    });

    cartList.append(orderButton);

    cartDefaultWindow.style.display = "none";
    cartList.style.display = "flex";
  }
}

const finishButton = document.querySelector(".modal__finish-button");
finishButton.addEventListener("click", (event) => {
  window.location.reload();
});

let windowPrev = window.innerWidth;

addEventListener("resize", (event) => {
  if ((window.innerWidth < bpMobile) & (windowPrev >= bpMobile)) {
    console.log(window.innerWidth);
    drawMenu();
  } else if ((window.innerWidth > bpMobile) & (windowPrev <= bpMobile)) {
    console.log(window.innerWidth);
    drawMenu();
  }

  if ((window.innerWidth < bpTablet) & (windowPrev >= bpTablet)) {
    console.log(window.innerWidth);
    drawMenu();
  } else if ((window.innerWidth > bpTablet) & (windowPrev <= bpTablet)) {
    console.log(window.innerWidth);
    drawMenu();
  }
  windowPrev = window.innerWidth;
});

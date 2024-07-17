document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");
  const buyButtons = document.querySelectorAll(".buy-button");
  let cart = [];

  buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.getAttribute("data-product");
      cart.push(product);
      cartCount.textContent = cart.length;
      alert(`${product} has been added to your cart.`);
    });
  });
});

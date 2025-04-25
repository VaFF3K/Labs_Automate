
export function calculateCartTotal(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  export function validateUser(username, password) {
    return username.length >= 4 && password.length >= 6;
  }
  
  export function formatPrice(price) {
    return `$${price.toFixed(2)}`;
  }
  
  export function isCartEmpty(cart) {
    return cart.length === 0;
  }
  
  export function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }
  
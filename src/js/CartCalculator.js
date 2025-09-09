// src/js/CartCalculator.js

const SHIPPING_FEE_THRESHOLD = 50000;
const SHIPPING_FEE = 3000;

const CartCalculator = {
    calculateSelectedItemsTotal(items) {
        return items.reduce((total, item) => {
            return item.isSelected ? total + (item.price * item.quantity) : total;
        }, 0);
    },

    calculateShippingFee(totalAmount) {
        return totalAmount < SHIPPING_FEE_THRESHOLD ? SHIPPING_FEE : 0;
    },

    calculateTotalPayment(selectedItemsTotal, shippingFee) {
        return selectedItemsTotal + shippingFee;
    }
};

export default CartCalculator;
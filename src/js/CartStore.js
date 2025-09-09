// src/js/CartStore.js

const CART_STORAGE_KEY = 'cartItems';
const SHIPPING_FEE_THRESHOLD = 50000;
const SHIPPING_FEE = 3000;

const initialDummyData = [
    {
        id: "item1",
        name: "프리미엄 무선 이어폰",
        price: 120000,
        quantity: 1,
        imageUrl: "https://picsum.photos/id/10/80/80",
        isSelected: true,
    },
    {
        id: "item2",
        name: "고속 충전 보조배터리",
        price: 35000,
        quantity: 2,
        imageUrl: "https://picsum.photos/id/19/80/80",
        isSelected: false,
    },
    {
        id: "item3",
        name: "인체공학 무선 마우스",
        price: 25000,
        quantity: 1,
        imageUrl: "https://picsum.photos/id/20/80/80",
        isSelected: true,
    },
];

const CartStore = {
    initCartData() {
        let cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
        if (!cartItems || cartItems.length === 0) {
            cartItems = initialDummyData;
            this.saveCartItems(cartItems);
        }
        return cartItems;
    },

    getCartItems() {
        return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    },

    saveCartItems(items) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    },

    updateItemQuantity(itemId, quantity) {
        let items = this.getCartItems();
        const itemIndex = items.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            // 수량은 최소 1개 이상
            items[itemIndex].quantity = Math.max(1, quantity); 
            this.saveCartItems(items);
        }
        return items;
    },

    updateItemSelection(itemId, isSelected) {
        let items = this.getCartItems();
        const itemIndex = items.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            items[itemIndex].isSelected = isSelected;
            this.saveCartItems(items);
        }
        return items;
    },

    updateAllItemSelection(isSelected) {
        let items = this.getCartItems();
        items = items.map(item => ({ ...item, isSelected: isSelected }));
        this.saveCartItems(items);
        return items;
    },

    deleteSelectedItems() {
        let items = this.getCartItems();
        items = items.filter(item => !item.isSelected);
        this.saveCartItems(items);
        return items;
    }
};

export default CartStore;
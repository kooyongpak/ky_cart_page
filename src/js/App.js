// src/js/App.js

import CartStore from './CartStore.js';
import CartCalculator from './CartCalculator.js';
import CartRenderer from './CartRenderer.js';

const App = {
    cartItems: [],

    init() {
        this.cartItems = CartStore.initCartData();
        this.updateCartUI();
        this.addEventListeners();
    },

    updateCartUI() {
        CartRenderer.renderCartItems(this.cartItems);

        const selectedItemsTotal = CartCalculator.calculateSelectedItemsTotal(this.cartItems);
        const shippingFee = CartCalculator.calculateShippingFee(selectedItemsTotal);
        const totalPayment = CartCalculator.calculateTotalPayment(selectedItemsTotal, shippingFee);

        CartRenderer.renderSummary({ selectedItemsTotal, shippingFee, totalPayment });

        // '전체 선택' 체크박스 상태 업데이트
        const isAllSelected = this.cartItems.length > 0 && this.cartItems.every(item => item.isSelected);
        CartRenderer.renderAllSelectCheckbox(isAllSelected);
    },

    addEventListeners() {
        // 전체 선택/해제
        CartRenderer.allSelectCheckbox.addEventListener('change', (e) => {
            this.handleAllSelection(e.target.checked);
        });

        // 선택 상품 삭제 버튼
        CartRenderer.deleteSelectedBtn.addEventListener('click', () => {
            if (confirm('선택된 상품들을 장바구니에서 삭제하시겠습니까?')) {
                this.cartItems = CartStore.deleteSelectedItems();
                this.updateCartUI();
            }
        });

        // 장바구니 아이템 이벤트 위임 (동적으로 생성되는 요소 처리)
        CartRenderer.cartItemsContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('item-select-checkbox')) {
                const itemId = e.target.closest('.cart-item').dataset.itemId;
                this.handleItemSelection(itemId, e.target.checked);
            }
        });

        CartRenderer.cartItemsContainer.addEventListener('click', (e) => {
            // 수량 감소 버튼
            if (e.target.classList.contains('quantity-minus-btn')) {
                const itemId = e.target.dataset.id;
                const quantityInput = e.target.nextElementSibling; // input 요소
                let currentQuantity = parseInt(quantityInput.value);
                if (currentQuantity > 1) {
                    this.handleQuantityChange(itemId, currentQuantity - 1);
                }
            }
            // 수량 증가 버튼
            if (e.target.classList.contains('quantity-plus-btn')) {
                const itemId = e.target.dataset.id;
                const quantityInput = e.target.previousElementSibling; // input 요소
                let currentQuantity = parseInt(quantityInput.value);
                this.handleQuantityChange(itemId, currentQuantity + 1);
            }
        });

        // 주문하기 버튼 (기능은 없지만, 예시로 추가)
        document.querySelector('.order-btn').addEventListener('click', () => {
            const selectedItems = this.cartItems.filter(item => item.isSelected);
            if (selectedItems.length === 0) {
                alert('주문할 상품을 선택해주세요.');
                return;
            }
            alert(`총 ${selectedItems.length}개의 상품을 주문합니다!\n(실제 결제 기능은 구현되지 않았습니다.)`);
            // 여기에 결제 페이지로 이동하는 로직 등을 추가할 수 있습니다.
        });
    },

    handleItemSelection(itemId, isSelected) {
        this.cartItems = CartStore.updateItemSelection(itemId, isSelected);
        this.updateCartUI();
    },

    handleAllSelection(isSelected) {
        this.cartItems = CartStore.updateAllItemSelection(isSelected);
        this.updateCartUI();
    },

    handleQuantityChange(itemId, newQuantity) {
        this.cartItems = CartStore.updateItemQuantity(itemId, newQuantity);
        this.updateCartUI();
    },
};

// DOMContentLoaded 이벤트가 발생하면 App 초기화
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
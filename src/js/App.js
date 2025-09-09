// src/js/App.js

import CartStore from './CartStore.js';
import CartCalculator from './CartCalculator.js';
import CartRenderer from './CartRenderer.js';

const App = {
    cartItems: [],

    init() {
        this.cartItems = CartStore.initCartData();
        console.log("Loaded Cart Items:", this.cartItems);
        this.updateCartUI();
        this.addEventListeners();
    },

    updateCartUI() {
        CartRenderer.renderCartItems(this.cartItems); // 먼저 아이템을 렌더링하여 체크박스 disabled 상태를 설정
        
        const selectedItemsTotal = CartCalculator.calculateSelectedItemsTotal(this.cartItems);
        const shippingFee = CartCalculator.calculateShippingFee(selectedItemsTotal);
        const totalPayment = CartCalculator.calculateTotalPayment(selectedItemsTotal, shippingFee);

        CartRenderer.renderSummary({ selectedItemsTotal, shippingFee, totalPayment });

        // '전체 선택' 체크박스 상태 업데이트 (renderCartItems 이후에 호출)
        const isAllSelected = this.cartItems.length > 0 && this.cartItems.every(item => item.isSelected);
        CartRenderer.renderAllSelectCheckbox(isAllSelected);
    },

    addEventListeners() {
        // ... (기존 코드와 동일)
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
        // ... (나머지 이벤트 리스너는 동일)
    },

    // ... (나머지 함수들은 동일)
};

// DOMContentLoaded 이벤트가 발생하면 App 초기화
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
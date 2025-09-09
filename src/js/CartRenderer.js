// src/js/CartRenderer.js

const CartRenderer = {
    cartItemsContainer: document.getElementById('cart-items'),
    allSelectCheckbox: document.getElementById('all-select-checkbox'),
    selectedItemsTotalElement: document.getElementById('selected-items-total'),
    shippingFeeElement: document.getElementById('shipping-fee'),
    totalPaymentElement: document.getElementById('total-payment'),
    deleteSelectedBtn: document.querySelector('.delete-selected-btn'),

    renderCartItems(items) {
        this.cartItemsContainer.innerHTML = ''; // 기존 목록 초기화

        if (items.length === 0) {
            this.cartItemsContainer.innerHTML = '<li class="no-items">장바구니에 상품이 없습니다.</li>';
            this.allSelectCheckbox.checked = false;
            this.allSelectCheckbox.disabled = true; // 상품이 없을 때 전체 선택 체크박스 비활성화
            this.deleteSelectedBtn.disabled = true; // 상품이 없을 때 삭제 버튼 비활성화
            return; // 상품이 없으면 더 이상 렌더링할 필요 없음
        }

        // 상품이 있을 경우
        this.allSelectCheckbox.disabled = false; // 상품이 있다면 전체 선택 체크박스 활성화
        this.deleteSelectedBtn.disabled = false; // 상품이 있다면 삭제 버튼 활성화

        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.dataset.itemId = item.id;
            li.innerHTML = `
                <label class="checkbox-container">
                    <input type="checkbox" class="item-select-checkbox" ${item.isSelected ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
                <div class="item-info">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>${item.price.toLocaleString()}원</p>
                    </div>
                </div>
                <div class="item-quantity-control">
                    <button class="quantity-minus-btn" data-id="${item.id}">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" data-id="${item.id}" readonly>
                    <button class="quantity-plus-btn" data-id="${item.id}">+</button>
                </div>
                <div class="item-price">${(item.price * item.quantity).toLocaleString()}원</div>
            `;
            this.cartItemsContainer.appendChild(li);
        });
    },

    renderSummary(summaryData) {
        this.selectedItemsTotalElement.textContent = `${summaryData.selectedItemsTotal.toLocaleString()}원`;
        this.shippingFeeElement.textContent = `${summaryData.shippingFee.toLocaleString()}원`;
        this.totalPaymentElement.textContent = `${summaryData.totalPayment.toLocaleString()}원`;
    },

    renderAllSelectCheckbox(isAllSelected) {
        // 상품이 없을 때는 App.js에서 비활성화하므로, 여기서는 단순히 체크 상태만 업데이트
        if (this.allSelectCheckbox.disabled === false) { // 상품이 있을 때만 체크 상태 변경
            this.allSelectCheckbox.checked = isAllSelected;
        }
    },

    // 이벤트 리스너는 App.js에서 중앙 관리
};

export default CartRenderer;
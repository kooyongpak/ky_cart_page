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
            this.allSelectCheckbox.disabled = true;
            this.deleteSelectedBtn.disabled = true;
            return;
        } else {
            this.allSelectCheckbox.disabled = false;
            this.deleteSelectedBtn.disabled = false;
        }

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
        this.allSelectCheckbox.checked = isAllSelected;
    },

    // 이벤트 리스너는 App.js에서 중앙 관리
};

export default CartRenderer;
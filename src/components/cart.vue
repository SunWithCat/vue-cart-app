<template>
  <div class="cart-container">
    <div class="cart-card">
      <img :src="cartImg" alt="购物车" style="width: 80px; margin-bottom: 10px;" />
      <h2 class="cart-title">购物车</h2>
      <transition-group name="cart-fade" tag="div" class="cart-items">
        <div v-for="item in cart.cartItems" :key="item.id" class="cart-item">
          <div style="display: flex; align-items: center;">
            <img :src="item.image" alt="商品图片" style="width: 56px; height: 56px; object-fit: cover; border-radius: 8px; margin-right: 14px;" v-if="item.image" />
            <div class="item-info" style="flex: 1;">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price">¥{{ item.price }}</span>
            </div>
          </div>
          <div class="item-actions">
            <button class="cart-btn qty-btn" @click="item.quantity > 1 && cart.updateQuantity(item.id, item.quantity - 1)">-</button>
            <input type="number" v-model.number="item.quantity" min="1" class="item-input" />
            <button class="cart-btn qty-btn" @click="cart.updateQuantity(item.id, item.quantity + 1)">+</button>
            <button class="cart-btn update-btn" @click="cart.updateQuantity(item.id, item.quantity)">更新</button>
            <button class="cart-btn remove-btn" @click="cart.removeFromCart(item.id)">移除</button>
          </div>
        </div>
      </transition-group>
      <h3 class="cart-total">总价：<span>¥{{ cart.cartTotal.toFixed(2) }}</span></h3>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'
import cartImg from '@/assets/shopping-cart.png'
const cart = useCartStore()
</script>

<style scoped>
.cart-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 60vh;
  width: 100%;
  margin-top: 32px;
}
.cart-card {
  background: linear-gradient(135deg, #fff 60%, #e0e7ff 100%);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(99,102,241,0.10), 0 1.5px 6px #e0e7ff;
  padding: 2.5rem 2rem 2rem 2rem;
  min-width: 340px;
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cart-title {
  font-size: 2rem;
  color: #4f46e5;
  margin-bottom: 24px;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px #e0e7ff;
}

.cart-items {
  width: 100%;
  margin-bottom: 24px;
}
.cart-item {
  background: #f1f5fd;
  border-radius: 14px;
  box-shadow: 0 2px 8px #e0e7ff;
  padding: 1rem 1.2rem;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}
.cart-item:last-child {
  margin-bottom: 0;
}
.cart-item:hover {
  transform: scale(1.02) translateY(-2px);
  box-shadow: 0 6px 18px #c7d2fe;
  z-index: 2;
}
.item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.08rem;
  font-weight: 500;
  color: #3730a3;
}
.item-name {
  flex: 1;
}
.item-price {
  color: #6366f1;
  font-weight: bold;
  margin-left: 12px;
}
.item-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.item-input {
  width: 54px;
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid #a5b4fc;
  outline: none;
  font-size: 1rem;
  margin-right: 2px;
  transition: border 0.2s;
}
.item-input:focus {
  border: 1.5px solid #6366f1;
}

.cart-btn {
  border: none;
  border-radius: 16px;
  padding: 7px 18px;
  font-size: 0.98rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.18s, transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 1px 4px rgba(99,102,241,0.08);
  outline: none;
}
.update-btn {
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
}
.update-btn:active {
  background: linear-gradient(90deg, #818cf8 0%, #38bdf8 100%);
  transform: scale(0.97);
}
.remove-btn {
  background: linear-gradient(90deg, #ff3a3a 0%, #ff5f3b 100%);
  color: #fff;
  margin-left: 2px;
}
.remove-btn:active {
  background: linear-gradient(90deg, #ff6b6b 0%, #ffa292 100%);
  transform: scale(0.97);
}

.cart-total {
  font-size: 1.25rem;
  color: #3730a3;
  margin-top: 12px;
  font-weight: bold;
  letter-spacing: 1px;
}
.cart-total span {
  color: #ef4444;
  font-size: 1.35rem;
  margin-left: 6px;
}

.cart-fade-enter-active, .cart-fade-leave-active {
  transition: all 0.45s cubic-bezier(.55,0,.1,1);
}
.cart-fade-enter-from, .cart-fade-leave-to {
  opacity: 0;
  transform: translateY(24px) scale(0.97);
}
.qty-btn {
  background: #fff;
  color: #6366f1;
  border: 2px solid #6366f1;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.4rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0 2px;
  transition: background 0.18s, color 0.18s, border 0.18s;
}
.qty-btn:active {
  background: #6366f1;
  color: #fff;
}

</style>

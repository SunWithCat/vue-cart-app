<template>
  <div class="app-container">
    <h1 class="main-title">电商平台</h1>
    <button class="toggle-btn" @click="showCart = !showCart">
      {{ showCart ? '返回商品页' : '查看购物车' }}
    </button>

    <transition name="fade" mode="out-in">
      <ProductList
        v-if="!showCart"
        :products="productList"
        key="product-list"
        @fly-to-cart="flyToCart"
      />
      <Cart v-else key="cart" />
    </transition>
    <img :src="onlineImg" alt="电商" class="online-img-abs" />
    <img
      :src="cartIcon"
      alt="购物车"
      class="cart-icon-abs"
      ref="cartIconRef"
      @click="showCart = true"
    />
    <transition name="fly-img">
      <img
        v-if="flyImg.show"
        :src="flyImg.src"
        :style="flyImg.style"
        class="fly-img"
      />
    </transition>
  </div>
</template>

<script setup>
import ProductList from './components/ProductList.vue'
import Cart from './components/cart.vue'
import onlineImg from './assets/online-shopping.png'
import cartIcon from './assets/shopping-cart.png'

import { ref, nextTick } from 'vue'
import headsetImg from './assets/headset.jpg'
import watchImg from './assets/watch.jpg'
import laptopImg from './assets/laptop.jpg'
import phoneImg from './assets/phone.jpg'
const showCart = ref(false)
const cartIconRef = ref(null)

const flyImg = ref({
  show: false,
  src: '',
  style: {}
})

const flyToCart = async ({ fromRect, imgSrc }) => {
  await nextTick()
  const cartRect = cartIconRef.value.getBoundingClientRect()
  const startX = fromRect.left
  const startY = fromRect.top
  const endX = cartRect.left + cartRect.width / 2 - fromRect.width / 2 + 100
  const endY = cartRect.top + cartRect.height / 2 - fromRect.height / 2 + 50
  const endW = cartRect.width
  const endH = cartRect.height

  flyImg.value = {
    show: true,
    src: imgSrc,
    style: {
      position: 'fixed',
      left: `${startX}px`,
      top: `${startY}px`,
      width: `${fromRect.width}px`,
      height: `${fromRect.height}px`,
      transition: 'all 0.7s cubic-bezier(.55,0,.1,1)',
      zIndex: 9999
    }
  }
  // 触发动画
  requestAnimationFrame(() => {
    flyImg.value.style.left = `${endX}px`
    flyImg.value.style.top = `${endY}px`
    flyImg.value.style.width = `${endW}px`
    flyImg.value.style.height = `${endH}px`
    flyImg.value.style.opacity = 0.5
  })
  setTimeout(() => {
    flyImg.value.show = false
    flyImg.value.src = ''
    flyImg.value.style = {}
    triggerCartAnim()
  }, 700)
}

const productList = [
  { id: 1, name: '无线耳机', price: 299, image: headsetImg },
  { id: 2, name: '智能手表', price: 499, image: watchImg },
  { id: 3, name: '笔记本电脑', price: 4999, image: laptopImg },
  { id: 4, name: '智能手机', price: 3999, image: phoneImg }
]
</script>

<style scoped>
.online-img-abs {
  position: absolute;
  left: 24px;
  top: 24px;
  width: 80px;
  z-index: 10;
}
.cart-icon-abs {
  position: fixed;
  left: 24px;
  top: 140px;
  width: 48px;
  cursor: pointer;
  z-index: 11;
  transition: transform 0.18s;
}
.fly-img {
  pointer-events: none;
  border-radius: 12px;
  box-shadow: 0 2px 8px #e0e7ff;
  position: fixed;
}
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.main-title {
  font-size: 2.5rem;
  color: #4f46e5;
  margin-bottom: 24px;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px #e0e7ff;
}

.toggle-btn {
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: bold;
  box-shadow: 0 4px 16px rgba(99,102,241,0.15);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 32px;
}
.toggle-btn:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 8px 24px rgba(99,102,241,0.25);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s cubic-bezier(.55,0,.1,1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="product-list">
    <transition-group name="card-fade" tag="div" class="product-list-inner">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" alt="product" class="product-img" :ref="el => productImgRefs[product.id] = el" />
        <h3 class="product-title">{{ product.name }}</h3>
        <p class="product-price">¥{{ product.price }}</p>
        <button class="add-btn" @click="add(product)">加入购物车</button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'
const props = defineProps(['products'])
const cart = useCartStore()
const emit = defineEmits(['fly-to-cart'])
import { reactive, nextTick } from 'vue'

const productImgRefs = reactive({})

const add = async (product) => {
  cart.addToCart(product)
  await nextTick()
  const imgEl = productImgRefs[product.id]
  if (imgEl) {
    const fromRect = imgEl.getBoundingClientRect()
    emit('fly-to-cart', {
      fromRect: {
        left: fromRect.left,
        top: fromRect.top,
        width: fromRect.width,
        height: fromRect.height
      },
      imgSrc: product.image
    })
  }
}
</script>

<style scoped>
.product-list {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}
.product-list-inner {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.product-card {
  background: linear-gradient(135deg, #fff 60%, #e0e7ff 100%);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(99,102,241,0.08), 0 1.5px 6px #e0e7ff;
  padding: 1.5rem 1rem 1.2rem 1rem;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.25s cubic-bezier(.55,0,.1,1), box-shadow 0.25s;
  border: none;
  position: relative;
}

.product-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
  transition: transform 0.3s cubic-bezier(.55,0,.1,1);
  box-shadow: 0 2px 8px #e0e7ff;
  margin-top: 10px;
}
.product-card:hover {
  transform: translateY(-8px) scale(1.04);
  box-shadow: 0 8px 32px rgba(99,102,241,0.18), 0 2px 8px #c7d2fe;
  z-index: 2;
}

.product-card:hover .product-img {
  transform: scale(1.06) rotate(-2deg);
}

.product-title {
  font-size: 1.2rem;
  color: #3730a3;
  margin: 8px 0 4px 0;
  font-weight: 600;
  letter-spacing: 1px;
}
.product-price {
  color: #6366f1;
  font-size: 1.1rem;
  margin-bottom: 16px;
  font-weight: bold;
}

.add-btn {
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 28px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(99,102,241,0.10);
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
  outline: none;
}
.add-btn:active {
  transform: scale(0.96);
  background: linear-gradient(90deg, #818cf8 0%, #38bdf8 100%);
  box-shadow: 0 1px 4px rgba(99,102,241,0.08);
}

.card-fade-enter-active, .card-fade-leave-active {
  transition: all 0.5s cubic-bezier(.55,0,.1,1);
}
.card-fade-enter-from, .card-fade-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.96);
}
</style>

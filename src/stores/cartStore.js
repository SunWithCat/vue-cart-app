import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartItems: [],
    cartTotal: 0
  }),
  actions: {
    addToCart(product) {
      const item = this.cartItems.find(i => i.id === product.id)
      if (item) {
        item.quantity += 1
      } else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
      this.calculateTotal()
    },
    removeFromCart(id) {
      this.cartItems = this.cartItems.filter(i => i.id !== id)
      this.calculateTotal()
    },
    updateQuantity(id, quantity) {
      const item = this.cartItems.find(i => i.id === id)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
      this.calculateTotal()
    },
    calculateTotal() {
      this.cartTotal = this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    }
  }
})

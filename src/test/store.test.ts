import { describe, it, expect } from 'vitest';
import { store } from '../store';
import { addItem } from '../store/cartSlice';

describe('Redux store', () => {
  it('should have initial state', () => {
    const state = store.getState();
    expect(state.products.items).toEqual([]);
    expect(state.products.loading).toBe(false);
    expect(state.cart.items).toEqual([]);
  });

  it('should add item to cart', () => {
    store.dispatch(addItem({
      product: { id: 1, name: 'Tomato - 1 kg', price: 2.5, image: 'tomato.jpg' },
      quantity: 2
    }));
    
    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].quantity).toBe(2);
  });
});
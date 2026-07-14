import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { ProductCard } from '../components/ProductCard';
import { CartProvider } from '../context/CartContext';

const mockProduct = {
  id: 1,
  name: 'Broccoli - 1 Kg',
  price: 120,
  image: 'https://example.com/broccoli.jpg',
  category: 'vegetables'
};

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <MantineProvider>
      <CartProvider>{ui}</CartProvider>
    </MantineProvider>
  );
};

describe('ProductCard', () => {
  it('renders product info', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('$120')).toBeInTheDocument();
    expect(screen.getByText('Add to cart')).toBeInTheDocument();
  });

  it('increments quantity on + click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const plusButton = screen.getByText('+');
    await user.click(plusButton);
    
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('decrements quantity on - click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const plusButton = screen.getByText('+');
    await user.click(plusButton);
    await user.click(plusButton);
    
    const minusButton = screen.getByText('−');
    await user.click(minusButton);
    
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
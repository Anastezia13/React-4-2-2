import { Card, Image, Text, Group, Button, Stack } from '@mantine/core';
import { ShoppingCart } from 'tabler-icons-react';
import type { Product } from '../types';
import { useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { addItem } from '../store/cartSlice';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addItem({ product, quantity }));
    setQuantity(1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const nameParts = product.name.split(' - ');
  const name = nameParts[0];
  const weight = nameParts[1] || '';

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.card}>
      <Card.Section style={{ padding: '12px 12px 0 12px' }}>
        <div className={styles.imageWrapper}>
          <Image src={product.image} alt={product.name} fit="contain" />
        </div>
      </Card.Section>

      <Stack className={styles.content}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Group gap={4} className={styles.nameGroup}>
            <Text fw={500} size="md" lineClamp={1}>{name}</Text>
            {weight && <Text size="sm" c="dimmed" className={styles.weightText}>{weight}</Text>}
          </Group>
          
          <Group gap={4} className={styles.controlsGroup}>
            <Button variant="subtle" color="gray" size="xs" onClick={decrement} className={styles.btnMinus}>
              −
            </Button>
            <Text size="sm" fw={600} className={styles.quantity}>{quantity}</Text>
            <Button variant="subtle" color="gray" size="xs" onClick={increment} className={styles.btnPlus}>
              +
            </Button>
          </Group>
        </Group>

        <Group justify="space-between" align="center" wrap="nowrap" className={styles.priceWrapper}>
          <Text size="xl" fw={700} c="green">${product.price}</Text>
          <Button
            variant="filled"
            color="myColor.1"
            onClick={handleAddToCart}
            rightSection={<ShoppingCart size={16} />}
            className={styles.addButton}
          >
            Add to cart
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};
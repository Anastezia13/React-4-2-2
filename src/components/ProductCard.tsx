import { Card, Image, Text, Group, Button, Stack } from '@mantine/core';
import { ShoppingCart } from 'tabler-icons-react';
import type { Product } from '../types';
import { useState } from 'react';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(product, quantity);
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
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }}
    >
      <Card.Section style={{ padding: '12px 12px 0 12px' }}>
        <div style={{ width: '100%', paddingBottom: '100%', position: 'relative', borderRadius: 8 }}>
          <Image
            src={product.image}
            alt={product.name}
            fit="contain"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              padding: '8px'
            }}
          />
        </div>
      </Card.Section>

      <Stack style={{ flex: 1, marginTop: 12, padding: '0 4px' }}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Group gap={4} style={{ flex: 1, minWidth: 0 }}>
            <Text fw={500} size="md" lineClamp={1}>
              {name}
            </Text>
            {weight && (
              <Text size="sm" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
                {weight}
              </Text>
            )}
          </Group>
          
          <Group gap={4} wrap="nowrap">
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              onClick={decrement}
              style={{ 
                minWidth: 28, 
                height: 28, 
                padding: 0,
                backgroundColor: '#e8e8e8',
                color: '#666'
              }}
            >
              −
            </Button>
            <Text size="sm" fw={600} style={{ minWidth: 24, textAlign: 'center' }}>
              {quantity}
            </Text>
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              onClick={increment}
              style={{ 
                minWidth: 28, 
                height: 28, 
                padding: 0,
                backgroundColor: '#d0d0d0',
                color: '#333'
              }}
            >
              +
            </Button>
          </Group>
        </Group>

        <Group justify="space-between" align="center" wrap="nowrap" style={{ marginTop: 4 }}>
          <Text size="xl" fw={700} c="green">
            ${product.price}
          </Text>
          <Button
            variant="filled"
            color="myColor.1"
            onClick={handleAddToCart}
            rightSection={<ShoppingCart size={16} />}
            style={{ flex: 1, marginLeft: 16, color: '#2a7a3f' }}
          >
            Add to cart
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};
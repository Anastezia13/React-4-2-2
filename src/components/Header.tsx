import { Group, Text, Button, Paper } from '@mantine/core';
import { ShoppingCart } from 'tabler-icons-react';
import { useCart } from '../hooks/useCart';
import { CartPopup } from './CartPopup';
import { useState } from 'react';

export const Header = () => {
  const { totalItems } = useCart();
  const [popupOpened, setPopupOpened] = useState(false);

  return (
    <Paper
      shadow="sm"
      p="md"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Group justify="space-between">
        <Group gap={0}>
          <div
            style={{
              backgroundColor: '#f0f0f0',
              borderRadius: 50,
              padding: '2px 0 2px 16px',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <Text size="xl" fw={700} style={{ color: '#000000' }}>
              Vegetable
            </Text>
            <Text
              size="xl"
              fw={700}
              style={{
                color: 'white',
                backgroundColor: '#74c186',
                borderRadius: 50,
                padding: '2px 16px',
                marginLeft: 6
              }}
            >
              SHOP
            </Text>
          </div>
        </Group>
        
        <div style={{ position: 'relative' }}>
          <Button
            variant="filled"
            color="myColor.6"
            onClick={() => setPopupOpened(!popupOpened)}
            style={{ 
              paddingLeft: totalItems > 0 ? 32 : 12,
            }}
          >
            {totalItems > 0 && (
              <div
                style={{
                  position: 'absolute',
                  left: 6,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: '#2a7a3f',
                  fontSize: 10,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {totalItems}
              </div>
            )}
            <Group gap={6}>
              <span>Cart</span>
              <ShoppingCart size={18} />
            </Group>
          </Button>

          <CartPopup opened={popupOpened} onClose={() => setPopupOpened(false)} />
        </div>
      </Group>
    </Paper>
  );
};
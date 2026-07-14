import { Paper, Stack, Text, Group, Button, Divider, Image } from '@mantine/core';
import { useCart } from '../hooks/useCart';
import emptyCart from '../assets/empty-cart.svg';

interface CartPopupProps {
  opened: boolean;
  onClose: () => void;
}

export const CartPopup = ({ opened }: CartPopupProps) => {
  const { items, totalPrice, updateQuantity, removeItem } = useCart();

  if (!opened) return null;

  const isEmpty = items.length === 0;

  return (
    <Paper
      shadow="lg"
      p={isEmpty ? "sm" : "md"}
      style={{
        position: 'fixed',
        top: 80,
        right: 20,
        width: isEmpty ? 280 : 340,
        maxHeight: 400,
        overflow: 'auto',
        backgroundColor: 'white',
        zIndex: 200,
        border: '1px solid #e0e0e0',
        borderRadius: 8
      }}
    >
      {isEmpty ? (
        <div style={{ textAlign: 'center', padding: '15px 0' }}>
          <img 
            src={emptyCart} 
            alt="Empty cart" 
            style={{ width: 60, height: 60, margin: '0 auto 8px', display: 'block' }}
          />
          <Text size="md" fw={500} c="dimmed">Your cart is empty!</Text>
        </div>
      ) : (
        <Stack gap={0}>
          {items.map((item, index) => {
            const nameParts = item.name.split(' - ');
            const name = nameParts[0];
            const weight = nameParts[1] || '';
            
            return (
              <div key={item.id}>
                <div style={{ padding: '8px 0' }}>
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Group gap="sm" style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ width: 40, height: 40, flexShrink: 0 }}>
                        <Image
                          src={item.image}
                          width={40}
                          height={40}
                          fit="contain"
                          style={{ backgroundColor: '#f8f9fa', borderRadius: 4 }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Group gap={4} align="center">
                          <Text size="sm" fw={500}>
                            {name}
                          </Text>
                          {weight && (
                            <Text size="xs" c="dimmed">
                              {weight}
                            </Text>
                          )}
                        </Group>
                        <Text size="xs" c="dimmed">
                          ${item.price}
                        </Text>
                      </div>
                    </Group>
                    
                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                      <Button
                        variant="subtle"
                        color="gray"
                        size="xs"
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.quantity - 1);
                          } else {
                            removeItem(item.id);
                          }
                        }}
                        style={{ 
                          minWidth: 26, 
                          height: 26, 
                          padding: 0,
                          backgroundColor: '#e8e8e8',
                          color: '#666'
                        }}
                      >
                        −
                      </Button>
                      <Text size="sm" fw={600} style={{ minWidth: 20, textAlign: 'center' }}>
                        {item.quantity}
                      </Text>
                      <Button
                        variant="subtle"
                        color="gray"
                        size="xs"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ 
                          minWidth: 26, 
                          height: 26, 
                          padding: 0,
                          backgroundColor: '#d0d0d0',
                          color: '#333'
                        }}
                      >
                        +
                      </Button>
                    </Group>
                  </Group>
                </div>
                {index < items.length - 1 && (
                  <div style={{ paddingLeft: 48 }}>
                    <Divider size="1px" color="#d3d3d3" />
                  </div>
                )}
              </div>
            );
          })}

          <Divider size="1px" color="#d3d3d3" style={{ marginTop: 8 }} />

          <div style={{ padding: '8px 0' }}>
            <Group justify="space-between">
              <Text fw={600}>Total</Text>
              <Text fw={700} style={{ color: '#000000' }}>${totalPrice}</Text>
            </Group>
          </div>
        </Stack>
      )}
    </Paper>
  );
};
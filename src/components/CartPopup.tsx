import { Paper, Stack, Text, Group, Button, Divider, Image } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { updateQuantity, removeItem } from '../store/cartSlice';
import emptyCart from '../assets/empty-cart.svg';
import styles from './CartPopup.module.css';

interface CartPopupProps {
  opened: boolean;
  onClose: () => void;
}

export const CartPopup = ({ opened }: CartPopupProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!opened) return null;

  const isEmpty = items.length === 0;

  return (
    <Paper
      shadow="lg"
      p={isEmpty ? "sm" : "md"}
      className={styles.popup}
      style={{
        width: isEmpty ? 280 : 340,
      }}
    >
      {isEmpty ? (
        <div style={{ textAlign: 'center', padding: '15px 0' }}>
          <img src={emptyCart} alt="Empty cart" style={{ width: 60, height: 60, margin: '0 auto 8px', display: 'block' }} />
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
                <div className={styles.itemWrapper}>
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Group gap="sm" style={{ flex: 1, minWidth: 0 }}>
                      <div className={styles.itemImage}>
                        <Image
                          src={item.image}
                          width={40}
                          height={40}
                          fit="contain"
                          className={styles.itemImageInner}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Group gap={4} align="center">
                          <Text size="sm" fw={500}>{name}</Text>
                          {weight && <Text size="xs" c="dimmed">{weight}</Text>}
                        </Group>
                        <Text size="xs" c="dimmed">${item.price}</Text>
                      </div>
                    </Group>
                    
                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                      <Button
                        variant="subtle"
                        color="gray"
                        size="xs"
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                          } else {
                            dispatch(removeItem(item.id));
                          }
                        }}
                        className={styles.buttonMinus}
                      >
                        −
                      </Button>
                      <Text size="sm" fw={600} className={styles.quantityText}>
                        {item.quantity}
                      </Text>
                      <Button
                        variant="subtle"
                        color="gray"
                        size="xs"
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className={styles.buttonPlus}
                      >
                        +
                      </Button>
                    </Group>
                  </Group>
                </div>
                {index < items.length - 1 && (
                  <div className={styles.dividerWrapper}>
                    <Divider size="1px" color="#d3d3d3" />
                  </div>
                )}
              </div>
            );
          })}

          <Divider size="1px" color="#d3d3d3" style={{ marginTop: 8 }} />

          <div className={styles.totalWrapper}>
            <Group justify="space-between">
              <Text fw={600}>Total</Text>
              <Text fw={700} className={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            </Group>
          </div>
        </Stack>
      )}
    </Paper>
  );
};
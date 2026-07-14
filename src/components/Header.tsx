import { Group, Text, Button, Paper, Box } from '@mantine/core';
import { ShoppingCart } from 'tabler-icons-react';
import { CartPopup } from './CartPopup';
import { useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import styles from './Header.module.css';

export const Header = () => {
  const [popupOpened, setPopupOpened] = useState(false);
  const items = useAppSelector((state) => state.cart.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Paper shadow="sm" p="md" className={styles.header}>
      <Group justify="space-between">
        <Group gap={0}>
          <Box className={styles.logoWrapper}>
            <Text size="xl" fw={700} className={styles.logoText}>
              Vegetable
            </Text>
            <Box className={styles.logoAccent}>
              <Text size="xl" fw={700} className={styles.logoAccentText}>
                SHOP
              </Text>
            </Box>
          </Box>
        </Group>
        
        <Box className={styles.cartButton}>
          <Button
            variant="filled"
            color="myColor.6"
            onClick={() => setPopupOpened(!popupOpened)}
            style={{ paddingLeft: totalItems > 0 ? 32 : 12 }}
          >
            {totalItems > 0 && (
              <Box className={styles.cartBadge}>
                {totalItems}
              </Box>
            )}
            <Group gap={6}>
              <span>Cart</span>
              <ShoppingCart size={18} />
            </Group>
          </Button>

          <CartPopup opened={popupOpened} onClose={() => setPopupOpened(false)} />
        </Box>
      </Group>
    </Paper>
  );
};
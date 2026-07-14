import { MantineProvider, createTheme, SimpleGrid, Alert, Container, Text, Skeleton, Paper } from '@mantine/core';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchProducts } from './store/productsSlice';
import { useEffect } from 'react';
import '@mantine/core/styles.css';
import emptyProduct from './assets/empty-product.svg';
import styles from './App.module.css';

const myColor: [
  string, string, string, string, string,
  string, string, string, string, string
] = [
  '#eafbee', '#dbf2e0', '#b9e1c2', '#94d0a1', '#74c186',
  '#60b874', '#54b46a', '#449e59', '#398d4d', '#2a7a3f'
];

const theme = createTheme({
  colors: { myColor },
  primaryColor: 'myColor',
});

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { items: products, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={styles.pageFull}>
        <Container size="xl">
          <Text size="xl" fw={700} mb="md" className={styles.catalogTitle}>
            Catalog
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Paper key={i} shadow="sm" p="lg" radius="md" withBorder style={{ height: '100%', minHeight: 280, display: 'flex', flexDirection: 'column' }}>
                <div className={styles.skeletonWrapper}>
                  <Skeleton height="100%" radius="md" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
                  <div className={styles.skeletonImage}>
                    <img src={emptyProduct} alt="Loading" />
                  </div>
                </div>
                <div className={styles.skeletonPlaceholder}></div>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <Container size="xl">
          <Text size="xl" fw={700} mb="md" className={styles.catalogTitle}>
            Catalog
          </Text>
          <Alert color="red" title="Ошибка загрузки">
            {error}
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Container size="xl">
        <Text size="xl" fw={700} mb="md" className={styles.catalogTitle}>
          Catalog
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
};

function App() {
  return (
    <MantineProvider theme={theme}>
      <Header />
      <ProductList />
    </MantineProvider>
  );
}

export default App;
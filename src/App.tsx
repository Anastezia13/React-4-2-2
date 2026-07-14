import { MantineProvider, createTheme, SimpleGrid, Alert, Container, Text, Skeleton, Paper } from '@mantine/core';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { useProducts } from './hooks/useProducts';
import '@mantine/core/styles.css';
import emptyProduct from './assets/empty-product.svg';

const myColor: [
  string, string, string, string, string,
  string, string, string, string, string
] = [
  '#eafbee',
  '#dbf2e0',
  '#b9e1c2',
  '#94d0a1',
  '#74c186',
  '#60b874',
  '#54b46a',
  '#449e59',
  '#398d4d',
  '#2a7a3f'
];

const theme = createTheme({
  colors: {
    myColor,
  },
  primaryColor: 'myColor',
});

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px 0', minHeight: '100vh' }}>
        <Container size="xl">
          <Text size="xl" fw={700} mb="md" style={{ paddingTop: 10, textAlign: 'left' }}>
            Catalog
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Paper key={i} shadow="sm" p="lg" radius="md" withBorder style={{ height: '100%', minHeight: 280, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', paddingBottom: '100%', position: 'relative', borderRadius: 8, backgroundColor: '#f5f5f5' }}>
                  <Skeleton height="100%" radius="md" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    <img src={emptyProduct} alt="Loading" style={{ width: 40, height: 40, opacity: 0.3 }} />
                  </div>
                </div>
                <div style={{ flex: 1, minHeight: 80 }}></div>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
        <Container size="xl">
          <Text size="xl" fw={700} mb="md" style={{ paddingTop: 10, textAlign: 'left' }}>
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
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
      <Container size="xl">
        <Text size="xl" fw={700} mb="md" style={{ paddingTop: 10, textAlign: 'left' }}>
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
      <CartProvider>
        <Header />
        <ProductList />
      </CartProvider>
    </MantineProvider>
  );
}

export default App;
import axios from 'axios';

const API_BASE = 'https://api.demoblaze.com';

describe('API Tests - Demoblaze', () => {
  const randomUser = `test${Date.now()}`;

  test('Register user', async () => {
    const res = await axios.post(`${API_BASE}/signup`, {
      username: randomUser,
      password: 'password123'
    });
    expect(res.data).toMatch(/^(|This user already exist\.)$/);
  });

  test('Login user', async () => {
    const res = await axios.post(`${API_BASE}/login`, {
      username: randomUser,
      password: 'password123'
    });
    expect(typeof res.data).toBe('string');
    expect(res.data).toMatch(/^Auth_token:/); // token має з’явитись у відповіді
  });

  test('Get product list', async () => {
    const res = await axios.post(`${API_BASE}/bycat`, { cat: 'phone' });
    expect(res.data.Items.length).toBeGreaterThan(0);
  });

  test('Get product details', async () => {
    const res = await axios.post(`${API_BASE}/view`, { id: '1' });
    expect(res.data).toHaveProperty('desc');
  });

  test('Add item to cart (fake user)', async () => {
    const res = await axios.post(`${API_BASE}/addtocart`, {
        id: `${Date.now()}`,
        cookie: 'user=demo', // симуляція кукі
        prod_id: 1,
        flag: false // важливо
      });      
      expect(typeof res.data).toBe('string');
      expect(res.data).toMatch(/^(|Product added)$/);      
  });
});

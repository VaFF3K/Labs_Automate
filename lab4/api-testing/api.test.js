import axios from 'axios';

describe('API Tests', () => {
  
  let bookingId; // Тут будемо зберігати ID створеного бронювання

  // 1. GET - Отримання всіх записів
  test('should return a list of bookings (GET all)', async () => {
    const response = await axios.get('https://restful-booker.herokuapp.com/booking');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  // 2. POST - Створення нового запису
  test('should create a new booking (POST)', async () => {
    const newBooking = {
      firstname: 'John',
      lastname: 'Doe',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-01-01',
        checkout: '2024-01-07'
      },
      additionalneeds: 'Breakfast'
    };
  
    const response = await axios.post(
      'https://restful-booker.herokuapp.com/booking',
      newBooking,
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        } 
      }
    );
  
    expect(response.status).toBe(200);
    expect(response.data.bookingid).toBeDefined();
    bookingId = response.data.bookingid;
  });
  
  

  // 3. GET - Отримання конкретного запису
  test('should retrieve a booking by ID (GET one)', async () => {
    console.log('Booking ID:', bookingId); // Лог для перевірки ID
    
    expect(bookingId).toBeDefined(); // перевірка чи існує bookingId 
    
    const response = await axios.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
      headers: { 'Accept': 'application/json' } // Додаємо заголовок Accept
    });
  
    expect(response.status).toBe(200);
    expect(response.data.firstname).toBe('John');
  });
  


  let token = '';

  beforeAll(async () => {
    const authResponse = await axios.post(
      'https://restful-booker.herokuapp.com/auth',
      { username: 'admin', password: 'password123' },
      { headers: { 'Content-Type': 'application/json' } }
    );
    token = authResponse.data.token;
  });
  

  // 4. PUT - Оновлення запису
  test('should update a booking (PUT)', async () => {
    expect(bookingId).toBeDefined(); // перевірка чи існує bookingId 
  
    const updatedBooking = {
      firstname: 'Jake',
      lastname: 'Doe',
      totalprice: 200,
      depositpaid: false,
      bookingdates: {
        checkin: '2024-02-01',
        checkout: '2024-02-10'
      },
      additionalneeds: 'Lunch'
    };
  
    const response = await axios.put(
      `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      updatedBooking,
      { 
        headers: { 
          'Content-Type': 'application/json', 
          'Cookie': `token=${token}`,
          'Accept': 'application/json'
        } 
      }
    );
  
    expect(response.status).toBe(200);
  });
  
  

  // 5. DELETE - Видалення запису
  test('should delete a booking (DELETE)', async () => {
    expect(bookingId).toBeDefined(); // перевірка чи існує bookingId 
  
    const response = await axios.delete(
      `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      { 
        headers: { 
          'Cookie': `token=${token}`, 
          'Accept': 'application/json'
        } 
      }
    );
  
    expect(response.status).toBe(201);
  });
  
});

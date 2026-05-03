const BASE_URL = 'https://dummyjson.com';

export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const getProfile = async (token: string) => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  const data = await response.json();

  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    image: data.image || '',
  };
};
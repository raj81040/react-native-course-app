const BASE_URL = 'https://dummyjson.com';

import { fetchWithRetry } from '../utils/fetchWithRetry';

export const fetchCourses = async () => {
  const [productsRes, usersRes] = await Promise.all([
    fetchWithRetry(`${BASE_URL}/products?limit=20`),
    fetchWithRetry(`${BASE_URL}/users?limit=20`),
  ]);

  const productsData = await productsRes.json();
  const usersData = await usersRes.json();

  return productsData.products.map(
    (product: any, index: number) => {
      const instructor =
        usersData.users[
          index % usersData.users.length
        ];

      return {
        id: product.id,
        title: product.title,
        description: product.description,
        thumbnail: product.thumbnail,
        instructor: `${instructor.firstName} ${instructor.lastName}`,
        bookmarked: false,
      };
    }
  );
};
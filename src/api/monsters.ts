import { API_URL } from '../constants';

export const getAll = async (name: string) => {
  const endPoint = `/api/monsters/?name=${encodeURIComponent(name)}`;
  try {
    const response = await fetch(API_URL + endPoint, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getOne = async (url: string) => {
  const endPoint = `/api/monsters/`;
  try {
    const response = await fetch(API_URL + endPoint + url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

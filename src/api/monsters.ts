const baseUrl = 'https://www.dnd5eapi.co';

export const getAll = async (name: string) => {
  const endPoint = `/api/monsters/?name=${encodeURIComponent(name)}`;
  try {
    const response = await fetch(baseUrl + endPoint, {
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

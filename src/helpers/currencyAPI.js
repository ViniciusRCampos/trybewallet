const LINK_API = 'https://economia.awesomeapi.com.br/json/all';

const currencyAPI = async () => {
  const response = await fetch(LINK_API);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default currencyAPI;

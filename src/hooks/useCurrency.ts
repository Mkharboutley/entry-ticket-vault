
import { useState, useEffect } from 'react';

interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

const defaultCurrency: Currency = {
  code: 'USD',
  symbol: '$',
  name: 'US Dollar',
  rate: 1
};

export const useCurrency = () => {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      setCurrency(JSON.parse(savedCurrency));
    }
  }, []);

  const convertPrice = (price: number): string => {
    const convertedPrice = price * currency.rate;
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  return { currency, convertPrice };
};

import { useState, useEffect } from 'react';

function useCoinMarket() {
  const [state, setState] = useState({ data: [], isLoading: true });
  const updateState = data => {
    setState({
      data: data,
      isLoading: false,
    });
  };
  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api');
        const data = await res.json();
        updateState(data);
      } catch (err) {
        console.log(err);
      }
    }
    init();
    const id = setInterval(() => {
      init();
    }, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return state;
}

function numberFormat(num, options) {
  let temp = 2;
  if (num < 1 && num > 0.0001) {
    temp = 4;
  }
  if (num < 0.0001) {
    temp = 8;
  }
  let defaultOptions = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: temp,
    minimumFractionDigits: 2,
    notation: 'standard',
    compactDisplay: 'long',
  };
  return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(num);
}

export { useCoinMarket, numberFormat };

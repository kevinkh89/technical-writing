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
        // cb(data);
        // cb(data.length);
      } catch (err) {
        console.log(err);
      }
    }
    init();
    const id = setInterval(() => {
      init();
    }, 0.5 * 60 * 1000);
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

async function init() {
  try {
    const res = await fetch('/api');
    const data = await res.json();
    // updateState(data);
    // setState({
    //   data: data,
    //   isLoading: false,
    // });
    // cb(data);
    // cb(data.length);
    return data;
  } catch (err) {
    console.log(err);
  }
}

const wrapper = promise => {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    resolve => {
      status = 'success';
      result = resolve;
    },
    reject => {
      status = 'reject';
      result = reject;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'success') {
        return result;
      } else if (status === 'reject') {
        throw result;
      }
    },
  };
};
function fetchData() {
  const data = wrapper(init());
  return data;
}
export { useCoinMarket, numberFormat, fetchData };

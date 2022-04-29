import { useState, useEffect } from 'react';

function useCoinMarket() {
   const [state, setState] = useState({ data: [], isLoading: true, update: false });
   const updateState = data => {
      setState(state => ({
         data: data ? data : state.data,
         isLoading: false,
         // update: true,
      }));
   };
   async function init() {
      try {
         const res = await fetch('/api');
         const data = await res.json();
         updateState(data);
      } catch (err) {
         console.log(err);
      }
   }
   useEffect(() => {
      init();
      const id = setInterval(() => {
         // setState(state => ({ ...state, update: false }));
         init();
      }, 1 * 60 * 1000);
      return () => clearInterval(id);
   }, []);
   return state;
}

function numberFormat(num, style = 'currency', currency = 'USD') {
   let temp = 2;
   if (num < 1 && num > 0.0001) {
      temp = 4;
   }
   if (num < 0.0001) {
      temp = 8;
   }
   let curr = new Intl.NumberFormat('en-US', {
      style,
      currency,
      maximumFractionDigits: temp,
      minimumFractionDigits: 2,
   }).format(num);

   return curr;
}

export { useCoinMarket, numberFormat };

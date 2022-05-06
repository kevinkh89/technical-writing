import React, { useEffect } from 'react';
import { TableBody } from '@mui/material';
import { useCoinMarket, init, fetchData } from './hooks-helpers';
import BodyRow from './BodyRow';
import BodySkeleton from './BodySkeleton';

const CoinTableBody = ({ rowsPerPage, page, setDataLength }) => {
  const dataSliced = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  useEffect(() => {
    setDataLength(data.length);
  }, [data.length]);
  console.log('body');
  return (
    <TableBody>
      {isLoading ? (
        <BodySkeleton rows={rowsPerPage} heads={8} />
      ) : (
        dataSliced.map(row => <BodyRow key={row.id} row={row} />)
      )}
    </TableBody>
  );
};
export default CoinTableBody;

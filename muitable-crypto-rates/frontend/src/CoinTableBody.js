import React, { useEffect, useRef } from 'react';
import { Skeleton, TableBody, TableCell, TableRow, Box } from '@mui/material';
import { useCoinMarket } from './other';
import BodyRow from './BodyRow';

const BodySkeleton = ({ rows, heads }) => {
  const rowArray = Array(rows).fill(null);
  const cellArray = Array(heads).fill(null);
  return rowArray.map((_, index) => (
    <TableRow key={index}>
      {cellArray.map((_, index) => (
        <TableCell key={index} align={index === 1 ? 'left' : 'right'}>
          {index === 1 ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton variant="circular" width={25} height={25} sx={{ mr: 1 }} />
              <Skeleton width={100} />
            </Box>
          ) : (
            <Skeleton />
          )}
        </TableCell>
      ))}
    </TableRow>
  ));
};

const CoinTableBody = ({ rowsPerPage, page, setDataLength }) => {
  const { data, isLoading, update } = useCoinMarket();
  const dataSliced = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      setDataLength(data.length);
    }
    first.current = false;
  }, [data]);
  let isLoading2 = true;
  return (
    <TableBody>
      {isLoading ? (
        <BodySkeleton rows={rowsPerPage} heads={8} />
      ) : (
        dataSliced.map(row => <BodyRow key={row.id} row={row} update={update} />)
      )}
    </TableBody>
  );
};
const CoinTableBodyMemo = React.memo(CoinTableBody);
export default CoinTableBodyMemo;

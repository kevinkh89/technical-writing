import { Suspense, useState, useEffect, useTransition, startTransition } from 'react';
import Table from '@mui/material/Table';
import {
  Paper,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  TableBody,
  Skeleton,
} from '@mui/material';
import BodySkeleton from './BodySkeleton';
import { fetchData } from './hooks-helpers';
import BodyRow from './BodyRow';

// import CoinTableBody from './CoinTableBody';
const dataInit = fetchData();

export default function CoinTable() {
  // const [dataLength, setDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  console.log('table');
  const Pagination = () => {
    return (
      <TablePagination
        component={'div'}
        rowsPerPageOptions={[5, 10, 20]}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value));
          setPage(0);
        }}
        count={dataInit.read().length}
        page={page}
        onPageChange={(e, newPage) => {
          setPage(newPage);
        }}
      />
    );
  };
  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 700, '& td': { fontWeight: 600 } }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24h %</TableCell>
              <TableCell align="right">7d %</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">Volume(24h)</TableCell>
              <TableCell align="right">Circulating supply</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Suspense fallback={<BodySkeleton rows={rowsPerPage} heads={8} />}>
              <CoinTableBody
                rowsPerPage={rowsPerPage}
                page={page}
                // setDataLength={setDataLength}
              />
            </Suspense>
          </TableBody>
        </Table>
      </TableContainer>
      <Suspense fallback={<Skeleton />}>
        <Pagination />
      </Suspense>
    </Paper>
  );
}

const CoinTableBody = ({ rowsPerPage, page }) => {
  const [state, setState] = useState(dataInit);
  // const [isPending, startTransition] = useTransition();
  const dataSliced = state.read().slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  useEffect(() => {
    // setDataLength(state.length);
    const id = setInterval(() => {
      startTransition(() => {
        setState(fetchData());
      });
    }, 1 * 60 * 1000);
    console.log('effect');
    return () => clearInterval(id);
  }, []);
  console.log('body');
  return dataSliced.map(row => <BodyRow key={row.id} row={row} />);
};

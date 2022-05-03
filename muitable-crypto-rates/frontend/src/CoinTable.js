import { useState } from 'react';
// import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import {
  Paper,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Box,
} from '@mui/material';
import CoinTableBody from './CoinTableBody';
export default function CoinTable() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  return (
    <Paper>
      <Box sx={{ overflowX: { xs: 'scroll', lg: 'visible' } }}>
        <Table
          stickyHeader
          sx={{ minWidth: 700, '& td': { fontWeight: 600 } }}
          // size="small"
        >
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
              {/* <TableCell>Volume(24h)</TableCell> */}
            </TableRow>
          </TableHead>
          <CoinTableBody
            rowsPerPage={rowsPerPage}
            page={page}
            setDataLength={setDataLength}
          />
        </Table>
      </Box>
      <TablePagination
        component={'div'}
        rowsPerPageOptions={[5, 10, 20]}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value));
          setPage(0);
        }}
        count={dataLength}
        page={page}
        onPageChange={(e, newPage) => {
          setPage(newPage);
        }}
      />
    </Paper>
  );
}

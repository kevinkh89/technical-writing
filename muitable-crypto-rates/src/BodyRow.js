import { memo } from 'react';
import { SwitchTransition } from 'react-transition-group';
import { Fade, TableCell, TableRow, Box, Avatar } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { numberFormat } from './other';
import bit from './assets/1.png';

const RenderPercentage = ({ num }) => {
   return num > 0 ? (
      <Box
         display="flex"
         justifyContent="flex-end"
         alignItems="center"
         color={'success.main'}
      >
         <ArrowDropUpIcon color={'success'} />
         <span>{num}%</span>
      </Box>
   ) : (
      <Box
         display={'flex'}
         justifyContent="flex-end"
         alignItems="center"
         color={'error.main'}
      >
         <ArrowDropDownIcon />
         <span>{num.replace('-', '')}</span>
      </Box>
   );
};
const BodyRow = memo(({ row }) => {
   // const [fade, setFade] = useState(true);
   const { name, quote } = row;
   const USD = quote.USD;
   const price = numberFormat(USD.price);
   const percent_24 = USD.percent_change_24h.toFixed(2);
   const percent_7d = USD.percent_change_7d.toFixed(2);
   const circulating_supply = numberFormat(row.circulating_supply, 'decimal');

   return (
      <TableRow sx={{ '& td': { width: 20 } }}>
         <TableCell
            // padding="none"
            sx={theme => ({
               [theme.breakpoints.down('md')]: {
                  position: 'sticky',
                  left: 0,
                  zIndex: 10,
                  backgroundColor: '#121212',
               },
            })}
         >
            {row.cmc_rank}
         </TableCell>
         <TableCell
            padding="none"
            sx={theme => ({
               [theme.breakpoints.down('md')]: {
                  position: 'sticky',
                  left: 48,
                  zIndex: 10,
                  backgroundColor: '#121212',
               },
            })}
         >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <Avatar
                  src={bit}
                  sx={{
                     width: 25,
                     height: 25,
                     mr: 1,
                  }}
               />
               {name}&nbsp;{row.symbol}
            </Box>
         </TableCell>
         <SwitchTransition>
            <Fade key={price} unmountOnExit>
               <TableCell align="right">{price}</TableCell>
            </Fade>
         </SwitchTransition>
         <SwitchTransition>
            <Fade key={percent_24}>
               <TableCell align="right">
                  <RenderPercentage num={percent_24} />
               </TableCell>
            </Fade>
         </SwitchTransition>
         <SwitchTransition>
            <Fade key={percent_7d}>
               <TableCell align="right">
                  <RenderPercentage num={percent_7d} />
               </TableCell>
            </Fade>
         </SwitchTransition>
         <TableCell align="right">{numberFormat(USD.market_cap)}</TableCell>

         <TableCell align="right">{numberFormat(USD.volume_24h)}</TableCell>
         <TableCell align="right">
            {circulating_supply}&nbsp;{row.symbol}
         </TableCell>
      </TableRow>
   );
});

export default BodyRow;

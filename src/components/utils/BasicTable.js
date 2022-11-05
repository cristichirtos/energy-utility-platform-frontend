import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AllDevicesForCurrentUser } from '../../api/services/devices'

const rows = AllDevicesForCurrentUser().content;

export default function BasicTable() {
  console.log(rows);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Device description</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Maximum hourly consumption</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.description}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.maximum_hourly_consumption}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize:16
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, location, service, price, count) {
  return { name, location, service, price, count };
}

const rows = [
  createData('바다회사랑', '서울특별시 마포구 동교로27길 60', "친절", "O", 10),
  createData('어사랑횟집', "서울특별시 광진구 동일로 164", "불친절", "X", 50),
  createData('최우영수산', "서울특별시 영등포구 영등포로 161", "친절", "O", 100),
  createData('은성횟집', "서울특별시 종로구 창경궁로 88", "친절", "O", 100),
  createData('진동횟집', "서울특별시 중구 세종대로14길 18", "친절", "O", 10),
];

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">상호명 </StyledTableCell>
            <StyledTableCell align="center">위치</StyledTableCell>
            <StyledTableCell align="center">친절도</StyledTableCell>
            <StyledTableCell align="center">실제 가격과 비교</StyledTableCell>
            <StyledTableCell align="center">한 달간 리뷰 개수&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row"  align="center">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.location}</StyledTableCell>
              <StyledTableCell align="center">{row.service}</StyledTableCell>
              <StyledTableCell align="center">{row.price}</StyledTableCell>
              <StyledTableCell align="center">{row.count}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
import React, { Component } from 'react';
import Review from './components/Review';
import './App.css';
import { Table, TableBody,TableHead,TableRow,TableCell, Paper } from '@mui/material';
import customers from './components/customers';
import reviews from './components/reviews';
import withStyles from '@mui/material';
//import datas from './components/datas.json'

// App bar
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const styles = theme => ({
  root: {
    width:'100%',
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  table:{
    minWidth: 1080
  }
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: reviews,
      completed: 0,
      searchKeyword:''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    })
  }

  componentDidMound(){
    this.callApi()
      .then(res => this.setState())
  }

  callApi = async() => {
    const response = await fetch('')
    const body = await response.json();
    return body;
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }


  render(){
    const filteredComponents = (data) => {
      data = data.filter((c)=> {
        return c.name.indexOf(this.state.searchKeyword) > -1 || c.menu.indexOf(this.state.searchKeyword) > -1 || c.location.indexOf(this.state.searchKeyword) > -1  ;
      });

      return data.map((c)=> {
        return( 
        <Review 
          key={c.id} // map()함수는 key값이 꼭 필요.
          //id={c.id}                 
          name={c.name} 
          location={c.location}
          menu={c.menu}
          count={c.count}
          score={c.score}              
        />
        );
      });
    }

    const { classes } = this.props;
    const cellList =["번호", "식당명", "위치", "주요 메뉴", "친절도"];
    return(
      <div>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            외식을 부탁해
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="식당명을 검색해보세요."
              inputProps={{ 'aria-label': 'search' }}
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
        <Paper marginLeft= {40} marginRight={40}>
          <Table >
            <TableHead >
              <TableRow>                
                <TableCell >식당명</TableCell>
                <TableCell>위치</TableCell>
                <TableCell>주요 메뉴</TableCell>
                <TableCell>한 달간 리뷰 개수</TableCell>
                <TableCell>친절도</TableCell>
              </TableRow>
            </TableHead> 

            <TableBody> 
            {filteredComponents(this.state.reviews)}  
            </TableBody>
          </Table>        
        </Paper>
      </div>

    );
  }
}

export default (App);

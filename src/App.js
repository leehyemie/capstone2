import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import SearchContainer from './Container/SearchContainer';
import MaterialTable from './MaterialTable'
import Review from './Container/Review';
import ReviewTable from './Container/reviewTable';

function App(){
    return (
    <div>
        <div>
            <SearchContainer />   
                         
        </div>
        <div className="App">
            <MaterialTable />
        </div>
    </div>
    );
}

export default App;
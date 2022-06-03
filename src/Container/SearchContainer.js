import React from 'react';
import { Input } from 'antd';
import Check from './Category';
const { Search } = Input;


const SearchContainer = () => {
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem'}}>
            <Search
                placeholder="식당을 검색해 보세요."
                allowClear
                //enterButton="Search"
                size="large"
                //onSearch={(value) => console.log(value)}
                onSearch={(value) => {
                    //this.searchSpace(value)
                    console.log(value);
                }}
                //onClick={clickMe}
                style={{ width: 650}}
            />
            <Check />  
            
        </div>
      
    );
};

export default SearchContainer;
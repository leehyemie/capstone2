import React from 'react';
import { Input } from 'antd';
const { Search } = Input;

// function handleClick(e) {
//     window.location.href = "/result"
// }

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
                    window.location.href = "/result";
                    console.log(value);
                }}
                //onClick={clickMe}
                style={{ width: 650}}
            />  
        </div>
        
    );
};

export default SearchContainer;
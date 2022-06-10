import React from "react";
import { TableCell, TableRow } from "@mui/material";


class Review extends React.Component {
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render(){
        return(
            <TableRow>
                             
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.location}</TableCell>
                <TableCell>{this.props.menu}</TableCell>
                <TableCell >{this.props.count}</TableCell>
                <TableCell>{this.props.score}</TableCell>
            </TableRow>
        )        
    }
}

export default Review;
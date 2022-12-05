import { Table } from "antd";
import React from 'react';
import  './GridView';

const GridView = (props) => {
    return (
        <div className="custom-table-container">
            <Table {...props} />
        </div>
    );
}

export default GridView;

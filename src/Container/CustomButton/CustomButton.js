import { Button } from 'antd';
import React from 'react';
import './CustomButton.less';

const CustomButton = (props) => {
    return (
        <div className="custom-button-container">
            <Button {...props}>{props?.children}</Button>
        </div>
    );
}

export default CustomButton;

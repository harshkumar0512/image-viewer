import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common/common.css';
import 'typeface-roboto';
import Controller from './screens/Controller';
import Login from "./screens/login/Login";

ReactDOM.render(<Login />,
/*    <span>
        Image Viewer
    </span>, */
    document.getElementById('root')
);

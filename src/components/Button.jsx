import React from 'react';
import './Button.css';

export default props => 
    <button 
        className={`
            ${props.two ? 'two' : ''} 
            ${props.three ? 'three' : ''}
            ${props.operation ? 'operation' : ''}
        `}
        onClick={e => props.click(props.content)}
    >
        {props.content}
    </button>
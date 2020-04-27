import React from 'react';
const Button = (props) => {
    const style = {
        backgroundColor: 'transparent',
        border: 0,
        color: 'white',
        margin : 3,
    };
    return <input style={style} type="button" value={props.text} onClick={props.click} />;
};

export default Button

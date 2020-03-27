import React from 'react'
export const BottomPanel = (props) => {
    return <div>
        {props.children}
        <style jsx>
            {`
                div{
                    padding : 10px;
                    height : 30px;
                    margin-bottom : 0px;
                    margin-top : auto;
                    background-color : trasparent;
                    border-bottom-left-radius : 5px;
                    border-bottom-right-radius : 5px;

                    display : flex;
                    align-items : center;
                    flex-direction : row;
                }
            `}
        </style>
    </div>
}

export const RoundButton = (props) => {
    const style = {
        backgroundColor: '#9A7D0A',
        borderWidth: 0,
        borderColor : 'trasparent',
        borderRadius : 8,
        padding : 6,
        marginLeft : 5,
        color : 'white',
        fontSize : 12,
    };
    return <input type="button" style={style} value={props.text}>

    </input>
}

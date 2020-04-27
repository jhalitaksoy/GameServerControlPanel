import React from 'react';
const Player = (props) => {
    return <li>
        <span>{props.name}</span>

        <style jsx>
            {`
            li{
                    margin : 0px;
                    height : 30px;
                    display : flex;
                    align-items : center;
                    list-style-type: none;
                    padding: 0px;
                    padding-left : 5px;
                    cursor : pointer;
                    border-radius : 3px;
                }
                li:hover{
                    background-color : #FF8F00;
                }

            `}
        </style>
    </li>;
};

export default Player

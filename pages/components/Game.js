import React from 'react';
export const Game = (props) => {
    return <li>
        <span className="name">
            <strong>{props.name}</strong>
        </span>
        <span>{props.player1}</span>
        <span> and </span>
        <span>{props.player2}</span>

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

            .name{
                margin-right : 10px;
                font-size : 14px;
            }

            span {
                margin-right : 5px;
                font-size : 13px;
            }

        `}
        </style>
    </li>;
};

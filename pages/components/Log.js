import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
const Log = (props) => {
    let levelColor = "blue";
    let icon = faInfoCircle;
    if (props.level == "info") {
        levelColor = "blue";
        icon = faInfoCircle;
    }
    else if (props.level == "warn") {
        levelColor = "#FBC02D";
        icon = faExclamationCircle;
    }
    else if (props.level == "err") {
        levelColor = "#E65100";
        icon = faTimesCircle;
    }
    const levelStyle = {
        marginLeft: 5,
        fontWeight: "bold",
        color: levelColor,
        minWidth: 40,
    };
    return <li>
        <FontAwesomeIcon icon={icon} color={levelColor} />
        <span className="time">{props.time}</span>
        <span className="message">{props.message}</span>
        <style jsx>
            {`
                li{
                    margin : 3px 0px;
                    display : flex;
                    align-items : center;
                    list-style-type: none;
                    padding: 1px;
                    cursor : pointer;
                    border-radius : 3px;
                    padding-left : 5px;
                }
                li:hover{
                    background-color : #FF8F00;
                }

                .time{
                    margin-left : 5px;
                    color : #004D40;
                    font-size : 15px;
                }

                .message{
                    margin-left : 5px;
                    font-weight : bold;
                    color : #4E342E;
                }
            `}
        </style>
    </li>;
};

export default Log
import React from 'react';
import { Button } from "./Button";
export const Footer = (props) => {
    return <footer>
        <ToolBar>
            <Button text="Reset Server" click={props.onReset}/>
        </ToolBar>
        <style jsx>
            {`
                footer{
                    height : 30px;
                    width : 100%;
                    display : flex;

                    border-top : 0px solid lightblue;

                    background-color : brown;
                    color : white;

                    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.7);
                }

                h4{
                    margin : auto;
                }
            `}
        </style>
    </footer>;
};


const StatusPanel = (props) => { 
    return <div>
        {props.text}
        <style jsx>
            {`
                div{

                }
            `}
        </style>
    </div>
}

const ToolBar = (props) => {
    return <div>
        {props.children}
        <style jsx>
            {`
            div{
                display : flex;
                flex-direction: row;
                align-items : center;
                margin-left: auto;
                margin-right : 5px;
            }
            `}
        </style>
    </div>;
};

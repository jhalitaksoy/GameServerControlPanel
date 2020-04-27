import React from 'react';
export default function AppBar(props) {
    return <header>
        <h3>{props.title}</h3>
        <style jsx>{`
            header{
                display : flex;
                flex : 0 1 auto;
                height : 50px;
                border-bottom : 0px solid lightblue;
                background-color : brown;
                color : white;
                z-index : 3;

                box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.7);
            }
            h3{
                margin : auto;
                margin-left : 20px;
            }
        `}</style>
    </header>;
}


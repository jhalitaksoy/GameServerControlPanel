import React from 'react';
export function AppContent(props) {
    return <div>
        {props.children}
        <style jsx>
            {`
                div{
                    display : flex;
                    flex-direction : row;
                    flex : 1 1 auto;
                    background-color : #FBE9E7;
                }
            `}
        </style>
    </div>;
}

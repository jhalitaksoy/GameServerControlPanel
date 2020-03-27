const List = (props) => {
    return <ul>
        {props.children}
        <style jsx>
            {`
               
                ul{
                    overflow-y: scroll;
                    overflow: auto;
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0; 
                    padding : 0px;
                    margin : 0px;
                } 
            `}
        </style>
    </ul>
}

export default List

const TitleBar = (props) => {
    return <div>
        <h4>
            {props.title}
        </h4>

        <style jsx>
            {`
                div{
                    border-top-left-radius : 5px;
                    border-top-right-radius : 5px;
                    width : 100%;
                    height : auto;
                    border-bottom : 1px solid lightblue;
                    background-color : green;
                    color : white;
                }

                h4{
                    margin : auto;
                    padding : 5px;
                }
            `}
        </style>
    </div>
}

export default TitleBar
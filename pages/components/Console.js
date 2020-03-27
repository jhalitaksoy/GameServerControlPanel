import TitleBar from './TitleBar'
import Container from './Container'

function Console(props) {
    return <div>
        {props.children}
        <style jsx>
            {`
                div{
                    flex : 2;
                    height : auto;
                    margin : 15px 0px;
                    border : 0px solid lightblue;
                    border-radius : 5px;

                    background-color : whitesmoke;

                    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.2);
                }
            `}
        </style>
    </div>
}

export default Console
import TitleBar from './TitleBar'
import Container from './Container'

const Aside = (props)=> {
    return <div>
        {props.children}
        <style jsx>
            {`
                div{
                    flex : 1;
                    height : auto;

                    margin : 15px;
                    border : 0px solid lightblue;
                    border-radius : 5px;

                    background-color : whitesmoke;

                    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.2);
                }
                @media screen and (max-width : 500px){
                    div{
                        margin : 5px;
                    }
                }
            `}
        </style>
    </div>
}

export default Aside
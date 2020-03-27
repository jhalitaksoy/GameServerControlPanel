const Container = (props) => {
    
    let padding = props.padding
    if(padding == undefined)padding = 10

    const style = {
        margin : padding,
        position : 'relative',
    }

    return <div style={style}>
        {props.children}
    </div>
}

export default Container
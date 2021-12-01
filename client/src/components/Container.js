import React from "react";
import Class from "./Class.js"

class Container extends React.Component {
    state = {
        classID: "null"
    }

    setUpdate = (updatedClassID) => {
        this.setState({
            classID: updatedClassID
        });
    }
    
    render() {
        return (
            <Class classID={this.state.classID} setUpdate={this.setUpdate} />
        )
    }
}
export default Container
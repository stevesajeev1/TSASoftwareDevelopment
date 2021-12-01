import React from "react";
import Class from "./Class.js"

class Container extends React.Component {
    state = {
        classID: "null",
        finalID: true
    }

    setUpdate = (updatedClassID) => {
        this.setState({
            classID: updatedClassID
        });
    }

    setFinal = (state) => {
        this.setState({
            finalID: state
        })
    }
    
    render() {
        return (
            <Class classID={this.state.classID} setUpdate={this.setUpdate} final={this.state.finalID} setFinal={this.setFinal} />
        )
    }
}
export default Container
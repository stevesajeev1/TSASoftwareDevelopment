import React from "react";
import Class from "./Class.js";
import Content from "./Content.js";

class Container extends React.Component {
    state = {
        classID: "null",
        finalID: true,
        name: "",
        students: [],
        weeks: []
    }

    setUpdate = (updatedClassID) => {
        this.setState({
            classID: updatedClassID
        });
    }

    setFinal = (final) => {
        this.setState({
            finalID: final
        })
    }

    setData = (name, students, weeks) => {
        this.setState({
            name: name,
            students: students,
            weeks: weeks
        })
    }
    
    render() {
        return (
            <div>
                <Class classID={this.state.classID} setUpdate={this.setUpdate} final={this.state.finalID} setFinal={this.setFinal} setData={this.setData} />
                <Content classID={this.state.classID} final={this.state.finalID} name={this.state.name} weeks={this.state.weeks}/>
            </div>
        )
    }
}
export default Container
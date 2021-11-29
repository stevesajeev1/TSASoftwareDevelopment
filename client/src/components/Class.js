import React from "react";
import "./Class.css";

class Class extends React.Component {
    state = {
        editing: false,
        temp: "null"
    }
    handleEditing = () => {
        this.setState({
            editing: true,
            temp: this.props.classID
        })
    }
    handleUpdatedDone = event => {
        if (event.key === "Enter") {
            this.setState({
                editing: false
            });
        }
    }
    render() {
        let viewMode = {}
        let editMode = {}

        if (this.state.editing) {
            viewMode.display = "none"
        } else {
            editMode.display = "none"
        }   
      return (
        <div>
            <div className="pb-6">
                <div className="absolute top-0 right-0 bg-gray-100 border-4 border-indigo-600 rounded-bl-lg">
                    <div className="grid justify-items-center text-bold mt-2 mx-2">
                        Class ID
                    </div>
                    <div onDoubleClick={this.handleEditing} style={viewMode} className="grid justify-items-center text my-0 mx-2">
                        {this.props.classID}
                    </div>
                    <input 
                        type="text" 
                        style={editMode} 
                        className="textInput" 
                        placeholder={this.state.temp} 
                        onChange={e => {
                            this.props.setUpdate(e.target.value);
                        }}
                        onKeyDown={this.handleUpdatedDone}
                    />
                    <div className="grid justify-items-center text-thin my-0 mx-2">
                        (double click to edit)
                    </div>
                </div>
            </div>
        </div>
      )
    }
  }
  export default Class
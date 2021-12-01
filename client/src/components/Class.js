import React from "react";
import "./Class.css";

class Class extends React.Component {

    state = {
        editing: false,
        temp: "null",
        students: [],
        error: false
    }

    handleEditing = () => {
        this.setState({
            editing: true,
            temp: this.props.classID
        })
    }

    callAPIClassID() {
        var data = {
            "classID": this.props.classID
        }
        var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
        return fetch("http://localhost:9000/testAPI/classID?" + queryString, {})
            .then(res => {return res})
            .catch(err => err);
    }

    showError() {
        this.setState({
            error: true
        });
    }

    handleUpdatedDone = async event => {
        if (event.key === "Enter") {
            const studentResponse = await this.callAPIClassID();
            if (studentResponse.status == 404) {
                this.showError();
            } else {
                const studentsPromise = await studentResponse.json();
                this.setState({
                    students: studentsPromise.students,
                    editing: false
                })
            }
        }
    }

    render() {
        let viewMode = {}
        let editMode = {}
        let error = {}
        let students = {}

        if (this.state.editing) {
            viewMode.display = "none";
        } else {
            editMode.display = "none";
        }

        if (this.state.error) {
            var obj = this;
            var hide = setTimeout(function() {
                obj.setState({
                    error: false
                })
                clearInterval(hide);
            }, 2000);
        } else {
            error.display = "none";
        }

        if (!this.state.students.length) {
            students.display = "none";
        }

      return (
        <div>
            <div className="pb-6">
                <div className="absolute top-0 right-0 bg-gray-100 border-4 border-indigo-600 rounded-bl-lg container">
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
                    <div style={error} className="grid justify-items-center text-thin my-0 mx-2 error">
                        {this.props.classID} is not a valid class ID!
                    </div>
                    <div className="grid justify-items-center text-thin mb-2 mx-2">
                        (double click to edit)
                    </div>
                    <hr style={{border: "solid 3px rgb(209, 213, 219)"}}></hr>
                    <div style={students} className="grid justify-items-center text-med">
                        Students
                    </div>
                    <ul style={students} className="studentsList divide-y-4">
                        {this.state.students.map(student => (
                            <li className="text-thin px-4">{student}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      )
    }
  }
  export default Class
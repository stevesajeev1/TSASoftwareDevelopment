import React from "react";
import "./Class.css";

class Class extends React.Component {

    state = {
        editing: false,
        temp: "null",
        students: [],
        iDError: false,
        createIDError: false,
        createNameError: false,
        newID: null,
        newName: "",
        successfulCreation: false
    }

    handleEditing = () => {
        this.setState({
            editing: true,
            temp: this.props.classID
        })
        this.props.setFinal(false);
    }

    callAPIClassID(classID) {
        var data = {
            "classID": classID
        }
        var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
        return fetch("http://localhost:9000/testAPI?" + queryString, {})
            .catch(err => err);
    }

    callAPICreate(classID, className) {
        var data = {
            "classID": classID,
            "className": className
        }
        var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
        return fetch("http://localhost:9000/testAPI/create?" + queryString, {})
            .catch(err => err);
    }

    showError(id) {
        if (id) {
            this.setState({
                idError: true
            });
        } else {
            this.setState({
                createIDError: true
            });
        }
    }

    handleUpdatedDone = async event => {
        if (event.key === "Enter") {
            const studentResponse = await this.callAPIClassID(this.props.classID);
            if (studentResponse.status == 404) {
                this.showError(true);
            } else {
                const studentsPromise = await studentResponse.json();
                this.props.setFinal(true);
                this.props.setData(studentsPromise.name, studentsPromise.students, studentsPromise.weeks);
                this.setState({
                    students: studentsPromise.students,
                    editing: false
                })
            }
        }
    }

    handleCreate = async event => {
        if (event.key === "Enter") {
            const studentResponse = await this.callAPIClassID(this.state.newID);
            if (studentResponse.status != 404) {
                this.showError(false);
                return;
            } else if (this.state.newName.length == 0) {
                this.setState({
                    createNameError: true
                });
                return;
            } else {
                await this.callAPICreate(this.state.newID, this.state.newName);
                this.setState({
                    successfulCreation: true
                })
            }
        }
    }

    render() {
        let viewMode = {}
        let editMode = {}
        let idError = {}
        let students = {}
        let createIDError = {}
        let createNameError = {}
        let successfulCreation = {}

        if (this.state.editing) {
            viewMode.display = "none";
        } else {
            editMode.display = "none";
        }

        if (this.state.idError) {
            var obj = this;
            var hide = setTimeout(function() {
                obj.setState({
                    idError: false
                })
                clearInterval(hide);
            }, 2000);
        } else {
            idError.display = "none";
        }

        if (this.state.createIDError) {
            var obj = this;
            var hide = setTimeout(function() {
                obj.setState({
                    createIDError: false
                })
                clearInterval(hide);
            }, 2000);
        } else {
            createIDError.display = "none";
        }

        if (this.state.createNameError) {
            var obj = this;
            var hide = setTimeout(function() {
                obj.setState({
                    createIDError: false
                })
                clearInterval(hide);
            }, 2000);
        } else {
            createNameError.display = "none";
        }

        if (this.state.successfulCreation) {
            var obj = this;
            var hide = setTimeout(function() {
                obj.setState({
                    successfulCreation: false
                })
                clearInterval(hide);
            }, 4000);
        } else {
            successfulCreation.display = "none";
        }

        if (this.props.classID == "null" || !this.props.final) {
            students.visibility = "hidden";
        }

      return (
        <div>
            <div className="pb-6">
                <div className="absolute top-0 right-0 bg-gray-100 border-4 border-indigo-600 rounded-bl-lg classDiv">
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
                        onInput={e => {
                            if (e.target.value.length > 5) {
                                e.target.value = e.target.value.slice(0, 5);
                            }
                        }}
                        onChange={e => {
                            this.props.setUpdate(e.target.value);
                        }}
                        onKeyDown={this.handleUpdatedDone}
                    />
                    <div style={idError} className="grid justify-items-center text-thin my-0 mx-2 error">
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
                    <hr style={{border: "solid 3px rgb(209, 213, 219)"}}></hr>
                    <div className="grid justify-items-center create my-2 mx-2">
                        Create Class ID
                    </div>
                    <div className="pl-4 pr-2 pb-2">
                        <div className="text-med">
                            ID:
                        </div>
                        <input 
                            type="text" 
                            className="textInput" 
                            placeholder="Enter Class ID:" 
                            onInput={e => {
                                if (e.target.value.length > 5) {
                                    e.target.value = e.target.value.slice(0, 5);
                                }
                            }}
                            onChange={e => {
                                this.setState({
                                    newID: e.target.value
                                })
                            }}
                            onKeyDown={this.handleCreate}
                        />
                        <div style={createIDError} className="grid justify-items-center text-thin my-0 mx-2 error">
                            {this.state.newID} is an invalid/already in use class ID!
                        </div>
                    </div>
                    <div className="pl-4 pr-2">
                        <div className="text-med">
                            Class Name:
                        </div>
                        <input 
                            type="text" 
                            className="textInput" 
                            placeholder="Enter Class Name:" 
                            onInput={e => {
                                if (e.target.value.length > 20) {
                                    e.target.value = e.target.value.slice(0, 20);
                                }
                            }}
                            onChange={e => {
                                this.setState({
                                    newName: e.target.value
                                })
                            }}
                            onKeyDown={this.handleCreate}
                        />
                        <div style={createNameError} className="grid justify-items-center text-thin my-0 mx-2 error">
                            Provide a class name!
                        </div>
                    </div>
                    <div style={successfulCreation} className="grid justify-items-center text-success text-center my-2 mx-2">
                        New class created with ID: {this.state.newID} titled: {this.state.newName}
                    </div>
                </div>
            </div>
        </div>
      )
    }
  }
  export default Class
import React from "react";
import "./Content.css";
import WeeksDropdown from "./WeeksDropdown.js";

class Content extends React.Component {    
    render() {
        let display = {};
        let header = "Enter Class ID";
        let teacher;
        if (this.props.classID != "null" && this.props.final) {
            header = this.props.name;
            teacher = this.props.teacher;
        } else {
            display = {
                display: "none"
            }
        }

        return (
            <div className="pb-6">
                <div className="absolute top-0 left-0 bg-gray-100 border-4 border-indigo-600 content">
                    <div className="header text-center pt-4">
                        {header}
                    </div>
                    <div style={display} className="teacher text-center pb-2">
                        {teacher}
                    </div>
                    <hr style={{border: "solid 4px rgb(209, 213, 219)"}}></hr>
                    <div style={display} className="weeks text-center py-2">
                        Weeks
                        <div className="pt-4 px-12">
                            <div className="divide-y-4 divide-gray-400 divide-opacity-50 border-4 border-indigo-600 border-opacity-50 rounded dropdownContainer">
                                {this.props.weeks.map((week, i) =>
                                    <WeeksDropdown key={i} week={week}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Content
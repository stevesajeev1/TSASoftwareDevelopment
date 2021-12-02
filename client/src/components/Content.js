import React from "react";
import "./Content.css";

class Content extends React.Component {    
    render() {
        let display = {};
        let header = "Enter Class ID";
        if (this.props.classID != "null" && this.props.final) {
            header = this.props.name;
        } else {
            display = {
                display: "none"
            }
        }

        return (
            <div className="pb-6">
                <div className="absolute top-0 left-0 bg-gray-100 border-4 border-indigo-600 rounded-bl-lg content">
                    <div className="header text-center py-6">
                        {header}
                    </div>
                    <hr style={{border: "solid 4px rgb(209, 213, 219)"}}></hr>
                    <div style={display} className="weeks text-center py-4">
                        Weeks
                    </div>
                </div>
            </div>
        )
    }
}
export default Content
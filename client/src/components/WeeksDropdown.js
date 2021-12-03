import React from "react";
import "./WeeksDropdown.css";
import StudentsDropdown from "./StudentsDropdown.js";
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

class WeeksDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false
        }  

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            selected: !this.state.selected
        });
    }

    render() {
        let students = [];
        for (var prop in this.props.week.students) {
            if (Object.prototype.hasOwnProperty.call(this.props.week.students, prop)) {
                students.push({name: prop, data: this.props.week.students[prop]});
            }
        }
        return (
            <div className="item p-4 bg-gray-200 bg-opacity-75">
                {this.state.selected ?
                    <IoIosArrowDropup className="pr-4" size={40} onClick={this.toggle} /> :
                    <IoIosArrowDropdown className="pr-4" size={40} onClick={this.toggle} />
                }
                <p className="p-0">{this.props.week.week}</p>
                {this.state.selected &&
                    <div className="break pb-4"></div>
                }
                {this.state.selected &&
                    <div className="students pl-2 pb-2 text-left bg-gray-300 bg-opacity-50">
                        Students
                        <div className="divide-y-2 divide-gray-400 divide-opacity-50 border-2 border-indigo-600 border-opacity-50 pt-2 rounded studentsContainer">
                            {students.map((student, i) =>
                                <StudentsDropdown key={i} student={student} />
                            )}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default WeeksDropdown
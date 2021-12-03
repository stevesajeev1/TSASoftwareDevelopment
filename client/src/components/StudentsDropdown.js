import React from "react";
import "./StudentsDropdown.css";
import Data from "./Data.js";
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

class StudentsDropdown extends React.Component {
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
        return (
            <div className="student-item px-4 text-center">
                {this.state.selected ?
                    <IoIosArrowDropup className="pr-4" size={35} onClick={this.toggle} /> :
                    <IoIosArrowDropdown className="pr-4" size={35} onClick={this.toggle} />
                }
                <p>{this.props.student.name}</p>
                {this.state.selected &&
                    <div className="student-break pb-2"></div>
                }
                {this.state.selected && 
                    <Data data={this.props.student.data} />
                }
            </div>
        )
    }
}
export default StudentsDropdown
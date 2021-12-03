import React from "react";
import { Chart } from "react-google-charts";

class Data extends React.Component {    
    render() {
        let data = [['App', 'Minutes Distracted']];
        let total = 0;
        for (var prop in this.props.data) {
            if (Object.prototype.hasOwnProperty.call(this.props.data, prop)) {
                data.push([prop, this.props.data[prop]]);
                total += this.props.data[prop];
            }
        }
        return (
            <Chart
                className="pb-4"
                width={'920px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    titleTextStyle: {
                        fontSize: 20
                    },
                    title: `Total Time Distracted: ${total} minutes`,
                    fontName: 'Quicksand',
                    backgroundColor: '#c8cdd5'
                }}
            />
        )
    }
}
export default Data
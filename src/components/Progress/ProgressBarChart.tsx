import React, { Component } from "react";
import {
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	BarChart,
	Tooltip,
	Legend,
} from "recharts";

class CustomBarChart extends BarChart {
	constructor(props: any) {
		super(props);
		// Your custom state or other initialization logic
	}

	render() {
		const { data } = this.props;

		return (
			<BarChart data={data} {...this.props}>
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="uv" fill="#8884d8" />
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			</BarChart>
		);
	}
}

export default CustomBarChart;

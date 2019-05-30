import React, { Component } from 'react';
import moment from 'moment';

function mapNumber(number, in_min, in_max, out_min, out_max) {
	return (
		((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
	);
}

class Countdown extends Component {
	state = {
		years: undefined,
		months: undefined,
		days: undefined,
		hours: undefined,
		minutes: undefined,
		seconds: undefined
	};

	componentDidMount() {
		this.interval = setInterval(() => {
			const { timeTillDate, timeFormat } = this.props;
			const then = moment('06 10 2019, 00:00 am', 'MM DD YYYY, h:mm a');
			const now = moment();
			const countdown = then.subtract(now).days();
			console.log(then);
			console.log(now);
			console.log(countdown);
			const years = countdown.format('Y');
			console.log(years);
			const months = countdown.format('MM');
			const days = countdown.format('D');
			const hours = countdown.format('h');
			const minutes = countdown.format('mm');
			const seconds = countdown.format('ss');
			this.setState({
				years, months, days, hours, minutes, seconds
			});
		}, 1000)
	}

	componentWillMount() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	render() {
		const { years, months, days, hours, minutes, seconds } = this.state;

		// Mapping the date values to radius value
		const yearsRadius = mapNumber(years, 100, 0, 0, 360);
		const monthsRadius = mapNumber(months, 12, 0, 0, 360);
		const daysRadius = mapNumber(days, 30, 0, 0, 360);
		const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
		const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
		const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

		if (!seconds) {
			return null;
		}

		return (
			<div>
				<h1>Countdown</h1>
				<div className="countdown-wrapper">
				{
						years && (
							<div className="countdown-item">
								<SVGCircle radius={yearsRadius} />
								{years}
								<span>years</span>
							</div>
						)
					}
					{
						months && (
							<div className="countdown-item">
								<SVGCircle radius={monthsRadius} />
								{months}
								<span>months</span>
							</div>
						)
					}
					{
						days && (
							<div className="countdown-item">
								<SVGCircle radius={daysRadius} />
								{days}
								<span>days</span>
							</div>
						)
					}
					{
						hours && (
							<div className="countdown-item">
								<SVGCircle radius={hoursRadius} />
								{hours}
								<span>hours</span>
							</div>
						)
					}
					{
						minutes && (
							<div className="countdown-item">
								<SVGCircle radius={minutesRadius} />
								{minutes}
								<span>minutes</span>
							</div>
						)
					}
					{
						seconds && (
							<div className="countdown-item">
								<SVGCircle radius={secondsRadius} />
								{seconds}
								<span>seconds</span>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}

export default Countdown;

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

	return {
			x: centerX + radius * Math.cos(angleInRadians),
			y: centerY + radius * Math.sin(angleInRadians)
	};
}

function describeArc(x, y, radius, startAngle, endAngle) {
	var start = polarToCartesian(x, y, radius, endAngle);
	var end = polarToCartesian(x, y, radius, startAngle);
	var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
	var d = [
			'M',
			start.x,
			start.y,
			'A',
			radius,
			radius,
			0,
			largeArcFlag,
			0,
			end.x,
			end.y
	].join(' ');

	return d;
}

const SVGCircle = ({ radius}) => (
	<svg className= "countdown-svg">
			<path
					fill= "none"
					stroke= "#333"
					stroke-width= "4"
					d= { describeArc( 50, 50, 48, 0, radius )} />
	</svg>
)
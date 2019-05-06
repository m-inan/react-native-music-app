export function timeFormat(value) {
    if ( value === null ) {
			return '--:--'
    }

    value = value.toFixed();

		const second = value % 60;

    return (
			Math.floor(value / 60) + ':' + (
				second ? (second < 10 ? '0' : '') + ( String(second) ) : '00'
		)
	)
}

export function polarToCartesian(A, { cy, cx, r }) {
	A = (A - 180) * Math.PI / 180

	return {
		x: cx + (r * Math.cos(A)),
		y: cy + (r * Math.sin(A))
	}
}

export function cartesianToPolar (x, y, { cy, cx }) {
	if ( y > cy ) {
		y = cy
	}

	return Math.round(
		(
			Math.atan((y - cy) / (x - cx))
		) / (
			(Math.PI / 180)
		) + (
			x >= cx ? 180 : 0
		)
	)
}
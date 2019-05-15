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

const degrees = 180

export function polarToCartesian(A, { cy, cx, r }) {
	A = (A - degrees) / (degrees / Math.PI)

	return {
		x: cx + (r * Math.cos(A)),
		y: cy + (r * -Math.sin(A))
	}
}

export function cartesianToPolar (x, y, { cy, cx }) {
	if ( y < cy ) {
		y = cy
	}

	let angle = -Math.atan2(y - cy, x - cx)
	
	angle *= degrees / Math.PI
	angle += degrees

	console.log(Math.round(angle) )
	return Math.round(angle) 
}
const degrees = 180

export function polarToCartesian(A, { cy, cx, r }) {
	A = (A - degrees) / (degrees / Math.PI)

	return {
		x: cx + r * Math.cos(A),
		y: cy + r * -Math.sin(A)
	}
}

export function cartesianToPolar(x, y, { cy, cx }) {
	if (y < cy) {
		y = cy
	}

	let angle = -Math.atan2(y - cy, x - cx)

	angle *= degrees / Math.PI
	angle += degrees

	return Math.round(angle)
}

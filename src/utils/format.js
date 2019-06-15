export function timeFormat(value) {
	if (value === null) {
		return '--:--'
	}

	value = value.toFixed()

	const second = value % 60

	return (
		Math.floor(value / 60) +
		':' +
		(second ? (second < 10 ? '0' : '') + String(second) : '00')
	)
}

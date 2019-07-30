export function timeFormat(value) {
	if (value === null) {
		return '--:--'
	}

	value = value.toFixed()

	const second =
		(Math.floor(value % 60) < 10 ? '0' : '') + Math.floor(value % 60)

	let minutes = Math.floor(value / 60)

	let hours = '00'

	if (minutes < 10) {
		minutes = '0' + minutes
	}

	if (minutes >= 60) {
		hours = Math.floor(minutes / 60)
		minutes = minutes % 60

		if (minutes < 10) {
			minutes = '0' + minutes
		}
	}

	return `${hours !== '00' ? hours + ':' : ''}${minutes}:${second}`
}

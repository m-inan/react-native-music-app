import { Api } from 'constants'

export const request = async (route, params) => {
	const token = ''

	const options = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: token })
		},
		method: params ? 'post' : 'get',
		...(params && { body: JSON.stringify(params) })
	}

	return fetch(`${Api.SERVICE_URL}/${route}`, options)
		.then(resp => resp.json())
		.then(json => json)
		.catch(error => error)
}

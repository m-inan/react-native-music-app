import { getToken } from './token'
import { buildQueryString } from './URL'

export const YTD = async (route, param = {}) => {
	const accessToken = await getToken()

	const queryString = buildQueryString({
		part: 'snippet,contentDetails',
		mine: true,
		maxResults: 50,
		...param
	})

	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/${route}?${queryString}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	)

	return await response.json()
}

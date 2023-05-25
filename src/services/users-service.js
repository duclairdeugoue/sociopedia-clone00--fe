import { API_URL } from "utils/constants"

const UsersService = {
    getUser: async (userId, token) => {
        const res = await fetch(
            `${API_URL}/users/${userId}`,
            {
                method: 'GET',
                headers: { 'x-api-token': `Bearer ${token}` }
            }
        )
        return await res.json();
    }
}

export default UsersService;
import { API_URL } from "utils/constants"

const users = {
    getUser: async (userId, token) => {
        const res = await fetch(
            `${API_URL}/users/${userId}`,
            {
                method: 'GET',
                headers: { 'x-api-token': `Bearer ${token}` }
            }
        )
        return await res.json();
    },
    addRemoveFriend: async (userId, friendId, token) => {
        const res = await fetch(
            `${API_URL}/users/${userId}/${friendId}`,
            {
                method: 'PATCH',
                headers: {
                    'x-api-token': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }
        )
        return await res.json();
    }
}

export default users;
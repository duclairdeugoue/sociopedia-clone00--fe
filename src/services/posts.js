import { API_URL } from "utils/constants"

const posts = {
    createPost: async (payload, token) => {
        const res = await fetch(
            `${API_URL}/posts`,
            {
                method: 'POST',
                headers: { 'x-api-token': `Bearer ${token}` },
                body: payload
            }
        )
        return await res.json();
    },
    // getPosts: async (userId, token) => {
    //     const res = await fetch(`${API_URL}/posts`, {
    //         method: 'GET',
    //         headers: { 'x-api-token': `Bearer ${token}` }
    //     });

    // }
}

export default posts;
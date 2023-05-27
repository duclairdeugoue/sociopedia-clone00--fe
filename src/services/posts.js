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
    getPosts: async (token) => {
        const res = await fetch(`${API_URL}/posts`, {
            method: 'GET',
            headers: { 'x-api-token': `Bearer ${token}` }
        });
        return await res.json();
    },
    getUserPosts: async (userId, token) => {
        const res = await fetch(`${API_URL}/posts/${userId}/posts`, {
            method: 'GET',
            headers: { 'x-api-token': `Bearer ${token}` }
        });

        return await res.json();

    },
    patchLikePost: async (userId, postId, token) => {
        const res = await fetch(`${API_URL}/posts/${postId}/like`, {
            method: 'PATCH',
            headers: {
                'x-api-token': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: userId })
        });
        return await res.json();
    }
}

export default posts;
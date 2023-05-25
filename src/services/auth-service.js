import { API_URL } from 'utils/constants';

const AuthService = {
  login: async (payload) => {
    const loggedInResponse = await fetch(
      `${API_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );
    return await loggedInResponse.json();
  },
  register: async (payload) => {


    const saveUserResponse = await fetch(
      `${API_URL}/auth/register`,
      {
        method: "POST",
        body: payload,
      }
    );
    return await saveUserResponse.json();
  }
}

export default AuthService;
import axios from "axios";

const API_URL = "https://localhost:7059";

// TODO if login or password is undefined return error and not make the API call
const login = (login: string | undefined, password: string | undefined) => {
  const formData = {
    login,
    password,
  };

  return fetch(`${API_URL}/Api/Auth/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const recoverPassword = async (
  login: string,
  birthDate: string,
  email: string
) => {
  try {
    const response = await axios.post(`${API_URL}/Api/Auth/Password/Recover`, {
      Login: login,
      DateOfBirth: birthDate,
      Email: email,
    });

    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to recover password"
    );
  }
};

export default { login, recoverPassword };

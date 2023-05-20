import axios from "axios";

const API_URL = "https://localhost:7059";

const login = (login: string, password: string) => {
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
      // Handle the API response
      return response;
    })
    .catch((error) => {
      // Handle any error that occurred during the request
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

    return response; // You can handle the response data as needed
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to recover password"
    );
  }
};

export default { login, recoverPassword };

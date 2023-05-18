const login = (login: string, password: string) => {
    const formData = {
      login,
      password,
    };
  
    return fetch('https://localhost:7059/api/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  
  export default { login };
  
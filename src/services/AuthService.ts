const login = (username: string, password: string) => {
    const formData = {
      username,
      password,
    };
  
    return fetch('https://api.example.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response
        return data;
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        throw error;
      });
  };
  
  export default { login };
  
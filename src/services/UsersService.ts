import axios from "axios";
import IUserFilter from "../utils/interfaces/IUserFilter";

const getUserData = async (filter: IUserFilter) => {
    try {
      const response = await axios.get('https://localhost:7059/api/User', {
        params: filter
      });

      console.log(response.data);

      return response;
      // Process the response data here
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

export { getUserData }
const validatedURL = (api_param, id_param) => {
    const validatedId = (id_param) => {
      const idPattern = new RegExp(/^\d{2}\d+$/);
      if (idPattern.test(String(id_param))) {
        return String(id_param);
      } else {
        throw new Error("Invalid ID");
      }
    };
    return id_param === "" ? api_param : api_param + "/" + validatedId(id_param);
  };

 const sendRequest = async (api, id = "", options = {}) => {
    try {
      console.log(api)
      console.log(id)
      console.log(options);
      const resp = await fetch(validatedURL(api, id), options);
      console.log(resp);
      const data = await resp.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch data");
    }
  };

export default sendRequest;




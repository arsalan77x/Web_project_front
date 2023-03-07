import axios from "axios";
import handleFetchError from "./ErrorHandler";
export const query = async (options) => {
  var data
  await axios(options)
    .then(Response => {
      if (Response) {
        if (Response.status !== 200)
          handleFetchError(Response.data)
        else if (Response?.data) {
          if (!Response.data.data)
            Response.data.data = "success"
          data = Response.data.data
        }
      }
    })
    .catch(error => {
      if (error && error.response) {
        handleFetchError(error.response.data)
        data = error.response.data
      }
    })
  return data
}

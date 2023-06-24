import axios from "axios"

const service = axios.create({
  timeout: 10 * 1000,
})

service.interceptors.response.use(
  (response) => {
    return response.data
  }
)

export default service
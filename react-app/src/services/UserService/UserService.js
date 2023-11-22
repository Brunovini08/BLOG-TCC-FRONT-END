import axios from "axios";


const apiURL = "http://localhost:3000/api"

const authService = {
    async register(data) {
        const endpoint = `${apiURL}/user/register`
        return axios.post(endpoint, data)
    },

    async login(data) {
        const endpoint = `${apiURL}/user/login`
        return axios.post(endpoint, data)
    },

    async getAllUsers() {
        const endpoint = `${apiURL}/user/getallusers`
        return axios.get(endpoint)
    },

    async modUser(data) {
      const authUser = localStorage.getItem("@Auth:user")
      const endpoint = `${apiURL}/user/moduser/${JSON.parse(authUser).user?._id}`
      const authToken = localStorage.getItem("@Auth:token")
      return axios.put(endpoint, data, {
            headers: {
                'token': `Bearer ${authToken}`
            }
        })
    },


    async getUserById(id) {
        const endpoint = `${apiURL}/user/getpost/${id}`
        return axios.get(endpoint)
    },

    async forgetPassword(data, id, token) {
        const endpoint = `${apiURL}/user/resetpassword/${id}/${token}`
        return axios.put(endpoint, data)
    },

    async forgetPassEmail(data) {
        const endpoint = `${apiURL}/user/forget-password`
        return axios.post(endpoint, data)
    }

}

export default authService
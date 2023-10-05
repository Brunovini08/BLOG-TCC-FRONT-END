import axios from "axios";

const apiURL = "http://localhost:3000/api"

const authService = {
    async register(data) {
        console.log(data)
        const endpoint = `${apiURL}/user/register`
        return axios.post(endpoint, data)
    },

    async login(data) {
        const endpoint = `${apiURL}/user/login`
        return axios.post(endpoint, data)
    },

    setLoggedUser(data) {
        let parsedData = JSON.stringify(data)
        localStorage.setItem("user", parsedData)
    },

    getLoggedUser() {
        let data = localStorage.getItem("user")
        if (!data) return null
        try {
            let parsedData = JSON.parse(data)
            return parsedData
        }catch (error) {
            console.log(error)
            return error
        }
    }
}

export default authService
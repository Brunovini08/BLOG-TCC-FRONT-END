import axios from "axios";

const apiURL = "http://localhost:3000/api"

export const postService = {
    async getPosts() {
        const endpoint = `${apiURL}/blog/get`
        return axios.get(endpoint)
    },

    async createPost({data, id}) {
        const endpoint = `${apiURL}/blog/create/${id}`
        const authToken = localStorage.getItem("@Auth:token")

        return axios.post(endpoint, data,{
           headers: {
               'token': `Bearer ${authToken}`
           }
        })
    },

    async modPost({data, id}) {
        const endpoint = `${apiURL}/blog/put/${id}`
        return axios.put(endpoint, data, {
            headers: {
                'token': `Bearer ${localStorage.getItem("@Auth:token")}`
            }
        })
    },

    async getPostById(id) {
        const endpoint = `${apiURL}/blog/get/${id}`
        return axios.get(endpoint)
    },

    async deletePost(id) {
        const endpoint = `${apiURL}/blog/delete/${id}`
        return axios.delete(endpoint, {
            headers: {
                'token': `Bearer ${localStorage.getItem("@Auth:token")}`
            }
        })
    },

    async likePost(postId) {
        const endpoint = `${apiURL}/blog/like/${postId}`
        const authToken = localStorage.getItem("@Auth:token")
        console.log(authToken)
        return axios.put(endpoint, {}, {
            headers: {
                'token': `Bearer ${authToken}`
            }
        })
    },


    async getLikesByPost(postId) {
        const authToken = localStorage.getItem("@Auth:token")
        const endpoint = `${apiURL}/blog/getLikes/${postId}`
        return axios.get(endpoint, {
            headers: {
                'token': `Bearer ${authToken}`
            }
        })
    },

    async getBlogsUser(id) {
        const endpoint = `${apiURL}/blog/getBlogUser/${id}`
        const authToken = localStorage.getItem("@Auth:token")
        return axios.get(endpoint, {
            headers: {
                'token': `Bearer ${authToken}`
            }
        })
    },

    async getPostTitle(title) {
        const endpoint = `${apiURL}/blog/getBlogTitle/${title}`
        return axios.get(endpoint)
    },

    async postComment({text, id}) {
        const endpoint = `${apiURL}/blog/commentPost/${id}`
        return axios.put(endpoint, {text}, {
            headers: {
                'token': `Bearer ${localStorage.getItem("@Auth:token")}`
            }
        })
    },

    async getCommentsByPost(id) {
        const endpoint = `${apiURL}/blog/getComments/${id}`
        return axios.get(endpoint)
    }

}
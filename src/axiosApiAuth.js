    import axios from "axios";

    const adm = axios.create({
        baseURL : import.meta.env.VITE_API_URL
    })

    adm.interceptors.request.use(
        (getToken) => {
            const token = sessionStorage.getItem("token")

            if(token) {
                getToken.headers["authorization"] = `beaer ${token}`
            }
            return getToken
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    export default adm

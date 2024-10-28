    import axios from "axios";

    const adm = axios.create({
        baseURL : import.meta.env.VITE_API_URL
    })

    adm.interceptors.request.use(
        (config) => {
            const token = sessionStorage.getItem("token")

            if(token) {
                config.headers["authorization"] = `Bearer ${token}`
            }
            config.headers["Content-Type"] = "application/json"; 
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    export default adm

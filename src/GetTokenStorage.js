const getTokenStorage = () => {
    const token = sessionStorage.getItem("token")
    return token
}

export default getTokenStorage
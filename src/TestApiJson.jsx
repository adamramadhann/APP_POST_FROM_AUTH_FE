import axios from 'axios'
import React, { useState, useEffect } from 'react'

const TestApiJson = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const getjson = await axios.get("https://jsonplaceholder.typicode.com/users")
                setData(getjson.data) // Mengambil data dari getjson.data
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    }, []) // Empty dependency array to fetch data only once

    console.info(data)

    return (
        <div>
            {data.map((e) => (
                <h1 key={e.id}>{e.name}</h1> // Pastikan setiap elemen memiliki key yang unik
            ))}
        </div>
    )
}

export default TestApiJson

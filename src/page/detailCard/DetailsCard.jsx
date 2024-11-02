import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import adm from '../../axiosApiAuth'
import axios from 'axios'

const DetailsCard = () => {
    const { id } = useParams()

    const { data, error, isLoading } = useQuery({
        queryKey: ['getPost', id], // Descriptive queryKey
        queryFn: async () => {
            try {
                const dataApi = await axios.get(`http://localhost:7777/api/post/getAll/${id}`)
                return dataApi.data
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        enabled: !!id, // Ensures query runs only if `id` exists
    })

    console.info(id)
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error fetching data: {error.message}</p>

    return (
        <div>
            {data && (
                <div>
                    <h1>Name: {data.name}</h1>
                </div>
            )}
        </div>
    )
}

export default DetailsCard

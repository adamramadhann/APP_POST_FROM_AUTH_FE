import React, { useState } from 'react'
import adm from '../../axiosApiAuth'

const ScrenMyPost = () => {
    const [tab, setTab] = useState("Home")

    const buttonTabBar = [
        {id : '1', title : "Home"},
        {id : '2', title : "MyPost"},
        {id : '3', title : "Profile"}
    ]

    const createPost = async ( data) => {
        try {
            const api = await adm.post(`http://localhost:7777/api/post/crete`, data)
            console.info(api)
        } catch (error) {
            console.error(error)
        }
    } 


    const formCreate = (e) => {
        e.preventDefault()

        let judul = e.target.judul.value
        let description = e.target.description.value

        const dataPost = { judul, description }

        createPost(dataPost)
    }

  return (
    <div className='w-screen h-screen bg-slate-100 relative ' >
        <h1 className='ml-5' >My Post App</h1>        
        <div className='flex-1 w-full h-full' >
        {
            tab === "Home" && (
                <div className='' >
                    <form onSubmit={formCreate} className='flex flex-col h-auto shadow-xl bg-white mx-2 pb-5 rounded-md px-5 gap-5 mt-3 ' >
                    <h1 className='w-full text-center' >Create Post</h1>
                        <label className='w-full   ' htmlFor="judul">Judul
                            <input className='w-full border py-2 px-3 rounded-md '  type="text" id='judul' placeholder='enter the post title' />
                        </label>
                        <label className='w-full ' htmlFor="description">description
                            <input className='w-full border py-2 px-3 rounded-md  ' type="text" id='description' placeholder='enter the post title' />
                        </label>
                        <button type='submit' className='bg-blue-500 text-white py-2 rounded-md' >Post</button>
                    </form>
                </div>
            )
        }
        {
            tab === "MyPost" && (
                <div>
                <h1>MyPost</h1>
            </div>
            )
        }
        {
            tab === "Profile" && (
                <div>
                <h1>Profile</h1>
            </div>
            )
        }
        </div>

        <div className='h-14 w-full bg-red-500 flex-1 flex justify-between px-5 ' >
            {
                buttonTabBar.map((e) => (
                        <button key={e.id} onClick={() => setTab(e.title)} className={`flex-1 ${buttonTabBar === "Home" && buttonTabBar === "Home" ? "border-r" : null}`} >{e.title}</button>
                ))
            }
        </div>
    </div>
  )
}

export default ScrenMyPost
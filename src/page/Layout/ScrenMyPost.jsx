
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FaHome } from 'react-icons/fa'
import { MdPostAdd } from 'react-icons/md'
import axios from 'axios'

const ScrenMyPost = () => {
    const [tab, setTab] = useState("Home")
    const [openModal, SetOpenModal] = useState(false)

    const buttonTab = [
        { id: "1", title: "Home", icon : <FaHome size={30} /> },
        { id: "2", title: "MyPost", icon : <MdPostAdd size={30} />},
        { id: "3", title: "Profile", icon : <CgProfile  size={30}/>}
    ]

    const { data, error, refetch } = useQuery({
        queryKey : ['getPost'],
        queryFn : async () => {
            try {
                const dataApi = await axios.get("http://localhost:7777/api/post/getAll")
                console.info(dataApi)
                return dataApi.data
            } catch (error) {
                console.error(error)
                return []
            }
            
        }   
    })

    console.info(data)

  return (
    <div className='w-screen h-screen relative bg-slate-100 ' >
        <div className='flex-1 w-full h-full' >
            {
                tab === "Home" && (
                    <div className='flex gap-5 flex-col items-center' >
                        <h1>Post Screen</h1>
                        <div className='flex flex-col gap-10 h-[760px] w-full overflow-y-auto items-center justify-center ' >
                        {
                            data?.apiGetAll?.map((e) => (
                                <div key={e.id} className='w-[90%] px-3 bg-white gap-5 flex flex-col relative shadow-lg h-auto pb-6 rounded-md ' >
                                    <h1 className='mt-6 text-xl font-bold text-gray-600' >{e.judul}</h1>
                                    <h1 className='text-gray-500' >{e.description} </h1>
                                    <span className='flex w-full mt-4 text-gray-500  justify-between' >
                                        <h1>{e.author}</h1>
                                        <h1>{new Date(e.createAt).toLocaleDateString()}</h1>
                                    </span>
                                <AiOutlineBars onClick={() => SetOpenModal(prev => !prev)}  className={`absolute top-3 right-2 ${openModal ? "hidden" : "block"} `} />
                                <span onClick={() => SetOpenModal(prev = !prev)} className={`flex flex-col absolute top-3 right-4 bg-white ${openModal ? "block" : 'hidden' } `} >
                                    <button onClick={() => SetOpenModal(prev => !prev)} className='text-blue-500' >Edit</button>
                                    <button onClick={() => SetOpenModal(prev => !prev)} className='text-red-500' >Delete</button>
                                </span>
                                    <button onClick={() => SetOpenModal(prev => !prev)} className={`absolute top-0 right-1  text-2xl w-2 h-2 text-red-500 ${openModal ? "block" : "hidden"}`} >x</button>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                )
            }
            {
                tab === "MyPost" && (
                    <div>
                        ini MyPost
                    </div>
                )
            }
            {
                tab === "Profile" && (
                    <div>
                        ini Profile 
                    </div>
                )
            }
        </div>
        <div className='flex-1 h-16 absolute bottom-0 bg-blue-500 w-full flex justify-around' >
            {
                buttonTab.map((e) => (
                    <button onClick={() => setTab(e.title)} key={e.id} className='flex text-white flex-col items-center justify-center pt-2 gap-2' >
                        {e.icon}
                        { e.title}
                    </button>
  <button key={e.id} onClick={() => setTab(e.title)} className={`flex-1 ${buttonTabBar === "Home" && buttonTabBar === "Home" ? "border-r" : null}`} >{e.title}</button>
                ))
            }
        </div>
    </div>
  )
}

export default ScrenMyPost
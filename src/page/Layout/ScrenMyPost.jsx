
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FaHome } from 'react-icons/fa'
import { MdPostAdd } from 'react-icons/md'
import axios from 'axios'
import adm from '../../axiosApiAuth'
import { Link } from 'react-router-dom'

const ScrenMyPost = () => {
    const [tab, setTab] = useState("Home")
    const [openModal, setOpenModal] = useState(null)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [dataMyPost, setDataMyPost] = useState([])
    const [judul, setJudul] = useState('')
    const [descruption, setDescruption] = useState('')
    const [query, setQuery] = useState('')
    const [serch, setSerch] = useState([])


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
            }
            
        }   
    })

    
    const handelOpenModal = (e) => {
        setOpenModal(openModal === e ? null : e)
    }


    const getDataAllPost = async () => {
        try {
            const data = await adm.get("http://localhost:7777/api/post/getAllByAuth")
            console.info(data.data.dataUserByPost)
            setDataMyPost(data.data.dataUserByPost)
        } catch (error) {
            console.error
        }
    }


    const handleDelete = async (id) => {

        const conf = window.confirm("yakin ingin delete data ini")

        if (!conf) return

        try {
            const deletepApi = await adm.delete(`http://localhost:7777/api/post/delete/${id}`)
            console.info(deletepApi.data)
            setDataMyPost((prev) => prev.filter((data) => data.id  !== id))
        } catch (error) {
            console.error(error)
        }
    }


    const handleEdit = async (e, data) => {
        try {
            const edit = await adm.put(`http://localhost:7777/api/post/update/${e}`, data)
            console.info(edit.data)
            setDataMyPost((prev) => prev.map((e) => e.id === e ? {...e, judul : data.judul, descruption : data.description} : data))
            refetch()
        } catch (error) {
            console.error(error)
        }
    }


    const handleSubmit =  (e) => {
        e.preventDefault()

        const data = {judul, descruption}
         handleEdit(openModalEdit,data)
        console.info(data)
        setOpenModalEdit(false)
    }

    const handleModalEditData = (e) => {
        if (openModalEdit === e) {
            setJudul('')
            setDescruption('')
            setOpenModalEdit(true)
        } else {
            const dataEdit = dataMyPost?.find(prev => prev.id === e)
            if(dataEdit) {
                setJudul(dataEdit.judul)
                setDescruption(dataEdit.description)
                setOpenModalEdit(e)
            }
        }
    }


    const handleCreateDataPost = async ( data) => {
        try {
            const dataApiCreate = await adm.post(`http://localhost:7777/api/post/crete`,data)
            console.info(dataApiCreate.data)
            return dataApiCreate
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmitCreateDataPost = (e) => {
        e.preventDefault()

        let judul = e.target.judul.value
        let description = e.target.description.value

        const data = { judul, description}
        console.info(data)
        handleCreateDataPost(data)
        .then(() => {
            e.target.reset()
            refetch()
        })
       
    }

    const handleSerch = (e) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        setSerch(dataMyPost.filter((post) => post.judul.toLowerCase().includes(query.toLocaleLowerCase())))
    }, [query, dataMyPost])

    useEffect(() => {
        getDataAllPost()
    },[] )



  return (
    <div className='w-screen h-screen relative bg-slate-100 ' >
        <div className='flex-1 w-full h-full' >
            {
                tab === "Home" && (
                    <div className='flex gap-5 flex-col items-center' >
                        <h1 className='text-2xl font-bold' >Post Screen</h1>

                        <div className='w-full h-full px-10 border-b-2 pb-5 text-gray-500 ' >
                            <h1 className='text-xl text-gray-600 font-semibold mb-4' >Tambah Card Post</h1>
                            <form className='flex flex-col gap-5 w-full ' onSubmit={handleSubmitCreateDataPost} >
                                <label className='flex flex-col' htmlFor="judul">judul
                                    <input type="text" id='judul'  className='border rounded-md p-2 w-full' placeholder='masukan judul ' />
                                </label>
                                <label className='flex flex-col' htmlFor="description">description
                                    <input type="text" id='description'  className='border rounded-md p-2 w-full' placeholder='masukan description ' />
                                </label>
                                <button className='border p-2 bg-blue-500 text-white rounded-md' >Submit</button>
                            </form>
                        </div>
                        <h1 className='text-start w-full pl-3 text-xl font-semibold text-gray-600' >Card Post</h1>
                        <div className='flex flex-col gap-10 h-[400px] w-full overflow-y-auto items-center  ' >
                        {
                            data?.apiGetAll?.map((e) => (
                                <div key={e.id} className='w-[90%] px-3 bg-white  gap-5 flex flex-col relative shadow-lg h-auto pb-6 rounded-md ' >
                                    <h1 className='mt-6 text-xl font-bold text-gray-600' >{e.judul}</h1>
                                    <h1 className='text-gray-500' >{e.description} </h1>
                                    <span className='flex w-full mt-4 text-gray-500  justify-between' >
                                        <h1>{e.author}</h1>
                                        <h1>{new Date(e.createAt).toLocaleDateString()}</h1>
                                    </span>
                                    <Link to={`/detail/${e.id}`} >Details</Link>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                )
            }
            {
                tab === "MyPost" && (   
                    <div className='flex flex-col  items-center bg-slate-100' >
                        <h1 className='font-bold text-xl my-5 ' >My Postingan App</h1>
                        <form action="">
                            <input type="search" placeholder='serch Card' value={query} onChange={handleSerch} className='border p-2' />
                        </form>
                        <form className={`${openModalEdit ? "block" : "hidden"}`} action="" onSubmit={handleSubmit} >
                            <input value={judul} type="text" onChange={(e) => setJudul(e.target.value) } placeholder='edit postingan' />
                            <input value={descruption} type="text" onChange={(e) => setDescruption(e.target.value) } placeholder='edit description' />
                            <button type='submit'  >Submit</button>
                        </form>
                       <div className=' w-full flex flex-col  gap-24 h-[750px] overflow-auto items-center justify-center  ' >
                       {
                            serch?.map((e) => (
                                <div key={e.id} className='  w-[90%] bg-white shadow-xl rounded-md p-5   h-auto  flex flex-col gap-5 relative ' >
                            <h1 className='text-2xl text-gray-500 font-bold' >{e.judul}</h1>
                            <h1 className='text-gray-500' >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, quasi?</h1>
                            <span className='w-full flex justify-between items-center' >
                                <h1>name</h1>
                                <h1>tanggal</h1>
                            </span>
                            <button className={`absolute top-3 right-2`} onClick={() => handelOpenModal(e.id)}  >
                            {openModal === e.id ? <span className='text-red-500 text-xl' >x</span> : <AiOutlineBars /> }
                            </button>
                            <div className={`absolute top-6 right-6 text-sm flex flex-col  gap-1 ${openModal === e.id ? "block" : 'hidden'} `} >
                                <button className='text-blue-500' onClick={() => handleModalEditData(e.id)} >Edit</button>
                                <button className='text-red-500' onClick={() => handleDelete(e.id)} >Delete</button>
                            </div>
                        </div>
                            ))
                        }
                       </div>
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
                ))
            }
        </div>
    </div>
  )
}

export default ScrenMyPost
import { Breadcrumb, Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import IconFullname from 'assets/images/png/name.png'
import IconGender from 'assets/images/png/gender.png'
import IconPhone from 'assets/images/png/phone.png'
import IconLocation from 'assets/images/png/location.png'
import api from 'services/api'
import IconUser from 'assets/images/png/user.png'
import IconMoney from 'assets/images/png/money.png'
import IconLesson from 'assets/images/png/lesson.png'

const personal = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState({})
    const [lessons, setLessons] = useState([])
    const [teacher, setTeacher] = useState({})

    const getData = async () => {
        const data = await api.get(`/users/${id}`)
        setData(data?.data)
    }

    const getTeacher = async () => {
        const data = await api.get(`/teachers/${id}`)
        setTeacher(data?.data)
    }

    const getLessons = async () => {
        const lessons = await api.get("/lessons/")
        setLessons(lessons?.data)
    }

    useEffect(() => {
        getData()
        getLessons()
        getTeacher()
    }, [])

    return (
        <div className='w-full h-[87vh] overflow-y-auto px-4 py-2'>
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => navigate("/")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Bosh sahifa</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => navigate("/xodimlar")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Xodimlar</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => navigate(`/xodimlar/o'qituvchi`)} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>O'qituvchilar</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-[16px] text-[#002B48] font-medium'>Shaxsiy ma'lumot</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='w-full mt-8 flex items-start md:items-center flex-col md:flex-row justify-start gap-6'>
                <div className='w-[120px] h-[120px] bg-white p-1 flex items-center justify-center rounded-[50%]'>
                    <img src={data?.user_image ? data?.user_image : IconUser} className='w-full h-full rounded-[50%] object-contain' alt="" />
                </div>
                <div className='text-left'>
                    <h1 className='text-[#002B48] text-[26px]'>{data?.first_name + ' ' + data?.last_name}</h1>
                    <p className='text-[#002B48] text-[16px] font-medium'>O'qituvchi</p>
                </div>
            </div>
            <Card className='w-full min-w-[400px] overflow-x-auto mt-6'>
                <div className='px-2 py-4'>
                    <h1 className='text-[24px] text-[#273E7C]'>Shaxsiy ma'lumotlar</h1>
                    <div className='pt-4 pl-0 md:pl-2 lg:pl-4'>
                        <div className='w-full'>
                            <div className='w-full h-full flex items-center justify-start lg:items-start gap-4 flex-wrap'>
                                {/* <div className='min-w-[170px] max-w-[300px] h-[75px] hover:bg-[#1EBECA] shadow-none hover:shadow-md hover:shadow-[#25B7D3] cursor-pointer border border-solid border-spacing-2 p-2 border-[white] bg-[#25B7D3] text-white rounded-[15px] flex items-center justify-start gap-2'>
                                    <img src={IconFullname} className='w-[50px] h-[50px] object-contain' alt="" />
                                    <div className='w-full'>
                                        <h5 className='p-0 m-0'>Ismi</h5>
                                        <h3 className='p-0 m-0'>{data?.first_name}</h3>
                                    </div>
                                </div> */}
                                <div className='min-w-[170px] max-w-[300px] h-[75px] cursor-pointer p-2 text-[#273E7C] shadow-md hover:shadow-[#273E7C] border border-solid border-[#273E7C] rounded-[15px] flex items-center justify-start gap-2'>
                                    <img src={IconFullname} className='w-[50px] h-[50px] object-contain' alt="" />
                                    <div className='w-full'>
                                        <h5 className='p-0 m-0'>Ismi</h5>
                                        <h3 className='p-0 m-0'>{data?.first_name}</h3>
                                    </div>
                                </div>
                                <div className='min-w-[170px] max-w-[300px] h-[75px] cursor-pointer p-2 text-[#273E7C] shadow-md hover:shadow-[#273E7C] border border-solid border-[#273E7C] rounded-[15px] flex items-center justify-start gap-2'>
                                    <img src={IconFullname} className='w-[50px] h-[50px] object-contain' alt="" />
                                    <div className='w-full'>
                                        <h5 className='p-0 m-0'>Familyasi</h5>
                                        <h3 className='p-0 m-0'>{data?.last_name}</h3>
                                    </div>
                                </div>
                                <div className='min-w-[170px] max-w-[300px] h-[75px] cursor-pointer p-2 text-[#273E7C] shadow-md hover:shadow-[#273E7C] border border-solid border-[#273E7C] rounded-[15px] flex items-center justify-start gap-2'>
                                    <img src={IconGender} className='w-[50px] h-[50px] object-contain' alt="" />
                                    <div className='w-full'>
                                        <h5 className='p-0 m-0'>Jinsi</h5>
                                        <h3 className='p-0 m-0'>{data?.gender === "Erkak" ? "Erkak" : "Ayol"}</h3>
                                    </div>
                                </div>
                                <div className='min-w-[170px] max-w-[300px] h-[75px] cursor-pointer p-2 text-[#273E7C] shadow-md hover:shadow-[#273E7C] border border-solid border-[#273E7C] rounded-[15px] flex items-center justify-start gap-2'>
                                    <img src={IconPhone} className='w-[50px] h-[50px] object-contain' alt="" />
                                    <div className='w-full'>
                                        <h5 className='p-0 m-0'>Telefon raqami</h5>
                                        <h3 className='p-0 m-0'>{data?.phone_number}</h3>
                                    </div>
                                </div>
                                <div className='min-w-[170px] max-w-[300px] h-[75px] cursor-pointer p-2 text-[#273E7C] shadow-md hover:shadow-[#273E7C] border border-solid border-[#273E7C] rounded-[15px] flex items-center justify-start gap-2'>
                                    <img src={IconMoney} className='w-[50px] h-[50px] object-contain' alt="" />
                                    <div className='w-full'>
                                        <h5 className='p-0 m-0'>Oylik Maoshi</h5>
                                        <h3 className='p-0 m-0'>{teacher?.commission && parseFloat(teacher.commission).toLocaleString("ru-RU")} {teacher?.commission && parseFloat(teacher?.commission) < 100 ? "%" : "UZS"}</h3>
                                    </div>
                                </div>
                                <div className='min-w-[170px] max-w-[300px] h-[75px] cursor-pointer p-2 text-[#273E7C] shadow-md hover:shadow-[#273E7C] border border-solid border-[#273E7C] rounded-[15px] flex items-center justify-start gap-2'>
                                    <img src={IconLesson} className='w-[50px] h-[50px] object-contain' alt="" />
                                    <div className='w-full'>
                                        <h5 className='p-0 m-0'>Darslari</h5>
                                        <h3 className='p-0 m-0 flex items-center gap-2'>
                                            {/* <span className='border border-solid border-[#273E7C] my-2 px-2 rounded-md'>{lessons.find(lesson => teacher.subject.some(sub => sub === lesson.id))?.name}</span> */}
                                            <span className='border border-solid border-[#273E7C] my-2 px-2 rounded-md'>Frontend</span>
                                        </h3>
                                    </div>
                                </div>
                                <div className='min-w-[170px] max-w-[300px] min-h-[75px] max-h-full cursor-pointer p-2 text-[#273E7C] shadow-md hover:shadow-[#273E7C] border border-solid border-[#273E7C] rounded-[15px] flex items-center justify-start gap-2'>
                                    <img src={IconLocation} className='w-[50px] h-[50px] object-contain' alt="" />
                                    <div className='w-full'>
                                        <h5 className='p-0 m-0'>Manzili</h5>
                                        <h3 className='p-0 m-0'>{data?.address}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default personal
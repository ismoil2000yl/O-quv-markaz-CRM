import { Breadcrumb, Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ImgMen from 'assets/images/jpg/men.jpg'

const personal = () => {

    const navigate = useNavigate()

    return (
        <div className='w-full h-[87vh] overflow-y-auto px-4 py-2'>
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => navigate("/")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Bosh sahifa</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-[16px] text-[#787F95] font-medium'>Xodimlar</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => navigate(`/xodimlar/o'quvchi`)} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>O'quvchilar</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-[16px] text-[#002B48] font-medium'>Shaxsiy ma'lumot</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='w-full mt-8 flex items-start md:items-center flex-col md:flex-row justify-start gap-6'>
                <div className='w-[120px] h-[120px] bg-white p-1 flex items-center justify-center rounded-[50%]'>
                    <img src={ImgMen} className='w-full h-full rounded-[50%]' alt="" />
                </div>
                <div className='text-left'>
                    <h1 className='text-[#002B48] text-[26px]'>Ismoil Alisherovich Jalolov</h1>
                    <p className='text-[#002B48] text-[16px] font-medium'>O'quvchi</p>
                </div>
            </div>
            <div className="my-6 flex items-end justify-start gap-3">
                <h1 className='text-[#002B48] text-[26px]'>O'quv markaz nomi :</h1>
                <h1 className='text-[#517DF8] text-[26px] uppercase'>ICEBERK</h1>
            </div>
            <Card className='w-full min-w-[400px] overflow-x-auto '>
                <div className='px-2 py-4'>
                    <h1 className='text-[24px] text-[#273E7C]'>Shaxsiy ma'lumotlar</h1>
                    <div className='pt-4 pl-4'>
                        <div className='w-full flex items-start justify-start'>
                            <h1 className='uppercase w-[230px] text-[18px] text-[#354F95]'>familyasi</h1>
                            <h1 className='text-[18px] w-full text-[#002B48]'>Jalolov</h1>
                        </div>
                        <div className='w-full flex items-start justify-start'>
                            <h1 className='uppercase w-[230px] text-[18px] text-[#354F95]'>ismi</h1>
                            <h1 className='text-[18px] w-full text-[#002B48]'>Ismoil</h1>
                        </div>
                        <div className='w-full flex items-start justify-start'>
                            <h1 className='uppercase w-[230px] text-[18px] text-[#354F95]'>otasining ismi</h1>
                            <h1 className='text-[18px] w-full text-[#002B48]'>Alisher o'g'li</h1>
                        </div>
                        <div className='w-full flex items-start justify-start'>
                            <h1 className='uppercase w-[230px] text-[18px] text-[#354F95]'>telefon raqami</h1>
                            <h1 className='text-[18px] w-full text-[#002B48]'>+998901544225</h1>
                        </div>
                        <div className='w-full flex items-start justify-start'>
                            <h1 className='uppercase w-[230px] text-[18px] text-[#354F95]'>Jinsi</h1>
                            <h1 className='text-[18px] w-full text-[#002B48]'>Erkak</h1>
                        </div>
                        <div className='w-full flex items-start justify-start'>
                            <h1 className='uppercase w-[230px] text-[18px] text-[#354F95]'>Manzili</h1>
                            <h1 className='text-[18px] w-full text-[#002B48]'>Uychi tumani, Ravot ShFY</h1>
                        </div>
                    </div>
                </div>
            </Card>
            <Card className='w-full min-w-[400px] overflow-x-auto mt-8'>
                <div className='px-2 py-4'>
                    <h1 className='text-[24px] text-[#273E7C]'>Login va Parol</h1>
                    <div className='pt-4 pl-4'>
                        <div className='w-full flex items-start justify-start'>
                            <h1 className='uppercase w-full text-[18px] text-[#354F95]'>login</h1>
                            <h1 className='text-[18px] w-full ml-5 text-[#002B48]'>ismoil2000yl</h1>
                        </div>
                        <div className='w-full flex items-start justify-start'>
                            <h1 className='uppercase w-full text-[18px] text-[#354F95]'>parol</h1>
                            <h1 className='text-[18px] w-full ml-5 text-[#002B48]'>123456</h1>
                        </div>
                        <div className='w-full flex items-start justify-start'>
                            <h1 className='uppercase w-full text-[18px] text-[#354F95]'>Ro'yhatga olingan sana</h1>
                            <h1 className='text-[18px] w-full ml-5 text-[#002B48]'>21.06.2024</h1>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default personal
import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconDirektor from 'assets/images/png/direktor.png'
import IconAdministrator from 'assets/images/png/administrator.png'
import IconOqituvchi from 'assets/images/png/teacher.png'
import IconOquvchi from 'assets/images/png/pupil.png'

const index = () => {

    const navigate = useNavigate()

    return (
        <div className='w-full'>
            <div className='w-full h-full flex items-center justify-center lg:items-start lg:justify-start gap-4 flex-wrap'>
                <div onClick={() => navigate("/xodimlar/direktor")} className='w-[150px] h-[150px] hover:bg-[#1EBECA] shadow-none hover:shadow-md hover:shadow-[#25B7D3] cursor-pointer border border-solid border-spacing-2 p-2 border-[white] bg-[#25B7D3] text-white rounded-[15px] flex flex-col items-center justify-center'>
                    <img src={IconDirektor} className='w-[100px] h-[100px] object-contain' alt="" />
                    <h2>Direktor</h2>
                </div>
                <div onClick={() => navigate("/xodimlar/administrator")} className='w-[150px] h-[150px] hover:bg-[#1EBECA] shadow-none hover:shadow-md hover:shadow-[#25B7D3] cursor-pointer border border-solid border-spacing-2 p-2 border-[white] bg-[#25B7D3] text-white rounded-[15px] flex flex-col items-center justify-center'>
                    <img src={IconAdministrator} className='w-[100px] h-[100px] object-contain' alt="" />
                    <h2>Administrator</h2>
                </div>
                <div onClick={() => navigate("/xodimlar/o'qituvchi")} className='w-[150px] h-[150px] hover:bg-[#1EBECA] shadow-none hover:shadow-md hover:shadow-[#25B7D3] cursor-pointer border border-solid border-spacing-2 p-2 border-[white] bg-[#25B7D3] text-white rounded-[15px] flex flex-col items-center justify-center'>
                    <img src={IconOqituvchi} className='w-[100px] h-[100px] object-contain' alt="" />
                    <h2>O'qituvchilar</h2>
                </div>
                <div onClick={() => navigate("/xodimlar/o'quvchi")} className='w-[150px] h-[150px] hover:bg-[#1EBECA] shadow-none hover:shadow-md hover:shadow-[#25B7D3] cursor-pointer border border-solid border-spacing-2 p-2 border-[white] bg-[#25B7D3] text-white rounded-[15px] flex flex-col items-center justify-center'>
                    <img src={IconOquvchi} className='w-[100px] h-[100px] object-contain rounded-[50%]' alt="" />
                    <h2>O'quvchilar</h2>
                </div>
            </div>
        </div>
    )
}

export default index
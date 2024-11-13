import React from 'react'
import IconTelegram from 'assets/images/png/telegram.png'
import IconFacebook from 'assets/images/png/facebook.png'
import IconWhatsapp from 'assets/images/png/whatsapp.png'
import {
    MailOutlined, BellOutlined
} from "@ant-design/icons";
import { Avatar, Badge } from 'antd';
import IconMen from 'assets/images/jpg/men.jpg'
import IconUser from 'assets/images/png/user.png'
import { useSelector } from 'react-redux';

const header = ({ collapsed, setCollapsed }) => {

    const { myUser } = useSelector(state => state.myUser)

    const clickMenu = () => {
        document.querySelector('.toggle').classList.toggle('active')
    }

    return (
        <div className='w-full h-[75px] lg:h-[65px] bg-white px-4'>
            <div className='w-full h-full flex gap-1 md:gap-28 items-center justify-between'>
                <div className='w-[15%] lg:w-[40%] h-full flex items-center justify-start'>
                    {
                        screen.width <= 768 ?
                            <button className={'toggle cursor-pointer'} onClick={() => { clickMenu(), setCollapsed(prev => !prev) }}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            :
                            <div className='w-full h-full flex items-center justify-start gap-10'>
                                <ul></ul>
                                {/* <ul className='w-full h-full flex items-center gap-6'>
                                    <li className='relative cursor-pointer w-[20px] h-[20px]'>
                                        <img className='absolute w-full h-full' src={IconTelegram} alt="" />
                                    </li>
                                    <li className='relative cursor-pointer w-[20px] h-[20px]'>
                                        <img className='absolute w-full h-full' src={IconFacebook} alt="" />
                                    </li>
                                    <li className='relative cursor-pointer w-[20px] h-[20px]'>
                                        <img className='absolute w-full h-full' src={IconWhatsapp} alt="" />
                                    </li>
                                </ul> */}
                                <div className='h-full flex items-center'>
                                    <h3 className='mb-0 text-[#002B48] text-[16px]'>{myUser?.user?.phone_number}</h3>
                                </div>
                            </div>
                    }
                </div>
                <div className='w-[85%] lg:w-[60%] h-full flex items-center justify-end'>
                    <div className='w-full h-full flex items-center justify-around'>
                        <ul></ul>
                        {/* <ul className='w-full flex items-center justify-center gap-4'>
                            <Badge
                                count={2}
                                style={{
                                    backgroundColor: '#517DF8',
                                }}
                            >
                                <li className='w-[38px] h-[38px] cursor-pointer rounded-[50%] border border-solid border-spacing-1 border-[#EEF0F4]'>
                                    <MailOutlined style={{ fontSize: "18px", color: "#787F95" }} className='w-full h-full flex items-center justify-center' />
                                </li>
                            </Badge>
                            <Badge
                                count={6}
                                style={{
                                    backgroundColor: '#517DF8',
                                }}
                            >
                                <li className='w-[38px] h-[38px] cursor-pointer rounded-[50%] border border-solid border-spacing-1 border-[#EEF0F4]'>
                                    <BellOutlined style={{ fontSize: "18px", color: "#787F95" }} className='w-full h-full flex items-center justify-center' />
                                </li>
                            </Badge>
                        </ul> */}
                        <div className='w-full h-full flex items-center justify-end gap-4'>
                            <div className='flex flex-col text-right'>
                                <h3 className='text-[14px] text-[#002B48]'>{myUser?.user?.first_name + " " + myUser?.user?.last_name}</h3>
                                <h3 className='text-[12px] text-[#787F95]' >
                                    {
                                        myUser?.user?.status === "manager_user" ? "Direktor" : myUser?.user?.status === "administrator_user" ? "Administrator" : myUser?.user?.status === "teacher_user" ? "O'qituvchi" : myUser?.user?.status === "student_user" ? "O'quvchi" : "Aniqlanmadi"
                                    }
                                </h3>
                            </div>
                            <img src={myUser?.user?.user_image ? 'http://localhost:8001' + myUser?.user?.user_image : IconUser} className='w-[52px] h-[52px] rounded-[50%] object-contain' alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default header
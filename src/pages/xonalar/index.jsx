import { Breadcrumb, Button, Input, message, Popconfirm, Spin, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EditOutlined, EyeOutlined, SearchOutlined, WindowsOutlined, MenuOutlined, DeleteOutlined } from "@ant-design/icons";
import Create from './create'
import IconBook from 'assets/images/png/room.png'
import { usePost } from 'crud';
import api from 'services/api';

const index = () => {

    const navigate = useNavigate()
    const [style, setStyle] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [modalData, setModalData] = useState({ isOpen: false, data: null })
    const { mutate: deletedHandler } = usePost()
    const [data, setData] = useState()
    const [nomi, setNomi] = useState("")

    const getData = async () => {
        const data = await api.get('/rooms/')
        setData(data?.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/rooms/${id}/`,
            method: "delete",
            onSuccess: () => {
                getData()
                messageApi.open({
                    type: 'success',
                    content: "Xona o'chirib yuborildi"
                })
            },
            onError: () => {
                messageApi.open({
                    type: 'error',
                    content: "Xona o'chirilmadi!"
                })
            }
        })
    };


    return (
        <div className='w-full h-[87vh] px-4 py-2 overflow-y-auto'>
            {contextHolder}
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => navigate("/")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Bosh sahifa</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-[16px] text-[#787F95] font-medium'>Xonalar</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <h1 className='text-[26px] text-[#002B48]'>Xonalar</h1>
                <div className='flex items-center gap-8'>
                    <div className='flex items-center gap-4'>
                        <div onClick={() => setStyle(true)} className={`w-[38px] h-[38px] ${style ? "bg-[#25B7D3]" : "bg-white"} cursor-pointer rounded-[50%] flex items-center justify-center`}>
                            <WindowsOutlined width={30} height={30} className={`${style ? "text-white" : "text-[#25B7D3]"}`} />
                        </div>
                        <div onClick={() => setStyle(false)} className={`w-[38px] h-[38px] ${!style ? "bg-[#25B7D3]" : "bg-white"} cursor-pointer rounded-[50%] flex items-center justify-center`}>
                            <MenuOutlined width={30} height={30} className={`${!style ? "text-white" : "text-[#25B7D3]"}`} />
                        </div>
                    </div>
                    <Button
                        type='ghost'
                        className='rounded-[5px] bg-[#25B7D3] text-[white]'
                        onClick={() => setModalData({ isOpen: true, data: null })}

                    >
                        + Qo'shish
                    </Button>
                </div>
                <Create modalData={modalData} setModalData={setModalData} getData={getData} />
            </div>
            <div className='w-full'>
                {data?.length ?
                    !style ?
                        <div className='mt-4 w-full h-full overflow-x-auto'>
                            <table className='min-w-[700px] w-full text-left border-t border-solid border-[#F2F2FD]'>
                                <thead className='bg-[#25B7D3] text-white text-[14px] uppercase'>
                                    <tr className='border border-solid border-[#F2F2FD]'>
                                        <th className='w-[50px] px-6 py-4 rounded-tl-[8px]'>N</th>
                                        <th className='min-w-[130px] p-4'>Xona nomi</th>
                                        <th className='w-[110px] p-4 rounded-tr-[8px]'></th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white text-[#002B48] text-[16px]'>
                                    <tr>
                                        <td></td>
                                        <td className='p-4'>
                                            <Input onChange={(e) => setNomi(e.target.value)} prefix={<SearchOutlined />} className='shadow-md' placeholder='Izlash...' />
                                        </td>
                                        <td></td>
                                    </tr>
                                    {
                                        data?.filter(item =>
                                            item?.name?.toLowerCase().includes(nomi.toLowerCase())
                                        )?.map((item, index) => {
                                            return (
                                                <tr key={item?.id} className='border border-solid border-[#F2F2FD]'>
                                                    <td className='p-4'>
                                                        <span className='w-[30px] h-[30px] font-medium flex items-center justify-center rounded-[50%] border border-solid border-[#E1E8EE] bg-[#25B7D3] text-[white]'>{index + 1}</span>                                        </td>
                                                    <td className='p-4 min-w-[250px]'>{item?.name}</td>
                                                    <td className='p-4 w-[110px]'>
                                                        <div className='flex items-center justify-center gap-4'>
                                                            <Tooltip placement='left' title={"O'chirish"}>
                                                                <Popconfirm
                                                                    placement="topRight"
                                                                    title={"O'chirish"}
                                                                    description={"O'chirishni xoxlaysizmi?"}
                                                                    onConfirm={() => deleteConfirm(item?.id)}
                                                                    onCancel={() => { }}
                                                                    okText="Ha"
                                                                    cancelText="Yo'q"
                                                                >
                                                                    <Button>
                                                                        <DeleteOutlined />
                                                                    </Button>
                                                                </Popconfirm>
                                                            </Tooltip>
                                                            <Button onClick={() => setModalData({ isOpen: true, data: item })}>
                                                                <EditOutlined />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        :
                        <div className='my-4 w-full'>
                            <div className='w-full flex flex-wrap items-center justify-center lg:justify-start gap-6'>
                                {
                                    data?.map(item => {
                                        return (
                                            <div key={item?.id} className='w-[300px] overflow-hidden h-[230px] rounded-[15px] bg-gradient-to-b from-custom-gradient-start via-custom-gradient-mid to-custom-gradient-end shadow-custom p-2 relative'>
                                                <div className='w-full h-full flex flex-col items-center justify-center gap-[5px]'>
                                                    <img src={IconBook} className='object-contain w-[110px] h-[110px]' alt="" />
                                                    <h1 className='text-[22px] text-white font-bold p-0 m-0'>{item?.name}</h1>
                                                    <div className='w-full flex items-center justify-between px-2'>
                                                        <Tooltip placement='left' title={"O'chirish"}>
                                                            <Popconfirm
                                                                placement="topRight"
                                                                title={"O'chirish"}
                                                                description={"O'chirishni xoxlaysizmi?"}
                                                                onConfirm={() => deleteConfirm(item?.id)}
                                                                onCancel={() => { }}
                                                                okText="Ha"
                                                                cancelText="Yo'q"
                                                            >
                                                                <div className='w-[110px] flex items-center cursor-pointer group'>
                                                                    <span className='w-[32px] h-[32px] rounded-[50%] bg-red-600 group-hover:bg-white flex items-center justify-center'>
                                                                        <DeleteOutlined className='text-white group-hover:text-red-600' />
                                                                    </span>
                                                                    <div className='w-[78px] translate-x-[-6px] rounded-tr-[10px] rounded-br-[10px] bg-red-600 group-hover:bg-white flex items-center p-[4px] justify-center'>
                                                                        <h4 className='text-[12px] m-0 p-0 text-white group-hover:text-red-600'>O'chirish</h4>
                                                                    </div>
                                                                </div>
                                                            </Popconfirm>
                                                        </Tooltip>
                                                        <div className='w-[110px] flex items-center cursor-pointer group' onClick={() => setModalData({ isOpen: true, data: item })}>
                                                            <div className='w-[78px] translate-x-[6px] rounded-tl-[10px] rounded-bl-[10px] bg-green-600 group-hover:bg-white flex items-center p-[4px] justify-center'>
                                                                <h4 className='text-[12px] m-0 p-0 text-white group-hover:text-green-600'>Tahrirlash</h4>
                                                            </div>
                                                            <span className='w-[32px] h-[32px] rounded-[50%] bg-green-600 group-hover:bg-white flex items-center justify-center'>
                                                                <EditOutlined className='text-white group-hover:text-green-600' />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    : <div className='w-full h-full mt-[10vh]'>
                        <Spin tip="Biroz kuting..." size="large">
                            <div className="content" />
                        </Spin>
                    </div>
                }
            </div>
        </div>
    )
}

export default index
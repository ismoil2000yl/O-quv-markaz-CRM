import { Breadcrumb, Button, Input, message, Popconfirm, Spin, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EditOutlined, EyeOutlined, SearchOutlined, WindowsOutlined, MenuOutlined, DeleteOutlined } from "@ant-design/icons";
import Create from './create'
import IconXarajat from 'assets/images/png/xarajat.png'
import { usePost } from 'crud';
import api from 'services/api';

const index = () => {

    const navigate = useNavigate()
    const [style, setStyle] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [modalData, setModalData] = useState({ isOpen: false, data: null })
    const { mutate: deletedHandler } = usePost()
    const [data, setData] = useState()
    const [reason, setReason] = useState("")
    const [amount, setAmount] = useState("")

    const getData = async () => {
        const data = await api.get('/expenses/')
        setData(data?.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/expenses/${id}/`,
            method: "delete",
            onSuccess: () => {
                getData()
                messageApi.open({
                    type: 'success',
                    content: "Xarajat o'chirib yuborildi"
                })
            },
            onError: () => {
                messageApi.open({
                    type: 'error',
                    content: "Xarajat o'chirilmadi!"
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
                    <Breadcrumb.Item className='text-[16px] text-[#787F95] font-medium'>Xarajatlar</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <h1 className='text-[26px] text-[#002B48]'>Xarajatlar</h1>
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
                                        <th className='min-w-[130px] p-4'>Sababi</th>
                                        <th className='min-w-[130px] p-4'>Summasi</th>
                                        <th className='w-[110px] p-4 rounded-tr-[8px]'></th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white text-[#002B48] text-[16px]'>
                                    <tr>
                                        <td></td>
                                        <td className='p-4'>
                                            <Input onChange={(e) => setReason(e.target.value)} prefix={<SearchOutlined />} className='shadow-md' placeholder='Izlash...' />
                                        </td>
                                        <td className='p-4'>
                                            <Input onChange={(e) => setAmount(e.target.value)} prefix={<SearchOutlined />} className='shadow-md' placeholder='Izlash...' />
                                        </td>
                                        <td></td>
                                    </tr>
                                    {
                                        data?.filter(item =>
                                            item?.reason?.toLowerCase().includes(reason.toLowerCase()) &&
                                            item?.amount?.toLowerCase().includes(amount.toLowerCase())
                                        )?.map((item, index) => {
                                            return (
                                                <tr key={item?.id} className='border border-solid border-[#F2F2FD]'>
                                                    <td className='p-4'>
                                                        <span className='w-[30px] h-[30px] font-medium flex items-center justify-center rounded-[50%] border border-solid border-[#E1E8EE] bg-[#25B7D3] text-[white]'>{index + 1}</span>                                        </td>
                                                    <td className='p-4 min-w-[250px]'>{item?.reason}</td>
                                                    <td className='p-4 min-w-[250px]'>{parseInt(item?.amount).toLocaleString("ru-RU")} UZS</td>
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
                                            <div key={item?.id} className='w-[310px] shadow-md shadow-slate-500 border border-solid border-white p-1 h-[190px] px-6 py-3 rounded-2xl bg-gradient-to-b from-custom-gradient-start via-custom-gradient-mid to-custom-gradient-end text-white'>
                                                <h4 className='text-center'>{parseInt(item?.amount).toLocaleString("ru-RU")} UZS<span className='mx-1 text-red-500 text-lg'></span></h4>
                                                <hr />
                                                <div className='w-full flex items-start'>
                                                    <div className='w-[65%]'>
                                                        <div className='flex flex-col'>
                                                            <p>{item?.reason}</p>
                                                        </div>
                                                    </div>
                                                    <div className='w-[25%] flex flex-col items-center justify-center'>
                                                        <div className='rounded-full cursor-pointer w-[80px] h-[80px] p-1 bg-white'>
                                                            <div className='w-full h-full bg-slate-200 transition-all hover:bg-slate-300 rounded-full flex items-center justify-center'>
                                                                <img src={IconXarajat} className={"w-[90%] h-[90%] "} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className='flex mt-2 items-center justify-start gap-3'>
                                                            <Button type='primary' onClick={() => setModalData({ isOpen: true, data: item })}><EditOutlined className="text-white cursor-pointer text-lg" /></Button>
                                                            <Tooltip placement='bottom' title={"O'chirish"}>
                                                                <Popconfirm
                                                                    placement="bottom"
                                                                    title={"O'chirish"}
                                                                    description={"O'chirishni xoxlaysizmi?"}
                                                                    onConfirm={() => deleteConfirm(2)}
                                                                    onCancel={() => { }}
                                                                    okText="Ha"
                                                                    cancelText="Yo'q"
                                                                >
                                                                    <Button type='primary' danger>
                                                                        <DeleteOutlined className="text-white cursor-pointer text-lg" />
                                                                    </Button>
                                                                </Popconfirm>
                                                            </Tooltip>
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
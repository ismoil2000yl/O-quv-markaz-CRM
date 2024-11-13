import { Breadcrumb, Button, Checkbox, Input, message, Popconfirm, Popover, Select, Spin, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EditOutlined, EyeOutlined, SearchOutlined, WindowsOutlined, MenuOutlined, DeleteOutlined } from "@ant-design/icons";
// import Create from './create'
import IconReklama from 'assets/images/png/reklama.png'
import { usePost } from 'crud';
import api from 'services/api';

const index = () => {

    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [modalData, setModalData] = useState({ isOpen: false, data: null })
    const { mutate: deletedHandler } = usePost()
    const [data, setData] = useState([])
    const [reklama, setReklama] = useState([])
    const [lessons, setLessons] = useState([])
    const [teachers, setTeachers] = useState([])
    const [nomi, setNomi] = useState("")
    const [fan, setFan] = useState("")
    const [ustozi, setUstozi] = useState("")
    const [faolligi, setFaolligi] = useState("")

    const getReklama = async () => {
        const data = await api.get('/ads/')
        setReklama(data?.data)
    }

    const getData = async () => {
        const data = await api.get('/groups/')
        setData(data?.data)
    }

    const getLessons = async () => {
        const data = await api.get('/lessons/')
        setLessons(data?.data)
    }

    const getTeachers = async () => {
        const data = await api.get('/users/')
        setTeachers(data?.data)
    }

    useEffect(() => {
        getReklama()
        getLessons()
        getData()
    }, [])

    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/groups/${id}/`,
            method: "delete",
            onSuccess: () => {
                getData()
                messageApi.open({
                    type: 'success',
                    content: "Guruh o'chirib yuborildi"
                })
            },
            onError: () => {
                messageApi.open({
                    type: 'error',
                    content: "Guruh o'chirilmadi!"
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
                    <Breadcrumb.Item className='text-[16px] text-[#002B48] font-medium'>Guruhlar</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='w-full flex flex-col md:flex-row items-start md:items-center justify-between mt-4'>
                <h1 className='w-full text-[26px] text-[#002B48]'>Guruhlar <span className='px-2 py-1 mx-4 bg-[#25B7D3] text-white rounded-md text-center text-sm font-bold'>{data?.length}</span></h1>
                <Button
                    type='ghost'
                    className='rounded-[5px] bg-[#25B7D3] text-[white]'
                    onClick={() => navigate('/group/add')}

                >
                    + Qo'shish
                </Button>
                {/* <Create modalData={modalData} setModalData={setModalData} getData={getData} lessons={lessons} tavfsif={reklama} /> */}
            </div>
            <div className='w-full'>
                {data?.length ?
                    <div className='mt-4 w-full h-full overflow-x-auto'>
                        <table className='min-w-[700px] w-full h-full text-left border-t border-solid border-[#F2F2FD]'>
                            <thead className='bg-[#25B7D3] text-white text-[14px] uppercase'>
                                <tr className='border border-solid border-[#F2F2FD]'>
                                    <th className='w-[50px] px-6 py-4 rounded-tl-[8px]'>N</th>
                                    <th className='min-w-[130px] p-4'>Guruh nomi</th>
                                    <th className='min-w-[130px] p-4'>fan nomi</th>
                                    <th className='min-w-[130px] p-4'>Boshlangan vaqti</th>
                                    <th className='min-w-[130px] p-4'>Ustozi</th>
                                    <th className='min-w-[130px] p-4'>Faolligi</th>
                                    <th className='w-[110px] p-4 rounded-tr-[8px]'></th>
                                </tr>
                            </thead>
                            <tbody className='h-full bg-white text-[#002B48] text-[16px]'>
                                <tr>
                                    <td></td>
                                    <td className='p-4'>
                                        <Input onChange={(e) => setNomi(e.target.value)} prefix={<SearchOutlined />} className='shadow-md' placeholder='Izlash...' />
                                    </td>
                                    <td>
                                        <Select className='w-[150px] p-2' value={fan} onChange={(e) => setFan(e)}>
                                            <Select.Option value={""} className="w-full" >Xammasi</Select.Option>
                                            {
                                                lessons?.map((item, ind) => {
                                                    return (
                                                        <Select.Option value={item?.id} className="w-full" key={ind}>{item?.name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </td>
                                    <td></td>
                                    <td className='p-4'>
                                        <Select className='w-[150px] p-2' value={ustozi} onChange={(e) => setUstozi(e)}>
                                            <Select.Option value={""} className="w-full" >Xammasi</Select.Option>
                                            {
                                                teachers?.map((item, ind) => {
                                                    return (
                                                        <Select.Option value={item?.id} key={ind} className="w-full">
                                                            <Tooltip placement='left' title={item?.name}>
                                                                {item?.name}
                                                            </Tooltip>
                                                        </Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </td>
                                    <td className='p-4'>
                                        <Select className='w-[100px] p-2' value={faolligi} onChange={(e) => setFaolligi(e)}>
                                            <Select.Option value={""} className="w-full" >Xammasi</Select.Option>
                                            <Select.Option value={true} className="w-full" >Faol</Select.Option>
                                            <Select.Option value={false} className="w-full" >Faol emas</Select.Option>

                                        </Select>
                                    </td>
                                    <td></td>
                                </tr>
                                {
                                    data?.filter(item =>
                                        (item?.name?.toLowerCase().includes(nomi.toLowerCase()))
                                        && (item?.lesson == fan || fan == "")
                                        && (item?.status == faolligi || faolligi == "")
                                        // && (item?.status || !item?.status || item?.status == "")
                                        // && (item?.teacher == ustozi || ustozi == "")
                                    )?.map((item, index) => {
                                        return (
                                            <tr key={item?.id} className='h-full border border-solid border-[#F2F2FD]'>
                                                <td className='p-4'>
                                                    <span className='w-[30px] h-[30px] font-medium flex items-center justify-center rounded-[50%] border border-solid border-[#E1E8EE] bg-[#25B7D3] text-[white]'>{index + 1}</span>
                                                </td>
                                                <td className='p-4 min-w-[50px]'>{item?.name}</td>
                                                <td className='p-4 min-w-[50px]'>{lessons?.map(lesson => lesson?.id == item?.id && lesson?.name)}</td>
                                                <td className='p-4 min-w-[50px]'>
                                                    {item?.start_date}
                                                </td>
                                                <td className='p-4 min-w-[50px]'>
                                                    ustozi
                                                </td>
                                                <td className='h-full flex items-center justify-center'>
                                                    <Checkbox
                                                        checked={item?.status}
                                                        className={"scale-[2] mx-2"}
                                                    >
                                                    </Checkbox>
                                                </td>
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
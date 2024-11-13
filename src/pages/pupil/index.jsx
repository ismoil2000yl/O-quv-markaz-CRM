import { Breadcrumb, Button, Checkbox, Input, message, Popconfirm, Popover, Select, Spin, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EditOutlined, EyeOutlined, SearchOutlined, WindowsOutlined, MenuOutlined, DeleteOutlined } from "@ant-design/icons";
import Create from './create'
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
    const [ismi, setIsmi] = useState("")
    const [phone, setPhone] = useState("")
    const [fan, setFan] = useState("")
    const [kun, setKun] = useState("")
    const [rek, setRek] = useState("")

    const [selectedData, setSelectedData] = useState([])
    const [allSelected, setAllSelected] = useState(false)
    const [allData, setAllData] = useState([])
    console.log(selectedData);

    const selectedFunction = (e, row) => {
        const newData = [...selectedData]
        if (e.target.checked) {
            newData.push(row)
            setSelectedData(newData)
        }
        else {
            const indexToRemove = newData.indexOf(row);
            if (indexToRemove !== -1) {
                newData.splice(indexToRemove, 1);
                setSelectedData(newData)
            }
        }
    }

    const toggleSelectAll = (e) => {
        const checked = e.target.checked;
        setAllSelected(checked);

        if (checked) {
            const filteredData = data.filter(item => {
                (item?.first_name?.toLowerCase().includes(ismi.toLowerCase()) ||
                    item?.last_name?.toLowerCase().includes(ismi.toLowerCase())) &&
                    (item?.phone_number1?.includes(phone) ||
                        item?.phone_number2?.includes(phone))
                    && (item?.free_days?.includes(kun))
                    && (item?.lesson == fan || fan == "")
                    && (item?.got_recommended_by == rek || rek == "")
                return true; // Barcha elementlarni olish
            });
            setSelectedData(filteredData);
        } else {
            setSelectedData([]); // Agar allSelected false bo'lsa, selectedData ni tozalash
        }
    };

    const getReklama = async () => {
        const data = await api.get('/ads/')
        setReklama(data?.data)
    }

    const getData = async () => {
        const data = await api.get('/new_students/')
        setData(data?.data)
    }

    const getLessons = async () => {
        const data = await api.get('/lessons/')
        setLessons(data?.data)
    }

    useEffect(() => {
        getReklama()
        getLessons()
        getData()
    }, [])

    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/new_students/${id}/`,
            method: "delete",
            onSuccess: () => {
                getData()
                messageApi.open({
                    type: 'success',
                    content: "Yangi o'quvchi o'chirib yuborildi"
                })
            },
            onError: () => {
                messageApi.open({
                    type: 'error',
                    content: "Yangi o'quvchi o'chirilmadi!"
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
                    <Breadcrumb.Item className='text-[16px] text-[#787F95] font-medium'>Yangi o'quvchilar</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='w-full flex flex-col md:flex-row items-start md:items-center justify-between mt-4'>
                <h1 className='w-full text-[26px] text-[#002B48]'>Yangi o'quvchilar <span className='px-2 py-1 mx-4 bg-[#25B7D3] text-white rounded-md text-center text-sm font-bold'>
                    {data?.filter(item =>
                        (item?.first_name?.toLowerCase().includes(ismi.toLowerCase()) ||
                            item?.last_name?.toLowerCase().includes(ismi.toLowerCase())) &&
                        (item?.phone_number1?.includes(phone) ||
                            item?.phone_number2?.includes(phone))
                        && (item?.free_days?.includes(kun))
                        && (item?.lesson == fan || fan == "")
                        && (item?.got_recommended_by == rek || rek == "")
                    ).length}
                </span></h1>
                <div className='w-full flex items-center justify-between md:justify-end gap-4 md:my-4'>
                    {
                        !selectedData.length >= 1 ?
                            null :
                            <Button
                                type='ghost'
                                className='rounded-[5px] bg-[#25B7D3] text-[white]'
                                onClick={() => setAddPupilData({ isOpen: true, data: allSelected ? timeData : selectedData })}
                            >
                                + Guruhga qo'shish
                            </Button>
                    }
                    <Button
                        type='ghost'
                        className='rounded-[5px] bg-[#25B7D3] text-[white]'
                        onClick={() => setModalData({ isOpen: true, data: null })}

                    >
                        + Qo'shish
                    </Button>
                </div>
                <Create modalData={modalData} setModalData={setModalData} getData={getData} lessons={lessons} tavfsif={reklama} />
            </div>
            <div className='w-full'>
                {data?.length ?
                    <div className='mt-4 w-full h-full overflow-x-auto'>
                        <table className='min-w-[700px] w-full h-full text-left border-t border-solid border-[#F2F2FD]'>
                            <thead className='bg-[#25B7D3] text-white text-[14px] uppercase'>
                                <tr className='border border-solid border-[#F2F2FD]'>
                                    <th className='w-[50px] px-6 py-4 rounded-tl-[8px]'>N</th>
                                    <th className='min-w-[130px] p-4'>Ism familyasi</th>
                                    <th className='min-w-[130px] p-4'>telefon raqami</th>
                                    <th className='min-w-[130px] p-4'>fan nomi</th>
                                    <th className='min-w-[130px] p-4'>bo'sh kuni</th>
                                    <th className='min-w-[130px] p-4'>bo'sh vaqti</th>
                                    <th className='min-w-[130px] p-4'>reklama</th>
                                    <th className='w-[110px] p-4 rounded-tr-[8px]'>amallar</th>
                                </tr>
                            </thead>
                            <tbody className='h-full bg-white text-[#002B48] text-[16px]'>
                                <tr className='h-full'>
                                    <td></td>
                                    <td className='p-4'>
                                        <Input onChange={(e) => setIsmi(e.target.value)} prefix={<SearchOutlined />} className='shadow-md' placeholder='Izlash...' />
                                    </td>
                                    <td className='p-4'>
                                        <Input type='number' onChange={(e) => setPhone(e.target.value)} prefix={<SearchOutlined />} className='shadow-md' placeholder='Izlash...' />
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
                                    <td className='p-4'>
                                        <Select className='w-[110px] p-2' value={kun} onChange={(e) => setKun(e)}>
                                            <Select.Option value={""} className="w-full" >Xammasi</Select.Option>
                                            <Select.Option value={"1"} className="w-full" >Dushanba</Select.Option>
                                            <Select.Option value={"2"} className="w-full" >Seshanba</Select.Option>
                                            <Select.Option value={"3"} className="w-full" >Chorshanba</Select.Option>
                                            <Select.Option value={"4"} className="w-full" >Payshanba</Select.Option>
                                            <Select.Option value={"5"} className="w-full" >Juma</Select.Option>
                                            <Select.Option value={"6"} className="w-full" >Shanba</Select.Option>
                                            <Select.Option value={"7"} className="w-full" >Yakshanba</Select.Option>
                                        </Select>                                    </td>
                                    <td className='p-4'>
                                        {/* <Input onChange={(e) => setTavfsif(e.target.value)} prefix={<SearchOutlined />} className='shadow-md' placeholder='Izlash...' /> */}
                                    </td>
                                    <td className='p-4'>
                                        <Select className='w-[110px] p-2' value={rek} onChange={(e) => setRek(e)}>
                                            <Select.Option value={""} className="w-full" >Xammasi</Select.Option>
                                            {
                                                reklama?.map((item, ind) => {
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
                                    <td className='w-full h-full flex items-center justify-end pr-[1rem]'>
                                        <Checkbox
                                            checked={allSelected}
                                            // onChange={(e) => { setAllSelected(e.target.checked), setSelectedData([]) }}
                                            onChange={toggleSelectAll}
                                            className={"scale-[2] mx-2"}
                                        >
                                        </Checkbox>
                                    </td>
                                </tr>
                                {
                                    data?.filter(item =>
                                        (item?.first_name?.toLowerCase().includes(ismi.toLowerCase()) ||
                                            item?.last_name?.toLowerCase().includes(ismi.toLowerCase())) &&
                                        (item?.phone_number1?.includes(phone) ||
                                            item?.phone_number2?.includes(phone))
                                        && (item?.free_days?.includes(kun))
                                        && (item?.lesson == fan || fan == "")
                                        && (item?.got_recommended_by == rek || rek == "")
                                    )?.map((item, index) => {
                                        return (
                                            <tr key={item?.id} className='border border-solid border-[#F2F2FD]'>
                                                <td className='p-4'>
                                                    <span className='w-[30px] h-[30px] font-medium flex items-center justify-center rounded-[50%] border border-solid border-[#E1E8EE] bg-[#25B7D3] text-[white]'>{index + 1}</span>
                                                </td>
                                                <td className='p-4 min-w-[50px]'>{item?.first_name + " " + item?.last_name}</td>
                                                <td className='p-4 min-w-[50px]'>{"+" + item?.phone_number1 + " +" + item?.phone_number2}</td>
                                                <td className='p-4 min-w-[50px]'>{lessons?.map(lesson => lesson?.id == item?.id && lesson?.name)}</td>
                                                <td className='p-4 min-w-[50px]'>
                                                    <ul className='flex items-center gap-2'>
                                                        {
                                                            Array.from(item?.free_days).map((day, ind) => <li
                                                                className='p-2 bg-[#25B7D3] text-white rounded-md text-center text-sm font-bold'
                                                                key={ind}>
                                                                {/* {
                                                                    day == 1 ? "Dushanba" :
                                                                        day == 2 ? "Seshanba" :
                                                                            day == 3 ? "Chorshanba" :
                                                                                day == 4 ? "Payshanba" :
                                                                                    day == 5 ? "Juma" :
                                                                                        day == 6 ? "Shanba" :
                                                                                            day == 7 && "Yakshanba"
                                                                } */}
                                                                {
                                                                    day == 1 ? "D" :
                                                                        day == 2 ? "S" :
                                                                            day == 3 ? "Ch" :
                                                                                day == 4 ? "P" :
                                                                                    day == 5 ? "J" :
                                                                                        day == 6 ? "Sh" :
                                                                                            day == 7 && "Y"
                                                                }
                                                            </li>)
                                                        }
                                                    </ul>
                                                </td>
                                                <td className='p-4 min-w-[50px]'>
                                                    {item?.free_time1?.slice(0, 5) + " - " + item?.free_time2?.slice(0, 5)}
                                                </td>
                                                <td className='p-4 min-w-[50px]'>
                                                    {reklama?.map(rek => rek?.id == item?.got_recommended_by && rek?.name)}
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
                                                        {
                                                            !allSelected &&
                                                            <Checkbox
                                                                onChange={(e) => selectedFunction(e, item)}
                                                                className={"scale-[2] mx-2"}
                                                            >
                                                            </Checkbox>
                                                        }
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
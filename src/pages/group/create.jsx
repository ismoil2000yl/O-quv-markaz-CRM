import { Breadcrumb, Button, Card, Checkbox, DatePicker, Form, Input, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from 'services/api'
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

const create = () => {

    const navigate = useNavigate()

    const [teachers, setTeachers] = useState([])
    const [users, setUsers] = useState([])
    const [lessons, setLessons] = useState([])
    const [changeDate, setChangeDate] = useState("")

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [fan, setFan] = useState("")
    const [data, setData] = useState([])
    const [reklama, setReklama] = useState([])
    const [selectedData, setSelectedData] = useState([])
    const [allSelected, setAllSelected] = useState(false)


    const toggleSelectAll = (e) => {
        const checked = e.target.checked;
        setAllSelected(checked);
    
        if (checked) {
            // Select all items and push only their ids
            const filteredData = data.filter(item => item?.lesson == fan || fan === "");
            const allIds = filteredData.map(item => item.id);  // Push only the ids
            setSelectedData(allIds);  // Update selectedData with ids
        } else {
            setSelectedData([]); // Clear the selected data
        }
    };    

    const selectedFunction = (e, row) => {
        const newData = [...selectedData];
        if (e.target.checked) {
            newData.push(row.id);  // Only push the id
            setSelectedData(newData);
        } else {
            const indexToRemove = newData.indexOf(row.id);  // Find by id
            if (indexToRemove !== -1) {
                newData.splice(indexToRemove, 1);  // Remove by id
                setSelectedData(newData);
            }
        }
    };

    const getUsers = async () => {
        const data = await api.get("/users/")
        const users = data?.data?.filter(item => item?.status?.includes("teacher_user"))
        setUsers(users)
    }

    const getTeachers = async () => {
        const data = await api.get("/teachers/")
        setTeachers(data?.data)
    }

    const getLessons = async () => {
        const data = await api.get('/lessons/')
        setLessons(data?.data)
    }

    const getReklama = async () => {
        const data = await api.get('/ads/')
        setReklama(data?.data)
    }

    const getData = async () => {
        const data = await api.get('/new_students/')
        setData(data?.data)
    }

    useEffect(() => {
        getUsers()
        getReklama()
        getLessons()
        getData()
        getTeachers()
    }, [])

    const dateChange = (date, dateString) => {
        setChangeDate(dateString);
    };

    const onFinish = async (values) => {
        const sendData = {
            name: values?.name,
            lesson: values?.lesson,
            teacher: values?.teacher,
            students: selectedData,
            start_date: changeDate,
            status: values?.status
        }

        console.log(sendData);

        try {
            await api.post('/groups/', sendData);
            navigate("/group")
            messageApi.open({
                type: 'success',
                content: "Yangi guruh yaratildi"
            });
            form.resetFields();
        } catch (error) {
            console.log(error);
            messageApi.open({
                type: 'error',
                content: "Guruh yaratilmadi",
            });
        }
    }

    return (
        <div className='w-full h-[87vh] px-4 py-2 overflow-y-auto'>
            {contextHolder}
            <Form
                form={form}
                // name="horizontal_login"
                layout="inline"
                onFinish={onFinish}
                className="w-full"
            >
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => navigate("/")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Bosh sahifa</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => navigate("/group")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Guruhlar</Breadcrumb.Item>
                        <Breadcrumb.Item className='text-[16px] text-[#002B48] font-medium'>Guruh yaratish</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card className='w-full min-w-[300px] overflow-x-auto mt-6'>
                    <div className='px-2 py-4'>
                        <h1 className='text-[24px] text-[#273E7C]'>Guruh ma'lumotlari</h1>
                        <div className='w-full mx-auto my-2 flex items-center justify-start gap-4 flex-wrap'>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Guruh nomi</h4>
                                <Form.Item
                                    name={`name`}
                                    className='w-full'
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Guruh nomi kiritilmagan...!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Guruh nomi"
                                        type='text'
                                    />
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>O'qituvchisi</h4>
                                <Form.Item
                                    name={`teacher`}  // Yangi nom berildi
                                    className='w-full'
                                >
                                    <Select
                                    >
                                        {
                                            teachers?.map(item => {
                                                return (
                                                    <Select.Option key={item?.id} value={item?.id}>
                                                        {users?.map(user => user?.id == item?.teacher && user?.first_name + " " + user?.last_name)}
                                                    </Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Fan</h4>
                                <Form.Item
                                    name={`lesson`}  // Yangi nom berildi
                                    className='w-full'
                                >
                                    <Select
                                        value={fan}
                                        onChange={(e) => setFan(e)}
                                    >
                                        {
                                            lessons?.map(item => {
                                                return (
                                                    <Select.Option key={item?.id} value={item?.id}>{item?.name}</Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Dars boshlanish sanasi</h4>
                                <Form.Item
                                    name={"start_day"}
                                    className='w-full'
                                >
                                    <DatePicker className='w-full' onChange={dateChange} />
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Guruh xolati</h4>
                                <Form.Item
                                    name={`status`}
                                    className='w-full'
                                >
                                    <Select
                                    // value={typeSalary}
                                    // onChange={(e) => setTypeSalary(e)}
                                    >
                                        <Select.Option value={true}>Faol</Select.Option>
                                        <Select.Option value={false}>Faol emas</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className='w-full min-w-[300px] overflow-x-auto mt-6'>
                    <div className='px-2 py-4'>
                        <h1 className='text-[24px] text-[#273E7C]'>O'quvchilar ro'yhati <span className='px-2 py-1 mx-4 bg-[#25B7D3] text-white rounded-md text-center text-sm font-bold'>{selectedData?.length}</span></h1>
                        <Form.Item
                            name={`students`}  // Yangi nom berildi
                            className='w-full'
                        >
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
                                            <th className='w-[110px] p-4 rounded-tr-[8px] flex items-center justify-center'>
                                                <span className='border border-solid border-white w-[38px] h-[38px] rounded-lg flex items-center justify-center'>
                                                    <Checkbox
                                                        checked={allSelected}
                                                        // onChange={(e) => { setAllSelected(e.target.checked), setSelectedData([]) }}
                                                        onChange={toggleSelectAll}
                                                        className={"scale-[2] mx-2"}
                                                    >
                                                    </Checkbox>
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='h-full bg-white text-[#002B48] text-[16px]'>
                                        {
                                            data?.filter(item =>
                                                (item?.lesson == fan || fan == "")
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
                        </Form.Item>
                    </div>
                </Card>
                <div className='w-full flex items-center justify-end gap-4 mt-6'>
                    <Button type='primary' danger onClick={() => navigate("/group")}>
                        <CloseOutlined />
                        Bekor qilish
                    </Button>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                type='ghost'
                                className='rounded-[5px] bg-[#25B7D3] text-[white]'
                                htmlType="submit">
                                <PlusOutlined />
                                Yaratish
                            </Button>
                        )}
                    </Form.Item>
                </div>
            </Form>
        </div >
    )
}

export default create
import { Breadcrumb, Button, Card, DatePicker, Form, Input, Popconfirm, Select, Tooltip, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ImgMen from 'assets/images/jpg/men.jpg'
import api from 'services/api'
import { usePost } from 'crud'
import IconUser from 'assets/images/png/user.png'
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";

const personal = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [clientReady, setClientReady] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { TextArea } = Input;
    const [loading, setLoading] = useState(false)
    const [typeSalary, setTypeSalary] = useState("")
    const [salary, setSalary] = useState(0)
    const [lessons, setLessons] = useState([])
    const [data, setData] = useState({})
    const [teacher, setTeacher] = useState({})

    const getData = async () => {
        const data = await api.get(`/users/${id}`)
        setData(data?.data)
    }

    const getTeacher = async () => {
        const data = await api.get(`/teachers/${id}`)
        setTeacher(data?.data)
    }

    const getLesson = async () => {
        const data = await api.get("/lessons/")
        setLessons(data?.data)
    }

    useEffect(() => {
        getData()
        getTeacher()
        getLesson()
        setClientReady(true);
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            first_name: data?.first_name || "",
            last_name: data?.last_name || "",
            gender: data?.gender || "",
            address: data?.address || "",
            phone_number: data?.phone_number || "",
            subject: teacher?.subject || ""
        });
    }, [data]);

    const onFinish = async (values) => {
        console.log(values);
        const formData = new FormData();
        try {
            // Shaxsiy ma'lumotlarni yangilash uchun so'rov
            const userUpdate = api.patch(`/users/${id}/`, {
                first_name: values.first_name,
                last_name: values.last_name,
                phone_number: values.phone_number,
                address: values.address,
                gender: values.gender,
            });
    
            // O'qituvchining ma'lumotlarini yangilash uchun so'rov
            const teacherUpdate = api.patch(`/teachers/${id}/`, {
                salary_type: typeSalary,
                salary: salary,
                subject: values.subject,
            });
    
            // Ikki so'rovni ham parallel yuborish
            await Promise.all([userUpdate, teacherUpdate]);
    
            setLoading(false);
            messageApi.open({
                type: 'success',
                content: "Ma'lumotlar muvaffaqiyatli yangilandi",
            });
            form.resetFields();
    
        } catch (error) {
            console.log(error);
            setLoading(false);
            messageApi.open({
                type: 'error',
                content: "Ma'lumotlar yangilanishi muvaffaqiyatsiz bo'ldi!",
            });
        }
    };
    

    const { mutate: deletedHandler } = usePost()

    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/users/${id}`,
            method: "delete",
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: "O'qituvchi o'chirib yuborildi"
                }),
                    getData(),
                    navigate("/xodimlar/o'qituvchi")
            },
            onError: () => {
                messageApi.open({
                    type: 'error',
                    content: "O'qituvchi o'chirilmadi!"
                })
            }
        })
    };

    return (
        <div className='w-full h-[87vh] overflow-y-auto px-4 py-2'>
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
                        <Breadcrumb.Item className='text-[16px] text-[#787F95] font-medium'>Xodimlar</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => navigate("/xodimlar/o'qituvchi")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>O'qituvchilar</Breadcrumb.Item>
                        <Breadcrumb.Item className='text-[16px] text-[#002B48] font-medium'>Tahrirlash</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='w-full mt-8 flex items-start md:items-center flex-col md:flex-row justify-start gap-6'>
                    <div className='w-[120px] h-[120px] bg-white p-1 flex items-center justify-center rounded-[50%]'>
                        <img src={data?.user_image ? data?.user_image : IconUser} className='w-full h-full rounded-[50%] object-contain' alt="" />
                    </div>
                    <div className='text-left'>
                        <h1 className='text-[#002B48] text-[26px]'>{data?.first_name + " " + data?.last_name}</h1>
                        <p className='text-[#002B48] text-[16px] font-medium'>O'qituvchi</p>
                    </div>
                </div>
                <Card className='w-full min-w-[300px] overflow-x-auto mt-6'>
                    <div className='px-2 py-4'>
                        <h1 className='text-[24px] text-[#273E7C]'>Shaxsiy ma'lumotlar</h1>
                        <div className='w-full mx-auto my-2 flex items-center justify-start gap-4 flex-wrap'>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>familyasi</h4>
                                <Form.Item
                                    name={`first_name`}
                                    className='w-full'
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Familya kiritilmagan...!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Familya"
                                        type='text'
                                        className='py-2'
                                    />
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>ismi</h4>
                                <Form.Item
                                    name={`last_name`}
                                    className='w-full'
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Ism kiritilmagan...!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Ism"
                                        type='text'
                                        className='py-2'
                                    />
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Telefon raqami</h4>
                                <Form.Item
                                    name={`phone_number`}
                                    className='w-full'
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Telefon raqami kiritilmagan...!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Telefon raqami"
                                        type='text'
                                        className='py-2'
                                    />
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>jinsi</h4>
                                <Form.Item
                                    name={"gender"}
                                    className='w-full'
                                >
                                    <Select
                                        onChange={() => { }}
                                        className='py-2'
                                        defaultValue={"Genderni tanlang"}
                                        options={[
                                            {
                                                value: 'Erkak',
                                                label: 'Erkak',
                                            },
                                            {
                                                value: 'Ayol',
                                                label: 'Ayol',
                                            }
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                            <div className='w-full flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>manzili</h4>
                                <Form.Item
                                    name={`address`}
                                    className='w-full'
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Manzili kiritilmagan...!',
                                        },
                                    ]}
                                >
                                    <TextArea
                                        placeholder="Manzil"
                                        type='text'
                                        className='py-2'
                                        rows={6}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className='w-full min-w-[300px] overflow-x-auto mt-8'>
                    <div className='px-2 py-4'>
                        <h1 className='text-[24px] text-[#273E7C]'>O'qituvchining ma'lumotlari</h1>
                        <div className='w-full mx-auto my-2 flex items-center justify-start gap-4 flex-wrap'>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Oylik maosh turi</h4>
                                <Form.Item
                                    name={`salary_type`}  // Yangi nom berildi
                                    className='w-full'
                                >
                                    <Select
                                        value={typeSalary}
                                        onChange={(e) => setTypeSalary(e)}
                                        className='py-2'
                                    >
                                        <Select.Option value="commission_based_salary">Foizli</Select.Option>
                                        <Select.Option value="fixed_salary">Aniq summa</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Oylik maoshi</h4>
                                <Form.Item
                                    name={`salary`}  // Yangi nom berildi
                                    className='w-full'
                                >
                                    <Input
                                        placeholder="Oylik maoshi"
                                        type='number'
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        className='py-2'
                                    />
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>O'qituvchining darslari</h4>
                                <Form.Item
                                    name={`subject`}  // O'qituvchining darslari
                                    className='w-full'
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Darslar tanlanmagan...!',
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        className='py-3 w-full'
                                    >
                                        {lessons.map((item, idx) => {
                                            return (
                                                <Select.Option value={item?.id} key={idx}>
                                                    {item.name}
                                                </Select.Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className='w-full flex items-center justify-end gap-4 my-6'>
                    <Popconfirm
                        placement="topRight"
                        title={"O'chirish"}
                        description={"O'chirishni xoxlaysizmi?"}
                        onConfirm={() => deleteConfirm(id)}
                        onCancel={() => { }}
                        okText="Ha"
                        cancelText="Yo'q"
                    >
                        <Button
                            type='ghost'
                            className='text-[white] bg-red-500 hover:bg-red-600'
                        >
                            <DeleteOutlined />
                            Profilni o'chirish
                        </Button>
                    </Popconfirm>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                type='ghost'
                                htmlType="submit"
                                onClick={() => setLoading(true)}
                                loading={loading}
                                className='bg-[#5973BC] hover:bg-[#3e59a3] text-[white]'
                            >
                                {loading ? "" : <CheckOutlined />}
                                {loading ? "Saqlanmoqda..." : `Saqlash`}
                            </Button>
                        )}
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default personal
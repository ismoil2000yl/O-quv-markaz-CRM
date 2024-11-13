import { Breadcrumb, Button, Card, DatePicker, Form, Input, Popconfirm, Select, Tooltip, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ImgMen from 'assets/images/jpg/men.jpg'
import api from 'services/api'
import { usePost } from 'crud'
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";

const personal = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { TextArea } = Input;
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState([])

    const getData = async () => {
        const data = await api.get(`/api/${id}`)
        setData(data?.data?.data)
    }

    useEffect(() => {
        getData()
        setClientReady(true);
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            first_name: "Jalolov"
        });
    }, [data]);

    const onFinish = async (values) => {
        console.log(values);
        const formData = new FormData();
        try {
            return (await api.patch(`/api`, values)
                .then(() => {
                    getData(),
                        setLoading(false),
                        messageApi.open({
                            type: 'success',
                            content: "Ma'lumot tahrirlandi"
                        }),
                        form.resetFields()
                })
            )
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            messageApi.open({
                type: 'error',
                content: "Ma'lumot tahrirlanmadi!",
            });
        }
    }

    const { mutate: deletedHandler } = usePost()

    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/api/${id}`,
            method: "delete",
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: "O'quvchi o'chirib yuborildi"
                }),
                    getData()
            },
            onError: () => {
                messageApi.open({
                    type: 'error',
                    content: "O'quvchi o'chirilmadi!"
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
                        <Breadcrumb.Item onClick={() => navigate("/xodimlar/o'quvchi")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>O'quvchilar</Breadcrumb.Item>
                        <Breadcrumb.Item className='text-[16px] text-[#002B48] font-medium'>Tahrirlash</Breadcrumb.Item>
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
                <Card className='w-full min-w-[300px] overflow-x-auto '>
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
                                <h4 className='uppercase text-[12px] text-[#787F95]'>otasining ismi</h4>
                                <Form.Item
                                    name={`otasining_ismi`}
                                    className='w-full'
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Otasining ismi kiritilmagan...!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Otasining ismi"
                                        type='text'
                                        className='py-2'
                                    />
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>tug'ilgan sanasi</h4>
                                <Form.Item
                                    name={`date`}
                                    className='w-full'
                                    rules={[
                                        {
                                            required: false,
                                            message: "Tug'ilgan sanasi kiritilmagan...!",
                                        },
                                    ]}
                                >
                                    {/* <Input
                                        placeholder="Tug'ilgan sanasi"
                                        type='text'
                                        className='py-2'
                                    /> */}
                                    <DatePicker
                                        onChange={(date, string) => console.log(string)}
                                        className='py-2 w-full cursor-pointer'
                                    />
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Telefon raqami</h4>
                                <Form.Item
                                    name={`phone`}
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
                                    name={`manzili`}
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
                        <h1 className='text-[24px] text-[#273E7C]'>Login va Parol</h1>
                        <div className='w-full mx-auto my-2 flex items-center justify-start gap-4 flex-wrap'>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Login</h4>
                                <Form.Item
                                    name={`login`}
                                    className='w-full'
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Login kiritilmagan...!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Login"
                                        type='text'
                                        className='py-2'
                                    />
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Parol</h4>
                                <Form.Item
                                    name={`Password`}
                                    className='w-full'
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Parol kiritilmagan...!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Parol"
                                        type='text'
                                        className='py-2'
                                    />
                                </Form.Item>
                            </div>
                            <div className='w-full md:w-[48%] lg:w-[32%] flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>ro'yhatga olingan sana</h4>
                                <Form.Item
                                    name={`date`}
                                    className='w-full'
                                    rules={[
                                        {
                                            required: false,
                                            message: "Ro'yhatga olingan sana kiritilmagan...!",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Ro'yhatga olingan sana"
                                        type='text'
                                        className='py-2'
                                    />
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
                        onConfirm={() => deleteConfirm(6)}
                        onCancel={() => { }}
                        okText="Ha"
                        cancelText="Yo'q"
                    >
                        <Button
                            type='ghost'
                            className='text-[white] bg-red-500 hover:bg-red-600'
                        >
                            <DeleteOutlined />
                            O'chirish
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
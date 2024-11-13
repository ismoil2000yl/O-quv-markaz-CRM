import { Breadcrumb, Button, Card, DatePicker, Form, Input, Popconfirm, Select, Spin, Tooltip, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ImgMen from 'assets/images/jpg/men.jpg'
import api from 'services/api'
import { usePost } from 'crud'
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import IconUser from 'assets/images/png/user.png'

const personal = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { TextArea } = Input;
    const [loading, setLoading] = useState(false)
    const [imgIsShow, setImgIsShow] = useState(false);
    const [preview, setPreview] = useState({ modal: false, url: '' });

    const [data, setData] = useState({})

    const getData = async () => {
        const data = await api.get(`/users/${id}`)
        setData(data?.data)
    }

    useEffect(() => {
        getData()
        setClientReady(true);
    }, [])

    const handlePreview = async (file) => {
        setPreview({ modal: true, url: file?.thumbUrl });
    };

    const handleRemove = () => {
        setImgIsShow(false);
    };

    useEffect(() => {
        form.setFieldsValue({
            first_name: data?.first_name,
            last_name: data?.last_name,
            phone_number: data?.phone_number,
            gender: data?.gender,
            address: data?.address,
            status: data?.status,
            user_image: data?.user_image
        });
    }, [data]);

    const onFinish = async (values) => {
        const formData = new FormData();
        if (values.image && values.image[0]) {
            formData.append("image", values.image[0].originFileObj);
        }
        formData.append("first_name", values?.first_name);
        formData.append("last_name", values?.last_name);
        formData.append("phone_number", values?.phone_number);
        formData.append("gender", values?.gender);
        formData.append("address", values?.address);
        try {
            return (await api.patch(`/users/${data?.id}/`, formData)
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
            url: `/users/${id}`,
            method: "delete",
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: "Administrator o'chirib yuborildi"
                }),
                    getData(),
                    navigate("/xodimlar/administrator")
            },
            onError: () => {
                messageApi.open({
                    type: 'error',
                    content: "Administrator o'chirilmadi!"
                })
            }
        })
    };

    return (
        <div className='w-full h-[87vh] overflow-y-auto px-4 py-2'>
            {contextHolder}
            {
                data.id ?
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
                                <Breadcrumb.Item onClick={() => navigate("/xodimlar")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Xodimlar</Breadcrumb.Item>
                                <Breadcrumb.Item onClick={() => navigate('/xodimlar/administrator')} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Administrator</Breadcrumb.Item>
                                <Breadcrumb.Item className='text-[16px] text-[#002B48] font-medium'>Tahrirlash</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className='w-full mt-8 flex items-start md:items-center flex-col md:flex-row justify-start gap-6'>
                        <div>
                                <Form.Item
                                    name="image"
                                    valuePropName="fileList"
                                    getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                                    className='w-full'
                                >
                                    <Upload
                                        listType="picture-circle"
                                        onPreview={handlePreview}
                                        onRemove={handleRemove}
                                    >
                                        {
                                            imgIsShow ? null :
                                                "+ Upload"
                                        }
                                    </Upload>
                                </Form.Item>
                            </div>
                            <div className='w-[120px] h-[120px] bg-white p-1 flex items-center justify-center rounded-[50%]'>
                                <img src={data?.user_image ? data?.user_image : IconUser} className='w-full h-full rounded-[50%]' alt="" />
                            </div>
                            <div className='text-left'>
                                <h1 className='text-[#002B48] text-[26px]'>{data?.first_name + ' ' + data?.last_name}</h1>
                                <p className='text-[#002B48] text-[16px] font-medium'>Administrator</p>
                            </div>
                        </div>
                        {/* <div className="my-6 flex items-end justify-start gap-3">
                    <h1 className='text-[#002B48] text-[26px]'>O'quv markaz nomi :</h1>
                    <h1 className='text-[#517DF8] text-[26px] uppercase'>ICEBERK</h1>
                </div> */}
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
                                                        value: 'male_user',
                                                        label: 'Erkak',
                                                    },
                                                    {
                                                        value: 'female_user',
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
                        {/* <Card className='w-full min-w-[300px] overflow-x-auto mt-8'>
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
                        </div>
                    </div>
                </Card> */}
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
                    :
                    <div className='w-full h-full flex items-center justify-center'>
                        <Spin tip="Loading" size="large">
                            <div className="content" />
                        </Spin>
                    </div>
            }
        </div>
    )
}

export default personal
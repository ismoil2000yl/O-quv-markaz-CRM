import { Button, DatePicker, Drawer, Form, Input, Select, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react'
import api from 'services/api';
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const create = ({ modal, setModal, id, getData }) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [imgIsShow, setImgIsShow] = useState(false);
    const [preview, setPreview] = useState({ modal: false, url: '' });
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [typeSalary, setTypeSalary] = useState("")
    const [salary, setSalary] = useState(0)

    const [lessons, setLessons] = useState([])
    // const [sendData, setSendData] = useState([])

    const handlePreview = async (file) => {
        setPreview({ modal: true, url: file?.thumbUrl })
    }

    const handleRemove = () => {
        setImgIsShow(false)
    }

    const getLesson = async () => {
        const data = await api.get("/lessons/")
        setLessons(data?.data)
    }

    useEffect(() => {
        getLesson()
    }, [])

    // const handleChange = (value) => {
    //     const parseData = value.map(item => JSON.parse(item))
    //     setSendData(parseData);
    // };

    const onFinish = async (values) => {
        setLoading(true)
        const formData = new FormData();
        if (values.user_image && values.user_image[0]) {
            formData.append("image", values.user_image[0].originFileObj);
        }
        formData.append("password", values?.password)
        formData.append("first_name", values?.first_name)
        formData.append("last_name", values?.last_name)
        formData.append("phone_number", values?.phone)
        formData.append("gender", values?.gender)
        formData.append("address", values?.address)
        formData.append("status", "teacher_user")
        formData.append("salary_type", typeSalary)
        formData.append("commission", salary)
        formData.append("subject", values?.subject)
        console.log(formData);
        try {
            return (await api.post(`/teachers/create_new_teacher/`, formData)
                .then(() => {
                    getData(),
                        setLoading(false),
                        messageApi.open({
                            type: 'success',
                            content: "O'qituvchi qo'shildi"
                        }),
                        form.resetFields(),
                        setModal(false)
                })
            )
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            messageApi.open({
                type: 'error',
                content: "O'qituvchi qo'shilmadi",
            });
        }
    }

    useEffect(() => {
        if (image) {
            setImgIsShow(true)
        }
    }, [image])

    return (
        <Drawer
            destroyOnClose
            title={"O'qituvchi qo'shish"}
            placement={"right"}
            closable={false}
            // onClose={() => setModalData({ isOpen: false, data: null })}
            open={modal}
        >
            {contextHolder}
            <div className='w-full h-full'>
                <div className='flex flex-col items-start justify-start gap-2'>
                    <Form
                        form={form}
                        // name="horizontal_login"
                        layout="inline"
                        onFinish={onFinish}
                        className="w-full"
                    >
                        <div className='w-full mx-auto my-2 flex items-center justify-start gap-4 flex-wrap'>
                            <div className='w-full flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Rasmi:</h4>
                                <Form.Item
                                    name="user_image"
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
                            <div className='w-full flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Parol</h4>
                                <Form.Item
                                    name={`password`}
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
                            <div className='w-full flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>ismi</h4>
                                <Form.Item
                                    name={`first_name`}
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
                            <div className='w-full flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>familyasi</h4>
                                <Form.Item
                                    name={`last_name`}
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
                            <div className='w-full flex flex-col justify-start items-start'>
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
                            <div className='w-full flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>O'qituvchining darslari</h4>
                                <Form.Item
                                    name={`subject`}
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
                                        {
                                            lessons.map((item, idx) => {
                                                return (
                                                    <Select.Option
                                                        value={item?.id}
                                                        key={idx}
                                                    >
                                                        {item.name}
                                                    </Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='w-full flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Oylik maosh turi</h4>
                                <Select className='w-full' defaultValue='Oylik maosh turini tanlang' value={typeSalary} onChange={(e) => setTypeSalary(e)}>
                                    <Select.Option
                                        value={"commission_based_salary"}
                                    >
                                        Foizli
                                    </Select.Option>
                                    <Select.Option
                                        value={"fixed_salary"}
                                    >
                                        Aniq summa
                                    </Select.Option>
                                </Select>
                            </div>

                            <div className='w-full flex flex-col justify-start items-start'>
                                <h4 className='uppercase text-[12px] text-[#787F95]'>Oylik maoshi</h4>
                                <Input
                                    placeholder="Oylik maoshi"
                                    type='number'
                                    onChange={(e) => setSalary(e.target.value)}
                                    className='py-2'
                                />
                            </div>
                            <div className='w-full flex flex-col justify-start items-start'>
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
                        <div className='w-full flex items-center justify-between gap-4 my-4'>
                            <Button
                                type='ghost'
                                onClick={() => setModal(false)}
                                className='text-white bg-red-500 hover:bg-red-600'
                            >
                                <CloseOutlined />
                                Bekor qilish
                            </Button>
                            <Form.Item shouldUpdate>
                                <Button
                                    type='ghost'
                                    htmlType="submit"
                                    loading={loading}
                                    className='bg-[#5973BC] hover:bg-[#3e59a3] text-[white]'
                                >
                                    {loading ? "" : <CheckOutlined />}
                                    {loading ? "Saqlanmoqda..." : `Saqlash`}
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </Drawer>
    )
}

export default create
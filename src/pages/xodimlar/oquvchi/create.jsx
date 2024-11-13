import { Button, DatePicker, Drawer, Form, Input, Select, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react'
import api from 'services/api';
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const create = ({ modal, setModal, id, getData }) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [imgIsShow, setImgIsShow] = useState(false)
    const [preview, setPreview] = useState({ modal: false, url: '' })
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    const { TextArea } = Input;

    const handlePreview = async (file) => {
        setPreview({ modal: true, url: file?.thumbUrl })
    }

    const handleRemove = () => {
        setImgIsShow(false)
    }

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
                            content: "O'quvchi qo'shildi"
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
                content: "O'quvchi qo'shilmadi",
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
            title={"O'quvchi qo'shish"}
            placement={"right"}
            closable={false}
            // onClose={() => setModalData({ isOpen: false, data: null })}
            open={modal}
        >
            {contextHolder}
            <div className='w-full h-full'>
                <div className='flex flex-col items-start justify-start gap-2'>
                    <div className='w-full flex items-center flex-col'>
                        <h4>Rasmi:</h4>
                        <div className='flex items-center justify-center'>
                            <Upload
                                listType="picture-circle"
                                onChange={(e) => setImage(e.file.originFileObj)}
                                onPreview={handlePreview}
                                onRemove={handleRemove}
                            // customRequest={customRequest}
                            >
                                {
                                    imgIsShow ? null :
                                        "+ Upload"
                                }
                            </Upload >
                        </div>
                    </div>
                    <Form
                        form={form}
                        // name="horizontal_login"
                        layout="inline"
                        onFinish={onFinish}
                        className="w-full"
                    >
                        <div className='w-full mx-auto my-2 flex items-center justify-start gap-4 flex-wrap'>
                            <div className='w-full flex flex-col justify-start items-start'>
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
                            <div className='w-full flex flex-col justify-start items-start'>
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
                            <div className='w-full flex flex-col justify-start items-start'>
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
                            <div className='w-full flex flex-col justify-start items-start'>
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
                            <div className='w-full flex flex-col justify-start items-start'>
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
                            <div className='w-full flex flex-col justify-start items-start'>
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
                        <div className='w-full flex items-center justify-between gap-4 my-4'>
                            <Button
                                type='ghost'
                                onClick={() => setModal(false)}
                                className='text-white bg-red-500 hover:bg-red-600'
                            >
                                <CloseOutlined />
                                Bekor qilish
                            </Button>
                            <Button
                                type='ghost'
                                loading={loading}
                                className='bg-[#5973BC] hover:bg-[#3e59a3] text-[white]'
                            >
                                {loading ? "" : <CheckOutlined />}
                                {loading ? "Saqlanmoqda..." : `Saqlash`}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Drawer>
    )
}

export default create
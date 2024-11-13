import { Button, Drawer, Form, Input, message, Select, TimePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import api from 'services/api';

const create = ({ modalData, setModalData, getData, lessons, tavfsif }) => {

    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { TextArea } = Input;
    const [timeDan, setTimeDan] = useState("");
    const [timeGacha, setTimeGacha] = useState("");

    const changeDan = (time, timeString) => {
        setTimeDan(timeString);
    };

    const changeGacha = (time, timeString) => {
        setTimeGacha(timeString);
    };

    useEffect(() => {
        setClientReady(true);
    }, []);

    const onFinish = async (values) => {
        values.free_time1 = timeDan;
        values.free_time2 = timeGacha;
        if (values.free_days) {
            values.free_days = values.free_days.join('');
        }
        if (modalData?.data) {
            try {
                await api.patch(`/new_students/${modalData?.data?.id}/`, values);
                setModalData({ isOpen: false, data: null });
                getData();
                messageApi.open({
                    type: 'success',
                    content: "Yangi O'quvchi tahrirlandi"
                });
                form.resetFields();
            } catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Yangi O'quvchi tahrirlanmadi!",
                });
            }
        } else {
            try {
                await api.post('/new_students/', values);
                setModalData({ isOpen: false, data: null });
                getData();
                messageApi.open({
                    type: 'success',
                    content: "Yangi O'quvchi qo'shildi"
                });
                form.resetFields();
            } catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Yangi O'quvchi qo'shilmadi...!",
                });
            }
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            first_name: modalData?.data?.first_name || '',
            last_name: modalData?.data?.last_name || '',
            phone_number1: modalData?.data?.phone_number1 || '',
            phone_number2: modalData?.data?.phone_number2 || '',
            free_days: modalData?.data?.free_days,
            free_time1: modalData?.data?.free_time1 || '',
            free_time2: modalData?.data?.free_time2 || '',
            lesson: modalData?.data?.lesson || '',
            got_recommended_by: modalData?.data?.got_recommended_by || '',
        });
    }, [modalData?.data]);

    return (
        <Drawer
            destroyOnClose
            title={"Yangi o'quvchi qo'shish"}
            placement={"right"}
            closable={false}
            open={modalData?.isOpen}
        >
            {contextHolder}
            <Form
                form={form}
                className={"flex justify-center items-end flex-col gap-4"}
                name="horizontal_login"
                layout="inline"
                onFinish={onFinish}
            >
                <div className='w-full flex flex-col justify-start items-start'>
                    <h4 className='uppercase text-[12px] text-[#787F95]'>Ismi</h4>
                    <Form.Item
                        name="first_name"
                        className='w-full'
                        rules={[
                            {
                                required: modalData?.data ? false : true,
                                message: 'Ismi kiritilmagan...!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Ismi"
                            className='py-2'
                        />
                    </Form.Item>
                </div>
                <div className='w-full flex flex-col justify-start items-start'>
                    <h4 className='uppercase text-[12px] text-[#787F95]'>Familyasi</h4>
                    <Form.Item
                        name="last_name"
                        className='w-full'
                        rules={[
                            {
                                required: modalData?.data ? false : true,
                                message: 'Familyasi kiritilmagan...!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Familyasi"
                            className='py-2'
                        />
                    </Form.Item>
                </div>
                <div className='w-full flex flex-col justify-start items-start'>
                    <h4 className='uppercase text-[12px] text-[#787F95]'>Telefon raqami</h4>
                    <Form.Item
                        name="phone_number1"
                        className='w-full'
                        rules={[
                            {
                                required: modalData?.data ? false : true,
                                message: 'Telefon raqami kiritilmagan...!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Telefon raqami"
                            className='py-2'
                            type='number'
                        />
                    </Form.Item>
                </div>
                <div className='w-full flex flex-col justify-start items-start'>
                    <h4 className='uppercase text-[12px] text-[#787F95]'>qo'shimcha telefon raqami</h4>
                    <Form.Item
                        name="phone_number2"
                        className='w-full'
                        rules={[
                            {
                                required: modalData?.data ? false : true,
                                message: 'Telefon raqami kiritilmagan...!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Qo'shimcha telefon raqami"
                            className='py-2'
                            type='number'
                        />
                    </Form.Item>
                </div>
                <div className='w-full flex flex-col justify-start items-start'>
                    <h4 className='uppercase text-[12px] text-[#787F95]'>Fan</h4>
                    <Form.Item
                        name="lesson"
                        className='w-full'
                        rules={[
                            {
                                required: modalData?.data ? false : true,
                                message: 'Fan tanlanmagan...!',
                            },
                        ]}
                    >
                        <Select
                            className='py-2 w-full'
                        >
                            {
                                lessons?.map((item) => (
                                    <Select.Option
                                        key={item?.id}
                                        value={item?.id}
                                    >
                                        {item?.name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </div>
                <div className='w-full flex flex-col justify-start items-start'>
                    <h4 className='uppercase text-[12px] text-[#787F95]'>Bo'sh kunlari</h4>
                    <Form.Item
                        name="free_days"
                        className='w-full'
                        rules={[
                            {
                                required: modalData?.data ? false : true,
                                message: 'Kun tanlanmagan...!',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            className='py-2 w-full'
                        >
                            <Select.Option value={1}>Dushanba</Select.Option>
                            <Select.Option value={2}>Seshanba</Select.Option>
                            <Select.Option value={3}>Chorshanba</Select.Option>
                            <Select.Option value={4}>Payshanba</Select.Option>
                            <Select.Option value={5}>Juma</Select.Option>
                            <Select.Option value={6}>Shanba</Select.Option>
                            <Select.Option value={7}>Yakshanba</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className='w-full flex flex-col justify-start items-start'>
                    <h4 className='uppercase text-[12px] text-[#787F95]'>Bo'sh vaqtlari</h4>
                    <div className='w-full flex items-center justify-start gap-2'>
                        <Form.Item name="free_time1">
                        </Form.Item>
                        <TimePicker onChange={changeDan} format="HH:mm" />
                        <span>dan</span>
                        <Form.Item name="free_time2">
                        </Form.Item>
                        <TimePicker onChange={changeGacha} format="HH:mm" />
                        <span>gacha</span>
                    </div>
                </div>
                <div className='w-full flex flex-col justify-start items-start'>
                    <h4 className='uppercase text-[12px] text-[#787F95]'>Kim tavfsiya qildi</h4>
                    <Form.Item
                        name="got_recommended_by"
                        className='w-full'
                    >
                        <Select
                            className='py-2 w-full'
                        >
                            {
                                tavfsif?.map((item, ind) => (
                                    <Select.Option
                                        key={ind}
                                        value={item?.id}
                                    >
                                        {item?.name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </div>
                <div className='w-full flex items-center justify-between'>
                    <Button type='primary' danger onClick={() => setModalData({ isOpen: false, data: null })}>
                        <CloseOutlined />
                        Bekor qilish
                    </Button>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button type='primary' htmlType="submit">
                                {modalData?.data ? <EditOutlined /> : <PlusOutlined />}
                                {modalData?.data ? "Tahrirlash" : "Yaratish"}
                            </Button>
                        )}
                    </Form.Item>
                </div>
            </Form>
        </Drawer>
    )
}

export default create;

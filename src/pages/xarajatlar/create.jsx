import { Button, Form, Input, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useQueryClient } from '@tanstack/react-query';
import api from 'services/api';

const create = ({ modalData, setModalData, getData }) => {

    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { TextArea } = Input;
    const queryClient = useQueryClient()

    useEffect(() => {
        setClientReady(true);
    }, []);

    const onFinish = async (values) => {
        if (modalData?.data) {
            try {
                return (await api.patch(`/expenses/${modalData?.data?.id}/`, values),
                    setModalData({ isOpen: false, data: null }),
                    getData(),
                    messageApi.open({
                        type: 'success',
                        content: "Xarajat tahrirlandi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Xarajat tahrirlanmadi!",
                });
            }
        }
        else {
            try {
                return (await api.post('/expenses/', values),
                    setModalData({ isOpen: false, data: null }),
                    getData(),
                    messageApi.open({
                        type: 'success',
                        content: "Yangi Xarajat qo'shildi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Xarajat qo'shilmadi...!",
                });
            }
        }
    };
    useEffect(() => {
        form.setFieldsValue({
            amount: modalData?.data?.amount || '',
            reason: modalData?.data?.reason || ''
        });
    }, [modalData?.data]);

    return (
        <Modal
            destroyOnClose
            open={modalData?.isOpen}
            // onCancel={() => setModalData({ isOpen: false, data: null })}
            closable={false}
            closeIcon={null}
            footer={false}
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
                    <h4 className='uppercase text-[12px] text-[#787F95]'>Summasi</h4>
                    <Form.Item
                        name="amount"
                        className='w-full'
                        rules={[
                            {
                                required: modalData?.data ? false : true,
                                message: 'Summasi kiritilmagan...!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Summasi"
                            className='py-3'
                            type='number'
                        />
                    </Form.Item>
                </div>
                <div className='w-full flex flex-col justify-start items-start'>
                    <h4 className='uppercase text-[12px] text-[#787F95]'>Sababi</h4>
                    <Form.Item
                        name={`reason`}
                        className='w-full'
                        rules={[
                            {
                                required: false,
                                message: 'Sababi kiritilmagan...!',
                            },
                        ]}
                    >
                        <TextArea
                            placeholder="Sababi"
                            type='text'
                            className='py-2'
                            rows={6}
                        />
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
        </Modal>
    )
}

export default create
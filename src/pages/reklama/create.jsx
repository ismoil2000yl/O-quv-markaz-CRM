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
                return (await api.patch(`/ads/${modalData?.data?.id}/`, values),
                    setModalData({ isOpen: false, data: null }),
                    getData(),
                    messageApi.open({
                        type: 'success',
                        content: "Reklama tahrirlandi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Reklama tahrirlanmadi!",
                });
            }
        }
        else {
            try {
                return (await api.post('/ads/', values),
                    setModalData({ isOpen: false, data: null }),
                    getData(),
                    messageApi.open({
                        type: 'success',
                        content: "Yangi Reklama qo'shildi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Reklama qo'shilmadi...!",
                });
            }
        }
    };
    useEffect(() => {
        form.setFieldsValue({
            name: modalData?.data?.name || '',
            description: modalData?.data?.description || ''
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
                    <h4 className='uppercase text-[12px] text-[#787F95]'>Nomi</h4>
                    <Form.Item
                        name="name"
                        className='w-full'
                        rules={[
                            {
                                required: modalData?.data ? false : true,
                                message: 'Nomi kiritilmagan...!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nomi"
                            className='py-3'
                        />
                    </Form.Item>
                </div>
                <div className='w-full flex flex-col justify-start items-start'>
                    <h4 className='uppercase text-[12px] text-[#787F95]'>Tavfsif</h4>
                    <Form.Item
                        name={`description`}
                        className='w-full'
                        rules={[
                            {
                                required: false,
                                message: 'Tavfsif kiritilmagan...!',
                            },
                        ]}
                    >
                        <TextArea
                            placeholder="Tavfsif"
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
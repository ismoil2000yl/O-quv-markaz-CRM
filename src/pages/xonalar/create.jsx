import { Button, Form, Input, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useQueryClient } from '@tanstack/react-query';
import api from 'services/api';

const create = ({ modalData, setModalData, getData }) => {

  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient()

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values) => {
    if (modalData?.data) {
      try {
        return (await api.patch(`/rooms/${modalData?.data?.id}/`, values),
          setModalData({ isOpen: false, data: null }),
          getData(),
          messageApi.open({
            type: 'success',
            content: "Xona tahrirlandi"
          }),
          form.resetFields()
        )
      }
      catch (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: "Xona tahrirlanmadi!",
        });
      }
    }
    else {
      try {
        return (await api.post('/rooms/', values),
          setModalData({ isOpen: false, data: null }),
          getData(),
          messageApi.open({
            type: 'success',
            content: "Yangi Xona qo'shildi"
          }),
          form.resetFields()
        )
      }
      catch (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: "Xona qo'shilmadi...!",
        });
      }
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      name: modalData?.data?.name || ''
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
        <Form.Item
          name="name"
          className='w-full'
          rules={[
            {
              required: modalData?.data ? false : true,
              message: 'Xona kiritilmagan...!',
            },
          ]}
        >
          <Input
            placeholder="Xona"
            className='py-3'
          />
        </Form.Item>
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
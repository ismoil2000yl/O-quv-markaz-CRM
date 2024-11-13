import { Button, Form, Input, message, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useQueryClient } from '@tanstack/react-query';
import api from 'services/api';

const create = ({ modalData, setModalData, getData, chegirma }) => {

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
        return (await api.patch(`/lessons/${modalData?.data?.id}/`, values),
          setModalData({ isOpen: false, data: null }),
          messageApi.open({
            type: 'success',
            content: "Fan tahrirlandi"
          }),
          getData(),
          form.resetFields()
        )
      }
      catch (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: "Fan tahrirlanmadi!",
        });
      }
    }
    else {
      try {
        return (await api.post('/lessons/', values),
          setModalData({ isOpen: false, data: null }),
          messageApi.open({
            type: 'success',
            content: "Yangi fan qo'shildi"
          }),
          getData(),
          form.resetFields()
        )
      }
      catch (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: "Fan qo'shilmadi...!",
        });
      }
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      name: modalData?.data?.name || '',
      price: modalData?.data?.price || '',
      discount: modalData?.data?.discount || 'Chegirmani tanlang'
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
          <h4 className='uppercase text-[12px] text-[#787F95]'>Fan nomi</h4>
          <Form.Item
            name="name"
            className='w-full'
            rules={[
              {
                required: modalData?.data?.name ? false : true,
                message: 'Fan nomi kiritilmagan...!',
              },
            ]}
          >
            <Input
              placeholder="Fan nomi"
              className='py-3'
            />
          </Form.Item>
        </div>
        <div className='w-full flex flex-col justify-start items-start'>
          <h4 className='uppercase text-[12px] text-[#787F95]'>Fan narxi</h4>
          <Form.Item
            name="price"
            className='w-full'
            rules={[
              {
                required: modalData?.data?.price ? false : true,
                message: 'Fan narxi kiritilmagan...!',
              },
            ]}
          >
            <Input
              placeholder="Fan narxi"
              className='py-3'
              type='number'
            />
          </Form.Item>
        </div>
        <div className='w-full flex flex-col justify-start items-start'>
          <h4 className='uppercase text-[12px] text-[#787F95]'>Chegirma foizi</h4>
          <Form.Item
            name="discount"
            className='w-full'
          >
            <Select className='w-full' defaultValue='Chegirmani tanlang'>
              <Select.Option
                value={""}
              >
                Chegirmani olib tashlash
              </Select.Option>
              {
                chegirma?.map((item, ind) => {
                  return (
                    <Select.Option
                      key={item?.id}
                      value={item?.id}
                    >
                      {parseInt(item?.discount_percent)} % || {item?.start_date} || {item?.end_date}
                    </Select.Option>
                  )
                })
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
    </Modal>
  )
}

export default create
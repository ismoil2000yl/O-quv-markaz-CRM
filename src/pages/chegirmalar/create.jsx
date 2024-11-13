import { Button, DatePicker, Drawer, Form, Input, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useQueryClient } from '@tanstack/react-query';
import api from 'services/api';

const create = ({ modalData, setModalData, getData }) => {

  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient()
  const [startMonth, setStartMonth] = useState("")
  const [endMonth, setEndMonth] = useState("")

  const startChange = (date, dateString) => {
    setStartMonth(dateString);
  };

  const endChange = (date, dateString) => {
    setEndMonth(dateString);
  };

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values) => {
    const sendData = {
      discount_percent: values?.discount_percent,
      start_date: startMonth,
      end_date: endMonth,
    }
    if (modalData?.data) {

      const updateData = {
        discount_percent: values?.discount_percent,
        start_date: startMonth || modalData?.data?.start_date,
        end_date: endMonth || modalData?.data?.end_date,
      };

      try {
        return (await api.patch(`/discounts/${modalData?.data?.id}/`, updateData),
          setModalData({ isOpen: false, data: null }),
          getData(),
          messageApi.open({
            type: 'success',
            content: "Chegirma tahrirlandi"
          }),
          form.resetFields()
        )
      }
      catch (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: "Chegirma tahrirlanmadi!",
        });
      }
    }
    else {
      try {
        return (await api.post('/discounts/', sendData),
          setModalData({ isOpen: false, data: null }),
          getData(),
          messageApi.open({
            type: 'success',
            content: "Yangi Chegirma qo'shildi"
          }),
          form.resetFields()
        )
      }
      catch (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: "Chegirma qo'shilmadi...!",
        });
      }
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      discount_percent: modalData?.data?.discount_percent || '',
      start_date: modalData?.data?.start_date || '',
      end_date: modalData?.data?.end_date || ''
    });
  }, [modalData?.data]);

  return (
    // <Modal
    <Drawer
      destroyOnClose
      open={modalData?.isOpen}
      // onCancel={() => setModalData({ isOpen: false, data: null })}
      closable={false}
      closeIcon={null}
      footer={false}
    // placement={"right"}
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
          <h4 className='uppercase text-[12px] text-[#787F95]'>Chegirma foizi</h4>
          <Form.Item
            name={`discount_percent`}
            className='w-full'
            rules={[
              {
                required: false,
                message: 'Chegirma foizi kiritilmagan...!',
              },
            ]}
          >
            <Input
              placeholder="Chegirma foizi"
              type='number'
              className='py-2'
            />
          </Form.Item>
        </div>
        <div className='w-full flex flex-col justify-start items-start'>
          <h4 className='uppercase text-[12px] text-[#787F95]'>
            Boshlanish vaqti
            <span className='text-[green]'>
              {modalData?.data?.start_date && " (" + modalData?.data?.start_date + ")"}
            </span>
          </h4>
          <Form.Item
            // name={`start_date`}
            className='w-full'
            rules={[
              {
                required: false,
                message: 'Boshlanish vaqti kiritilmagan...!',
              },
            ]}
          >
            <DatePicker className='cursor-pointer w-full' onChange={startChange} />
          </Form.Item>
        </div>
        <div className='w-full flex flex-col justify-start items-start'>
          <h4 className='uppercase text-[12px] text-[#787F95]'>
            Tugash vaqti
            <span className='text-[green]'>
              {modalData?.data?.end_date && " (" + modalData?.data?.end_date + ")"}
            </span>
          </h4>
          <Form.Item
            // name={`end_date`}
            className='w-full'
            rules={[
              {
                required: false,
                message: 'Tugash vaqti kiritilmagan...!',
              },
            ]}
          >
            <DatePicker className='cursor-pointer w-full' onChange={endChange} />
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
      {/* </Modal> */}
    </Drawer>
  )
}

export default create
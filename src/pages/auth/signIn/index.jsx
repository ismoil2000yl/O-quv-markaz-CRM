import { Formik, Form, Field } from 'formik'
import React from 'react'
import { signIn } from 'store/auth'
import { Fields } from 'components'
import { Button, message } from 'antd'
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { changeMyUser } from "store/myuser";
import storage from 'services/storage'
import api from 'services/api'
import { useState } from 'react'
import ImgLogin from 'assets/images/png/login.png'
import { LoginOutlined, LoadingOutlined } from "@ant-design/icons";

const index = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch()

  const [disable, setDisable] = useState(false)

  const validate = Yup.object({
    username: Yup.string()
      .max(30, 'Xarflar soni 30 dan oshmasin...!')
      .required("Telefon nomer kiritilmagan...!"),
    password: Yup.string()
      .min(1, "Parol uzunligi 1 ta dan ko'p bo'lsin...!")
      .required("Parol kiritilmagan...!"),
  })

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return api.post(
        "/token/",
        newTodo
      );
    },
    onSuccess: (data) => {
      dispatch(changeMyUser(data.data));
      storage.set("token", data.data.access)
      storage.set("refresh-token", data.data.refresh)
      navigate("/");
      dispatch(signIn(data.data));
      setDisable(false)
    },
    onError: (error) => {
      setDisable(false)
      messageApi.open({
        type: 'error',
        content: "Tizimda xatolik yuz berdi!",
      });
      if (error?.response?.data?.detail) {
        messageApi.open({
          type: 'error',
          content: "Username yoki parol xato!",
        });
      }
      if (error?.response?.data?.password) {
        messageApi.open({
          type: 'error',
          content: "Parol kiritilmagan!",
        });
      }
      if (error?.response?.data?.username) {
        messageApi.open({
          type: 'error',
          content: "Telefon raqami kiritilmagan!",
        });
      }

    }
  });

  return (
    <div className='w-full h-[98vh] relative'>
      <div className='absolute w-[96px] h-[96px] bg-[#F3FEFF] right-0 top-0 rounded-bl-[100%]'></div>
      <div className="container h-full">
        <div className='w-full h-full flex flex-col lg:flex-row items-center justify-center'>
          <div className='w-[50%] hidden lg:flex lg:w-full login-bg h-full p-0 lg:p-4'>

          </div>
          <div className='w-[70%] lg:w-full h-full p-0 lg:p-4'>
            <div className='w-full lg:w-[80%] mx-auto h-full flex flex-col justify-center items-center text-center'>
              <h1 className='text-[32px] text-[#002B48] font-bold'>Tizimga kirish</h1>
              <p className='text-[#787F95] text-[16px]'>O'quv markaz CRM platformasi</p>
              <div className='w-full mt-6'>
                <Formik
                  initialValues={{
                    phone_number: '',
                    password: ''
                  }}
                  onSubmit={(data) => {
                    signIn(data)
                  }}
                  validationSchema={validate}
                >
                  {({ values, setFieldValue }) => {
                    return (
                      <Form>
                        {contextHolder}
                        <div className="my-4">
                          <Field
                            name='phone_number'
                            label='Telefon raqami'
                            component={Fields.Input}
                          />
                        </div>
                        <div className="my-4">
                          <Field
                            name='password'
                            label='Parol'
                            type="password"
                            component={Fields.Input}
                            hasPassword={true}
                          />
                        </div>
                        <Button
                          className='w-full mt-4 text-white bg-[#354F95] hover:bg-[#465fa3] rounded-[5px]'
                          size='large'
                          type='ghost'
                          onClick={() => { mutation.mutate(values), setDisable(true) }}
                          disabled={disable}
                        >
                          {disable ? <LoadingOutlined /> : <LoginOutlined />}
                          {disable ? "Biroz kuting..." : "Kirish"}
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default index


{/* <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          onSubmit={(data) => {
            signIn(data)
          }}
          validationSchema={validate}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                {contextHolder}
                <Field
                  name='username'
                  label='Login'
                  loginClass={true}
                  component={Fields.Input}
                />
                <Field
                  name='password'
                  label='Parol'
                  type="password"
                  loginClass={true}
                  component={Fields.Input}
                  hasPassword={true}
                />
                <Button
                  className='w-full mt-4 float-right'
                  size='large'
                  type='primary'
                  onClick={() => { mutation.mutate(values), setDisable(true) }}
                  disabled={disable}
                >
                  Kirish
                </Button>
              </Form>
            );
          }}
        </Formik> */}
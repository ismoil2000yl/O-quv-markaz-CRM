import { Input } from "antd";
import React, { useState } from 'react'
// import { ErrorMessage } from 'formik'
import {
  EyeOutlined, EyeInvisibleOutlined, LockOutlined, UnlockOutlined
} from "@ant-design/icons";

const TextInput = ({
  field,
  label,
  required = false,
  placeholder,
  type = "text",
  hasPassword = false,
  loginClass = false,
  errorMessage = "To'ldirish shart",
  form: { setFieldValue, errors, touched, setFieldTouched },
}) => {
  return (
    <div className="w-full my-2">
      {/* <label className="mt-2 my-2 text-white">{label}</label> */}
      {
        hasPassword ?
          <Input.Password
            className={`w-full py-2 text-[#354F95] placeholder-[#354F95]`}
            name={field.name}
            required={required}
            status={touched[field.name] && errors[field.name] && "error"}
            value={field.value}
            onBlur={() => setFieldTouched(field.name, true)}
            onChange={(e) => setFieldValue(field.name, e.target.value)}
            placeholder={label}
            type={type}
            id={`${hasPassword ? "password" : ""}`}
            iconRender={(visible) => (visible ? <UnlockOutlined style={{ color: '#354F95', fontSize: '24px' }} /> : <LockOutlined style={{ color: '#354F95', fontSize: '24px' }} />)}
          // style={{ background: 'transparent' }}
          /> :
          <Input
            className={`w-full py-2 text-[#354F95] placeholder-[#354F95]`}
            name={field.name}
            required={required}
            status={touched[field.name] && errors[field.name] && "error"}
            value={field.value}
            onBlur={() => setFieldTouched(field.name, true)}
            onChange={(e) => setFieldValue(field.name, e.target.value)}
            placeholder={label}
            type={type}
            id={`${hasPassword ? "password" : ""}`}
          />
      }
      {/* <ErrorMessage component="div" className='error' name={field.name} /> */}
      {!field.value && touched[field.name] && errors[field.name] && (
        <small className="text-red-500 font-bold text-xs">
          {errorMessage}
        </small>
      )}
    </div>
  )
}

export default TextInput
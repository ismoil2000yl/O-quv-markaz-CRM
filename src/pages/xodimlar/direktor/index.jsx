import { Breadcrumb, Button, Input, Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Create from './create'
import api from 'services/api';

const index = () => {

  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [data, setData] = useState([])

  const [fullname, setFullname] = useState("")
  const [gender, setGender] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")

  const getData = async () => {
    const data = await api.get('/users/')
    const newData = data?.data?.filter(item => item?.status?.includes("manager_user"))
    setData(newData)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='w-full h-[72vh] px-4 py-2'>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => navigate("/")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Bosh sahifa</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate("/xodimlar")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Xodimlar</Breadcrumb.Item>
          <Breadcrumb.Item className='text-[16px] text-[#002B48] font-medium'>Direktor</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <h1 className='text-[26px] text-[#002B48]'>Kurs direktori</h1>
        <Button
          type='ghost'
          className='rounded-[5px] bg-[#25B7D3] hover:bg-[#25b6d3ab] text-[white]'
          onClick={() => setModal(true)}

        >
          + Qo'shish
        </Button>
        <Create modal={modal} setModal={setModal} getData={getData} id={5} />
      </div>
      <div className='mt-4 w-full h-full overflow-x-auto'>
        <div style={{ minWidth: '700px' }}>
          <table className='w-full text-left border-t border-solid border-[#F2F2FD]'>
            <thead className='bg-[#25B7D3] text-white text-[14px] uppercase'>
              <tr className='border border-solid border-[#F2F2FD]'>
                <th className='w-[50px] px-6 py-4 rounded-tl-[8px]'>N</th>
                <th className='min-w-[250px] p-4'>Direktor F.I.Sh</th>
                <th className='min-w-[130px] p-4'>Jinsi</th>
                <th className='min-w-[270px] p-4'>Manzili</th>
                <th className='min-w-[180px] p-4'>Telefon</th>
                <th className='w-[110px] p-4 rounded-tr-[8px]'></th>
              </tr>
            </thead>
            <tbody className='w-full bg-white text-[#002B48] text-[16px]'>
              <tr>
                <td></td>
                <td className='p-4'>
                  <Input prefix={<SearchOutlined />} onChange={(e) => setFullname(e.target.value)} className='shadow-md' placeholder='Izlash...' />
                </td>
                <td className='p-4'>
                  <Select className='w-full shadow-md' defaultValue='Erkak' value={gender} onChange={(e) => setGender(e)}>
                    <Select.Option
                      value={"male_user"}
                    >
                      Erkak
                    </Select.Option>
                    <Select.Option
                      value={"female_user"}
                    >
                      Ayol
                    </Select.Option>
                  </Select>
                </td>
                <td className='p-4'>
                  <Input prefix={<SearchOutlined />} onChange={(e) => setAddress(e.target.value)} className='shadow-md' placeholder='Izlash...' />
                </td>
                <td className='p-4'>
                  <Input prefix={<SearchOutlined />} onChange={(e) => setPhone(e.target.value)} className='shadow-md' placeholder='Izlash...' />
                </td>
                <td></td>
              </tr>
              {data.length ?
                data?.filter(item =>
                  item?.first_name?.toLowerCase().includes(fullname.toLowerCase()) &&
                  item?.address?.toLowerCase().includes(address.toLowerCase()) &&
                  item?.gender?.toLowerCase().includes(gender.toLowerCase()) &&
                  item?.phone_number?.includes(phone)
                )?.map((item, index) => {
                  return (
                    <tr key={item?.id} className='border border-solid border-[#F2F2FD]'>
                      <td className='p-4'>
                        <span className='w-[30px] h-[30px] font-medium flex items-center justify-center rounded-[50%] border border-solid border-[#E1E8EE] bg-[#25B7D3] text-[white]'>{index + 1}</span>
                      </td>
                      <td className='p-4 min-w-[250px]'>{item?.first_name + ' ' + item?.last_name}</td>
                      <td className='p-4 min-w-[130px]'>{item?.gender === "male_user" ? "Erkak" : "Ayol"}</td>
                      <td className='p-4 min-w-[270px] leading-5'>{item?.address}</td>
                      <td className='p-4 min-w-[180px]'>{item?.phone_number}</td>
                      <td className='p-4 w-[110px]'>
                        <div className='flex items-center justify-center gap-4'>
                          <Button onClick={() => navigate(`/xodimlar/direktor/${item?.id}`)}>
                            <EyeOutlined />
                          </Button>
                          <Button onClick={() => navigate(`/xodimlar/direktor/edit/${item?.id}`)}>
                            <EditOutlined />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                }) :
                <tr>
                  <td>
                    <Spin tip="Biroz kuting..." size="large">
                      <div className="content" />
                    </Spin>
                  </td>
                  <td>
                    <Spin tip="Biroz kuting..." size="large">
                      <div className="content" />
                    </Spin>
                  </td>
                  <td>
                    <Spin tip="Biroz kuting..." size="large">
                      <div className="content" />
                    </Spin>
                  </td>
                  <td>
                    <Spin tip="Biroz kuting..." size="large">
                      <div className="content" />
                    </Spin>
                  </td>
                  <td>
                    <Spin tip="Biroz kuting..." size="large">
                      <div className="content" />
                    </Spin>
                  </td>
                  <td>
                    <Spin tip="Biroz kuting..." size="large">
                      <div className="content" />
                    </Spin>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default index
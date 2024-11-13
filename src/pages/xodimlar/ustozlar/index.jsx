  import { Breadcrumb, Button, Input, Spin } from 'antd'
  import React, { useEffect, useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
  import Create from './create'
  import api from 'services/api';

  const index = () => {

    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])
    const [lessons, setLessons] = useState([])

    const getData = async () => {
      const data = await api.get('/teachers/')
      // const newData = data?.data?.filter(item => item?.status?.includes("teacher_user"))
      setData(data?.data)
    }

    const getUsers = async () => {
      const users = await api.get("/users/")
      setUsers(users?.data)
    }

    const getLessons = async () => {
      const lessons = await api.get("/lessons/")
      setLessons(lessons?.data)
    }

    useEffect(() => {
      getData()
      getUsers()
      getLessons()
    }, [])

    return (
      <div className='w-full h-[72vh] px-4 py-2'>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => navigate("/")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Bosh sahifa</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate("/xodimlar")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Xodimlar</Breadcrumb.Item>
            <Breadcrumb.Item className='text-[16px] text-[#002B48] font-medium'>O'qituvchilar</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <h1 className='text-[26px] text-[#002B48]'>O'qituvchilar</h1>
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
                  <th className='min-w-[250px] p-4'>O'qituvchi F.I.Sh</th>
                  <th className='min-w-[180px] p-4'>Telefon</th>
                  <th className='min-w-[130px] p-4'>Fan</th>
                  <th className='min-w-[270px] p-4'>Oylik maosh</th>
                  <th className='w-[110px] p-4 rounded-tr-[8px]'></th>
                </tr>
              </thead>
              <tbody className='w-full bg-white text-[#002B48] text-[16px]'>
                {data[0] ?
                  data?.map((item, index) => {
                    return (
                      <tr key={item?.teacher} className='border border-solid border-[#F2F2FD]'>
                        <td className='p-4'>
                          <span className='w-[30px] h-[30px] font-medium flex items-center justify-center rounded-[50%] border border-solid border-[#E1E8EE] bg-[#25B7D3] text-[white]'>{index + 1}</span>
                        </td>
                        <td className='p-4 min-w-[250px]'>{users?.map(user => user?.id == item?.teacher && user?.first_name + " " + user?.last_name)}</td>
                        <td className='p-4 min-w-[180px]'>{users?.map(user => user?.id == item?.teacher && user?.phone_number)}</td>
                        <td className='p-4 min-w-[130px]'>{lessons.find(lesson => item.subject.some(sub => sub === lesson.id))?.name}</td>
                        <td className='p-4 min-w-[270px] leading-5'>{item?.commission && parseFloat(item.commission).toLocaleString("ru-RU")} {item?.commission && parseFloat(item?.commission) < 100 ? "%" : "UZS"}</td>
                        <td className='p-4 w-[110px]'>
                          <div className='flex items-center justify-center gap-4'>
                            <Button onClick={() => navigate(`/xodimlar/o'qituvchi/${item?.teacher}`)}>
                              <EyeOutlined />
                            </Button>
                            <Button onClick={() => navigate(`/xodimlar/o'qituvchi/edit/${item?.teacher}`)}>
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
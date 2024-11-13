import { Breadcrumb, Button, Input } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Create from './create'

const index = () => {

  const navigate = useNavigate()
  const [modal, setModal] = useState(false)

  const getData = async () => {

  }

  return (
    <div className='w-full h-[72vh] px-4 py-2'>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => navigate("/")} className='cursor-pointer text-[16px] hover:text-[#002B48] text-[#787F95] font-medium'>Bosh sahifa</Breadcrumb.Item>
          <Breadcrumb.Item className='text-[16px] text-[#787F95] font-medium'>Xodimlar</Breadcrumb.Item>
          <Breadcrumb.Item className='text-[16px] text-[#002B48] font-medium'>O'quvchilar</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <h1 className='text-[26px] text-[#002B48]'>Barcha talabalar</h1>
        <Button
          type='ghost'
          className='rounded-[5px] bg-[#355098] text-[white]'
          onClick={() => setModal(true)}

        >
          + Qo'shish
        </Button>
        <Create modal={modal} setModal={setModal} getData={getData} id={5} />
      </div>
      <div className='mt-4 w-full h-full overflow-x-auto'>
        <table className='min-w-[700px] w-full text-left border-t border-solid border-[#F2F2FD]'>
          <thead className='bg-[#354F95] text-white text-[14px] uppercase'>
            <tr className='border border-solid border-[#F2F2FD]'>
              <th className='w-[50px] px-6 py-4 rounded-tl-[8px]'>N</th>
              <th className='min-w-[250px] p-4'>O'quvchi F.I.Sh</th>
              <th className='min-w-[130px] p-4'>Jinsi</th>
              <th className='min-w-[270px] p-4'>Manzili</th>
              <th className='min-w-[180px] p-4'>Telefon</th>
              <th className='w-[110px] p-4 rounded-tr-[8px]'></th>
            </tr>
          </thead>
          <tbody className='bg-white text-[#002B48] text-[16px]'>
            <tr>
              <td></td>
              <td className='p-4'>
                <Input prefix={<SearchOutlined />} className='shadow-md' placeholder='Izlash...' />
              </td>
              <td className='p-4'>
                <Input prefix={<SearchOutlined />} className='shadow-md' placeholder='Izlash...' />
              </td>
              <td className='p-4'>
                <Input prefix={<SearchOutlined />} className='shadow-md' placeholder='Izlash...' />
              </td>
              <td className='p-4'>
                <Input prefix={<SearchOutlined />} className='shadow-md' placeholder='Izlash...' />
              </td>
              <td></td>
            </tr>
            <tr className='border border-solid border-[#F2F2FD]'>
              <td className='p-4'>
                <span className='w-[30px] h-[30px] font-medium flex items-center justify-center rounded-[4px] border border-solid border-[#E1E8EE] bg-[#F6F8FA] text-[#787F95]'>1</span>
              </td>
              <td className='p-4 min-w-[250px]'>Ismoil Alisherovich Jalolov</td>
              <td className='p-4 min-w-[130px]'>Erkak</td>
              <td className='p-4 min-w-[270px] leading-5'>Uychi tumani, Ravot ShFY Xojiobod MFY Shifokor kocha 93-uy</td>
              <td className='p-4 min-w-[180px]'>+998 90 154 42 25</td>
              <td className='p-4 w-[110px]'>
                <div className='flex items-center justify-center gap-4'>
                  <Button onClick={() => navigate(`/xodimlar/o'quvchi/3`)}>
                    <EyeOutlined />
                  </Button>
                  <Button onClick={() => navigate(`/xodimlar/o'quvchi/edit/3`)}>
                    <EditOutlined />
                  </Button>
                </div>
              </td>
            </tr>
            <tr className='border border-solid border-[#F2F2FD]'>
              <td className='p-4'>
                <span className='w-[30px] h-[30px] font-medium flex items-center justify-center rounded-[4px] border border-solid border-[#E1E8EE] bg-[#F6F8FA] text-[#787F95]'>2</span>
              </td>
              <td className='p-4 min-w-[250px]'>Xalilova Nozliya Samadovna</td>
              <td className='p-4 min-w-[130px]'>Ayol</td>
              <td className='p-4 min-w-[270px] leading-5'>Qibray tumani, Baytqo’rg’on m. Soxibkor ko’chasi 3</td>
              <td className='p-4 min-w-[180px]'>+998 93 994 14 55</td>
              <td className='p-4 w-[110px]'>
                <div className='flex items-center justify-center gap-4'>
                  <Button onClick={() => navigate(`/xodimlar/o'quvchi/3`)}>
                    <EyeOutlined />
                  </Button>
                  <Button onClick={() => navigate(`/xodimlar/o'quvchi/edit/3`)}>
                    <EditOutlined />
                  </Button>
                </div>
              </td>
            </tr>
            <tr className='border border-solid border-[#F2F2FD]'>
              <td className='p-4'>
                <span className='w-[30px] h-[30px] font-medium flex items-center justify-center rounded-[4px] border border-solid border-[#E1E8EE] bg-[#F6F8FA] text-[#787F95]'>3</span>
              </td>
              <td className='p-4 min-w-[250px]'>Ismoil Alisherovich Jalolov</td>
              <td className='p-4 min-w-[130px]'>Erkak</td>
              <td className='p-4 min-w-[270px] leading-5'>Uychi tumani, Ravot ShFY Xojiobod MFY Shifokor kocha 93-uy</td>
              <td className='p-4 min-w-[180px]'>+998 90 154 42 25</td>
              <td className='p-4 w-[110px]'>
                <div className='flex items-center justify-center gap-4'>
                  <Button onClick={() => navigate(`/xodimlar/o'quvchi/3`)}>
                    <EyeOutlined />
                  </Button>
                  <Button onClick={() => navigate(`/xodimlar/o'quvchi/edit/3`)}>
                    <EditOutlined />
                  </Button>
                </div>
              </td>
            </tr>
            <tr className='border border-solid border-[#F2F2FD]'>
              <td className='p-4'>
                <span className='w-[30px] h-[30px] font-medium flex items-center justify-center rounded-[4px] border border-solid border-[#E1E8EE] bg-[#F6F8FA] text-[#787F95]'>4</span>
              </td>
              <td className='p-4 min-w-[250px]'>Xalilova Nozliya Samadovna</td>
              <td className='p-4 min-w-[130px]'>Ayol</td>
              <td className='p-4 min-w-[270px] leading-5'>Qibray tumani, Baytqo’rg’on m. Soxibkor ko’chasi 3</td>
              <td className='p-4 min-w-[180px]'>+998 93 994 14 55</td>
              <td className='p-4 w-[110px]'>
                <div className='flex items-center justify-center gap-4'>
                  <Button onClick={() => navigate(`/xodimlar/o'quvchi/3`)}>
                    <EyeOutlined />
                  </Button>
                  <Button onClick={() => navigate(`/xodimlar/o'quvchi/edit/3`)}>
                    <EditOutlined />
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default index
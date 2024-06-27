import { useState } from 'react'
import './SaleStaffPage.css'
import SaleStaffSidebar from '../../components/SaleStaffSidebar/SaleStaffSidebar';
import SaleStaffHeader from '../../components/SaleStaffHeader/SaleStaffHeader'

function SaleStaffPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='salestaff-page'>
      <SaleStaffSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <div className='salestaff-container'>
      <SaleStaffHeader />
      </div>
    </div>
  )
}

export default SaleStaffPage

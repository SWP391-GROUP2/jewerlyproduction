import { useState } from 'react'
import './DesignStaffPage.css'
import DesignStaffSidebar from '../../components/DesignStaffSidebar/DesignStaffSidebar';
import DesignStaffHeader from '../../components/DesignStaffHeader/DesignStaffHeader'

function DesignStaffPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='designstaff-page'>
      <DesignStaffSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <div className='designstaff-container'>
        <DesignStaffHeader />
      </div>
    </div>
  )
}

export default DesignStaffPage

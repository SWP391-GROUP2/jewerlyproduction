import { useState } from 'react'
import './ManagerPage.css' // Updated CSS file name
import ManagerSidebar from '../../components/ManagerSidebar/ManagerSidebar'; // Updated component name
import ManagerHeader from '../../components/ManagerHeader/ManagerHeader'; // Updated component name

function ManagerPage() { // Updated component name
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='manager-page'> {/* Updated class name */}
      <ManagerSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/> {/* Updated component name */}
      <div className='manager-container'> {/* Updated class name */}
        <ManagerHeader /> {/* Updated component name */}
      </div>
    </div>
  )
}

export default ManagerPage // Updated export statement

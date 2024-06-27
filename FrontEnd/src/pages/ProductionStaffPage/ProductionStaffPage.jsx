import { useState } from 'react';
import './ProductionStaffPage.css'; // Updated CSS file name
import ProductionStaffSidebar from '../../components/ProductionStaffSidebar/ProductionStaffSidebar'; // Updated component name
import ProductionStaffHeader from '../../components/ProductionStaffHeader/ProductionStaffHeader'; // Updated component name

function ProductionStaffPage() { // Updated component name
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='productionstaff-page'> {/* Updated class name */}
      <ProductionStaffSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/> {/* Updated component name */}
      <div className='productionstaff-container'> {/* Updated class name */}
        <ProductionStaffHeader /> {/* Updated component name */}
      </div>
    </div>
  );
}

export default ProductionStaffPage; // Updated export statement

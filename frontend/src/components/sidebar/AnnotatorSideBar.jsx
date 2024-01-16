import { Sidebar } from 'flowbite-react';
import menu from '../../assets/Images/menu.png'
import home from '../../assets/Images/home.png'
import video from  '../../assets/Images/video.png'
import foodproducts from  '../../assets/Images/products.png'
import annotate from  '../../assets/Images/edit.png'
import dropdownIcon from  '../../assets/Images/triangledropdown.png'

function AnnotatorSideBar() {
  return (
    <Sidebar className="bg-black h-screen w-24 mb-0 items-center" >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item  href="#" ><img src={menu} alt="Menu" className='h-8 w-8 mt-7 mr-7 items-center'/></Sidebar.Item>
          <Sidebar.Item  href="#" ><img src={home} alt="Menu" className='h-8 w-8 mt-9 mr-7 items-center'/></Sidebar.Item>
          <div className='relative'>
              <img src={video} alt="Menu" className='h-8 w-8 mt-9 ml-3'/>
              <img src={dropdownIcon} alt="Dropdown" className='absolute right-0 bottom-0 top-2 h-4 w-4'/>
            </div>
          <Sidebar.Item  href="#" ><img src={foodproducts} alt="Menu" className='h-8 w-8 mt-9 mr-7 items-center'/></Sidebar.Item>
          <Sidebar.Item  href="#" ><img src={annotate} alt="Menu" className='h-8 w-8 mt-9 mr-7 items-center'/></Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default AnnotatorSideBar
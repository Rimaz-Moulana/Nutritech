import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import UploadImage from '../../components/UploadImage/UploadImageIndustry'
import VideoUpload from '../../components/UploadVideo/VideoUploadIndustry'
import DropDown from '../../components/fields/dropdown'
import DropdownSize from "../../components/fields/dropdownSize"
import DropDownWhite from '../../components/fields/dropdownWhite'
import Numberfield from '../../components/fields/numberfield'
import TextFiledsmallWhite from '../../components/fields/textFieldSmallWhite'
import TextFiledWhite from '../../components/fields/textFieldWhite'
import TextFiledWhite2 from '../../components/fields/textFieldWhite2'
import TextFiledsmall from '../../components/fields/textFieldsmall'
import TextFiled from '../../components/fields/textfield'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/SideBar'

export default function ProductDetails() {
        const currentTimeInMillis = Date.now();

        // Create a new Date object using the current timestamp
        const currentDate = new Date(currentTimeInMillis);
        
        // Get the individual components of the date
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        
        const cDate = `${year}/${month}/${day}`;
        const cTime = `${hours}:${minutes}:${seconds}`;

        const status = 'pending';
        const [images,setImages] = useState([null, null])
        const [uploadStatus, setUploadStatus] = useState('');
        const [formData, setFormData] = useState({
            product: '',
            brand: '', 
            description: '',
            parentCompany: '',
            category: '',
            packagingMaterial : '',
            packagingMaterialTouching: '',
            unit: '',
            size : '',
            countryProduct: '',
            servingSize: '',
            sugarType: '',
            lactose : '',
            vitamin: '',
            mineral: '',
            omega: '',
            acids: '',
            probiotics: '',
            method : '',
            total: '',
            remarks : '',
            ingredients : '',
            energy1: '',
            energy2 : '',
            protein1 : '',
            protein2 : '',
            totalFat1: '',
            totalFat2 : '',
            SFA1: '',
            SFA2 : '',
            carbo1 : '',
            carbo2 : '',
            sugar1: '',
            sugar2: '',
            salt1 : '',
            salt2 : '',
            sodium1 : '',
            sodium2 : '',
            transFat1 : '',
            transFat2 : '',
            ash1 : '',
            ash2 : '',
            WPROfoodcode : '',
            WPROPermitted : '',
            WPROPermittedRemark : '',
            SEAROfoodcode : '',
            SEAROpermitted: '',
            SEAROpermittedRemark : '',
            SLfoodCode: '',
            SLpermitted: '',
            SLfoodcodePermittedRemark: '',
            createdAt: cTime ,
            createdIn : cDate ,
            videoFile : '',
            status: status,
            imageFront: '',
            imageBack: '',
            imageLeft: '',
            imageRight: '',
            duration: ''
        })

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
          };
        
          const handleFileChange = (file) => {
            // const file = e.target.files[0];
            console.log(file)
            if(file) {
              const videoElement = document.createElement('video');
            const fileURL = URL.createObjectURL(file);
          
            videoElement.addEventListener('loadedmetadata', () => {
              const durationInSeconds = Math.round(videoElement.duration);
              console.log('Duration in seconds:', durationInSeconds);
              setFormData({ ...formData, videoFile: file , duration: durationInSeconds });
            });
          
            videoElement.src = fileURL;
            }
            else{
              setFormData({ ...formData, videoFile:null , videoFileURL:null });
            }

          };

          console.log(formData.videoFile)
          const handleImageFile = (file) => {
            console.log(file.file)
            switch (file.index) {
                case 0:
                  setFormData(prevData => ({ ...prevData, imageFront: file.file }));
                  break;
                case 1:
                  setFormData(prevData => ({ ...prevData, imageBack: file.file }));
                  break;
                case 2:
                  setFormData(prevData => ({ ...prevData, imageLeft: file.file }));
                  break;
                case 3:
                  setFormData(prevData => ({ ...prevData, imageRight: file.file }));
                  break;
                default:
                  // Handle invalid index
                  break;
              }
          }
        
          const handleSubmit = async (event) => {
            event.preventDefault();
            const formD = new FormData();
            formD.append('product',formData.product );
            formD.append('brand', formData.brand);
            formD.append('description', formData.description )
            formD.append('parentCompany',formData.parentCompany)
            formD.append('category',formData.category)
            formD.append('packagingMaterial', formData.packagingMaterial )
            formD.append('packagingMaterialTouching', formData.packagingMaterialTouching);
            formD.append('unit', formData.unit)
            formD.append('size', formData.size)
            formD.append('countryProduct',formData.countryProduct)
            formD.append('servingSize',formData.servingSize)
            formD.append('sugarType', formData.sugarType);
            formD.append('lactose', formData.lactose)
            formD.append('vitamin',formData.vitamin)
            formD.append('mineral', formData.mineral)
            formD.append('omega', formData.omega )
            formD.append('acids', formData.acids)
            formD.append('probiotics', formData.probiotics )
            formD.append('method', formData.method)
            formD.append('total', formData.total)
            formD.append('remarks', formData.remarks)
            formD.append('ingredients', formData.ingredients)
            formD.append('energy1' , formData.energy1 );
            formD.append('energy2' , formData.energy2)
            formD.append('protein1', formData.protein1)
            formD.append('protein2', formData.protein2)
            formD.append('totalFat1' ,formData.totalFat1 )
            formD.append('totalFat2', formData.totalFat2)
            formD.append('SFA1' , formData.SFA1)
            formD.append('SFA2', formData.SFA2)
            formD.append('carbo1',formData.carbo1 )
            formD.append('carbo2', formData.carbo2)
            formD.append('sugar1' , formData.sugar1 )
            formD.append('sugar2',  formData.sugar2)
            formD.append('salt1', formData.salt1)
            formD.append('salt2',  formData.salt2)
            formD.append('sodium1', formData.sodium1)
            formD.append('sodium2', formData.sodium2)
            formD.append('transFat1', formData.transFat1)
            formD.append('transFat2', formData.transFat2)
            formD.append('ash1', formData.ash1 )
            formD.append('ash2',  formData.ash2)
            formD.append('WPROfoodcode', formData.WPROfoodcode)
            formD.append('WPROPermitted', formData.WPROPermitted) 
            formD.append('WPROPermittedRemark', formData.WPROPermittedRemark)
            formD.append('SEAROfoodcode', formData.SEAROfoodcode)
            formD.append('SEAROpermitted',formData.SEAROpermitted)
            formD.append('SEAROpermittedRemark' ,formData.SEAROpermittedRemark)
            formD.append('SLfoodCode',formData.SLfoodCode)
            formD.append('SLpermitted',formData.SLpermitted)
            formD.append('SLfoodcodePermittedRemark',formData.SLfoodcodePermittedRemark);
            formD.append('createdAt', cTime);
            formD.append('createdIn' , cDate)
            formD.append('status', status)
            formD.append('video', formData.videoFile);
            formD.append('image',formData.imageFront);
            formD.append('image',formData.imageBack);
            formD.append('image',formData.imageLeft);
            formD.append('image',formData.imageRight);
            formD.append('duration',formData.duration)
            // formD.append('createdAt', formData.createdAt);
            
            
            try {
              console.log(formData.imagePaths)
              console.log(formData)
            //   console.log(formD)
              const response  = await axios.post("http://localhost:3000/api/product/industry/add", formD);
              console.log(response.data);
              setUploadStatus("Product uploaded successfully!");
              Swal.fire({
                icon: 'success',
                title: 'Product uploaded successfully!',
                showConfirmButton: false,
                timer: 2000, 
                customClass: {
                  popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
                },
                iconColor: '#294B29',
              });
              window.history.back();
    
              }catch(error){
                console.error('Error uploading video:', error);
                setUploadStatus('Error uploading video.');
              }

              
          };

  return (
    <div className='bg-backgroundGreen overflow-x-hidden'>
        <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar type="industry" />
        </div>
        <div className="w-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar />
        </div>
        <h1 className="mb-8 mt-24 text-3xl lg:ml-72  sm:ml-40  md:mr-50 text-left  font-semibold text-sidebarGreen">Add New Product Deatils</h1>
        <form onSubmit={handleSubmit}>
        <div className='ml-0 lg:inline-flex sm:flex'>
            <div className='mt-4 md:w-1/2 lg:ml-40 sm:ml-5'>
                <label className='block px-5 text-left ml-[14%] font-semibold'>Product Name(Required)</label>
                <TextFiled placeholder="Product Name(Required)"  name='product' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Brand(Required)</label>
                <TextFiled placeholder="Brand(Required)"  name='brand' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Description(Required)</label>
                <TextFiled placeholder="Description(Required)" name='description' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Parent Company(Required)</label>
                <TextFiled placeholder="Parent Company(Required)" name='parentCompany' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Product Category(Required)</label>
                <DropDown  placeholder="Product Category(Required)" name='category' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Packaging Material(Out Side)(Required)</label>
                <TextFiled placeholder="Packaging Material(Out Side)(Required)" name='packagingMaterial' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Packaging Material(In Side)(Required)</label>
                <TextFiled placeholder="Packaging Material(In Side)(Required)" name='packagingMaterialTouching' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Unit with size(Required)</label>
                <div className='p-2'>
                <DropdownSize placeholder="Unit(Required)"  name='unit' onChange1={handleChange}  />
                <Numberfield placeholder="Size(Required)"  name='size'  onChange2={handleChange}/>
                </div>
                
                
            <div className=''>
                <label className='block px-5 text-left ml-[14%] font-semibold'>Country of the product</label>
                <TextFiledWhite placeholder="Country of the product" name='countryProduct' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Serving Size</label>
                <TextFiledWhite placeholder="Serving Size"  name='servingSize' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Sugar Type</label>
                <DropDownWhite defOptions="Sugar Type" name='sugarType' onChange={handleChange} />
                \<label className='block px-5 text-left ml-[14%] font-semibold'>Lactose/Maltodextrin</label>
                <DropDownWhite defOptions="Lactose/Maltodextrin" name='lactose' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Vitamin</label>
                <TextFiledWhite placeholder="Vitamin" name='vitamin' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Mineral</label>
                <TextFiledWhite placeholder="Mineral" name='mineral' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>DHA/Omega 3 Fatty Acid/DHA</label>
                <DropDownWhite  defOptions="DHA/Omega 3 Fatty Acid/DHA"  name='omega' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Polyunsaturated fatty acids</label>
                <DropDownWhite  defOptions="Polyunsaturated fatty acids"  name='acids' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Probiotics</label>
                <TextFiledWhite placeholder="Probiotics" name='probiotics' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Reconstituted method (Y/N/C)</label>
                <TextFiledWhite placeholder="Reconstituted method (Y/N/C)"   name='method' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Reconstituted total volume(ml)</label>
                <TextFiledWhite placeholder="Reconstituted total volume(ml)" name='total' onChange={handleChange} />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Preparation instruction or other remarks(only if reconstituted method is 'Y' or 'C')</label>
                <TextFiledWhite placeholder="Preparation instruction or other remarks(only if reconstituted method is 'Y' or 'C')" name='remarks' onChange={handleChange}  />
                <label className='block px-5 text-left ml-[14%] font-semibold'>Ingredient as in the label (separete by comma)</label>
                <div className='p-2'>
                    <input
                            type="text"
                            name='ingredients' onChange={handleChange} 
                            className="shadow appearance-none placeholder-gray-400 border rounded w-[70%] h-10 py-2 px-5 bg-[#ffffff]  text-black leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingredient as in the label (separete by comma)" />
                </div>
                <div className='py-2 '>
                    <h1 className='text-2xl lg:ml-36  sm:ml-40  md:mr-50 text-left  font-semibold text-sidebarGreen'>Upload Advertisement Video</h1>
                </div>
                <div className='p-2 lg:ml-32 '>
                <VideoUpload handleFileChange={handleFileChange}/>
                
                </div>
            </div>
            </div>
            <div className='flex-inline mt-1 md:w-1/2'>
            <div className='text ml-64'>
            <label className='inline-block pt-5 text-xl '>Per 100g/ml</label>
            <label className='inline-block px-36 pt-5 text-xl '>Per Serving</label>
            </div>
                <div className='grid float-start gap-0 grid-cols-3 p-3'>
                <label className='inline-block py-1 text-justify text-black ' >Energy(kcal)</label>
                <TextFiledsmall name='energy1' onChange={handleChange} />
                <TextFiledsmallWhite name='energy2' onChange={handleChange} />
                <label className='inline-block py-1  text-justify' >Protein(g)</label>
                <TextFiledsmall name='protein1' onChange={handleChange} />
                <TextFiledsmallWhite  name='protein2' onChange={handleChange} />
                <label className='inline-block py-1 text-justify ' >Total Fat(g)</label>
                <TextFiledsmall name='totalFat1' onChange={handleChange} />
                <TextFiledsmallWhite  name='totalFat2' onChange={handleChange} />
                <label className='inline-block py-1 text-justify  ' >SFA(g)</label>
                <TextFiledsmall name='SFA1' onChange={handleChange} />
                <TextFiledsmallWhite  name='SFA2' onChange={handleChange} />
                <label className='inline-block py-1 text-justify ' >Carbo(g)</label>
                <TextFiledsmall  name='carbo1' onChange={handleChange} />
                <TextFiledsmallWhite  name='carbo2' onChange={handleChange} />
                <label className='inline-block py-1 text-justify ' >Sugars(g)</label>
                <TextFiledsmall  name='sugar1' onChange={handleChange} />
                <TextFiledsmallWhite name='sugar2' onChange={handleChange} />
                <label className='inline-block py-1  text-justify' >Salt(g)</label>
                <TextFiledsmall name='salt1' onChange={handleChange} />
                <TextFiledsmallWhite name='salt2' onChange={handleChange} />
                <label className='inline-block py-1  text-justify ' >Sodium(g)</label>
                <TextFiledsmall name='sodium1' onChange={handleChange} />
                <TextFiledsmallWhite name='sodium2' onChange={handleChange} />
                <label className='inline-block py-1 text-justify ' >Trans Fat(g)</label>
                <TextFiledsmall  name='transFat1' onChange={handleChange} />
                <TextFiledsmallWhite  name='transFat2' onChange={handleChange} />
                <label className='inline-block py-1  text-justify ' >Ash</label>
                <TextFiledsmall name='ash1' onChange={handleChange} />
                <TextFiledsmallWhite  name='ash2' onChange={handleChange} />
                </div>
                <div className='grid float-start gap-0 grid-cols-2 w-full p-2 sm:w-full mb-20'>
                <label className='inline-block text-justify ml-0 py-3  ' >WHO WPRO foodcode Product</label>
                <TextFiledWhite2  name='WPROfoodcode' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3   ' >WHO WPRO permitted</label>
                <TextFiledWhite2  name='WPROPermitted' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3   ' >WHO WPRO permitted Remark</label>
                <TextFiledWhite2  name='WPROPermittedRemark' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3   ' >WHO SEARO foodcode Product</label>
                <TextFiledWhite2 name='SEAROfoodcode' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3   ' >WHO SEARO permitted</label>
                <TextFiledWhite2 name='SEAROpermitted' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3  ' >WHO SEARO permitted Remark</label>
                <TextFiledWhite2 name='SEAROpermittedRemark' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3   ' >SL food Code</label>
                <TextFiledWhite2 name='SLfoodCode' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3   ' >SL permitted</label>
                <TextFiledWhite2 name='SLpermitted' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3  ' >SL foodcode permitted Remark</label>
                <TextFiledWhite2  name='SLfoodcodePermittedRemark' onChange={handleChange} />
                </div>
                <h1 className='text-2xl lg:ml-8 mb-2  sm:ml-40  md:mr-50 text-left  font-semibold text-sidebarGreen'>Upload Pack Images</h1>
                <div className='py-2'>
    
                <div className='inline-block'>
                    <UploadImage onChangeImagesFile={handleImageFile} />
                    {/* <UploadImage /> */}
                </div>   
                </div>
            </div>
        </div>
        <div className='flex-inline py-10 '>
            <div className='inline-block w-44'>
            <div className='flex text-center'>
                <button onClick={() => window.history.back()} className="z-10 w-[100%] text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 ">
                    Cancel
                </button>
                </div>
            </div>
            {/* <div className='inline-block w-44'>
            <div className='flex text-center'>
                <button className="z-10 w-[100%] text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 ">
                    Draft
                </button>
                </div>
            </div> */}
            <div className='inline-block w-44'>
            <div className='flex text-center'>
                <button onClick={handleSubmit} type='submit' className="z-10 w-[100%] text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 ">
                    Save
                </button>
                </div>
            </div>
                <div className='mt-10'>
                    {uploadStatus && <h3>{uploadStatus}</h3>}
                </div>
        </div>
        </form>
    </div>
  )
}
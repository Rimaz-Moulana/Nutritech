import axios from 'axios'
import React, { useState } from 'react'
import UploadImage from '../../components/UploadImage/UploadImageIndustry'
import VideoUpload from '../../components/UploadVideo/VideoUploadIndustry'
import DropDown from '../../components/fields/dropdown'
import DropDownWhite from '../../components/fields/dropdownWhite'
import TextFiledsmallWhite from '../../components/fields/textFieldSmallWhite'
import TextFiledWhite from '../../components/fields/textFieldWhite'
import TextFiledWhite2 from '../../components/fields/textFieldWhite2'
import TextFiledsmall from '../../components/fields/textFieldsmall'
import TextFiled from '../../components/fields/textfield'
import Navbar from '../../components/navbar/Navbar'
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar'

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
    const [conversionResult, setConversionResult] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [images, setImages] = useState([null, null])
    const [uploadStatus, setUploadStatus] = useState('');
    const [showForm, setShowForm] = useState(true); // State to control showing/hiding the form

    const formDataInitialState = {
        productName: '',
        brand: '',
        description: '',
        parentCompany: '',
        productCategory: '',
        packagingMaterial: '',
        packagingMaterialTouching: '',
        variation: '',
        countryProduct: '',
        servingSize: '',
        sugarType: '',
        lactose: '',
        vitamin: '',
        mineral: '',
        omega: '',
        acids: '',
        probiotics: '',
        method: '',
        total: '',
        remarks: '',
        ingredients: '',
        energy1: '',
        energy2: '',
        protein1: '',
        protein2: '',
        totalFat1: '',
        totalFat2: '',
        SFA1: '',
        SFA2: '',
        carbo1: '',
        carbo2: '',
        sugar1: '',
        sugar2: '',
        salt1: '',
        salt2: '',
        sodium1: '',
        sodium2: '',
        transFat1: '',
        transFat2: '',
        ash1: '',
        ash2: '',
        WPROfoodcode: '',
        WPROPermitted: '',
        WPROPermittedRemark: '',
        SEAROfoodcode: '',
        SEAROpermitted: '',
        SEAROpermittedRemark: '',
        SLfoodCode: '',
        SLpermitted: '',
        SLfoodcodePermittedRemark: '',
        createdTime: cTime,
        CreatedData: cDate,
        videoFile: '',
        status: status,
        imageFront: '',
        imageBack: '',
        imageLeft: '',
        imageRight: ''
    };

    const [formData, setFormData] = useState(formDataInitialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, videoFile: e.target.files[0] });
        setSelectedFile(e.target.files[0]);
    };

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
        // Append form data to the FormData object

        try {
            // Send form data to the server using axios
            const response = await axios.post("http://localhost:3000/api/product/industry/add", formD);
            console.log(response.data);
            setConversionResult(response.data.text);
            setUploadStatus("Product uploaded successfully!");
        } catch (error) {
            console.error('Error uploading video:', error);
            setUploadStatus('Error uploading video.');
        }
    };

    // const handleDraft = () => {
    //     // Implement logic for saving draft
    //     localStorage.setItem('productDraft', JSON.stringify(formData));
    //     setUploadStatus("Draft saved successfully!");
    // };

    const handleCancel = () => {
        // Reset form data and hide the form
        setFormData(formDataInitialState);
        setShowForm(false);
        console.log("Form canceled.");
    };

  return (
    <div className='bg-backgroundGreen overflow-x-hidden'>
        <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Annotatorsidebar />
        </div>
        <div className="w-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar />
        </div>
        <h1 className="mb-8 mt-24 text-3xl lg:ml-72  sm:ml-40  md:mr-50 text-left  font-semibold text-sidebarGreen">Add New Product Deatils</h1>
        <form>
        <div className='ml-0 lg:inline-flex sm:flex'>
            <div className='mt-4 md:w-1/2 lg:ml-40 sm:ml-5'>
                <TextFiled placeholder="Product Name"  name='productName' onChange={handleChange} />
                <TextFiled placeholder="Brand"  name='brand' onChange={handleChange} />
                <TextFiled placeholder="Parent Company" name='parentCompany' onChange={handleChange} />
                <DropDown  placeholder="Product Category" name='productCategory' onChange={handleChange} />
                <TextFiled placeholder="Description" name='description' onChange={handleChange} />
                <TextFiled placeholder="Packaging Material" name='packagingMaterial' onChange={handleChange} />
                <TextFiled placeholder="Packaging Material(touching)" name='packagingMaterialTouching' onChange={handleChange} />
                <TextFiled placeholder="Variation"  name='variation' onChange={handleChange} />
                
            <div className=''>
                <TextFiledWhite placeholder="Country of the product" name='countryProduct' onChange={handleChange} />
                <DropDownWhite defOptions="Serving Size"  name='servingSize' onChange={handleChange} />
                <DropDownWhite defOptions="Sugar Type" name='sugarType' onChange={handleChange} />
                <DropDownWhite defOptions="Lactose/Maltodextrin" name='lactose' onChange={handleChange} />
                <TextFiledWhite placeholder="Vitamin" name='vitamin' onChange={handleChange} />
                <TextFiledWhite placeholder="Mineral" name='mineral' onChange={handleChange} />
                <DropDownWhite  defOptions="DHA/Omega 3 Fatty Acid/DHA"  name='omega' onChange={handleChange} />
                <DropDownWhite  defOptions="Polyunsaturated fatty acids"  name='acids' onChange={handleChange} />
                <TextFiledWhite placeholder="Probiotics" name='probiotics' onChange={handleChange} />
                <TextFiledWhite placeholder="Reconstituted method (Y/N/C)"   name='method' onChange={handleChange} />
                <TextFiledWhite placeholder="Reconstituted total volume(ml)" name='total' onChange={handleChange} />
                <TextFiledWhite placeholder="Preparation instruction or other remarks(only if reconstituted method is 'Y' or 'C')" name='remarks' onChange={handleChange}  />
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
                <label className='inline-block py-1 text-justify ' >Carbo(ga)</label>
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
                <label className='inline-block text-justify ml-0 py-3  ' >WHO_WPRO_foodcode Product</label>
                <TextFiledWhite2  name='WPROfoodcode' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3   ' >WHO_WPRO_permitted</label>
                <TextFiledWhite2  name='WPROPermitted' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3   ' >WHO_WPRO_permitted Remark</label>
                <TextFiledWhite2  name='WPROPermittedRemark' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3   ' >WHO_SEARO_foodcode_Product</label>
                <TextFiledWhite2 name='SEAROfoodcode' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3   ' >WHO_SEARO_permitted</label>
                <TextFiledWhite2 name='SEAROpermitted' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3  ' >WHO_SEARO_permitted Remark</label>
                <TextFiledWhite2 name='SEAROpermittedRemark' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3   ' >SL food Code</label>
                <TextFiledWhite2 name='SLfoodCode' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3   ' >SL_permitted</label>
                <TextFiledWhite2 name='SLpermitted' onChange={handleChange} />
                <label className='inline-block text-justify ml-0 py-3  ' >SL_foodcode__permitted Remark</label>
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
                <button onClick={handleCancel} type='submit' className="z-10 w-[100%] text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 ">
                    Cancel
                </button>
                </div>
            </div>
            {/* <div className='inline-block w-44'>
            <div className='flex text-center'>
                <button onClick={handleDraft} type='submit' className="z-10 w-[100%] text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 ">
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
                {conversionResult && <div>{conversionResult}</div>}
        </div>
        </form>
    </div>
  )
}
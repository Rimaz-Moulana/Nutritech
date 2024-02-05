import React, { useState } from 'react'
import Astra1 from '../../assets/Images/astra1.png'
import Astra2 from '../../assets/Images/astra2.png'
import Astra3 from '../../assets/Images/astra3.png'
import Astra4 from '../../assets/Images/astra4.png'
import DropDownWhite from '../../components/fields/dropdownWhite'
import TextFiledsmallWhite from '../../components/fields/textFieldSmallWhite'
import TextFiledWhite from '../../components/fields/textFieldWhite'
import TextFiledWhite2 from '../../components/fields/textFieldWhite2'
import TextFiledsmall from '../../components/fields/textFieldsmall'
import TextFiled from '../../components/fields/textfield'
import Navbar from '../../components/navbar/Navbar'
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar'

export default class test extends React.Component {
    render(){
        const [productName, setProductName] = useState('');
        const [brand, setBrand] = useState('');
        const [description, setDescription] = useState('')
        const [parentCompany, setParentCompany] = useState('')
        const [packagingMaterial, setPackagingMaterial] = useState('')
        const [packagingMaterialTouching, setPackagingMaterialTouching] = useState('')
        const [variation, setVariation] = useState('')
        const [countryProduct, setCountryProduct] = useState('')
        const [servingSize, setServingSize] = useState('')
        const [sugarType, setSugarType] = useState('')
        const [lactose, setLactose] = useState('')
        const [vitamin, setVitamin] = useState('')
        const [mineral, setMineral] = useState('')
        const [omega, setOmega] = useState('')
        const [acids, setAcids] = useState('')
        const [probiotics, setProbiotics] = useState('')
        const [method, setMethod] = useState('')
        const [total, setTotal] = useState('')
        const [remarks, setRemarks] = useState('')
        const [ingredients, setIngredients] = useState('')
        const [energy1, setEnergy1] = useState('')
        const [energy2, setEnergy2] = useState('')
        const [protein1, setProtein1] = useState('')
        const [protein2, setProtein2] = useState('')
        const [totalFat1, setTotalFat1] = useState('')
        const [totalFat2, setTotalFat2] = useState('')
        const [SFA1, setSFA1] = useState('')
        const [SFA2, setSFA2] = useState('')
        const [carbo1, setCarbo1] = useState('')
        const [carbo2, setCarbo2] = useState('')
        const [sugar1, setSugar1] = useState('')
        const [sugar2, setSugar2] = useState('')
        const [salt1, setSalt1] = useState('')
        const [salt2, setSalt2] = useState('')
        const [sodium1, setSodium1] = useState('')
        const [sodium2, setSodium2] = useState('')
        const [transFat1, setTransFat1] = useState('')
        const [transFat2, setTransFat2] = useState('')
        const [ash1, setAsh1] = useState('')
        const [ash2, setAsh2] = useState('')
        const [WPROfoodcode, setWPROFoodcode] = useState('')
        const [WPROPermitted, setWPROPermitted] = useState('')
        const [WPROPermittedRemark, setWPROPermittedRemark] = useState('')
        const [SEAROfoodcode, setSEAROfoodcode] = useState('')
        const [SEAROpermitted, setSEAROpermitted] = useState('')
        const [SEAROpermittedRemark, setSEAROpermittedRemark] = useState('')
        const [SLfoodCode, setSLfoodCode] = useState('')
        const [SLpermitted, setSLpermitted] = useState('')
        const [SLfoodcodePermittedRemark, setSLfoodcodePermittedRemark] = useState('')

        const handleSubmit = (event) =>{
            event.preventDefault();
        }


  return (
    <div className='bg-backgroundGreen overflow-x-hidden'>
        <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Annotatorsidebar />
        </div>
        <div className="w-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar />
        </div>
        <h1 className="lg:ml-20 sm:ml-40 mb-8 mt-24 lg:mr-[750px] md:mr-50 sm:mr  text-3xl font-semibold text-sidebarGreen">Product Deatils</h1>
        <form onSubmit={handleSubmit}>
        <div className='ml-4 lg:inline-flex sm:flex'>
            <div className='mt-4 md:w-1/2 lg:ml-40 sm:ml-5'>
                <TextFiled placeholder="Product Name" value={productName} id={productName} name={productName} onChange={(e) => setProductName(e.target.value)} />
                <TextFiled placeholder="Brand" value={brand} name={brand} id={brand} onChange={(e) => setBrand(e.target.value)} />
                <TextFiled placeholder="Parent Company" value={parentCompany} id={parentCompany} name={parentCompany} onChange={(e)=> setParentCompany(e.target.value)} />
                <TextFiled placeholder="Description" value={description} id={description} name={description} onChange={(e)=> setDescription(e.target.value)} />
                <TextFiled placeholder="Packaging Material" value={packagingMaterial} id={packagingMaterial} name={packagingMaterial} onChange={(e)=> setPackagingMaterial(e.target.value)} />
                <TextFiled placeholder="Packaging Material(touching)" value={packagingMaterialTouching} id={packagingMaterialTouching} name={packagingMaterialTouching} onChange={(e)=> setPackagingMaterialTouching(e.target.value)} />
                <TextFiled placeholder="Variation" value={variation} id={variation} name={variation} onChange={(e) => setVariation(e.target.value)} />
                {/* <DropDown /> */}
            <div className=''>
                <TextFiledWhite placeholder="Country of the product" value={countryProduct} id={countryProduct} name={countryProduct} onChange={(e) => setCountryProduct(e.target.value)} />
                <DropDownWhite defOptions="Serving Size"  value={servingSize} id={servingSize} name={servingSize} onChange={(e)=> setServingSize(e.target.value)} />
                <DropDownWhite defOptions="Sugar Type" value={sugarType} id={sugarType} name={sugarType} onChange={(e)=> setSugarType(e.target.value)} />
                <DropDownWhite defOptions="Lactose/Maltodextrin"  value={lactose} id={lactose} name={lactose} onChange={(e)=> setLactose(e.target.value)} />
                <TextFiledWhite placeholder="Vitamin"  value={vitamin} id={vitamin} name={vitamin} onChange={(e)=> setVitamin(e.target.value)} />
                <TextFiledWhite placeholder="Mineral"  value={mineral} id={mineral} name={mineral} onChange={(e)=> setMineral(e.target.value)} />
                <DropDownWhite  defOptions="DHA/Omega 3 Fatty Acid/DHA"  value={omega} id={omega} name={omega} onChange={(e) => setOmega(e.target.value)} />
                <DropDownWhite  defOptions="Polyunsaturated fatty acids"  value={acids} id={acids} name={acids} onChange={(e)=> setAcids(e.target.value)} />
                <TextFiledWhite placeholder="Probiotics"  value={probiotics} id={probiotics} name={probiotics} onChange={(e)=> setProbiotics(e.target.value)} />
                <TextFiledWhite placeholder="Reconstituted method (Y/N/C)"  value={method} id={method} name={method} onChange={(e)=> setMethod(e.target.value)} />
                <TextFiledWhite placeholder="Reconstituted total volume(ml)"  value={total} id={total} name={total} onChange={(e) => setTotal(e.target.value)} />
                <TextFiledWhite placeholder="Preparation instruction or other remarks(only if reconstituted method is 'Y' or 'C')"  value={remarks} id={remarks} name={remarks} onChange={(e)=> setRemarks(e.target.value)}  />
                <div className='p-2'>
                    <input
                            type="text"
                            value={ingredients} name={ingredients} id={ingredients} onChange={(e)=> setIngredients(e.target.value)} 
                            className="shadow appearance-none placeholder-gray-400 border rounded w-[70%] h-10 py-2 px-5 bg-[#ffffff]  text-black leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingredient as in the label (separete by comma)" />
                </div>
            </div>
            </div>
            <div className='flex-inline mt-4 md:w-1/2'>
            <div className='inline-block'>
                <img className='inline-block px-1 h-20 w-28' src={Astra1} />
                <img className='inline-block px-1 h-20 w-28' src={Astra2} />
                <img className='inline-block px-1 h-20 w-28' src={Astra3} />
                <img className='inline-block px-1 h-20 w-28' src={Astra4} />
            </div>
            <div className='text ml-64'>
            <label className='inline-block pt-5 text-xl '>Per 100g/ml</label>
            <label className='inline-block px-16 pt-5 text-xl '>Per Serving</label>
            </div>
                <div className='grid float-start gap-0 grid-cols-3 p-3'>
                <label className='inline-block py-1 text-justify text-black ' >Energy(kcal)</label>
                <TextFiledsmall value={energy1} id={energy1} name={energy1} onChange={(e) => setEnergy1(e.target.value)} />
                <TextFiledsmallWhite value={energy2} id={energy2} name={energy2} onChange={(e)=> setEnergy2(e.target.value)} />
                <label className='inline-block py-1  text-justify' >Protein(g)</label>
                <TextFiledsmall value={protein1} id={protein1} name={protein1} onChange={(e)=> setProtein1(e.target.value)} />
                <TextFiledsmallWhite value={protein2} id={protein2} name={protein2} onChange={(e)=> setProtein2(e.target.value)} />
                <label className='inline-block py-1 text-justify ' >Total Fat(g)</label>
                <TextFiledsmall value={totalFat1} id={totalFat1} name={totalFat1} onChange={(e)=> setTotalFat1(e.target.value)} />
                <TextFiledsmallWhite value={totalFat2} id={totalFat2} name={totalFat2} onChange={(e)=> setTotalFat2(e.target.value)} />
                <label className='inline-block py-1 text-justify  ' >SFA(g)</label>
                <TextFiledsmall value={SFA1} id={SFA1} name={SFA1} onChange={(e)=> setSFA1(e.target.value)} />
                <TextFiledsmallWhite value={SFA2} id={SFA2} name={SFA2} onChange={(e)=> setSFA2(e.target.value)} />
                <label className='inline-block py-1 text-justify ' >Carbo(ga)</label>
                <TextFiledsmall value={carbo1} id={carbo1} name={carbo1} onChange={(e)=> setCarbo1(e.target.value)} />
                <TextFiledsmallWhite value={carbo2} id={carbo2} name={carbo2} onChange={(e)=> setCarbo2(e.target.value)} />
                <label className='inline-block py-1 text-justify ' >Sugars(g)</label>
                <TextFiledsmall value={sugar1} id={sugar1} name={sugar1} onChange={(e)=> setSugar1(e.target.value)} />
                <TextFiledsmallWhite value={sugar2} id={sugar2} name={sugar2} onChange={(e)=> setSugar2(e.target.value)} />
                <label className='inline-block py-1  text-justify' >Salt(g)</label>
                <TextFiledsmall value={salt1} id={salt1} name={salt1} onChange={(e)=> setSalt1(e.target.value)} />
                <TextFiledsmallWhite value={salt2} id={salt2} name={salt2} onChange={(e)=> setSalt2(e.target.value)} />
                <label className='inline-block py-1  text-justify ' >Sodium(g)</label>
                <TextFiledsmall value={sodium1} id={sodium1} name={sodium1} onChange={(e)=> setSodium1(e.target.value)} />
                <TextFiledsmallWhite value={sodium2} id={sodium2} name={sodium2} onChange={(e)=> setSodium2(e.target.value)} />
                <label className='inline-block py-1 text-justify ' >Trans Fat(g)</label>
                <TextFiledsmall value={transFat1} id={transFat1} name={transFat1} onChange={(e)=> setTransFat1(e.target.value)} />
                <TextFiledsmallWhite value={transFat2} id={transFat2} name={transFat2} onChange={(e)=> setTransFat2(e.target.value)} />
                <label className='inline-block py-1  text-justify ' >Ash</label>
                <TextFiledsmall value={ash1} id={ash1} name={ash1} onChange={(e)=> setAsh1(e.target.value)} />
                <TextFiledsmallWhite value={ash2} id={ash2} name={ash2} onChange={(e)=> setAsh2(e.target.value)} />
                </div>
                <div className='grid float-start gap-0 grid-cols-2 w-full p-2 sm:w-full'>
                <label className='inline-block text-justify ml-8 py-3  ' >WHO_WPRO_foodcode Product</label>
                <TextFiledWhite2 value={WPROfoodcode} id={WPROfoodcode} name={WPROfoodcode} onChange={(e)=> setWPROFoodcode(e.target.value)} />
                <label className='inline-block text-justify ml-8 py-3   ' >WHO_WPRO_permitted</label>
                <TextFiledWhite2 value={WPROPermitted} id={WPROPermitted} name={WPROPermitted} onChange={(e)=> setWPROPermitted(e.target.value)} />
                <label className='inline-block text-justify ml-8 py-3   ' >WHO_WPRO_permitted Remark</label>
                <TextFiledWhite2 value={WPROPermittedRemark} id={WPROPermittedRemark} name={WPROPermittedRemark} onChange={(e)=> setWPROPermittedRemark(e.target.value)} />
                <label className='inline-block text-justify ml-8 py-3   ' >WHO_SEARO_foodcode_Product</label>
                <TextFiledWhite2 value={SEAROfoodcode} id={SEAROfoodcode} name={SEAROfoodcode} onChange={(e)=> setSEAROfoodcode(e.target.value)} />
                <label className='inline-block text-justify ml-8 py-3   ' >WHO_SEARO_permitted</label>
                <TextFiledWhite2 value={SEAROpermitted} id={SEAROpermitted} name={SEAROpermitted} onChange={(e)=> setSEAROpermitted(e.target.value)} />
                <label className='inline-block text-justify ml-8 py-3  ' >WHO_SEARO_permitted Remark</label>
                <TextFiledWhite2 value={SEAROpermittedRemark} id={SEAROpermittedRemark} name={SEAROpermittedRemark} onChange={(e)=> setSEAROpermittedRemark(e.target.value)} />
                <label className='inline-block text-justify ml-8 py-3   ' >SL food Code</label>
                <TextFiledWhite2 value={SLfoodCode} id={SLfoodCode} name={SLfoodCode} onChange={(e)=> setSLfoodCode(e.target.value)} />
                <label className='inline-block text-justify ml-8 py-3   ' >SL_permitted</label>
                <TextFiledWhite2 value={SLpermitted} id={SLpermitted} name={SLpermitted} onChange={(e)=> setSLpermitted(e.target.value)} />
                <label className='inline-block text-justify ml-8 py-3  ' >SL_foodcode__permitted Remark</label>
                <TextFiledWhite2 value={SLfoodcodePermittedRemark} id={SLfoodcodePermittedRemark} name={SLfoodcodePermittedRemark} onChange={(e)=> setSLfoodcodePermittedRemark(e.target.value)} />
                </div>
            </div>
        </div>
        <div className='flex-inline py-10 '>
            <div className='inline-block w-44'>
            <div className='flex text-center'>
                <button className="bg-[#3C6339]
                hover:bg-[#B8C294] text-white text-center w-[70%] py-2 px-4 font-bold rounded">
                    Cancel
                </button>
                </div>
            </div>
            <div className='inline-block w-44'>
            <div className='flex text-center'>
                <button className="bg-[#3C6339]
                hover:bg-[#B8C294] text-white text-center w-[70%] py-2 px-4 font-bold rounded">
                    Draft
                </button>
                </div>
            </div>
            <div className='inline-block w-44'>
            <div className='flex text-center'>
                <button type='submit' className="bg-[#3C6339]
                hover:bg-[#B8C294] text-white text-center w-[70%] py-2 px-4 font-bold rounded">
                    Save
                </button>
                </div>
            </div>
        </div>
        </form>
    </div>
  )
}
}
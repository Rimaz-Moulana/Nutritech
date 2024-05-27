import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPlayer from 'react-player';
import red from '../../assets/Images/redflag.png'
import green from '../../assets/Images/greenflag.png'

function VideowithReview({Id,text,type}) {
  console.log("Id",Id);

 const videoId = Id;
 const productId =Id;
 const email  = localStorage.getItem('email');

 const [Data, setData] = useState([]);
 const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greenFlagDisabled, setGreenFlagDisabled] = useState(false);
  const [redFlagDisabled, setRedFlagDisabled] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
       try {
          const response = await axios.get(`http://localhost:3000/api/users/getUser/${email}`);
          setUserData(response.data); // Setting the response data to the state
       } catch (error) {
          console.error('Error fetching user:', error);
       }
    };
  
    fetchUser();
}, []);



  const health = ()=>{
    let fact;
    const isConfectionery = Data.productCategory === "Confectionery";
    const isFineBakeryWares = Data.productCategory === "Fine Bakery Wares";
    const isOrdinaryBakeryWares = Data.productCategory === "Bread and Ordinary Bakery Wares";
    const isCereals =Data.productCategory === "Cereals";
    const isReadytoeatSavouries = Data.productCategory === "Ready-to-eat Savouries";
    const isProcessednuts = Data.productCategory === "Processed nuts";
    const isFishbased = Data.productCategory === "Fish-based";
    const isBeverages =Data.productCategory === "Beverages";
    const isFrozendairybaseddessertsandedibleices = Data.productCategory === "Frozen dairy based desserts and edible ices";
    const isCurdeddairybaseddesserts = Data.productCategory === "Curded dairy based desserts";
    const isCheeseandanalogues = Data.productCategory === "Cheese and analogues";
    const isCompositefoods =Data.productCategory === "Composite foods (Prepared foods)";
    const isFatsandoilsandfatemulsions = Data.productCategory === "Fats and oils, and fat emulsions";
    const isPastaandnoodlesandlikeproducts = Data.productCategory === "Pasta and noodles and like products";
    const isFreshandfrozenmeatpoultrygamefishandseafoodproducts = Data.productCategory === "Fresh and frozen meat, poultry, game, fish and seafood products";
    const isProcessedmeatpoultrygamefishandfishproducts =Data.productCategory === "Processed meat, poultry, game, fish and fish products";
    const isFreshandfrozenfruitsandvegetablesandlegumes = Data.productCategory === "Fresh and frozen fruits and vegetables,and legumes";
    const isProcessedfruitsandvegetables = Data.productCategory === "Processed fruits and vegetables";
    const isSolidformsoybeanProducts = Data.productCategory === "Solid-form soybean Products";
    const isSaucesdipsanddressings =Data.productCategory === "Sauces, dips, and dressings";
    
    
    if ((isConfectionery || isFineBakeryWares || isOrdinaryBakeryWares) &&
        Data.totalFat2 <= 8.0 &&
        Data.sugar2 <= 6.0) {
        if ((isFineBakeryWares || isOrdinaryBakeryWares) && Data.sodium2 <= 0.25) {
            if (isFineBakeryWares && Data.energy2 <= 230) {
                fact = "healthy";
            } else {
                fact = "unhealthy";
            }
        } else if (Data.energy2 <= 230) {
            fact = "healthy";
        } else {
            fact = "unhealthy";
        }
    } else if(isCereals && Data.totalFat2<=12.0 && Data.sugar2<=9.0 && Data.sodium2<=0.35 ) {
        fact = "healthy";
    }else if(isFrozendairybaseddessertsandedibleices && Data.totalFat2<=8.0 && Data.sugar2<=12.0 && Data.sodium2<=0.10 && Data.energy2 <= 230){
      fact = "healthy";
    }else if(isCurdeddairybaseddesserts && Data.totalFat2<=7.0 && Data.sugar2<=6.0 && Data.sodium2<=0.10 && Data.energy2 <= 230){
      fact = "healthy";
    }else if(isCheeseandanalogues && Data.totalFat2<=20.0 /*&& Data.addedsugar2==0.0*/ && Data.sodium2<=0.60 ){
      fact = "healthy";
    }else if(isCompositefoods && Data.totalFat2<=8.0 && Data.SFA2==3.5 && Data.sugar2<=9.0  && Data.sodium2<=0.35 ){
      fact = "healthy";
    }else if(isFatsandoilsandfatemulsions  && Data.SFA2==35.0 && Data.sodium2<=0.10 ){
      fact = "healthy";
    }else if(isPastaandnoodlesandlikeproducts  && Data.totalFat2<=3.0 &&  Data.sodium2<=0.25 ){
      fact = "healthy";
    }else if(isFreshandfrozenmeatpoultrygamefishandseafoodproducts && Data.totalFat2<=15.0 ){
      fact = "healthy";
    }else if(isFreshandfrozenfruitsandvegetablesandlegumes){
      fact = "healthy";
    }else if(isProcessedfruitsandvegetables && Data.sodium2<=0.40 ){
      fact = "healthy";
    }else if(isSolidformsoybeanProducts && Data.totalFat2<=12.0 && Data.sugar2<=5.0 && Data.sodium2<=0.10 ){
      fact = "healthy";
    }else if(isSaucesdipsanddressings && Data.totalFat2<=12.0 && Data.sugar2<=10.0 && Data.sodium2<=0.30){
      fact = "healthy";
    }else{
      fact ="unhealthy"
    }
    return fact;
    
  }


  const handleOpen = (text,status) => {
// console.log(text)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#5a7d59",
      confirmButtonText: "Yes",
      iconColor: "#294B29",
      customClass: {
        popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        cancelButton: 'bg-gradient-to-t from-buttonGreen to-darkGreen',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(text)
        setButtonDisabled(true);
        // console.log(text)
        if(text==="expert"){
          // console.log("hey there")
          if (status==="red") {
            handleDelete(text);
          }else{
            handleApprove(text);
          }         
        }else{
          handleDelete(text);
        }
        Swal.fire({
          showConfirmButton: false,
          text: text === "expert" ? "Done" : `${text} has been deleted.`,
          timer: 2000,
          icon: "success",
          iconColor: '#294B29',
          customClass: {
            popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
          },
        })
        // .then(() => {
          // Check if buttons are disabled, and if yes, navigate to the previous page
          if (buttonDisabled) {
            localStorage.removeItem('savedButtonDisabled')
            // window.history.back();
          }
        // });  
        
      }
      
    });
  };

if (text==="video"|| text==="expert" || text==='experthistory')  {
  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/videos/reviewvideo/${videoId}`);
        setData(response.data.video);
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetails();
  }, [videoId]);
}else{
  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product/reviewproduct/${productId}`);
        setData(response.data.product);
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetails();
  }, [productId]);
}
 

  const handlesave= async (e) => {
    // e.preventDefault();
    // console.log(videoId)
    const healthFact= health();
    try {
      if(text==="expert" ){
        console.log(text)
        await axios.post(
         
          `http://localhost:3000/api/videos/greenflag/${videoId}`,{email});
  
      }   
      else if (text === "video") {
       await axios.post(`http://localhost:3000/api/videos/reviewvideo/${videoId}`, {
        status: 'unannotated'
      });
    }else{
      await axios.post(`http://localhost:3000/api/product/reviewproduct/${productId}`, {
        healthfact : healthFact,
      });
    }
      Swal.fire({
        icon: 'success',
        title: `${text} saved successfully!`,
        showConfirmButton: false,
        timer: 2000, 
        customClass: {
          popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        },
        iconColor: '#294B29',
      });
      if (text !== "expert") {
        window.history.back();
      }
      
    } catch (error) {
      console.error(`Error saving ${text}:`, error);
    }
  };

  const viewdetails = () => {
    navigate('/product');
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const formattedDateTime = `${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`;
    return formattedDateTime;
  };
  
  const padZero = (num) => (num < 10 ? `0${num}` : num);

  const handleApprove = async (text) => {
    let endpoint;
    let data;
  
    if (userData.role === "expert head") {
      endpoint = `http://localhost:3000/api/videos/finalflag/${videoId}`;
      data = {
        finalflag: {
          status: "green",
          email: email,
          expertreviewedtime: getCurrentDateTime(),
          expertrevieweddate: new Date().toLocaleDateString()
        }
      };
    } else {
      endpoint = `http://localhost:3000/api/videos/flag/${videoId}`;
      data = {
        panelstatus: {
          status: "green",
          email: email,
          expertreviewedtime: getCurrentDateTime(),
          expertrevieweddate: new Date().toLocaleDateString()
        }
      };
    }
  
    try {
      await axios.post(endpoint, data);
  
      Swal.fire({
        icon: 'success',
        title: `Done`,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        },
        iconColor: '#294B29',
      });
  
      if (text !== "expert") {
        window.history.back();
      }
    } catch (error) {
      console.error("Error occurred while making the request:", error);
    }
  };
  
  

  const handleDelete = async (text) => {
    try {

      if (text === "expert") {
        let endpoint;
        let data;
      
        if (userData.role === "expert head") {
          endpoint = `http://localhost:3000/api/videos/finalflag/${videoId}`;
          data = {
            finalflag: {
              status: "red",
              email: email,
              expertreviewedtime: getCurrentDateTime(),
              expertrevieweddate: new Date().toLocaleDateString()
            }
          };
        } else {
          endpoint = `http://localhost:3000/api/videos/flag/${videoId}`;
          data = {
            panelstatus: {
              status: "red",
              email: email,
              expertreviewedtime: getCurrentDateTime(),
              expertrevieweddate: new Date().toLocaleDateString()
            }
          };


        }
      
        try {
          await axios.post(endpoint, data);
      
          Swal.fire({
            icon: 'success',
            title: `Done`,
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
            },
            iconColor: '#294B29',
          });
        } catch (error) {
          console.error(`Error declining ${text}:`, error);
        }
      } else if (text === "video") {
        await axios.delete(`http://localhost:3000/api/videos/reviewvideo/${videoId}`);
      } else {
        await axios.delete(`http://localhost:3000/api/product/reviewproduct/${productId}`);
      }
      
      if (text !== "expert") {
        window.history.back();
      }  
    } catch (error) {
      console.error(`Error declining ${text}:`, error);
    }
  };
  

  const handleurl = (inputurl) => {
    if (loading) {
      console.log('Video data is still loading');
      return null;
    } else {
      const url = inputurl.replace(/\\/g, '/');
      const desiredPart = url.split('/').pop();
      const videourl = `/videos/${desiredPart}`;
      console.log('Video URL:', videourl);
      return videourl;
    }
  };
 console.log(Data)

useEffect(() => {
  
  const fetchProductDetails = async () => {
    try {
      let productName;
      if(text==="product"){
        productName= Data.productName;
      }else{
        productName= Data.product;
      }
      let brand = Data.brand;
      const response = await axios.get(`http://localhost:3000/api/product/productdetails/${productName}/${brand}`);
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching ReviewDetails:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProductDetails();
}, [Data.product,Data.productName,Data.brand, text]);

const handlePoductDetails = (size,product,brand,unit) =>{
  navigate(`/product/view/${size}/${product}/${brand}/${unit}`)
}

  return ( 
    <div className='mt-12 container lg:flex justify-center max-w-screen gap-[15%]'>
  {type !== "videoDecision" && (
    <>
      <div className='property lg:flex lg:w-1/2 justify-center'>
        <div className="image lg:w-1/2">
          {(text === "video" || text === "expert" || text === "experthistory") && (
            <ReactPlayer
              className='react-player'
              url={handleurl(Data.videoPath)}
              width='180%'
              height='100%'
              controls={true}
            />
          )}
          {text === "product" && (
            <img
              className='fixed-bottom h-96 w-[100%]'
              src={handleurl(Data.imageFront)}
              alt="Product Image"
            />
          )}
        </div>
      </div>
      <div className='justify-center items-center lg:w-1/2 pt-5'>
        <form className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-4">
            <div className="md:w-1/3">
              <label className="block text-black font-bold text-left mb-1 md:mb-0">Brand Name</label>
            </div>
            <div className="md:w-2/3">
              <div className="shadow font-semibold text-center bg-white appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen">
                {Data.brand}
              </div>
            </div>
          </div>
          <div className="md:flex md:items-center mb-4">
            <div className="md:w-1/3">
              <label className="block text-black font-bold text-left mb-1 md:mb-0">Product</label>
            </div>
            <div className="md:w-2/3">
              <div className="shadow font-semibold text-center bg-white appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen">
                {text === "product" ? Data.productName : Data.product}
              </div>
            </div>
          </div>
          <div className="md:flex md:items-center mb-4">
            <div className="md:w-1/3">
              <label className="block text-black font-bold text-left mb-1 md:mb-0">Size</label>
            </div>
            <div className="md:w-2/3">
              <div className="shadow bg-white appearance-none border-2 rounded w-full py-2 px-4 text-black font-semibold text-center leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen">80g</div>
            </div>
          </div>
          {type !== "videoDecision" && Data.finalflag && Data.finalflag.length !== 0 && (
            <div className="md:flex md:items-center mb-4 gap-4">
              <div className="md:w-1/3">
                <label className="block text-black font-bold text-left mb-1 md:mb-0">Flag</label>
              </div>
              <div className="md:w-2/3 items-center">
                <div className="flex items-center w-full shadow bg-white appearance-none border-2 rounded py-2 px-4 text-black font-semibold text-center leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen">
                  {Data.finalflag[0].status}
                  <img src={Data.finalflag[0].status === "red" ? red : green} className="h-8 w-8 ml-4" alt="" />
                </div>
              </div>
            </div>
          )}
          {productData && productData.length > 0 && productData[0].healthfact && (
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label className="block text-black font-bold text-left mb-1 md:mb-0">Status</label>
              </div>
              <div className="md:w-2/3">
                <div className="shadow bg-white appearance-none border-2 rounded w-full py-2 px-4 text-black font-semibold text-center leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen">
                  {productData[0].healthfact}
                </div>
              </div>
            </div>
          )}
          {text !== 'experthistory' && text!=="expert" && type !== "annotator" && type !== "videoDecision" && (
            <div className="flex justify-center gap-6">
              <button
                className={`text-white w:auto flex ${buttonDisabled ? "bg-gray-500" : "bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br"} focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-8 py-2.5 text-center me-2 mb-2`}
                type="button"
                onClick={() => { buttonDisabled ? null : handleOpen(text, "red") }}
              >
                {text !== "expert" ? "Decline" : "Red Flag"}
              </button>
              <button
                className={`text-white w-auto flex ${buttonDisabled ? "bg-gray-500" : "bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br"} focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-8 py-2.5 text-center mb-2`}
                type="button"
                onClick={() => (text === "expert" ? (Data.status !== "annotated" ? null : handleOpen(text, "green")) : handlesave())}
                disabled={loading}
              >
                {text !== "expert" ? "Save" : "Green Flag"}
              </button>
              {text !== "expert" && (
                <div className="md:w-2/3">
                  <button
                    className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-8 py-2.5 text-center mb-2"
                    type="button"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
          {text==="expert" && (
            <button onClick={() => handlePoductDetails(responseData[0].size,responseData[0].product,responseData[0].brand,responseData[0].unit)}
            className='text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
            >
            View Product Details
           </button>
          )}
        </form>
      </div>
    </>
  )}
{type === "videoDecision" && (
  <>

    {Data.panelstatus && Data.panelstatus.length > 0 && Data.panelstatus.some(status => status.email === email) ? (
      <>
  <div> 
  {Data.panelstatus.find(status => status.email === email)?.status === "red" ? (
    
    <img src={red} alt="" />
  ) : (
    <img src={green} alt="" />
  )}
  </div> 
  
  
  <div>{Data.panelstatus.find(status => status.email === email)?.status}</div>

</>

    ) : (
      <>
        {text !== 'experthistory' && type !== "annotator" && (
          <div className="flex justify-center gap-6">
            <button
              className={`text-white w-auto flex ${buttonDisabled ? "bg-gray-500" : "bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br"} focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-8 py-2.5 text-center me-2 mb-2`}
              type="button"
              onClick={() => { buttonDisabled ? null : handleOpen(text, "red") }}
            >
              {text === "expert" && (
                <div className="flex items-center w-full">
                  Red Flag
                  <img src={red} className="h-4 w-4 ml-4" alt="" />
                </div>
              )}
            </button>
            <button
              className={`text-white w-auto flex ${buttonDisabled ? "bg-gray-500" : "bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br"} focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-8 py-2.5 text-center mb-2`}
              type="button"
              onClick={() => handleOpen(text, "green")}
              disabled={loading}
            >
              {text === "expert" && (
                <div className="flex w-full">
                  Green Flag
                  <img src={green} className="h-4 w-4 ml-4" alt="" />
                </div>
              )}
            </button>
          </div>
        )}
      </>
    )}
  </>
)}

</div>

  )
}

export default VideowithReview
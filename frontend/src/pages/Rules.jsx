import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import VideoContainer from './../components/videoContainer/VideoContainer';
import Navbar from './../components/navbar/Navbar';
import Rule from './../components/Rule';
import backwardarrow from './../assets/Images/backarrowgreen.png'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/sidebar/SideBar';

function Rules() {
  const [RuleData, setRuleData] = useState([]);
  let [isEnlarge, setEnlarge] = useState(true);
  let ruleNo,rule;
  const {type} = useParams();

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const formattedDateTime = `${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`;
    return formattedDateTime;
  };
  
  const padZero = (num) => (num < 10 ? `0${num}` : num);

  const handleOpen = () => {
    Swal.fire({
      title: "Add Rule",
      html:
        '<input id="ruleNo" class="swal2-input bg-white" placeholder="Rule Number" required>' +
        '<textarea id="rule" class="swal2-textarea bg-white" placeholder="Rule..."></textarea>',
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      confirmButtonColor: "#5a7d59",
      cancelButtonColor:"#5a7d59",
        customClass: {
          popup: 'bg-backgroundGreen text-sidebarGreen', // Use Tailwind CSS class directly
        },
  
      preConfirm: async () => {
        try {
          // Your validation or API call logic using the input values
          ruleNo = document.getElementById('ruleNo').value;
          rule = document.getElementById('rule').value;
          
    if (!ruleNo || !rule) {
      Swal.showValidationMessage("Rule Number and Rule are required");
      return false;
    }

        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
    .then((result) => {
      if (result.isConfirmed) {
        submit();
        
      Swal.fire({
        icon: 'success',
        title: 'Rule added successfully!',
        showConfirmButton: false,
        timer: 2000, 
        customClass: {
          popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        },
        iconColor: '#294B29',
      });
  
      }
    });
  };


  const submit = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/rules/rules`, {
        ruleNumber: ruleNo,
        rule: rule,
        addedAt: getCurrentDateTime(),
        addedIn: new Date().toLocaleDateString(),
        addedby: "Sensor Manager 01",

      });

      console.log(response)
    } catch (error) {
      console.error('Error saving rule:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rules/rules');
        const data = response.data;
        // console.log(data); // This should log the fetched data
        setRuleData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleValueChange = (value) => {
    console.log(value)
    if(value==true){
      setEnlarge(true);
    }else{
      setEnlarge(false);
    }
  };


  return (
    <div className='bg-backgroundGreen flex h-full min-h-screen'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> 
      <Sidebar type={type} onValueChange={handleValueChange}/>
      </div>
      <div className={`w-full z-10 mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
        <Navbar type='type'/>
        <div className=''>
        <h1 className=' mt-24 text-2xl font-semibold text-sidebarGreen left-0'>
        GAZETTE EXTRAORDINARY OF THE DEMOCRATIC SOCIALIST REPUBLIC OF SRI LANKA - 14.02.2023
        </h1>
        {(type === "sensormanager" || type === "expert") && (
        <button
          className="flex-end text-white mt-4 mr-20 bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleOpen}  // Add parentheses to call the function
        >
          Add New Regulation
        </button>
        )}
        </div>
        <div className='mb-12'>
            
        {RuleData.map((rule, index) => (
        <Rule key={index} rule={rule} type={type}/>
      ))}
        </div>
        
        <div>
          <button className="text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                 onClick={() => window.history.back()}>
                  Cancel
                </button>
          </div>

      </div>
          
      
    </div>
);
}

export default Rules

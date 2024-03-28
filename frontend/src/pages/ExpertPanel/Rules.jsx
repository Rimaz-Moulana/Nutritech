import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/ExpertPanelSidebar'
import Rule from '../../components/SensorManager/Rule';

function Rules() {
    const [RuleData, setRuleData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/rules/rules');
            const data = response.data;
            console.log(data); // This should log the fetched data
            setRuleData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);

  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar />
      </div>
      <div className="w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64 ">
        <div className='px-12'>
        <Navbar type='annotator' />
        </div>
        <div className='flex justify-between z-9999 mt-12'>
        <h1 className='ml-24 mb-8 mt-24 h-4 text-3xl font-semibold text-sidebarGreen left-0'>
           Rules and Regulations
        </h1>

       
      </div>
      <div className='ml-24'>
      {RuleData.map((rule, index) => (
        <Rule key={index} rule={rule} type={"expert"}/>
      ))}
      </div>
     
      </div>
    </div>
  );
}

export default Rules

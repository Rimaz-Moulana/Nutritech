import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RulePopup from '../Popup/RulePopup';

function Row({
  duration,
  onRuleChange,
  onDetailsChange,
  onTimestampChange,
  onRecommendationChange,
}) {
  const [timestamp, setTimeStamp] = useState('');
  const [rule, setRule] = useState('');
  const [details, setDetails] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // console.log(duration)

  const generateTimestampOptions = () => {
    const options = [];
    options.push("Select");
    options.push("NA");
    for (let i = 0; i < duration; i += 5) {
      const start = i;
      const end = Math.min(i + 5, duration);
      const option = `${start}-${end}s`;
      options.push(option);
      console.log('Generated options:', options);
    }
    return options;
  };


  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const response=await axios.get('http://localhost:3000/api/rules/rules');
        const data= response.data;
        setRules(data);
      }catch(error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[])
  const handleRuleChange = (e) => {
    const selectedRule = rules.find(rule => rule.ruleNumber === e.target.value);
    setRule(e.target.value);
    setSelectedRule(selectedRule); // Update selectedRule state
    onRuleChange(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
    onDetailsChange(e.target.value);
  };

  const handleTimestampChange = (e) => {
    setTimeStamp(e.target.value);
    onTimestampChange(e.target.value);
  };

  const handleRecommendationChange = (e) => {
    console.log('e.target.value:', e.target.value);
    setRecommendation(e.target.value);
    onRecommendationChange(e.target.value);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
    <div className='lg:flex sm:relative item-center p-3 justify-center'>  
    <div className='pr-8'>
    <div className="relative mt-4 lg:max-w-[100%] sm:max-w-[50%] border-gray-200 border-1 rounded-sm">
      <label id='timestamp' className=" block mb-4 text-sm font-medium text-gray-900 dark:text-white">Time Stamp</label>
      <select className="w-[100%] lg:w-[100%] bg-gray-50 border mt-1 border-gray-300 text-gray-900 text-sm rounded focus:ring-sidebarGreen focus:border-sidebarGreen block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sidebarGreen dark:focus:border-sidebarGreen"  onChange={handleTimestampChange}>
         {generateTimestampOptions().map((option, index) => (
                <option key={index}>{option}</option>
              ))}
      </select>
    </div>

    <div>
    <button onClick={openPopup} className='mt-4 text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2'>View Rules</button>
   </div>

    <div className="relative mt-4 lg:max-w-[100%] sm:max-w-[50%] border-gray-200 border-1 rounded-sm">
      <label id='rules' className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Regulation</label>
      <select className="w-[100%] lg:w-[100%] bg-gray-50 border mt-1 border-gray-300 text-gray-900 text-sm rounded focus:ring-sidebarGreen focus:border-sidebarGreen block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sidebarGreen dark:focus:border-sidebarGreen" onChange={handleRuleChange}>
      
      <option >Select</option>
      <option >None</option>
      {/* <p>Regulation </p> */}
      {rules.map((rule, index) => (
              <option key={index}>{rule.ruleNumber}</option> // Assuming ruleNumber is the property containing the rule number
            ))}
      </select>
    </div>
   
    </div>
<div className='lg:flex sm:relative'>
<div className='px-3' >
    <div className="relative h-full  border-gray-200 border-1 rounded-sm">
    <label id='details' htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white px-3">Details</label>
      <textarea type="text" id="small-input" className="block w-[100%] lg:w-96 h-60 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleDetailsChange}></textarea>
    </div>
      </div>

      <div className="relative h-full  border-gray-200 border-1 rounded-sm">
          <label id='reccomendation' htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white px-3">Suggesions</label>
            <textarea type="text" id="small-input" className="block w-[100%] lg:w-96 h-60 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleRecommendationChange}></textarea>
          </div>
</div>


    
      </div>
{selectedRule && (
      <div className='mt-4 text-md border-2 text-left border-gray-300 rounded-sm h-fit '>
    <p className='text-black'>Regulation: {selectedRule ? selectedRule.rule : ''}</p> {/* Display selected rule */}
    </div>
)}

{isPopupOpen && (
        <RulePopup rules={rules} onClose={closePopup} />
      )}
      </div>
      
  );
}

export default Row;

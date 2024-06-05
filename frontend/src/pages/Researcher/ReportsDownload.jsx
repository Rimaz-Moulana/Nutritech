import axios from 'axios';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';

export default function LogTable() {
  const navigate = useNavigate();
  const {videoId} = useParams();
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, [videoId]);

  const fetchData = async () => {
    setError(null);
    try {
      console.log("fetching session details..");
        const authData = localStorage.getItem('token');
        // console.log(authData)

        setTimeout(() => {
          // Remove token from local storage after 5 seconds
          localStorage.removeItem('token');
          localStorage.removeItem('email');
      }, 7200000); // 2hours

      if(authData){
        const {accessToken} = authData;
        console.log(accessToken);
        const config = {
          headers : {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true,
        };
      const response = await axios.get(`http://localhost:3000/api/videos/report/${videoId}`, config);
      setVideo(response.data);
      console.log(video);

      }else{
        navigate('/')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.'); // Set error message
    }
  };

  const filterKeys = ['_id', 'createdTime', 'CreatedData', '__v'];


  const generatePDF = () => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(20);
    doc.text('My Report', 20, 20);

    // Add some content
    doc.setFontSize(12);
    doc.text('This is a simple example of generating a PDF report.', 20, 30);

    // Add some more content
    doc.text('You can add more content and customize this report as needed.', 20, 40);

    // Save the PDF
    doc.save('report.pdf');
  };

  const generateRedPDF = () => {
    const doc = new jsPDF();
  
    // Add a title
    doc.setFontSize(20);
    doc.text('Red Flag Video Report', 20, 20);
  
    // Add video details
    doc.setFontSize(12);
    let y = 40; // Starting y-coordinate for the details
    const lineHeight = 10; // Height between each line of text

    doc.text(`Video Status: ${video.status}`, 20, y);
    y += lineHeight;
    doc.text(`Created Time: ${video.createdAt}`, 20, y);
    y += lineHeight;
    doc.text(`Created Date: ${video.createdIn}`, 20, y);
    y += lineHeight;
    doc.text(`Product name: ${video.product}`, 20, y);
    y += lineHeight;
    doc.text(`Brand name: ${video.brand}`, 20, y);
    y += lineHeight;
    doc.text(`Size: ${video.size + video.unit}`, 20, y);
    y += lineHeight;
    doc.text(`Comment: ${video.comment}`, 20, y);
    y += lineHeight;
    doc.text(`Final Comment: ${video.finalcomment}`, 20, y);
    y += lineHeight;
    doc.text(`Panel Status: ${video.panelstatus}`, 20, y);
    y += lineHeight;
    doc.text(`Annotations: ${video.annotations}`, 20, y);
    y += lineHeight;
    doc.text(`Reannotations: ${video.reannotations}`, 20, y);
  
    // Save the PDF
    doc.save('red_flag_video_report.pdf');
};


  const generateGreenPDF = () => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(20);
    doc.text('My Report', 20, 20);

    // Add some content
    doc.setFontSize(12);
    doc.text('This is a simple example of generating a PDF report.', 20, 30);

    // Add some more content
    doc.text('You can add more content and customize this report as needed.', 20, 40);

    // Save the PDF
    doc.save('report.pdf');
  };
  





  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar type="researcher"/>
      </div>
      <div className="w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64">
        <div className='p-1'>
        <Navbar type='researcher' />
        </div>
        <div className='flex mt-20 justify-between'>
        <h1 className='ml-8 mb-8 mt-4 h-4 text-3xl font-semibold text-sidebarGreen left-0'>Video Reports</h1>
        </div>
        <div className='w-full mb-10 sm:w-3/4 ml-0 h-full z-10 '>
        <div className="container mx-auto mt-10 w-[100%] h-[100%] lg:ml-32 sm:ml-10 md:ml-24">
        <table className="min-w-full mb-[30%] table-auto divide-y divide-gray-200 rounded-lg overflow-hidden border-spacing-2 border-black">
          <thead>
            <tr>
              <th className="py-3 text-justify lg:px-10 text-lg font-medium text-black uppercase whitespace-nowrap">Criteria</th>
              <th className="py-3 text-justify lg:px-10 text-lg font-medium text-black uppercase whitespace-nowrap">Click to Download Reports</th>

            </tr>
          </thead>
          <tbody>
          <tr className="border-b border-black">
              <td className="py-3 text-justify whitespace-nowrap">why it was red Flag Video?</td>
              <button className='text-white bg-gradient-to-t from-red-700 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2' onClick={generateRedPDF}>Generate Report</button>
            </tr>
            <tr className="border-b border-black">
              <td className="py-3 text-justify whitespace-nowrap">why it was green Flag Video?</td>
              <button className='text-white bg-gradient-to-t from-red-700 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2' onClick={generateGreenPDF}>Generate Report</button>
            </tr>
            <tr className="border-b border-black">
              <td className="py-3 text-justify whitespace-nowrap">Identify compliance with regulations. Indicate where (in which sentence) the rules are violated</td>
              <button className='text-white bg-gradient-to-t py-3 from-red-700 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5  mr-2 mb-2' onClick={generatePDF}>Generate Report</button>
              
            </tr>
            <tr className="border-b border-black">
              <td className="py-3 text-justify whitespace-nowrap">The violation frequency of the rules and regulations</td>
              <button className='text-white bg-gradient-to-t py-3 from-red-700 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5  mr-2 mb-2' onClick={generatePDF}>Generate Report</button>
            </tr>
            <tr className="border-b border-black">
              <td className="py-3 text-justify whitespace-nowrap">According to WHO food Profile, which food group does the advertised food belong to?</td>
              <button className='text-white bg-gradient-to-t from-red-700 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2' onClick={generatePDF}>Generate Report</button>
            </tr>
            <tr className="border-b border-black">
              <td className="py-3 text-justify whitespace-nowrap">Which of the following two categories can the advertised food be classified as: permissible or non-permissible?</td>
              <button className='text-white bg-gradient-to-t from-red-700 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2' onClick={generatePDF}>Generate Report</button>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      </div>
    </div>
  );
}

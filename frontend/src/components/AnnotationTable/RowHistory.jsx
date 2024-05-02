import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouteError } from 'react-router-dom';

function RowHistory({ videoId, usertype }) {
  const [annotations, setAnnotations] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pRefs = useRef([]);
  const [rowCorrectness, setRowCorrectness] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(() => {
    // return JSON.parse(localStorage.getItem('isChecked')) || false;
  });

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/videos/annotation/${videoId}`);
        const video = response.data;
        setVideoData(video);
      } catch (error) {
        console.error('Error fetching Video:', error);
      } 
    };
  
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    const fetchAnnotations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/annotations/annotationhistory/${videoId}`);
        setAnnotations(response.data.annotations);
      } catch (error) {
        console.error('Error fetching annotations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnotations();
  }, [videoId]);

  useEffect(() => {
    pRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.height = `${ref.scrollHeight}px`;
      }
    });
  }, [annotations]);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    setShowModal(true);
  }
  
  const closeModal = () => {
    setShowModal(false);
  };
  console.log(videoData);
  return (
    <div className='ml-0 text-gray-500 item-center'>
      {usertype !== "industry" && (
        <>
          <h1>Annotations</h1>
          <table className="w-full bg-white border rounded lg:w-[100%]">
            <thead>
              <tr>
                <th className="border border-gray-300">Time Stamp</th>
                <th className="border border-gray-300">Regulation</th>
                <th className="border border-gray-300">Details</th>
                <th className="border border-gray-300">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {annotations.map((annotation, index) => (
                <React.Fragment key={`annotation_${index}`}>
                  {annotation.rule !== "" && (
                    <tr>
                      <td className="border border-gray-300 p-2">{annotation.timestamp}</td>
                      <td className="border border-gray-300 text-start p-2">{annotation.rule}</td>
                      <td className="border border-gray-300 text-left p-2">{annotation.details}</td>
                      <td className="border border-gray-300 text-left p-2">{annotation.recommendation}</td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {videoData && videoData[0]?.reannotations && videoData[0].reannotations.map((annotation, index) => (
            <React.Fragment key={`reannotation_${index}`}>
              <h2>Annotations after Reannotation</h2>
              <table className="w-full bg-white border rounded lg:w-[100%]">
                <thead>
                  <tr>
                    <th className="border border-gray-300">Time Stamp</th>
                    <th className="border border-gray-300">Regulation</th>
                    <th className="border border-gray-300">Details</th>
                    <th className="border border-gray-300">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  <React.Fragment>
                    {annotation.rule !== "" && (
                      <tr key={`reannotation_row_${index}`}>
                        <td className="border border-gray-300 p-2">{annotation.timestamp}</td>
                        <td className="border border-gray-300 text-start p-2">{annotation.rule}</td>
                        <td className="border border-gray-300 text-left p-2">{annotation.details}</td>
                        <td className="border border-gray-300 text-left p-2">{annotation.recommendation}</td>
                      </tr>
                    )}
                  </React.Fragment>
                </tbody>
              </table>
            </React.Fragment>
          ))}
        </>
      )}

      
      {(usertype === "industry" && videoData && videoData.length > 0 && !videoData[0].reannotations) && (
        <div className='ml-0 text-gray-500 item-center'>
          <h1>Annotations</h1>
          <table className="w-full bg-white border rounded lg:w-[100%]">
            <thead>
              <tr>
                <th className="border border-gray-300">Time Stamp</th>
                <th className="border border-gray-300">Regulation</th>
                <th className="border border-gray-300">Details</th>
                <th className="border border-gray-300">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {annotations.map((annotation, index) => (
                <React.Fragment key={`annotation_${index}`}>
                  {annotation.rule !== "" && (
                    <tr>
                      <td className="border border-gray-300 p-2">{annotation.timestamp}</td>
                      <td className="border border-gray-300 text-start p-2">{annotation.rule}</td>
                      <td className="border border-gray-300 text-left p-2">{annotation.details}</td>
                      <td className="border border-gray-300 text-left p-2">{annotation.recommendation}</td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

{(usertype === "industry" && videoData && videoData[0]?.reannotations && videoData[0]?.reannotations.length > 0) && (
        <React.Fragment>
          <h2>Annotations</h2>
          <table className="w-full bg-white border rounded lg:w-[100%]">
            <thead>
              <tr>
                <th className="border border-gray-300">Time Stamp</th>
                <th className="border border-gray-300">Regulation</th>
                <th className="border border-gray-300">Details</th>
                <th className="border border-gray-300">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {videoData[0].reannotations.map((reannotation, index) => (
                <React.Fragment key={`reannotation_${index}`}>
                  {reannotation.rule !== "" && (
                    <tr key={`reannotation_row_${index}`}>
                      <td className="border border-gray-300 p-2">{reannotation.timestamp}</td>
                      <td className="border border-gray-300 text-start p-2">{reannotation.rule}</td>
                      <td className="border border-gray-300 text-left p-2">{reannotation.details}</td>
                      <td className="border border-gray-300 text-left p-2">{reannotation.recommendation}</td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      )}

    </div>
  );
}

export default RowHistory;

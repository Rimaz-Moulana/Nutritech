import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouteError } from 'react-router-dom';

function RowHistory({ videoId, usertype }) {
  const [annotations, setAnnotations] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pRefs = useRef([]);
  const [decision, setDecision] = useState({});
  const [showModal, setShowModal] = useState(false);
  const email  = localStorage.getItem('email');
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
  // console.log(decision);
  const handleDecision = async (decision, annotation, type) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/videos/decision/${videoId}`, {
        decision,
        annotation: {
          timestamp: annotation.timestamp,
          rule: annotation.rule,
          details: annotation.details,
          recommendation: annotation.recommendation,
        },
        email,
        type,
      });

      // Update the local state to reflect the new decision
      const updatedAnnotations = annotations.map((ann) => {
        if (ann.timestamp === annotation.timestamp && ann.rule === annotation.rule) {
          return {
            ...ann,
            acceptance: [...ann.acceptance, { user: email, decision }]
          };
        }
        return ann;
      });

      setAnnotations(updatedAnnotations);
      alert('Decision submitted successfully');
    } catch (error) {
      console.error('Error submitting decision:', error);
    }
  };

  return (
    <div className="text-gray-500 item-center mr-12">
      {usertype !== "industry" && (
        <div className="container">
          <div className="table-responsive">
            <table className="w-full table table-bordered">
              <thead className="bg-gray-200">
                <tr>
                  <th >Time Stamp</th>
                  <th>Regulation</th>
                  <th className='w-[30%]'>Details</th>
                  <th className='w-[30%]'>Recommendation</th>
                  {usertype !== "annotator" && usertype !== "industry" && videoData && (!videoData[0]?.reannotations || videoData[0]?.reannotations.length === 0) && (
                    <th className='w-[20%]'>Decision</th>
                  )}
                
                </tr>
              </thead>
              <tbody>
                {annotations.map((annotation, index) => (
                  <tr key={`annotation_${index}`} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                    {annotation.rule !== "" && (
                      <>
                        <td>{annotation.timestamp}</td>
                        <td>{annotation.rule}</td>
                        <td className="p-4 text-left" style={{ wordWrap: 'break-word' }}>{annotation.details}</td>
                        <td className="p-6 text-left" style={{ wordWrap: 'break-word' }}>{annotation.recommendation}</td>
                        {annotation.acceptance.some(acc => acc.user === email) ? (
                          <td>{annotation.acceptance.find(acc => acc.user === email).decision}</td>
                        ) : (
                          usertype !== "annotator" && usertype !== "industry" && videoData && (!videoData[0]?.reannotations || videoData[0]?.reannotations.length === 0) && (
                            <td className='" flex items-end justify-center mt-4 z-10 h-full"'>
                              <button
                                className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                                onClick={() => handleDecision("Agree", annotation, "annotations")}>
                                Agree
                              </button>
                              <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={() => handleDecision("Disagree", annotation, "annotations")}>
                                Disagree
                              </button>
                            </td>
                          )
                        )}
                       
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {videoData && videoData[0]?.reannotations && videoData[0].reannotations.length > 0 && (
            <>
              <h2 className="text-center">Annotations after Reannotation</h2>
              <div className="table-responsive">
                <table className="w-full table table-bordered">
                  <thead className="bg-gray-200">
                    <tr>
                      <th>Time Stamp</th>
                      <th>Regulation</th>
                      <th>Details</th>
                      <th>Recommendation</th>
                      {usertype !== "annotator" && usertype !== "industry" && (
                                <th className='w-[20%]'>Decision</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {videoData[0].reannotations.map((reannotation, index) => (
                      <tr key={`reannotation_${index}`} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                        {reannotation.rule !== "" && (
                          <>
                            <td>{reannotation.timestamp}</td>
                            <td>{reannotation.rule}</td>
                            <td style={{ wordWrap: 'break-word' }}>{reannotation.details}</td>
                            <td>{reannotation.recommendation}</td>
                            {reannotation.acceptance.some(acc => acc.user === email) ? (
                          <td>{reannotation.acceptance.find(acc => acc.user === email).decision}</td>
                        ) : (
                          
                            <td className='" flex items-end justify-center mt-4 z-10 h-full"'>
                              <button
                                className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                                onClick={() => handleDecision("Agree", reannotation, "annotations")}>
                                Agree
                              </button>
                              <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={() => handleDecision("Disagree", reannotation, "annotations")}>
                                Disagree
                              </button>
                            </td>
                          
                        )}
                            
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {usertype === "industry" && videoData && (
        <div className="container">
          <h1 className="text-center">Annotations</h1>
          <div className="table-responsive">
            <table className="w-full table table-bordered">
              <thead className="bg-gray-200">
                <tr>
                  <th>Time Stamp</th>
                  <th>Regulation</th>
                  <th>Details</th>
                  <th>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {annotations.map((annotation, index) => (
                  <tr key={`annotation_${index}`} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                    {annotation.rule !== "" && (
                      <>
                        <td>{annotation.timestamp}</td>
                        <td>{annotation.rule}</td>
                        <td style={{ wordWrap: 'break-word' }}>{annotation.details}</td>
                        <td>{annotation.recommendation}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {usertype === "industry" && videoData && videoData[0]?.reannotations && videoData[0].reannotations.length > 0 && (
        <div className="container">
          <h2 className="text-center">Annotations</h2>
          <div className="table-responsive">
            <table className="w-full table table-bordered">
              <thead className="bg-gray-200">
                <tr>
                  <th>Time Stamp</th>
                  <th>Regulation</th>
                  <th>Details</th>
                  <th>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {videoData[0].reannotations.map((reannotation, index) => (
                  <tr key={`reannotation_${index}`} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                    {reannotation.rule !== "" && (
                      <>
                        <td>{reannotation.timestamp}</td>
                        <td>{reannotation.rule}</td>
                        <td style={{ wordWrap: 'break-word' }}>{reannotation.details}</td>
                        <td>{reannotation.recommendation}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>



  );
}

export default RowHistory;

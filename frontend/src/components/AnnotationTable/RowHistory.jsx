import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import API from '../../config/config';

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


  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
       try {
          // const email  = localStorage.getItem('email');
          const response = await axios.get(`${API}/api/users/getUser/${email}`);
          // console.log("response",response); // Logging the response data directly
          setUserData(response.data); // Setting the response data to the state
       } catch (error) {
          console.error('Error fetching user:', error);
          // Handle error (e.g., set error state, show error message)
       }
    };
  
    fetchUser();
}, []);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${API}/api/videos/annotation/${videoId}`);
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
        const response = await axios.get(`${API}/annotations/annotationhistory/${videoId}`);
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
      if(userData.role==="expert head"){
        const response = await axios.post(`${API}/api/videos/finaldecision/${videoId}`, {
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
      
      location.reload();
      }else{
      const response = await axios.post(`${API}/api/videos/decision/${videoId}`, {
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
    }

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
      console.log(updatedAnnotations);
      setAnnotations(updatedAnnotations);
      alert('Decision submitted successfully');
    } catch (error) {
      console.error('Error submitting decision:', error);
    }

    
  };
 

  return (
    <div className="text-gray-500 item-center mr-12 ">
      {usertype !== "industry" && (
        <div className="container">
          <div className="table-responsive">
            <table className="w-full table table-bordered">
              <thead className="bg-gray-200">
                <tr>
                  <th >Time Stamp</th>
                  <th>Regulation</th>
                  <th className='w-[30%]'>Details</th>
                  <th className='w-[30%]'>Comments</th>
                  {usertype !== "researcher" && videoData && (!videoData[0]?.reannotations || videoData[0]?.reannotations.length === 0) && (
                    <th className='w-[20%]'>Decision</th>
                  )}
                
                </tr>
              </thead>
              <tbody>
                {/* {(usertype==="annotator" || (usertype==="industry" && videoData && videoData[0].reannotations && videoData[0].reannotations.length>0 )) && ( */}
              {annotations.map((annotation, index) => (
              annotation.rule !== "" && (

                <tr key={`annotation_${index}`} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                  <td>{annotation.timestamp}</td>
                  <td>{annotation.rule}</td>
                  <td className="p-4 text-center" style={{ wordWrap: 'break-word' }}>{annotation.details}</td>
                  <td className="p-6 text-center" style={{ wordWrap: 'break-word' }}>{annotation.recommendation}</td>
                  {(usertype === "annotator" || userData.role==="expert head") &&  videoData[0]?.reannotations && videoData[0].reannotations.length === 0 ? (
                    <td>
                    {annotation.finalacceptance[0]?.decision ? (
                      annotation.finalacceptance[0].decision 
                    ): (
                      (userData.role==="expert head" && (
                      <td className="flex items-end justify-center mt-4 z-10 h-full">
                          <button
                            className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                            onClick={() => handleDecision("Agree", annotation, "annotations")}>
                            Agree
                          </button>
                          <button 
                            className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                            onClick={() => handleDecision("Disagree", annotation, "annotations")}>
                            Disagree
                          </button>
                        </td>
                    ))
                    ) 
                       }
                    </td>
                  ) : (usertype === "expert" ? (
                    annotation.acceptance.some(acc => acc.user === email) ? (
                      <td>{annotation.acceptance.find(acc => acc.user === email).decision}</td>
                    ) : (
                     
                      usertype !== "industry" && videoData && (!videoData[0]?.reannotations || videoData[0]?.reannotations.length === 0) && (
                        <td className="flex items-end justify-center mt-4 z-10 h-full">
                          <button
                            className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                            onClick={() => handleDecision("Agree", annotation, "annotations")}>
                            Agree
                          </button>
                          <button 
                            className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                            onClick={() => handleDecision("Disagree", annotation, "annotations")}>
                            Disagree
                          </button>
                        </td>
                      )
                    )
                  ) : null)}
                </tr>
              )
            ))}

              </tbody>

            </table>

          </div>

          {videoData[0] && videoData[0].message && videoData[0].message.length>0 &&
<div className='p-2 mt-4'>
  <p className="text-sidebarGreen text-sm"><strong>Message for annotator from expert head</strong></p>
  {videoData[0].message?.map((msg, index) => (
    <p key={index}>{msg.text}</p>
  ))}
</div>
}

{
  (userData.role==="annotator" && videoData[0].message && videoData[0].message.length>0 && videoData[0].reannotations && videoData[0].reannotations.length<1) && (
    <p className='text-red-800 mt-4'>Although expert head agree on some annotations, you have to rewrite those annotations in the reannotations.</p>
  )
}
          {videoData && videoData[0]?.reannotations && videoData[0].reannotations.length > 0 && (
            <>
              <h2 className="text-center mt-8">New Annotations</h2>
              <div className="table-responsive mt-4">
                <table className="w-full table table-bordered">
                  <thead className="bg-gray-200">
                    <tr>
                      <th>Time Stamp</th>
                      <th>Regulation</th>
                      <th>Details</th>
                      <th>Comments</th>
                      {usertype !== "annotator" && usertype !== "industry" && userData.role!=="expert panel" && (
                                <th className='w-[20%]'>Decision</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>

                  {videoData[0].reannotations.map((reannotation, index) => (
  reannotation.rule !== "" && (
    <tr key={`reannotation_${index}`} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
      <td className='p-4'>{reannotation.timestamp}</td>
      <td className='p-4'>{reannotation.rule}</td>
      <td className='p-4' style={{ wordWrap: 'break-word' }}>{reannotation.details}</td>
      <td className='p-4'>{reannotation.recommendation}</td>
      {usertype === "annotator" || usertype ==="researcher" ? (
                    <td>
                      {reannotation.finalacceptance[0]?.decision 
                        ? reannotation.finalacceptance[0].decision 
                        : reannotation.acceptance?.find(status => status.email === email)?.decision}
                    </td>
                  ) : (usertype === "expert" && userData.role!=="expert panel"? (
                    reannotation.finalacceptance?.some(acc => acc.user === email) ? (
                      <td>{reannotation.finalacceptance.find(acc => acc.user === email).decision}</td>
                    ) : (
                      // usertype !== "industry" && videoData && (!videoData[0]?.reannotations || videoData[0]?.reannotations.length === 0) && (
                        <td className="flex items-end justify-center mt-4 z-10 h-full">
                          <button
                            className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                            onClick={() => handleDecision("Agree", reannotation, "reannotations")}>
                            Agree
                          </button>
                          <button 
                            className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                            onClick={() => handleDecision("Disagree", reannotation, "reannotations")}>
                            Disagree
                          </button>
                        </td>
                      
                    )
                  ) : null)}
    </tr>
  )
))}

                  </tbody>
                </table>
              </div>


            </>

            
          )}
        </div>
      )}

      {usertype === "industry" && videoData && videoData[0]?.reannotations && videoData[0].reannotations.length == 0 && (
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

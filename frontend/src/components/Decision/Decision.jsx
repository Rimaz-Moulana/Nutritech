import React from 'react'

function Decision() {

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
  
      
  return (
    <div>
      <h1>Your Decision</h1>
      <div className='flex'>
      <button
  className={`text-white w:auto flex ${
    buttonDisabled ? "bg-gray-500" : "bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br"
  } focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-8 py-2.5 text-center me-2 mb-2`}
  type="button"
  onClick={() => { buttonDisabled ? null : handleApprove(text) }}
  // onClick={() => { /*Data.status!=="annotated" ? null :*/ handleOpen(text,"red") }}
>
{text === "expert" && type!=="annotator" &&  (
    <div className="flex items-center w-full">
      Red Flag
      <img src={red} className="h-4 w-4 ml-4" alt="" />
    </div>
  )}
  {text !== "expert" && (
    "Decline"
  )}
</button>     
{/* </div> */}
  
    {/* <div className="w-full md:w-2/3"> */}
    <button
  className={`text-white w-auto flex ${
    buttonDisabled ? "bg-gray-500" : "bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br"
  } focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-8 py-2.5 text-center mb-2`}
  type="button"
  // onClick={() => (text === "expert" ? (buttonDisabled ? null : handleOpen(text,"green")) : handlesave())}
  onClick={() =>  handleApprove(text,"green") }
  disabled={loading}
>
  {text === "expert" && type!=="annotator" && (
    <div className="flex w-full">
      Green Flag
      <img src={green} className="h-4 w-4 ml-4" alt="" />
    </div>
  )}

  {text !== "expert" && type!=="annotator" && (
    "Save"
  )}
</button>
</div>
    </div>
  )
}

export default Decision



 // define fetch for api call
 const fetchApiCall  = async (url) =>{
        
    const response  = await fetch(url)
    try{ 
      //   errorHandler(response)
        const responseData = await response.json()
          return responseData;
       }catch(error){
           console.log("error", error)
       }
  
      };

     
      
      // handles error coming from invalid input
      
  const errorHandler = ()=>{
        let errorContent  = document.getElementById('error-content')
        let inputError    = document.getElementById('desti-location')
        let  errMsg       = "please! enter valid city name"
        inputError.setAttribute('class','input-error')
        errorContent.style.color = "red"
        errorContent.innerHTML   = errMsg
        setTimeout(()=>{
            errorContent.innerHTML =''
            inputError.classList.remove('input-error')
            inputError.value       = ''
        },4000)
    }






//postData function define

const postData = async (url = " ", data = {})=>{

    const response = await fetch(url,{
      method:"POST",
      credentials: "same-origin",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(data)

      });

      try {
          const newData = await response.json();
      return newData;
      
      }catch(error){
      console.log("error", error)
      }
      
  };

  export {fetchApiCall,postData,errorHandler }
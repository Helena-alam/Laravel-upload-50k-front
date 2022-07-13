import React, { useEffect, useRef, useState } from 'react';
import Layouts from '../components/Layouts';

export default function Index() {
  const fileRef = useRef();
  const API_URL = "http://localhost:8000/api";
  const [batchId, setBatchId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleForm(e)
  {
    e.preventDefault();
    if(isLoading) return;
    const inputFile=fileRef.current;
    const file=inputFile.files[0];
    if(!file) return;
   
    const formData= new FormData();
    formData.append("mycsv" , file);

    

    setIsLoading(true);
    fetch(`${API_URL}/upload`, 
    { 
      method : "post",       
      body: formData 
    }
    )//JSON.stringify(data)
    .then((res) =>res.json())
    .then((data) => {
      console.log(data.id);      
      setBatchId(data.id);
      setIsLoading(false);
    });
  }

  const [batchDetail, setBatchDetail]=useState({});

  function batchDetails(id=null)
  {
    const currentBatchId = id ?? batchId;
    
    fetch(`${API_URL}/batch?id=${currentBatchId}`)
    .then((res) =>res.json())
    .then((data) => 
    {
      console.log(progressInterval.current);
      if(data.progress>100)
      {
        clearInterval(progressInterval.current);
      }
      setBatchDetail(data);
    }
    );
  }

  const progressInterval = useRef('');
  function updateProgress()
  {
    if(progressInterval.current !== "") return;
    progressInterval.current=setInterval(()=>
    {
      //console.log("inside update progress");
      batchDetails();
    },[5000]);
  }
  useEffect(()=>
  { 
    if(batchId != null)   
    {
      updateProgress();      
    }
  },[batchId]);

  useEffect(()=>
  { 
    fetch(`${API_URL}/batch/in-progress`)
    .then((res) =>res.json())
    .then((data) => setBatchId(data.id));
    
  },[]);
  
  return (
    <Layouts> 
      {batchDetail.progress != undefined &&
        (
          <section>
          <p>Upload is in progress ({batchDetail.progress}%)</p>
          <div className='w-full h-4 shadow-inner rounded-lg border'>
            <div className='bg-teal-500 w-full h-4 rounded-lg' style={{width:`${batchDetail.progress}%`}}>
            </div>
          </div>
          
          </section>
        )}
        {batchDetail.progress == undefined &&
        (<section>        
          <div className="max-w-xl px-10 my-4 py-6 bg-white rounded-lg shadow-md flex grid grid-cols-2 h-34 w-full">  
          <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="multiple_files">
          Choose file to Upload
          </label>
          </div>
          
            <form className="m-4 flex" onSubmit={handleForm}>
                <div className="flex " style={{width:"500px"}} >
                    <input className="h-20 text-sm border border-0 rounded-l
                     p-5 bg-gray-800 whitespace-no-wrap text-white" width="450px"  
                    type="file" ref={fileRef} multiple=""  />            
                </div>
                <div className="flex w-1/6" width="250">
                    <input className={`px-8 h-18 rounded-r-lg text-gray-800 font-bold p-3 
                  uppercase border-yellow-500 border-t border-b border-r
                  ${isLoading ? 'bg-gray-600' : 'bg-yellow-400' }`} 
                    type="submit" value = "Upload">
                      </input>
                </div>
            </form>   
          </div>         
        </section>
        )}
      


    </Layouts>
    
  )
}

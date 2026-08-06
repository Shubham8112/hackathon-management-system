import React, {useEffect, useState} from "react";
import api from "../../services/api";

function AllHackathons() {
  const [hackathons, sethackathons] = useState([]);

  useEffect(()=>{
    fetchHackathons();
  },[]);

  const fetchHackathons = async () =>{
    try{
        const response = await api.get("/hackathons");
        sethackathons(response.data.hackathons);
    }catch(error){
        console.log(error);
    }
  };


  return (
    <div>
      <h1>All Hackathons</h1>
      {hackathons.map((hackathon)=>(
        <div key={hackathon._id}>
            <h3>hackathon.title</h3>
        </div>
      ))}
    </div>
  )
}

export default AllHackathons



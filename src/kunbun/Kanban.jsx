import React from 'react';

import image from './member.jpg';
import { useAuth0 } from "@auth0/auth0-react";
import KTasks from './KTasks';

function Kanban() {

  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated, isLoading } = useAuth0();


  return (
    <>


      <div style={{ marginLeft: "5%" }} ><h3 style={{ fontFamily: "serif" }}>MY KANBAN ITEMS <i className="fa-solid fa-chart-column"></i></h3></div>
      <span style={{marginLeft:'5%',fontFamily:"fantasy",fontSize:"small"}}>Drag and drop to go with ease <i className="fa-solid fa-wand-magic-sparkles"></i></span>
      <div style={{ background: "white" }}  ><img className='' style={{ borderColor: "white", width: "40%", marginLeft: "25%" }} src={image} alt="" /></div>


      <div>{!isAuthenticated && !isLoading && <button className={"btn btn-outline-dark btn-sm my-3 mx-5 fa-fade"} type="submit" onClick={() => loginWithRedirect()}>Login To See Kanban <i className="fa-solid fa-arrow-right-to-bracket fa-rotate-180"></i></button>}</div>

      <div className='container'>
        <div className='row'>


          {isLoading && <p className='fa-fade' style={{ fontFamily: "fantasy" }}>Loading...</p>}

        </div>
      </div>
      {isAuthenticated && !isLoading && <KTasks />}

    </>
  );
}

export default Kanban;
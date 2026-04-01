import React, { useState, useEffect, useCallback } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);

  const backend_url = process.env.REACT_APP_BACKEND_URL || 'https://car-dealership-review-2.onrender.com/';
  const dealer_url = `${backend_url}djangoapp/get_dealerships/`;

  // let [state, setState] = useState("")
  //let [states, setStates] = useState([]);

  // let root_url = window.location.origin
  //let dealer_url = "/djangoapp/get_dealers/";
  
  
  const filterDealers = async (state) => {
      try {
        let url = state === "All"
        ? `${backend_url}djangoapp/get_dealerships/`
        : `${backend_url}djangoapp/get_dealerships/${encodeURIComponent(state)}`; 
        
        console.log("Fetching:", url);
        
        const res = await fetch(url, {
          method: "GET"
        });

        if(!res.ok){
          console.error("API failed:", res.status);
          setDealersList([]);
          return;
        }

        const data = await res.json();

        if(data.status === 200) {
          setDealersList(data.dealers || []);
        } else {
          setDealersList([]);
        } 
      } catch (error) {
          console.error("ERROR:", error);
          setDealersList([]);
        }
   }
  
  const get_dealers = useCallback(async () => {
  try{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();

    console.log("API DATA:", retobj);

    if(retobj.status === 200) {
      let all_dealers = Array.from(retobj.dealers)
      let states = [];
      all_dealers.forEach((dealer)=>{
        states.push(dealer.state)
      });

      setStates(Array.from(new Set(states)))
      setDealersList(all_dealers)
    } 
    } catch (error) {
      console.error("Error fetching dealers:", error);
      setDealersList([]);
    }
  }, [dealer_url]);
  

  useEffect(() => {
    get_dealers();
  },[get_dealers]);  


let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
return(
  <div>
      <Header/>

     <table className='table'>
      <tr>
      <th>ID</th>
      <th>Dealer Name</th>
      <th>City</th>
      <th>Address</th>
      <th>Zip</th>
      <th>
      <select name="state" id="state" onChange={(e) => filterDealers(e.target.value)}>
      <option value="" selected disabled hidden>State</option>
      <option value="All">All States</option>
      {states.map(state => (
          <option value={state}>{state}</option>
      ))}
      </select>        

      </th>
      {isLoggedIn ? (
          <th>Review Dealer</th>
         ):<></>
      }
      </tr>
     {dealersList.map(dealer => (
        <tr key={dealer.id}>
          <td>{dealer['id']}</td>
          <td><a href={'/dealer/'+dealer['id']}>{dealer['full_name']}</a></td>
          <td>{dealer['city']}</td>
          <td>{dealer['address']}</td>
          <td>{dealer['zip']}</td>
          <td>{dealer['state']}</td>
          {isLoggedIn ? (
            <td><a href={`/postreview/${dealer['id']}`}><img src={review_icon} className="review_icon" alt="Post Review"/></a></td>
           ):<></>
          }
        </tr>
      ))}
     </table>;
  </div>
)
}

export default Dealers
// TIMESTAMP: 03/28/2026 17:32:38

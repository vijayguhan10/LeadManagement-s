import React from 'react';
import Sidebar from '../../../utils/sidebar';
import Callssummary from './Callssummary';
import Toptelecallers from './Toptelecallers';
import Fulfilment from './Fulfilment';
import LeadStatus from './LeadStatus';
import Callinsights from './Callinsights';
import { useState,useEffect } from 'react';
import Addpopup from './popups/addpopup';
import Toolmodal from './popups/Toolmodal';
import { jwtDecode } from "jwt-decode";
import useThemeStore from '../../store/themestore';
import axios from 'axios'
const Dashboard = () => {
  const [opentools, setopentools] = useState(false);
  const [popup, setispopupopen] = useState(false);
  const [type, settype] = useState("");
  const [adminid, setadminid] = useState("");
    const [databaseName, setDatabaseName] = useState("");
    const[admindata,setadmindata]=useState(null);
    const[dailystats,setdailystats]=useState(null);
    const { isDarkTheme } = useThemeStore();

    const [stats, setStats] = useState({
      totalCalls: 0,
      answeredCalls: 0,
      notAnsweredCalls: 0,
      confirmed: 0,
      topTelecallers:[]
    });
      useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          const tokenvalidation = jwtDecode(token);
          console.log("Decoded Token:", tokenvalidation);
  
          setDatabaseName(tokenvalidation.databaseName);
          setadminid(tokenvalidation.adminId);
          
        }
      }, []);
  

      useEffect(() => {
        if (adminid && databaseName) {
          const getalldata = async () => {
            try {
              const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/admin/getstats`,
                {
                  headers: { "database": databaseName }
                }
              );
              setStats(response.data);
              console.log(response.data.topTelecallers)
             
            } catch (error) {
              console.error("API Error:", error);
            }
          };
          getalldata();
        }
      }, [adminid, databaseName]);
      if (!stats) {
        return   <div className="flex h-screen bg-gray-900">
        <div className="lg:w-[250px] w-0">
          <Sidebar />
        </div><div className="text-white">Loading...</div>
        </div>;
      }
  const add = async(data) => {
    console.log(data);
    setopentools(!opentools)
    if (data === "admin") {
      setispopupopen(true);
      settype("admin");
    } else {
      setispopupopen(true);
      settype("telecaller");
    }
  };
  const openmodel = () => {
    setopentools(!opentools);
  };
  return (
    <div
      className={`flex min-h-screen ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="lg:w-[250px] w-0">
        <Sidebar />
      </div>

      <div className="flex-grow p-4 md:p-6 overflow-auto">
        <div className="flex">
          <div className="p-2 relative w-full max-w-[300px] ml-8 md:max-w-[500px] md:ml-0">
            <i
              className={`fa fa-search text-2xl absolute left-4 top-1/2 transform -translate-y-1/2 ${
                isDarkTheme ? "text-white" : "text-black"
              }`}
            ></i>{" "}
            <input
              className={`p-2 pl-12 rounded-xl w-full ${
                isDarkTheme ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              placeholder="Search here..."
            />
          </div>
        </div>
        <Toolmodal opentools={opentools} add={add} isDarkTheme={isDarkTheme} />
        <Callssummary stats={stats} isDarkTheme={isDarkTheme} />

        <div className="flex flex-col lg:flex-row w-full mt-4 gap-4">
          <Toptelecallers stats={stats} isDarkTheme={isDarkTheme} />
          <Fulfilment isDarkTheme={isDarkTheme} />
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-4 mt-4">
          <LeadStatus isDarkTheme={isDarkTheme} />
          <Callinsights isDarkTheme={isDarkTheme} />
        </div>
      </div>

      <Addpopup popup={popup} setispopupopen={setispopupopen} type={type} />
    </div>
  );
};

export default Dashboard;
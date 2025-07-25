"use client";

import React, { useState, useEffect } from "react";
import { ChefHat, User } from "lucide-react";
import Dashboard from "./Dashboard";
import LiveOrders from "./LiveOrders";
import Menu from "./Menu";
import Orders from "./Orders";
import Reports from "./Reports";
import { useRouter } from "next/navigation";
import ShopRegistration from "./ShopRegistration";
import axios from "axios";
import { baseUrl } from "@/app/config";
import Cookies from "js-cookie";
import Loading from "./Loading";

const RestaurantDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [shopData, setShopData] = useState([])

  const [totalRevenue, setTotalRevenue] = useState(2450.75);
  const [dailyOrders, setDailyOrders] = useState(47);
  const router = useRouter();


  const handleLogout = () => {
    Cookies.remove('token')
    localStorage.removeItem('token')
    router.push("/login");
  };

  

  const [profile, setProfile] = useState(false);

  // calling the api
  useEffect(() => {
       fetchData();
  }, []);

// fuction for getting restaurant data
const fetchData = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token')?Cookies.get('token'):" ";
    const res = await axios.get(`${baseUrl}/shop`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setShopData(res.data.body);
    setLoading(false);
  } catch (error) {
    console.log("Error " + error);
    setLoading(false)
  }
};

  const renderDashboard = () => <Dashboard dailyOrders={dailyOrders} />;

  const renderLiveOrders = () => <LiveOrders shopId = {shopData.username} />;

  const renderMenu = () => <Menu items = {shopData.items} fetchData = {fetchData}/>;

  const renderOrders = () => <Orders orders = {shopData.orders}/>;

  const renderReports = () => <Reports totalRevenue={totalRevenue} />;

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
      <header className="bg-gray-950 shadow-sm border-b relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 relative">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-orange-600 mr-3" />
            </div>

            <div className="flex items-center space-x-4 relative" id="profile-btn-container">
              <span className="text-sm text-gray-100">Welcome</span>
              <div className="btn">
                <button onClick={()=>setMenuOpen(!menuOpen)} className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <User/>
                </button>
              </div>
              {/* Profile Box  */}
              {menuOpen && (
                <div className="box absolute right-0 top-16 min-w-[320px] max-w-[90vw] p-4 rounded-lg shadow-lg z-50 bg-orange-700">
                  {shopData && (
                    <div className="mb-4 text-white">
                      <h3 className="text-lg font-bold mb-2">Restaurant Info</h3>
                      <div className="mb-1"><span className="font-semibold">Name:</span> {shopData.shopName || shopData.name}</div>
                      <div className="mb-1"><span className="font-semibold">Address:</span> {shopData.shopAddress || shopData.address}</div>
                      <div className="mb-1"><span className="font-semibold">City:</span> {shopData.shopCity || shopData.city}</div>
                      <div className="mb-1"><span className="font-semibold">Phone:</span> {shopData.phone}</div>
                      <div className="mb-1"><span className="font-semibold">Email:</span> {shopData.email}</div>
                      <div className="mb-1"><span className="font-semibold">Identity:</span> {shopData.idenity || shopData.identity}</div>
                      <div className="mb-1"><span className="font-semibold">Tagline:</span> {shopData.description}</div>
                      {shopData.image && (
                        <div className="mb-1"><span className="font-semibold">Image:</span><br/><img src={shopData.image} alt="Restaurant" className="w-24 h-24 object-cover rounded mt-1" /></div>
                      )}
                    </div>
                  )}
                  <div>
                    <button onClick={()=>{setProfile(true); setMenuOpen(false);}} className="block px-10 py-2 mb-2 w-full rounded bg-amber-600 hover:bg-orange-600 text-white font-semibold">Edit</button>
                    <button onClick={handleLogout} className="block px-10 py-2 w-full rounded bg-gray-900 hover:bg-gray-700 text-white font-semibold">Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {loading && <Loading/>}
      {profile && <ShopRegistration setProfile={setProfile}/>}


      {/* Navigation */}
      <nav className="bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" flex-wrap space-x-8">
            {["dashboard", "liveorders", "menu", "orders", "reports"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-100 hover:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  {tab === "liveorders"
                    ? "Live Orders"
                    : tab === "dashboard"
                    ? "Dashboard"
                    : tab}
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-900">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "liveorders" && renderLiveOrders()}
        {activeTab === "menu" && renderMenu()}
        {activeTab === "orders" && renderOrders()}
        {activeTab === "reports" && renderReports()}
      </main>
    </div>
  );
};

export default RestaurantDashboard;
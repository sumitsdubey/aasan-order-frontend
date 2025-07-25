import { baseUrl } from '@/app/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import Loading from './Loading';

const ShopRegistration = ({setProfile}) => {

  const [loading, setLoading] = useState(false)


  const [shopData, setShopData] = useState({
    shopName: '',
    shopAddress: '',
    shopCity: '',
    idenity: '',
    phone: '',
    email: '',
    description: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setShopData({ ...shopData, [name]: files[0] });
    } else {
      setShopData({ ...shopData, [name]: value });
    }
  };

const handleOnSubmit = async (e)=>{
  setLoading(true)
  e.preventDefault();
  console.log(shopData);
  const token = Cookies.get('token')
  console.log(token);
  
  const res = await axios.post(`${baseUrl}/shop/create`, shopData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  console.log(res);
  toast.success(res.data.body.message);
  setProfile(false)
  setLoading(false)
}

  return (
    <div className="absolute w-full bg-gray-900 min-h-screen ">
      {loading && <Loading/>}
      <div className="w-2xl mx-auto bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md mt-8 pt-10 pb-10">
      <h2 className="float-left text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Restaurant Profile</h2>
      <button className='float-right bg-orange-700 hover:bg-amber-600 cursor-pointer px-4 py-2 rounded-md' onClick={()=>setProfile(false)}>Close</button>
      
      <form className="flex w-full flex-col gap-4 pt-10 mt-10" onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="shopName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Restaurant Name</label>
          <input type="text" id="shopName" name="shopName" value={shopData.shopName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
        <div>
          <label htmlFor="shopAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
          <input type="text" id="shopAddress" name="shopAddress" value={shopData.shopAddress} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
        <div>
          <label htmlFor="shopCity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
          <input type="text" id="shopCity" name="shopCity" value={shopData.shopCity} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
        <div>
          <label htmlFor="idenity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Identity</label>
          <input type="text" id="idenity" name="idenity" value={shopData.idenity} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
          <input type="text" id="phone" name="phone" value={shopData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input type="email" id="email" name="email" value={shopData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shop Tagline</label>
          <input type="text" id="description" name="description" value={shopData.description} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleInputChange} className="w-full text-gray-700 dark:text-gray-300" />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white dark:text-zinc-900 font-semibold rounded-md transition">
          Register Restaurant
        </button>
      </form>
    </div>
    </div>
  )
}

export default ShopRegistration
import React, { useState } from 'react'
import { baseUrl } from '@/app/config';
import Loading from './Loading';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// List of Indian states and union territories
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const Register = () => {

  const router = useRouter();

  const [userData, setUserData] = useState({
    name: '',
    email:'',
    phone:'',
    address:'',
    city:'',
    state:'',
    country:'',
    password:''
  })

  const [loading, setLoading] = useState(false);


  const handleFormSubmit = async (e)=>{
    
    try{
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(`${baseUrl}/auth/register`, userData)
      const data = res.data;
      console.log(data);      
      if(data.success){
        toast.success(data.message,{autoClose:20000})
        setLoading(false)
        router.push('/login')
      }
      else{
        console.log(data.message);
        toast.error(data.message,{autoClose:2000})
      }
      setLoading(false);
    }catch(err){
      setLoading(false);
      console.log(err);
      
    }
  }
  



  return (
   <>
    {loading && <Loading/>}
    <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Register</h2>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={(e)=>setUserData({...userData, name:e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={(e)=>setUserData({...userData, email:e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={(e)=>setUserData({...userData, phone:e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userData.address}
            onChange={(e)=>setUserData({...userData, address:e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
          <input
            type="text"
            id="state"
            name="state"
            list="state-list"
            value={userData.state}
            onChange={(e)=>setUserData({...userData, state:e.target.value, city: ''})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <datalist className='' id="state-list">
            {indianStates.map(state => (
              <option value={state} key={state} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City/District</label>
          <input
            type="text"
            id="city"
            name="city"
            value={userData.city}
            onChange={(e)=>setUserData({...userData, city:e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            list="country-list"
            value={userData.country}
            onChange={(e)=>setUserData({...userData, country:e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <datalist id="country-list">
            <option value="India" />
          </datalist>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={(e)=>setUserData({...userData, password:e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white dark:text-zinc-900 font-semibold rounded-md transition"
        >
          Register
        </button>
      </form>
    </div>
   </>
  )
}

export default Register
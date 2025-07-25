import { Clock, Users, Package } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ShopRegistration from './ShopRegistration'
import axios from 'axios'
import { baseUrl } from '@/app/config'
import Cookies from 'js-cookie'
import Link from 'next/link'


const Dashboard = ({dailyOrders}) => {

    return (
    <>
    <div className="space-y-6">
      <div>
        {/* This is for graph compoent */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 text-sm">Daily Orders</p>
              <p className="text-2xl font-bold text-gray-50">{dailyOrders}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-black p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 text-sm">Active Tables</p>
              <p className="text-2xl font-bold text-gray-50">12</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-black p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 text-sm">Avg Order Time</p>
              <p className="text-2xl font-bold text-gray-50">18m</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>
      
    </div>
   
    </>
  )
}

export default Dashboard
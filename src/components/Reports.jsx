import { TrendingUp } from 'lucide-react'
import React from 'react'

const Reports = ({totalRevenue}) => {
  return (
    <>
    <div className="bg-black rounded-lg shadow-md border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-100">Reports & Analytics</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-200 mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Sales Overview
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-100">Today's Revenue</span>
                <span className="font-semibold text-gray-200">${totalRevenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-100">This Week</span>
                <span className="font-semibold text-gray-200">$14,280.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-100">This Month</span>
                <span className="font-semibold text-gray-200">$58,940.25</span>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-100 mb-2">Popular Items</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-200">Margherita Pizza</span>
                <span className="font-semibold text-gray-200">23 orders</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-200">Grilled Salmon</span>
                <span className="font-semibold text-gray-200">18 orders</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-200">Caesar Salad</span>
                <span className="font-semibold text-gray-200">15 orders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Reports
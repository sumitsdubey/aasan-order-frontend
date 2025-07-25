'use client'


import React, {useState} from 'react'

const Orders = ({ orders }) => {
  // Ensure orders is always an array
  const orderList = Array.isArray(orders) ? orders : [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (orderList.length > 0) {
    console.log(orderList[0]);
  }
  

  return (
    <>
    <div className="bg-black rounded-lg shadow-md border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-100">All Orders</h2>
      </div>
      <div className="p-4 sm:p-6">
        {/* Desktop/tablet table */}
        <div className="hidden sm:block overflow-x-auto text-gray-100">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Order ID</th>
                <th className="text-left py-2">Table/Delivery</th>
                <th className="text-left py-2">Items</th>
                <th className="text-left py-2">Status</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderList.length > 0 ? orderList.map((order) => (
                <tr key={order.orderId} className="border-b hover:bg-gray-800">
                  <td className="py-3 font-semibold">{order.customerName}</td>
                  <td className="py-3">{order.tableNumber}</td>
                  <td className="py-3 text-sm">
                    {order.items.map((item, idx) => (
                      <span key={item.itemId || idx}>
                        {item.itemName} - {item.quantity ? item.quantity : 1}{idx < order.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 text-right font-semibold">₹ {order.totalAmount}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-400">No Order Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile card view */}
        <div className="sm:hidden flex flex-col gap-4">
          {orderList.length > 0 ? orderList.map((order) => (
            <div key={order.orderId} className="bg-gray-900 rounded-lg p-4 shadow border border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-gray-100">{order.customerName}</div>
                <div className="text-right font-semibold text-gray-100">₹ {order.totalAmount}</div>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-300 mb-1">
                <span className="block">
                  <span className="font-medium">Table/Delivery:</span> {order.tableNumber}
                </span>
                <span className="block">
                  <span className="font-medium">Status:</span>{" "}
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                </span>
              </div>
              <div className="text-sm text-gray-200">
                <span className="font-medium">Items:</span>{" "}
                {order.items.map((item, idx) => (
                  <span key={item.itemId || idx}>
                    {item.itemName} - {item.quantity ? item.quantity : 1}{idx < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          )) : (
            <div className="text-center text-gray-400 py-6">No Order Found</div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Orders
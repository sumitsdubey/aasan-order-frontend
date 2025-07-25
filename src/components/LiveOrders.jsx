"use client";

import { baseUrl } from "@/app/config";
import axios from "axios";
import Cookies from "js-cookie";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const LiveOrders = (shopId) => {
  const [orders, setOrders] = useState([]);
  const resId =shopId.shopId

  
  // Fetch All Orders 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${baseUrl}/order`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        const data = res.data.body;
        setOrders(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [resId]);

  // SUBSCRIBE ORDERS WEBSOCKET

  const createStompClient = (shopId) => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${baseUrl}/ws-orders`),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('🟢 WebSocket connected');
        client.subscribe(`/topic/orders/${shopId}`, (message) => {
          const order = JSON.parse(message.body);
          setOrders((prev)=>[...prev, order])
          console.log('📦 New Order:', order);
        });
      },
      onStompError: (frame) => {
        console.error('Stomp error', frame);
      },
    });
  
    client.activate(); // 🔥 start connection
    return client;
  };

  useEffect(() => {
    const client = createStompClient(resId);
    console.log(client);
    return () => {
      client.deactivate(); // cleanup
    };
  }, [resId]);


  console.log(orders);
  

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "preparing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <div className="bg-black rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-100 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-red-500" />
              Live Orders
            </h2>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
              {orders.length} Active
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            {orders.length > 0 ? orders.map((order, key) => (
              <div
                key={order.orderId}
                className="bg-gray-900 rounded-lg p-3 sm:p-4 hover:bg-gray-800 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="font-semibold text-gray-100">
                      {order.customerName}
                    </span>
                    <span className="text-gray-200">
                      Table No: {order.tableNumber}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="font-semibold text-gray-100">
                      ₹{order.totalAmount}
                    </div>
                    <div className="text-sm text-gray-200 break-all">{order.orderDate}</div>
                  </div>
                </div>
                <div className="text-base sm:text-xl text-gray-100 mb-3 flex flex-col sm:flex-row">
                  <span className="font-medium">Items:</span>
                  <span className="flex flex-wrap gap-x-2">
                    {order.items.map((item) => (
                      <span key={item.itemId}>
                        {item.itemName} - {item.quantity ? item.quantity : 1},
                      </span>
                    ))}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => updateOrderStatus(order.orderId, "PREPAIRING")}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-xs hover:bg-yellow-200 transition-colors w-full sm:w-auto"
                    disabled={order.orderStatus === "PENDING"}
                  >
                    Preparing
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, "READY")}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200 transition-colors w-full sm:w-auto"
                    disabled={order.orderStatus === "READY"}
                  >
                    Ready
                  </button>
                  <button
                    onClick={() =>
                      setOrders((prev) => prev.filter((o) => o.orderId !== order.orderId))
                    }
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs hover:bg-gray-200 transition-colors w-full sm:w-auto"
                  >
                    Complete
                  </button>
                </div>
              </div>
            )) : (
              <div className="flex justify-center items-center h-32">
                <h1 className="text-gray-200 text-lg">No Order At this time</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveOrders;

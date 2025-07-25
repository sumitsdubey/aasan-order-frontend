"use client";

import { baseUrl, imageApi } from "@/app/config";
import axios from "axios";
import Cookies from "js-cookie";
import { Package } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Menu = ({ items, fetchData }) => {

  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const categoryList = ["Noodels", "Veg Items", "Fast Food"];

  // Ensure menuItems is always an array
  const menuItems = Array.isArray(items) ? items : [];


  const [newMenuItem, setNewMenuItem] = useState({
    itemName: "",
    price: "",
    category: "",
    image: "",
  });
  

  const addMenuItem = async () => {
    try {
      // Use itemName for image search
      const imageRes = await axios.get(`${imageApi}${newMenuItem.itemName}`);
      const imageUrl = imageRes.data.meals?.[0]?.strMealThumb;
      const updatedItem =  { ...newMenuItem, image: imageUrl || newMenuItem.image };
      // Post the updated item with image
      const res = await axios.post(`${baseUrl}/item/add`, updatedItem, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      setShowCreateMenu(false);
      toast.success(res.data.message);
      setNewMenuItem({ itemName: "", price: "", category: "", image: "" });
      fetchData();
    } catch (error) {
      toast.error("Error in Saving Item");
      console.log(error);
    }
  };


  return (
    <>
      <div className="space-y-6">
        {/* Create Menu Item Modal */}
        {showCreateMenu && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                Create New Menu Item
              </h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={newMenuItem.itemName}
                  onChange={(e) =>
                    setNewMenuItem({ ...newMenuItem, itemName: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newMenuItem.price}
                  onChange={(e) =>
                    setNewMenuItem({ ...newMenuItem, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div>
                  <input
                    type="text"
                    list="category-list"
                    value={newMenuItem.category}
                    placeholder="Write Category"
                    onChange={(e) =>
                      setNewMenuItem({
                        ...newMenuItem,
                        category: e.target.value,
                      })
                    }
                    className="text-gray-100 bg-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <datalist id="category-list">
                    {categoryList.map((item) => 
                      <option value={item} key={item}/>
                )}
                  </datalist>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={addMenuItem}
                  className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Create Item
                </button>
                
                <button
                  onClick={() => setShowCreateMenu(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
          
              </div>
              
            </div>
          </div>
          
        )}

        <div className="bg-black rounded-lg shadow-md">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-100">
              Menu Management
            </h2>
            <button
              onClick={() => setShowCreateMenu(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
            >
              <Package className="h-4 w-4 mr-2" />
              Create Menu Item
            </button>
          </div>

          {/* Menu Boxes  */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.length >0 ? (
                menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src ="https://w7.pngwing.com/pngs/156/887/png-transparent-local-food-ottawa-computer-icons-restaurant-others-miscellaneous-food-company.png";
                      }}
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-100">
                            {item.itemName}
                          </h3>
                          <p className="text-sm text-gray-200">
                            {item.category}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.availability === "AVAILABLE"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.availability ? "Available" : "Out of Stock"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        {item.itemDecription}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-green-600">
                        ₹ {item.price}
                        </p>
                        <button className="text-orange-600 hover:text-orange-800 text-sm">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>No Items Found </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Clock,
  ChefHat,
  X,
  Check,
} from "lucide-react";
import { baseUrl } from "@/app/config";
import axios from "axios";
import { toast } from "react-toastify";

const OrderMenu = ({ shopId }) => {
  const [cart, setCart] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    tableNumber: "",
    orderType: "dine-in",
  });

  //UPI CALL FOR SHOP DATA
  useEffect(() => {
    async function fetchShopData() {
      const response = await axios.get(`${baseUrl}/public/${shopId}`);
      // console.log(response.data.body);

      if (response.data.success) {
        const data = response.data.body;
        setShopData(data);
      }
    }

    fetchShopData();
  }, [shopId]);

  console.log(shopData);

  //SET MENU ITEMS
  const menuItems = Array.isArray(shopData.items) ? shopData.items : [];

  //SET CATEGORIES
  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  //FILTERD ITEMS
  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  //HANDLE ADD TO CART
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.itemId === item.itemId
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.itemId === item.itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item}];
    });
  };

  //HANDLE REMOVE ITEM FROM CART
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.itemId === itemId
      );
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.itemId === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevCart.filter((cartItem) => cartItem.itemId !== itemId);
    });
  };

  //GET ITEM QUANTITY
  const getCartItemQuantity = (itemId) => {
    const cartItem = cart.find((item) => item.itemId === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  //   GET CART TOTAL
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const placeOrder =async () => {
    if (cart.length === 0) return;

    // In a real app, this would send the order to the backend

    const orderData = {
      name: customerInfo.name,
      phone: customerInfo.phone,
      tableNumber: customerInfo.tableNumber,
      orderType: customerInfo.orderType,
      items: cart,
      totalAmount: getCartTotal(),
    };

    console.log(orderData);

    try {


        const res = await axios.post(`${baseUrl}/public/${shopId}/create-order`, orderData)
        if(res.data.success){
            setShowOrderConfirmation(true);
            setCart([]);
            setShowCart(false);
        }else{
            toast.error("Order Not Placed Please Try Again");
        }
      
    } catch (error) {
        toast.error("Error in Place Order")
    }

    // Hide confirmation after 3 seconds
    setTimeout(() => {
      setShowOrderConfirmation(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-950 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-100">
                  {shopData.shopName}
                </h1>
                <p className="text-sm text-gray-200">{shopData.description}</p>
              </div>
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-gray-800 border-b sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.itemId}
              className="bg-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://w7.pngwing.com/pngs/156/887/png-transparent-local-food-ottawa-computer-icons-restaurant-others-miscellaneous-food-company.png";
                  }}
                />
                {item.special && (
                  <span className="absolute top-3 left-3 bg-orange-600 text-gray-100 px-2 py-1 rounded-full text-xs font-semibold">
                    Popular
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-100">
                    {item.itemName}
                  </h3>
                  <span className="text-lg font-bold text-orange-600">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-gray-200 text-sm mb-3">
                  {item.itemDescription}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-100 ml-1">{4.1}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm bg-gray-600 rounded-sm p-1 text-gray-100 ml-1">
                        {item.availability}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {getCartItemQuantity(item.itemId) === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <button
                        onClick={() => removeFromCart(item.itemId)}
                        className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-semibold text-lg">
                        {getCartItemQuantity(item.itemId)}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-opacity-50"
            onClick={() => setShowCart(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-700 shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-semibold">Your Order</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.itemId}
                        className="flex items-center space-x-3 border-b pb-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.target.src ="https://w7.pngwing.com/pngs/156/887/png-transparent-local-food-ottawa-computer-icons-restaurant-others-miscellaneous-food-company.png";
                          }}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <p className="text-orange-600 font-bold">
                            ₹{item.price}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => removeFromCart(item.itemId)}
                              className="bg-gray-200 text-gray-700 p-1 rounded hover:bg-gray-300 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="bg-orange-600 text-white p-1 rounded hover:bg-orange-700 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            ${item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-6">
                  <div className="space-y-4 mb-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <select
                      value={customerInfo.orderType}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          orderType: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="dine-in">Dine In</option>
                      <option value="takeout">Takeout</option>
                      <option value="delivery">Delivery</option>
                    </select>
                    {customerInfo.orderType === "dine-in" && (
                      <input
                        type="text"
                        placeholder="Table Number"
                        value={customerInfo.tableNumber}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            tableNumber: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-orange-600">
                      ${getCartTotal()}
                    </span>
                  </div>

                  <button
                    onClick={placeOrder}
                    disabled={!customerInfo.name || !customerInfo.phone}
                    className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
                  >
                    Place Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation */}
      {showOrderConfirmation && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 flex items-center">
          <Check className="h-5 w-5 mr-2" />
          Order placed successfully! We'll prepare it shortly.
        </div>
      )}
    </div>
  );
};

export default OrderMenu;

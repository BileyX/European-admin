import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { toast } from "react-toastify";
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // const fetchAllOrders = async () => {
  //     if (!token){
  //         return null;
  //     }

  //     try{
  //         const response = await axios.post(BASE_URL + '/api/orders/list',{},{headers:{token}} )
  //         if(response.data.success){
  //             setOrders(response.data.orders)
  //         } else {
  //             toast.error(response.data.message)
  //         }
  //     } catch (error){
  //         toast.error(error.message)
  //     }

  // }

  const trying = async () => {
    try {
        // const response = await fetch(BASE_URL + "/api/order");
        const response = await axios.get(BASE_URL + "/api/order", {
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        toast.error(err.message);
        console.error("Error fetching data:", err);
      }
  };

  useEffect(() => {
    // fetchAllOrders();
    trying();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
            orders.map((order,index) => (
                <div key={index}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z"/></svg>
                    <div>
                        <p>{order.furniture.name} x {order.quantity}</p>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default Orders;

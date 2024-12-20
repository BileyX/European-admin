import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';
import EditPopup from '../Components/EditPopup';

const List = ({ token }) => {
    const [list, setList] = useState([]);

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const fetchList = async () => {
        try {
            const response = await fetch(BASE_URL + '/api/furniture');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const removeProduct = async (id) => {
        try {
            const response = await axios.delete(BASE_URL + `/api/furniture/${id}`,{}, {
                headers: { token },
            });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setPopupOpen(true);
      };
    
      const handleEditSubmit = async (updatedProduct) => {
        try {
          const formData = new FormData();
          formData.append("name", updatedProduct.name);
          formData.append("description", updatedProduct.description);
          formData.append("price", updatedProduct.price);
          formData.append("catagory", updatedProduct.categoryId);
    
          const response = await axios.put(
            BASE_URL + `/api/furniture/update/${updatedProduct.id}`,
            formData,
            { headers: { token } }
          );
    
          if (response.data.success) {
            toast.success(response.data.message);
            setPopupOpen(false);
            await fetchList();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <p className="mb-2">All Products List</p>
            <div className="flex flex-col gap-2">
                <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Catagory</b>
                    <b>Price</b>
                    <b className="text-center">Action</b>
                </div>

                {list.map((item, index) => (
                    <div
                        className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
                        key={index}
                    >
                        <img className="w-18" src={item.images[0].url} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.categoryId}</p>
                        <p>{item.price} ETB</p>
                        <div className="flex gap-2">
                            <p
                                onClick={() => removeProduct(item.id)}
                                className="text-right md:text-center cursor-pointer text-lg font-bold text-black"
                            >
                                X
                            </p>
                            <button
                                onClick={() => handleEditClick(item)}
                                className="text-blue-500 underline"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <EditPopup
            isOpen={isPopupOpen}
            onClose={() => setPopupOpen(false)}
            item={selectedProduct}
            onSubmit={handleEditSubmit}
            />
        </>
    );
};

export default List;

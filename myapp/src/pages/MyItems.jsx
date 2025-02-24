import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit,MdOutlineRestaurantMenu } from "react-icons/md";
import toast from 'react-hot-toast';
import emailjs from 'emailjs-com';
import { chatSession } from '../service/AiModal';
import { useNavigate } from 'react-router-dom';

const MyItems = () => {
  const [items, setItems] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    return storedItems.map(item => ({
      ...item,
      expiry: new Date(item.expiry),
    }));
  });

  const [itemName, setItemName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();



  const handleAddOrEditItem = () => {
  if (itemName && expiryDate) {
    const expiry = new Date(expiryDate);
    const today = new Date();

    if (expiry < today) {
      toast.error("Please enter a valid date.");
      setItemName('');
      setExpiryDate('');
      return;
    }

    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = { name: itemName, expiry: expiry.toISOString() }; // Store expiry as a string
      setItems(updatedItems);
      setEditIndex(null);
      toast.success(`Item updated successfully.`);
    } else {
      const newItem = { name: itemName, expiry: expiry.toISOString() };
      setItems([...items, newItem]);
      toast.success(`The item ${newItem.name} added successfully`, {
        duration: 3000,
      });

      if (isAboutToExpire(expiry)) {
        sendEmail(newItem.name, expiry.toLocaleDateString());
      }
    }

    setItemName('');
    setExpiryDate('');
  } else {
    toast.error("Please fill in all fields.");
  }
};


  const sendEmail = (itemName, expiryDate) => {
    const userDataString = localStorage.getItem("auth");

    if (!userDataString) {
      toast.error("User data not found in localStorage!");
      return;
    }

    let userData;
    try {
      userData = JSON.parse(userDataString);
    } catch (error) {
      toast.error("Failed to parse user data!");
      return;
    }

    if (!userData.user.email) {
      toast.error("User email not found!");
      return;
    }

    const templateParams = {
      item_name: itemName,
      expiry_date: expiryDate,
      user_email: userData.user.email,
    };

    emailjs
      .send(
        'service_j4ah4kb',
        'template_hc6cpun',
        templateParams,
        'qOUTSphaEMIDp4QnT'
      )
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        toast.success(`Email alert sent to ${userData.user.email}`);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        toast.error('Failed to send email.');
      });
  };

  const isAboutToExpire = (expiry) => {
    const today = new Date();
    const differenceInDays = (expiry - today) / (1000 * 60 * 60 * 24);
    return differenceInDays <= 1 && differenceInDays > 0;
  };

  
  useEffect(() => {
    // Persist the updated items to localStorage whenever they change
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleRemoveItem = (index) => {
    const itemToRemove = items[index];
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const updatedRecipes = existingRecipes.filter(recipe => recipe.itemName !== itemToRemove.name);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    toast.success(`${itemToRemove.name} has been removed.`);
  };
  

  const generateRecipe = async (itemName) => {
    toast.success(`Generating recipe for ${itemName}`);
    const AI_PROMPT =
      "Generate recipe which can be made from {item}. The recipe should be easy to make. Give each and every step to make the food item in points. Also give the estimated time that will be consumed to make the recipe. Give the recipe in about 5 to 6 points in JSON format";
    const FINAL_PROMPT = AI_PROMPT.replace('{item}', itemName);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const recipeResponse = await result?.response?.text();

      if (recipeResponse) {
        toast.success(`Recipe for ${itemName} generated successfully!`);

        const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const updatedRecipes = [...existingRecipes, { itemName, recipe: recipeResponse }];
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      } else {
        toast.error("Failed to generate recipe.");
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast.error("An error occurred while generating the recipe.");
    }
    navigate('/view-recipe');
  };

const handleEditItem = (index) => {
  const item = items[index];
  setItemName(item.name);
  setExpiryDate(new Date(item.expiry).toISOString().split("T")[0]); // Ensure correct format
  setEditIndex(index);
};


  return (
    <div className="expiry-tracker-container bg-black w-100% h-screen">
      <div className="h-40  sm:mx-20 md:mx-30 lg:mx-40 sm:py-20 md:py-15 lg:py-10">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Turn Forgotten Ingredients into Fresh Opportunities
        </h2>
        <p className="mt-3 text-gray-300 text-md sm:text-lg md:text-xl leading-relaxed">
          Keep your pantry organized by listing items you want to track. We'll remind you before they expire, so you can use them in time and reduce waste.
        </p>
      </div>

      <div>
        <h2 className="font-md text-xl sm:mt-20 md:mt-5 lg:mt-3 sm:px-32 md:px-36 lg:px-40 text-white">Item Name</h2>
        <input
          className="sm:mx-20 md:mx-30 lg:mx-40 bg-transparent border border-orange-300 shadow-lg rounded-md w-5/12 p-2 text-white"
          type="text"
          placeholder="Enter Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </div>
      <div>
        <h2 className="font-md text-xl my-3 sm:mx-20 md:mx-30 lg:mx-40 text-white">Expiry Date</h2>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          className="sm:mx-20 md:mx-30 lg:mx-40 bg-transparent border border-orange-300 shadow-lg rounded-md w-5/12 p-2 text-white"
        />
      </div>

      <button onClick={handleAddOrEditItem} className="text-white border border-orange-300 p-2 mt-10 block mx-auto">
        {editIndex !== null ? 'Update Item' : 'Add Item'}
      </button>

      <div className="item-list grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5  sm:px-32 md:px-36 lg:px-40">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item ${isAboutToExpire(item.expiry) ? 'about-to-expire' : ''} p-2 border cursor-pointer rounded-lg hover:shadow-lg`}
          >
            <h2 className={`text-3xl ${isAboutToExpire(item.expiry) ? 'text-red-500' : 'text-green-500'}`}>
              Item Name: {item.name}
            </h2>
            <h2 className="font-lg text-md text-gray-300 mt-1">
              Expiry Date: {new Date(item.expiry).toLocaleDateString()}
            </h2>
            <div className="item-actions flex items-center gap-5 mt-1">
            <button
                onClick={() => generateRecipe(item.name)}
                className="generate-recipe-button text-green-500 text-lg"
              >
                <MdOutlineRestaurantMenu />
              </button>
              <button onClick={() => handleEditItem(index)} className="edit-button text-yellow-500 text-xl">
                <MdEdit />
              </button>
              <button onClick={() => handleRemoveItem(index)} className="remove-button text-red-500 text-xl mx-5">
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyItems;






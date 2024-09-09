import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory, updateCategory } from '../AllApi'; // Assuming these API functions exist
import ContactList from './ContactList'; // Assuming this is the component for individual contacts
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Components/styles/catlist.css'; // Import the CSS file

function CategoryList({ response }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, [response]);

  const fetchCategories = async () => {
    const result = await getCategories();
    if (result.status === 200) {
      setCategoryList(result.data);
    } else {
      toast.error("Failed to fetch categories");
    }
  };

  const handleDeleteCategory = async (id) => {
    const result = await deleteCategory(id);
    if (result.status === 200) {
      toast.success("Category deleted successfully");
      fetchCategories();
    } else {
      toast.error("Failed to delete category");
    }
  };

  const handleDrop = async (e, category) => {
    e.preventDefault();
    const contact = JSON.parse(e.dataTransfer.getData("contact"));
  
    // Check if category and contact are valid
    if (!category || !contact) {
      toast.error("Invalid category or contact");
      return;
    }
  
    // Update category
    category.contacts.push(contact);
    const result = await updateCategory(category.id, category);
  
    if (result.status === 200) {
      toast.success(`${contact.name} added to ${category.title}`);
      fetchCategories(); // Refresh the category list
    } else {
      toast.error("Failed to add contact to category");
    }
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container-fluid border border-3 border-light p-2 mt-3">
        {categoryList.length > 0 ? (
          <div>
            {categoryList.map((category) => (
              <div key={category.id} className="category-card">
                <div
                  className="category-header"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, category)}
                >
                  <h3>{category.title}</h3>
                  <button className="btn btn-danger" onClick={() => handleDeleteCategory(category.id)}>
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
                <div className="category-contacts">
                  {category.contacts?.length > 0 ? (
                    category.contacts.map((contact) => (
                      <ContactList key={contact.id} contact={contact} response={() => {}} />
                    ))
                  ) : (
                    <p>No contacts in this category</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h5>No Categories</h5>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default CategoryList;

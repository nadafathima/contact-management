import axios from "axios";

const baseURL = "http://localhost:3000"; // JSON server base URL

// Contacts
export const addContact = async (data) =>{
    return await axios.post(`${baseURL}/contacts`, data);
} 

export const getContacts = async () => {
    try {
      const response = await axios.get(`${baseURL}/contacts`);
      // Filter out deleted contacts
      const activeContacts = response.data.filter(contact => !contact.deleted);
      return { data: activeContacts, status: response.status };
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  };
  
export const deleteContact = async (id) => {
    // Soft delete by marking contact as deleted instead of deleting it from the database
    try {
      const response = await axios.patch(`${baseURL}/contacts/${id}`, { deleted: true });
      return response;
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  };
  
  export const getDeletedContacts = async () => {
    try {
      const response = await axios.get(`${baseURL}/contacts`);
      // Filter only deleted contacts
      const deletedContacts = response.data.filter(contact => contact.deleted === true);
      return { data: deletedContacts, status: response.status };
    } catch (error) {
      console.error("Error fetching deleted contacts:", error);
      throw error;
    }
  };
  

export const updateContact = async (id, data) => {
    try {
      const response = await axios.put(`${baseURL}/contacts/${id}`, data);
      return response; // Return the response to check in your component
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };
// 6. View Contact Details by ID
export const viewContactDetails = async (id) => {
    return await axios.get(`${baseURL}/contacts/${id}`);
  };
  

// Categories
export const addCategory = async (data) =>{
    return await axios.post(`${baseURL}/categories`, data);
}

export const getCategories = async () => {
    return await axios.get(`${baseURL}/categories`);
}

export const deleteCategory = async (id) =>{ 
    return await axios.delete(`${baseURL}/categories/${id}`);
}

export const updateCategory = async (id, category) => {
  try {
    const response = await fetch(`${baseURL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating category:', error);
  }
};
// Users
export const signUpUser = async (data) => {
    return await axios.post(`${baseURL}/users`, data);
}

export const loginUser = async (email, password) =>{ 
    return await axios.get(`${baseURL}/users?email=${email}&password=${password}`);
}


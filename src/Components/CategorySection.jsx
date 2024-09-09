import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addCategory } from '../AllApi'; // Assuming the API service
import { toast } from 'react-toastify';
import CategoryList from './CategoryList'; // Assuming you have a component to list categories
import 'react-toastify/dist/ReactToastify.css';

function CategorySection() {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState({
    categoryId: "", title: "", contacts: []
  });
  const [addResponse, setAddResponse] = useState("");

  const handleCategory = async () => {
    const { categoryId, title } = category;
    if (!categoryId || !title) {
      toast.warning("Please fill in all fields.");
    } else {
      try {
        const result = await addCategory(category);
        if (result.status === 201) {
          toast.success("Category added successfully!");
          handleClose();
          setCategory({
            categoryId: "", title: "", contacts: []
          });
          setAddResponse(result);
        } else {
          toast.error("Failed to add category.");
        }
      } catch (error) {
        console.error("Error adding category:", error);
        toast.error("An error occurred while adding the category.");
      }
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex justify-content-center my-4">
        <Button variant="success" onClick={handleShow}>
          Add Contact Category
        </Button>
      </div>

      {/* Modal for adding a new contact category */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="categoryId" label="Category ID" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Category ID"
              value={category.categoryId}
              onChange={(e) => setCategory({ ...category, categoryId: e.target.value })}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="categoryName" label="Category Name">
            <Form.Control
              type="text"
              placeholder="Category Name"
              value={category.title}
              onChange={(e) => setCategory({ ...category, title: e.target.value })}
              required
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleCategory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Render the category list */}
      <CategoryList response={addResponse} />
    </>
  );
}

export default CategorySection;

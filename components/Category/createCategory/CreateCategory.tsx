import React, { useState } from "react";
import { Button, Input, Text } from "@nextui-org/react";
import axios from "axios";

import { createCategory } from "../../../pages/api/category";
import CategoryModal from "../../modal/categoryModal/CategoryModal";

const CreateCategory = ({ fetchData }: any) => {
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState(true); // Assuming default value is true
  const [showModal, setShowModal] = useState(false);

  const handleSave = async () => {
    try {
      const response = await createCategory(category, isActive);

      setCategory("");
      fetchData();
    } catch (error) {
      console.error("Error creating category:", error);
      alert("network error");
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          width: "100%",
          zIndex: 10,
        }}
      >
        <button
          style={{
            background: "#F1F3F5",
            color: "gray",
            padding: 8,
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleOpenModal}
        >
          <span>+</span> Add Category
        </button>
      </div>
      <CategoryModal
        show={showModal}
        onClose={() => setShowModal(false)}
        type="submit"
      />
    </>
  );
};

export default CreateCategory;

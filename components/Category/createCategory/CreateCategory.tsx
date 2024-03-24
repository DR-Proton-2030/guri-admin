import React, { useState } from "react";
import { Button, Input, Text } from "@nextui-org/react";
import axios from "axios";
import { createCategory } from "../../../pages/api/category";

const CreateCategory = ({ fetchData }: any) => {
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState(true); // Assuming default value is true

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

  return (
    <div
      style={{
        width: "900px",
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Input
        label="Add New Category"
        name="category"
        bordered
        clearable
        size="lg"
        placeholder="Category Name"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Button
        auto
        css={{ py: "$10", px: "$1", mt: "$10", w: "$32" }}
        onClick={handleSave}
      >
        Save Details
      </Button>
    </div>
  );
};

export default CreateCategory;

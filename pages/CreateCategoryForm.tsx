import React, { useState } from "react";
import axios from "axios";

const CreateCategoryForm: React.FC = () => {
    const [category, setCategory] = useState("");
    const [isActive, setIsActive] = useState(true); // or whatever default value you prefer
    const [images, setImages] = useState<FileList | null>(null);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    };

    const handleIsActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsActive(e.target.checked);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(e.target.files);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("category", category);
            formData.append("is_active", String(isActive));
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    formData.append("images", images[i]);
                }
            }

            const response = await axios.post(
                "https://stingray-app-zclxo.ondigitalocean.app/api/v1/category/createCategory",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Category created:", response.data.result);
            // Handle success
        } catch (error) {
            console.error("Error creating category:", error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Category:
                    <input
                        type="text"
                        value={category}
                        onChange={handleCategoryChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Is Active:
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={handleIsActiveChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Images:
                    <input type="file" multiple onChange={handleImageChange} />
                </label>
            </div>
            <button type="submit">Create Category</button>
        </form>
    );
};

export default CreateCategoryForm;

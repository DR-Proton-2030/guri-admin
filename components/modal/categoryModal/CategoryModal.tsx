import React, { useState } from "react";
import styles from "./styles.module.css";
import { Upload } from "../../assets";
import Image from "next/image";
import axios from "axios";
import { Loader } from "../../table/loader/Loader";

interface ICategoryModalProps {
    show: boolean;
    onClose: () => void;
    type: string;
    id?: string;
}

interface ICategoryProps {
    category: string;
    is_active: boolean;
}

const CategoryModal: React.FC<ICategoryModalProps> = ({
    show,
    onClose,
    type,
    id,
}) => {
    const [details, setDetails] = useState<ICategoryProps>({
        category: "",
        is_active: true,
    });
    const [loading, setLoading] = useState<boolean>(false);

    const [images, setImages] = useState<FileList | null>(null);

    const handleChangeDetails = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setDetails(Object.assign({}, details, { [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(e.target.files);
        }
    };

    const API_BASE_URL =
        "https://stingray-app-zclxo.ondigitalocean.app/api/v1/category/";
    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("category", details.category);
            formData.append("is_active", String(details.is_active));
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    formData.append("images", images[i]);
                }
            }

            const response = await axios.post(
                API_BASE_URL + "createCategory",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data.result);
            onClose();
            return response.data.result;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
            setDetails({
                category: "",
                is_active: true,
            });
            setImages(null);
        }
    };

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("category", details.category);
            formData.append("is_active", String(details.is_active));
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    formData.append("images", images[i]);
                }
            }

            const response = await axios.patch(
                API_BASE_URL + "editCategory/" + `${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            onClose();
            return response.data.result;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
            setDetails({
                category: "",
                is_active: true,
            });
            setImages(null);
        }
    };

    const handleClose = () => {
        onClose();
    };
    return (
        <>
            {show && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.close}>
                            <button
                                className={styles.closeButton}
                                onClick={handleClose}
                            >
                                close
                            </button>
                        </div>
                        {loading ? (
                            <div style={{ marginBottom: "10px" }}>
                                <Loader />
                            </div>
                        ) : (
                            <>
                                <form
                                    onSubmit={
                                        type === "submit"
                                            ? handleSave
                                            : handleEdit
                                    }
                                    id="bookNowForm"
                                    className={styles.form}
                                >
                                    <div className={styles.formGroup}>
                                        <label htmlFor="title">Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="category"
                                            className={styles.formControl}
                                            value={details.category}
                                            onChange={handleChangeDetails}
                                            required
                                        />
                                    </div>

                                    <div className={styles.checkboxContainer}>
                                        <label htmlFor="title">Is Active</label>
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            name="is_active"
                                            className={styles.check}
                                            checked={details.is_active}
                                            onChange={handleChangeDetails}
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="category">
                                            Upload Category Image
                                        </label>
                                        <div
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "20px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                border: "1px solid black",
                                                borderRadius: "8px",
                                                padding: "16px 8px",
                                                backgroundColor: "#fff",
                                                aspectRatio: "16/9",
                                                cursor: "pointer",
                                                position: "relative",
                                            }}
                                        >
                                            {images ? (
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Image
                                                        src={URL.createObjectURL(
                                                            images[0]
                                                        )}
                                                        alt="Selected categoryment"
                                                        layout="fill"
                                                        style={{
                                                            objectFit: "cover",
                                                            borderRadius: "8px",
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <span>
                                                    <Image
                                                        src={Upload}
                                                        alt="Upload"
                                                    />
                                                </span>
                                            )}
                                            <input
                                                type="file"
                                                name="images"
                                                id="category"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageChange}
                                                style={{
                                                    position: "absolute",
                                                    width: "100%",
                                                    height: "100%",
                                                    top: 0,
                                                    left: 0,
                                                    opacity: 0,
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {type === "submit" ? (
                                        <button
                                            type="submit"
                                            className={[
                                                styles.btn,
                                                styles.btnPrimary,
                                            ].join(" ")}
                                        >
                                            Submit
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className={[
                                                styles.btn,
                                                styles.btnPrimary,
                                            ].join(" ")}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default CategoryModal;

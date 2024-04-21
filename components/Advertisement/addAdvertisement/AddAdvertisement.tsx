import React, { useEffect, useState } from "react";
import { Button, Text } from "@nextui-org/react";
import axios, { CancelTokenSource } from "axios";
import Image from "next/image";
import { Loader } from "../../table/loader/Loader";
import Delete from "../../icons/delete_black_24dp.svg";

const dummyData = [
    {
        id: 1,
        name: "Advertisement 1",
        img: "/components/Advertisement/images/dummy1.jpg",
    },
    {
        id: 2,
        name: "Advertisement 2",
        img: "/components/Advertisement/images/dummy2.jpg",
    },
    {
        id: 3,
        name: "Advertisement 3",
        img: "/components/Advertisement/images/dummy1.jpg",
    },
];

interface IAdvertisementProps {
    advertisement: string;
    is_active: boolean;
}

const AddAdvertisement = ({ fetchData }: any) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [details, setDetails] = useState<IAdvertisementProps>({
        advertisement: "",
        is_active: true,
    });
    const [images, setImages] = useState<FileList | null>(null);
    const [prevAds, setPrevAds] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [adLoading, setAdLoading] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);
    const [request, setRequest] = useState<CancelTokenSource | null>(null);
    const [updatedItems, setUpdatedItems] = useState<any>(null);

    const handleChangeDetails = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setDetails(Object.assign({}, details, { [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(e.target.files);
            setActive(true);
        }
    };

    const API_BASE_URL =
        "https://stingray-app-zclxo.ondigitalocean.app/api/v1/advertisement/";

    const fetchPrevAds = async () => {
        //function to get the previous adds to display them
        try {
            setAdLoading(true);
            const response = await axios.get<{ result: any }>(
                API_BASE_URL + "getAdds"
            );
            const ads: any[] = [];
            // console.log(response.data.result);
            for (const item of response.data.result) {
                ads.push(item);
            }
            setPrevAds(ads);
            setUpdatedItems(ads);
        } catch (error) {
            throw error;
        } finally {
            setAdLoading(false);
        }
    };

    const fileName = details.advertisement ? details.advertisement : "";
    const handleSave = async (e: any) => {
        // e.preventDefault();
        try {
            const source = axios.CancelToken.source();
            setRequest(source);
            setLoading(true);
            const formData = new FormData();

            formData.append("target_url", "dummy");
            formData.append("active", String(details.is_active));
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    formData.append("images", images[i]);
                }
            }

            const response = await axios.post(
                API_BASE_URL + "createAdds",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    cancelToken: source.token,
                }
            );
            console.log(response.data.result);
            prompt("Advertisement uploaded successfully");
            return response.data.result;
        } catch (error: any) {
            if (axios.isCancel(error)) {
                console.log("Request canceled");
            } else {
                console.error("Error occurred:", error);
                throw error;
            }
        } finally {
            setLoading(false);
            setDetails({
                advertisement: "",
                is_active: true,
            });
            setImages(null);
        }
    };

    const handleCancel = () => {
        if (request) {
            request.cancel("Request canceled by user");
            setRequest(null);
            setLoading(false);
        }
    };

    const handleClear = () => {
        setDetails({
            advertisement: "",
            is_active: true,
        });
        setImages(null);
        setActive(false);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this advertisement?"
        );
        if (!confirmed) {
            return;
        }
        try {
            const request = await axios.delete(
                `https://stingray-app-zclxo.ondigitalocean.app/api/v1/advertisement/deleteAdds/${id}`
            );
            setUpdatedItems(
                updatedItems.filter((item: any) => item._id !== id)
            );
            alert("Successfully deleted the advertisement");
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchPrevAds();
    }, []);
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                gap: "10px",
            }}
        >
            {loading ? (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                    }}
                >
                    <Loader />
                    <div style={{}}>
                        <button
                            style={{ padding: "12px", borderRadius: "12px" }}
                            onClick={handleCancel}
                            disabled={!loading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        style={{
                            width: "30%",
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
                            <div style={{ width: "100%", height: "100%" }}>
                                <Image
                                    src={URL.createObjectURL(images[0])}
                                    alt="Selected Advertisement"
                                    layout="fill"
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                            </div>
                        ) : (
                            <label htmlFor="advertise">
                                Upload Advertisement
                            </label>
                        )}
                        <input
                            ref={inputRef}
                            type="file"
                            name="advertise"
                            id="advertise"
                            accept="image/*"
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                top: 0,
                                left: 0,
                                opacity: 0,
                                cursor: "pointer",
                            }}
                            onChange={handleImageChange}
                        />
                    </div>
                    <span>{fileName}</span>
                    <div
                        style={{
                            display: "flex",
                            width: "30%",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            auto
                            css={{ py: "$10", px: "$1", w: "$32" }}
                            onPress={handleSave}
                            color="primary"
                            disabled={!active}
                        >
                            Upload
                        </Button>
                        <Button
                            auto
                            css={{ py: "$10", px: "$1", w: "$32" }}
                            onPress={handleClear}
                            color="primary"
                            disabled={!active}
                        >
                            Clear
                        </Button>
                    </div>
                    <div style={{ width: "100%" }}>
                        <h4>Previously Uploaded</h4>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "100%",
                                gap: "0.8rem",
                                justifyContent: adLoading ? "center" : "start",
                                alignItems: "center",
                            }}
                        >
                            {adLoading ? (
                                <Loader />
                            ) : (
                                <>
                                    {updatedItems?.map(
                                        (item: any, index: number) => {
                                            return (
                                                <div
                                                    key={index}
                                                    style={{
                                                        position: "relative",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        width: "25%",
                                                        gap: "8px",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        borderRadius: "8px",
                                                        padding: "16px 8px",
                                                        backgroundColor: "#fff",
                                                        aspectRatio: "16/9",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            position:
                                                                "relative",
                                                        }}
                                                    >
                                                        <Image
                                                            src={item.photo[0]}
                                                            alt="advertisement"
                                                            layout="responsive"
                                                            width={200}
                                                            height={110}
                                                            style={{
                                                                objectFit:
                                                                    "cover",

                                                                aspectRatio:
                                                                    "16/9",
                                                                borderRadius:
                                                                    "8px",
                                                            }}
                                                        />
                                                        <button
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                top: "8px",
                                                                right: "8px",
                                                                background:
                                                                    "transparent",
                                                                border: "none",
                                                                color: "red",
                                                                cursor: "pointer",
                                                                padding: "4px",
                                                                borderRadius:
                                                                    "50%",
                                                                width: "40px",
                                                                height: "40px",
                                                                display: "flex",
                                                                justifyContent:
                                                                    "center",
                                                                alignItems:
                                                                    "center",
                                                                backgroundColor:
                                                                    "white",
                                                                zIndex: 1,
                                                                transition:
                                                                    "opacity 0.3s",
                                                            }}
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item._id
                                                                )
                                                            }
                                                        >
                                                            <Image
                                                                src={Delete}
                                                                alt="Delete"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddAdvertisement;

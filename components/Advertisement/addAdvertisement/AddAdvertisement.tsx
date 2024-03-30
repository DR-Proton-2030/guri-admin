import React, { useEffect, useState } from "react";
import { Button, Text } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { Loader } from "../../table/loader/Loader";

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
  const [details, setDetails] = useState<IAdvertisementProps>({
    advertisement: "",
    is_active: true,
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [prevAds, setPrevAds] = useState<string[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const handleChangeDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await axios.get<{ result: any }>(
        API_BASE_URL + "getAdds"
      );
      const ads: string[] = [];
      for (const item of response.data.result) {
        ads.push(...item.photo);
      }
      console.log(ads);
      setPrevAds(ads);
      console.log(prevAds);
    } catch (error) {
      throw error;
    }
  };

  const fileName = details.advertisement ? details.advertisement : "";
  const handleSave = async (e: any) => {
    // e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("target_url", "dummy");
      formData.append("active", String(details.is_active));
      if (images) {
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }

      const response = await axios.post(API_BASE_URL + "createAdds", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.result);
      return response.data.result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
      setDetails({
        advertisement: "",
        is_active: true,
      });
      setImages(null);
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
        <Loader />
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
              <label htmlFor="advertise">Upload Advertisement</label>
            )}
            <input
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
          <Button
            auto
            css={{ py: "$10", px: "$1", w: "$32" }}
            onPress={handleSave}
            color="primary"
            disabled={!active}
          >
            Upload
          </Button>
          <div style={{ width: "100%" }}>
            <h4>Previously Uploaded</h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                gap: "0.8rem",
              }}
            >
              {prevAds?.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "25%",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid black",
                      borderRadius: "8px",
                      padding: "16px 8px",
                      backgroundColor: "#fff",
                      aspectRatio: "16/9",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {}}
                  >
                    <div style={{ width: "100%" }}>
                      <Image
                        src={item}
                        alt="advertisement"
                        layout="responsive"
                        width={200}
                        height={110}
                        style={{
                          objectFit: "cover",
                          backgroundColor: "green",
                          aspectRatio: "16/9",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddAdvertisement;

// PhotoDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CLIENT_ID = "9MM4Or57qcQg1-ocxP9O277n72UAXeif4TkD2Ectl8k";

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchPhotoDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
          params: { client_id: CLIENT_ID },
        });
        setPhoto(response.data);
      } catch (error) {
        setError("Error fetching photo details.");
      }
      setLoading(false);
    };
    fetchPhotoDetail();
  }, [id]);

  if (loading) return <div style={{ textAlign: "center" }}>Loading photo details...</div>;
  if (error) return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;
  if (!photo) return <div style={{ textAlign: "center" }}>Photo not found.</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "1rem", textAlign: "center" }}>
      <img
        src={photo.urls.full}
        alt={photo.alt_description || "Untitled"}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
      />
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{photo.description || "Untitled"}</h2>
      <p style={{ color: "#555", marginBottom: "0.5rem" }}>Author: {photo.user.name}</p>
      <p style={{ color: "#777" }}>{photo.alt_description || "No description available."}</p>
    </div>
  );
};

export default PhotoDetail;

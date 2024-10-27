// PhotoList.js
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CLIENT_ID = "9MM4Or57qcQg1-ocxP9O277n72UAXeif4TkD2Ectl8k";
const API_URL = `https://api.unsplash.com/photos`;

const PhotoList = () => {
  const [photos, setPhotos] = useState<any>([]);
  const page = useRef(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const ref= useRef(true);

  const fetchPhotos = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await axios.get(API_URL, {
            params: {
              page: page.current,
              per_page: 20,
              client_id: CLIENT_ID,
            },
          });
          if (response.data.length > 0) {
            setPhotos((prevPhotos: any) => [...prevPhotos, ...response.data]);
            page.current = page.current + 1;
          } else {
            setHasMore(false);
          }
          setLoading(false)
          ref.current = true;
      }, 2000);
      
    } catch (error) {
      console.error("Error fetching photos", error);
    }

  }, [page, loading, hasMore]);

//   // Load initial photos
//   useEffect(() => {
//     fetchPhotos();
//   }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 &&
        !loading &&
        hasMore && ref.current
      ) {
        ref.current = false;
        fetchPhotos();
        console.log('fdsafasfsa')
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPhotos, loading, hasMore]);

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh", 
      padding: "1rem" 
    }}>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", 
        gap: "1rem", 
        width: "100%",
        maxWidth: "1200px" // Optional: Limit maximum width
      }}>
        {photos.map((photo: any) => (
          <Link to={`/product/${photo.id}`} key={photo.id + Math.random()} style={{ textAlign: "center", textDecoration: "none", color: "inherit" }}>
            <img src={photo.urls.thumb} alt={photo.alt_description} style={{ width: "100%", borderRadius: "8px" }} />
            <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>{photo.user.name}</p>
          </Link>
        ))}
      </div>
      {loading && <div style={{ textAlign: "center" }}>Loading more photos...</div>}
      {!hasMore && <div style={{ textAlign: "center" }}>No more photos to load</div>}
    </div>
  );
};

export default PhotoList;

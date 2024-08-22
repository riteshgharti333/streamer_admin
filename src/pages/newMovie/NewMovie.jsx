import "./newMovie.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAsyncSingleMovie } from "../../redux/asyncThunks/movieThunks";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { genre, ageRestrictions } from "../../datatablesource";
import { toast } from "react-toastify";

const NewMovie = ({ title }) => {
  const [data, setData] = useState({});
  const [featureImg, setFeatureImg] = useState(null);
  const [featureSmImg, setFeatureSmImg] = useState(null);
  const [smImg, setSmImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoLink, setVideoLink] = useState(""); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const uploadFile = async (items) => {
    if (!items) return;

    setIsUploading(true); // Start uploading

    const storageRef = ref(storage);

    let uploadPromises = items.map((item) => {
      if (!item.file) return Promise.resolve(); // Skip if no file

      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = uploadBytesResumable(
        ref(storageRef, `/items/${fileName}`),
        item.file
      );

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(Math.round(progress))
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setData((prev) => ({ ...prev, [item.label]: downloadURL }));
              setUploaded((prev) => prev + 1);
              resolve();
            } catch (error) {
              console.log("Error getting download URL:", error);
              reject(error);
            }
          }
        );
      });
    });

    try {
      await Promise.all(uploadPromises);
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
    }
  };

  const handleUploadAndSubmit = async (e) => {
    e.preventDefault();

    if (uploaded < 3) {
      await uploadFile([
        { file: featureImg, label: "featureImg" },
        { file: featureSmImg, label: "featureSmImg" },
        { file: smImg, label: "smImg" },
        { file: video, label: "video" },
      ]);
    }

    if (uploaded === 3) {
      try {
        const movieData = { ...data, video: videoLink }; // Add video link to data
        await dispatch(createAsyncSingleMovie(movieData)).unwrap();
        toast.success("Created Successfully");
        navigate(-1);
      } catch (err) {
        console.log(err);
      }
    }

    // if (uploaded === 4) {
    //   try {
    //     await dispatch(createAsyncSingleMovie(data)).unwrap();
    //     toast.success("Created Successfully");
    //     navigate(-1);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <form>
            <div className="left">
              <div className="formInput">
                <p>Feature Image</p>
                <label htmlFor="featureImg">
                  <input
                    type="file"
                    name="featureImg"
                    id="featureImg"
                    accept="image/*"
                    onChange={(e) => setFeatureImg(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  <img
                    src={
                      featureImg
                        ? URL.createObjectURL(featureImg)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                </label>
              </div>

              <div className="formInput">
                <p>Feature Small Image</p>
                <label htmlFor="featureSmImg">
                  <input
                    type="file"
                    name="featureSmImg"
                    id="featureSmImg"
                    accept="image/*"
                    onChange={(e) => setFeatureSmImg(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  <img
                    src={
                      featureSmImg
                        ? URL.createObjectURL(featureSmImg)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                </label>
              </div>

              <div className="formInput">
                <p>Small Image</p>
                <label htmlFor="smallImg">
                  <input
                    type="file"
                    name="smallImg"
                    id="smallImg"
                    accept="image/*"
                    onChange={(e) => setSmImg(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  <img
                    src={
                      smImg
                        ? URL.createObjectURL(smImg)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                </label>
              </div>
            </div>

            <div className="right">
              <div className="formInput">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Bih Hero 6"
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label>Description</label>
                <input
                  type="text"
                  name="desc"
                  placeholder="Bih Hero 6 is doc. robot help the poor people"
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label>Duration</label>
                <input
                  type="number"
                  name="duration"
                  placeholder="1h 25m"
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label>Year</label>
                <input
                  type="number"
                  name="year"
                  placeholder="2003"
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label>Genre</label>
                <select
                  id="genre"
                  onChange={handleInput}
                  name="genre"
                  value={data.genre || "default"}
                >
                  <option value="default" disabled>
                    Select a genre
                  </option>
                  {genre.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label>Age</label>
                <select
                  id="age"
                  onChange={handleInput}
                  name="age"
                  value={data.age || "default"}
                >
                  <option value="default" disabled>
                    Select an Age
                  </option>
                  {ageRestrictions.map((age) => (
                    <option value={age} key={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label>Type</label>
                <select
                  id="isSeries"
                  onChange={handleInput}
                  name="isSeries"
                  value={data.isSeries || "default"}
                >
                  <option value="default" disabled>
                    Select Type
                  </option>
                  <option value="false">Movie</option>
                  <option value="true">Series</option>
                </select>
              </div>

              <div className="formInput">
                <label>Video</label>
                <input
                  type="text"
                  name="videoLink"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
              </div>

              <button
                className="addProductButton"
                onClick={handleUploadAndSubmit}
                disabled={isUploading} // Disable when uploading
              >
                {isUploading ? "Uploading..." : (uploaded === 4 ? "Create" : "Upload")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMovie;

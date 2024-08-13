import "./newMovie.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createAsyncSingleMovie } from "../../redux/asyncThunks/movieThunks";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { genre,ageRestrictions } from "../../datatablesource";

const NewMovie = ({title }) => {
  const [data, setData] = useState({});
  const [featureImg, setFeatureImg] = useState(null);
  const [featureSmImg, setFeatureSmImg] = useState(null);
  const [smImg, setSmImg] = useState(null);
  const [video, setVideo] = useState(null);

  // const [video, setVideo] = useState("");
  const [per, setPer] = useState(null);
  // const [uploaded, setUploaded] = useState(0);
  const [uploadsComplete, setUploadsComplete] = useState(0);
  const [uploaded, setUploaded] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const uploadFile = async (items) => {
    if (!items) return;

    const storageRef = ref(storage);

    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;

      // const storageRef = ref(storage, `items/${fileName}`);

      // const uploadTask = uploadBytesResumable(storageRef, file);

      const uploadTask = uploadBytesResumable(
        ref(storageRef, `/items/${fileName}`),
        item.file
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },

        async () => {
          // Get the download URL after the upload is complete
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setData((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          } catch (error) {
            console.log("Error getting download URL:", error);
          }
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();

    uploadFile([
      { file: featureImg, label: "featureImg" },
      { file: featureSmImg, label: "featureSmImg" },
      { file: smImg, label: "smImg" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createAsyncSingleMovie(data)).unwrap();
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
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
              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    required="true"
                    placeholder={input.placeholder}
                    onChange={handleInput}
                    accept={input.accept}
                  />
                </div>
              ))} */}

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
                  value={data.genre || "default"} // Set the default value here
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
                    Select a Age
                  </option>
                  {ageRestrictions.map((age) =>(
                  <option value={age} key={age}>{age}</option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label>Type</label>
                <select id="isSeries" onChange={handleInput} name="isSeries">
                  <option value="false">Movie</option>
                  <option value="true">Series</option>
                </select>
              </div>

              <div className="formInput">
                <label>Video</label>
                <input
                  type="file"
                  name="video"
                  // accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </div>

              {uploaded === 4 ? (
                <button className="addProductButton" onClick={handleSubmit}>
                  Create
                </button>
              ) : (
                <button className="addProductButton" onClick={handleUpload}>
                  Upload
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMovie;

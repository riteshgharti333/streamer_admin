import "./SingleMovie.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAsyncSingleMovie,
  getAsyncSigleMovie,
} from "../../redux/asyncThunks/movieThunks";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { genre, ageRestrictions } from "../../datatablesource";

const SingleMovie = ({ title }) => {
  const [data, setData] = useState({});
  const [featureImg, setFeatureImg] = useState(null);
  const [featureSmImg, setFeatureSmImg] = useState(null);
  const [smImg, setSmImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [per, setPer] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { singleMovie, status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getAsyncSigleMovie(path));
  }, [dispatch, path]);

  useEffect(() => {
    if (singleMovie) {
      setData(singleMovie.getMovie);
    }
  }, [singleMovie]);

  const handleInput = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // Handle file inputs separately
      if (name === "featureImg") setFeatureImg(files[0]);
      if (name === "featureSmImg") setFeatureSmImg(files[0]);
      if (name === "smImg") setSmImg(files[0]);
      if (name === "video") setVideo(files[0]);
    } else {
      // Handle text and select inputs
      setData({ ...data, [name]: value });
    }
  };

  const uploadFile = async (items) => {
    if (!items) return;

    const storageRef = ref(storage);

    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;

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
      // navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data)

  return (
    <div className="singleMovie">
      <Sidebar />
      <div className="singleMovieContainer">
        <Navbar />
        <div className="bottom">
          <div className="singleMovieButton">
            <button>Edit</button>
            <button>Delete</button>
          </div>
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
                    onChange={handleInput}
                    style={{ display: "none" }}
                  />
                  <img
                    src={
                      featureImg
                        ? URL.createObjectURL(featureImg)
                        : data.featureImg
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
                    onChange={handleInput}
                    style={{ display: "none" }}
                  />
                  <img
                    src={
                      featureSmImg
                        ? URL.createObjectURL(featureSmImg)
                        : data.featureSmImg
                    }
                    alt=""
                  />
                </label>
              </div>

              <div className="formInput">
                <p>Small Image</p>
                <label htmlFor="smImg">
                  <input
                    type="file"
                    name="smImg"
                    id="smImg"
                    accept="image/*"
                    onChange={handleInput}
                    style={{ display: "none" }}
                  />
                  <img
                    src={smImg ? URL.createObjectURL(smImg) : data.smImg}
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
                  value={data.title || ""}
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label>Description</label>
                <input
                  type="text"
                  name="desc"
                  placeholder="Bih Hero 6 is doc. robot help the poor people"
                  value={data.desc || ""}
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label>Year</label>
                <input
                  type="number"
                  name="year"
                  placeholder="2003"
                  value={data.year || ""}
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label>Genre</label>
                <select
                  id="genre"
                  name="genre"
                  value={data.genre || "default"} // Controlled component: value should match one of the option values
                  onChange={handleInput}
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
                  name="age"
                  value={data.age || "default"} // Controlled component: value should match one of the option values
                  onChange={handleInput}
                >
                  <option value="default" disabled>
                    Select an Age
                  </option>
                  {ageRestrictions.map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label>Type</label>
                <select id="isSeries" onChange={handleInput} name="isSeries">
                  <option value="false" selected={data.isSeries === "false"}>
                    Movie
                  </option>
                  <option value="true" selected={data.isSeries === "true"}>
                    Series
                  </option>
                </select>
              </div>

              <div className="formInput">
                <label>Video</label>
                <input
                  type="file"
                  name="video"
                  // accept="video/*"
                  // value={data.video}
                  onChange={handleInput}
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

export default SingleMovie;

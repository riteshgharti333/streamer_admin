import "./SingleMovie.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAsyncSigleMovie,
  getAsyncSigleMovie,
  updateAsyncSingleMovie,
} from "../../redux/asyncThunks/movieThunks";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { genre, ageRestrictions } from "../../datatablesource";

const SingleMovie = () => {
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

  const uploadFile = async (file, label) => {
    if (!file) return "";

    const fileName = new Date().getTime() + label + file.name;
    const storageRef = ref(storage, `/items/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const urls = await Promise.all([
        uploadFile(featureImg, "featureImg"),
        uploadFile(featureSmImg, "featureSmImg"),
        uploadFile(smImg, "smImg"),
        uploadFile(video, "video"),
      ]);

      setData((prev) => ({
        ...prev,
        featureImg: urls[0] || prev.featureImg,
        featureSmImg: urls[1] || prev.featureSmImg,
        smImg: urls[2] || prev.smImg,
        video: urls[3] || prev.video,
      }));

      setUploaded(urls.filter((url) => url).length);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await dispatch(
        updateAsyncSingleMovie({ id: path, updateMovie: data })
      ).unwrap();
      dispatch(getAsyncSigleMovie(path));
    } catch (err) {
      console.log("Error updating movie:", err);
    }
  };

  const handleDelete = (path) => {
    dispatch(deleteAsyncSigleMovie(path));
    console.log("movie deleted");
    navigate(-1);
  };


  return (
    <div className="singleMovie">
      <Sidebar />
      <div className="singleMovieContainer">
        <Navbar />
        <div className="bottom">
          <div className="singleMovieButton">
            <button>Edit</button>
            <button onClick={handleDelete}>Delete</button>
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
                  value={data.genre || "default"}
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
                  value={data.age || "default"}
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
                <select
                  id="isSeries"
                  onChange={handleInput}
                  name="isSeries"
                  value={data.isSeries}
                >
                  <option value="false">Movie</option>
                  <option value="true">Series</option>
                </select>
              </div>

              <div className="formInput">
                <label>Video</label>
                <input
                  type="file"
                  name="video"
                  onChange={handleInput}
                  // Note: The `value` attribute does not work for file inputs
                />
              </div>

              {uploaded ? (
                <button className="addProductButton" onClick={handleSubmit}>
                  Update
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

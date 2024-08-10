import "./newMovie.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const NewMovie = ({ inputs, title }) => {
  const [featureImg, setFeatureImg] = useState("");
  const [featureSmImg, setFeatureSmImg] = useState("");
  const [smallImg, setSmallImg] = useState("");
  const [video, setVideo] = useState("");

  const [data, setData] = useState({});
  const [per, setPer] = useState(null);

  const navigate = useNavigate();

  // Adding Image
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + featureImg.name;

      const storageRef = ref(storage, featureImg.name);
      const uploadTask = uploadBytesResumable(storageRef, featureImg);

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
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };

    featureImg && uploadFile();
  }, [featureImg]);

  const handleInput = (e) => {
    // e.preventdefault();

    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
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
          <div className="left">
            <div className="formInput">
              <p>Feature Image</p>
              <label htmlFor="featureImg">
                <input
                  type="file"
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
                  id="smallImg"
                  accept="image/*"
                  // accept="video/*"
                  onChange={(e) => setSmallImg(e.target.files[0])}
                  style={{ display: "none" }}
                />

                <img
                  src={
                    smallImg
                      ? URL.createObjectURL(smallImg)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </label>
            </div>
          </div>

          <div className="right">
            <form onSubmit={handleAdd}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <div className="formInput">
                <label htmlFor="">Genre</label>
                <select name="" id="">
                  <option value="">Animation</option>
                  <option value="">Animation</option>
                  <option value="">Animation</option>
                  <option value="">Animation</option>
                  <option value="">Action</option>
                </select>
              </div>

              <div className="formInput">
                <label htmlFor="">Age 18+</label>
                <select name="" id="">
                  <option value="">Yes</option>
                  <option value="">No</option>
                </select>
              </div>

              <div className="formInput">
                <label htmlFor="">Type</label>
                <select name="" id="">
                  <option value="">Movie</option>
                  <option value="">Series</option>
                </select>
              </div>

              <button type="submit" disabled={per !== null && per < 100}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMovie;

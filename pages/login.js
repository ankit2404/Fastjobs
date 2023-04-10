import { useEffect, useContext, useState } from "react";
import AppContext from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "./assets/Loader";

const login = () => {
  const { isLoggedIn, setLoggedIn, loading, setLoading } =
    useContext(AppContext);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === true) {
      router.push("/");
    }
  }, [isLoggedIn]);
  const submitHandler = async () => {
    // console.log(userName);
    // console.log(password);
    const details = { username: userName, password: password };
    setLoading(true);

    try {
      const data = await axios.post(
        "https://frontendtestapi.staging.fastjobs.io/auth/login",
        details,
        { withCredentials: true }
      );

      console.log(data);
      if (data.data.message === "success") {
        setLoading(false);
        setLoggedIn(true);
        toast.success("You are logged in");
        router.push("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error("Please check your username and password");
      setLoading(false);
    }
  };
  if (loading == true) {
    return <Loader />;
  }
  return (
    <>
      <div id="main">
        <div id="left-section">
          <div id="bg-effect"></div>
          <div id="logo-container">
            <img
              src="https://static.vecteezy.com/system/resources/previews/001/191/989/non_2x/circle-logo-png.png"
              alt="logo"
            />
          </div>
          <div id="info-container">
            <div>
              <p id="text-color">Congratulation</p>
            </div>
            <div>
              <h6 id="text-color">Company xyz is taking a interview</h6>
            </div>
            <div id="btns-container">
              <div id="btn" style={{ color: "white" }}>
                Ui/Ux
              </div>
              <div id="btn" style={{ color: "white" }}>
                Product Design
              </div>
              <div id="btn" style={{ color: "white" }}>
                Motion Graphics
              </div>
            </div>
            <div>
              <p id="text-color">Congratulation</p>
            </div>
          </div>
        </div>
        <div id="right-section">
          <div id="login-content">
            <div>
              <h2 id="text-color">For Us To Stay In Touch</h2>
            </div>

            <div id="input-field">
              <input
                style={{ padding: "5px 15px" }}
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div id="input-field">
              <input
                type="password"
                style={{ padding: "5px 15px" }}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div id="submit" onClick={submitHandler}>
              Submit
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;

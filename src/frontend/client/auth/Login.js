import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID =
  "352611474056-l4ld31sg14qqeodps0fqe5828ka6dhu4.apps.googleusercontent.com";
const API_KEY = "AIzaSyBqI--zahC1aMdEzHXzr6ualtXtMfiGoJU";
function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    const initClient = async () => {
      try {
        await gapi.load("client:auth2", async () => {
          await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: "email",
          });
        });
      } catch (error) {
        console.error("Error initializing Google API client", error);
      }
    };
    initClient();
  }, []);

  const handleLogin = async () => {
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      if (authInstance) {
        const user = await authInstance.signIn();
        const profile = user.getBasicProfile();
        console.log("ID: " + profile.getId());
        console.log("Name: " + profile.getName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());
        setIsLoggedIn(!isLoggedIn);
      } else {
        console.error("Google Auth instance not initialized");
      }
    } catch (error) {
      console.error("Error during sign-in", error);
    }
  };

  const handleLogout = async () => {
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      if (authInstance) {
        setIsLoggedIn(!isLoggedIn);
        await authInstance.signOut();
        console.log("User signed out.");
      } else {
        console.error("Google Auth instance not initialized");
      }
    } catch (error) {
      console.error("Error during sign-out", error);
    }
  };
  return (
    <div>
      <section
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Đăng nhập</h2>

                  <form>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        placeholder="Email"
                      />
                      <label
                        className="form-label"
                        htmlFor="form3Example3cg"
                      ></label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        placeholder="Password"
                      />
                      <label
                        className="form-label"
                        htmlFor="form3Example4cg"
                      ></label>
                    </div>

                    <div class="form-check d-flex justify-content-start mb-4">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="form1Example3"
                      />
                      <label class="form-check-label" for="form1Example3">
                        {" "}
                        Remember password{" "}
                      </label>
                    </div>

                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      class="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>

                    <hr class="my-4" />

                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      class="btn btn-lg btn-block btn-danger"
                      type="submit"
                      onClick={handleLogin}
                    >
                      <i class="fab fa-google me-2"></i> Sign in with google
                    </button>

                    <p className="text-center text-muted mt-5 mb-0">
                      <Link to="/Register" className="fw-bold text-success">
                        <u>Sign up</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Login;

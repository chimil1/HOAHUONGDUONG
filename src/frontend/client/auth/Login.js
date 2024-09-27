import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '352611474056-l4ld31sg14qqeodps0fqe5828ka6dhu4.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBqI--zahC1aMdEzHXzr6ualtXtMfiGoJU';
function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
      const initClient = async () => {
          try {
              await gapi.load('client:auth2', async () => {
                  await gapi.client.init({
                      apiKey: API_KEY,
                      clientId: CLIENT_ID,
                      scope: 'email'
                  });
              });
          } catch (error) {
              console.error('Error initializing Google API client', error);
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
              console.log('ID: ' + profile.getId());
              console.log('Name: ' + profile.getName());
              console.log('Image URL: ' + profile.getImageUrl());
              console.log('Email: ' + profile.getEmail());
              setIsLoggedIn(!isLoggedIn);

          } else {
              console.error('Google Auth instance not initialized');
          }
      } catch (error) {
          console.error('Error during sign-in', error);
      }
  };

  const handleLogout = async () => {
      try {
          const authInstance = gapi.auth2.getAuthInstance();
          if (authInstance) {
              setIsLoggedIn(!isLoggedIn);
              await authInstance.signOut();
              console.log('User signed out.');
          } else {
              console.error('Google Auth instance not initialized');
          }
      } catch (error) {
          console.error('Error during sign-out', error);
      }
  };
  return (
    <div>
      <section className="vh-100" style={{ backgroundImage: 'url(../../asset/images/slide-03.jpg)' }}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Đăng nhập</h3>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg" placeholder="Email" />
              <label className="form-label" htmlFor="typeEmailX-2"></label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg" placeholder="Password"/>
              <label className="form-label" htmlFor="typePasswordX-2"></label>
            </div>

            <div className="form-check d-flex justify-content-start mb-4">
              <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
              <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
            </div>

            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" type="submit">Login</button>

            <hr className="my-4" />

            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-lg btn-block btn-primary" style={{ backgroundColor: "#dd4b39" }}
              type="submit" onClick={handleLogin}><i className="fab fa-google me-2"></i> Sign in with google</button>
            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-lg btn-block btn-primary mb-2" style={{ backgroundColor: "#3b5998" }}
              type="submit"><i className="fab fa-facebook-f me-2"></i>Sign in with facebook</button>

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

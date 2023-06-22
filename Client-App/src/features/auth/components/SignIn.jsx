const SignIn = () => {
  return (
    <div className="login-container">
      <div className="login-sub-container">
        <h1 className="login-heading">Login</h1>
        <form className="login-form-holder">
          {/* Email */}
          <div className="login-holder">
            <label className="login-label">E-Mail</label>
            <div className="login-input-holder">
              <input type="text" className="login-input" />
            </div>
          </div>
          {/* Password */}
          <div className="login-holder">
            <label className="login-label">Password</label>
            <div className="login-input-holder">
              <input type="password" className="login-input" />
              {/* eyeball here */}
            </div>
          </div>

          {/*  */}
        </form>
      </div>
    </div>
  );
};

export default SignIn;

const LandingLoginButton = () => {
  async function scrollToLogin() {
    const loginForm = document.getElementById("landing-signin");
    loginForm.scrollIntoView();
  }

  return (
    <button type="button" onClick={scrollToLogin} className="herobtns">
      Login
    </button>
  );
};

export default LandingLoginButton;

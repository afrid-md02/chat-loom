import { Link } from "react-router-dom";

import LoginForm from "../forms/loginForm";

const LandingSignin = () => {
  return (
    <section id="landing-signin" className="px-3 font-Raleway sm:px-6">
      <div className="flex flex-col items-center justify-center max-w-5xl py-12 mx-auto space-y-6 md:py-24 lg:py-28">
        <LoginForm />
        <Link
          to="/signup"
          className="text-xs font-medium tracking-wide text-copy hover:text-blue-600 sm:text-sm"
        >
          Don{"'"}t have an account? signup
        </Link>
      </div>
    </section>
  );
};

export default LandingSignin;

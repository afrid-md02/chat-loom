import { Link } from "react-router-dom";

import SignupForm from "../../components/forms/signupForm";

const SignupPage = () => {
  return (
    <main className="px-3 font-Raleway sm:px-6">
      <section className="flex flex-col items-center justify-center max-w-5xl py-6 mx-auto space-y-6 md:py-8">
        <SignupForm />
        <Link
          to="/"
          className="text-xs font-medium tracking-wide text-copy hover:text-blue-600 sm:text-sm"
        >
          Already have an account? signin
        </Link>
      </section>
    </main>
  );
};

export default SignupPage;

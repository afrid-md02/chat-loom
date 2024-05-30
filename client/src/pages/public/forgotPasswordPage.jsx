import ForgotPasswordForm from "../../components/forms/forgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <main className="px-3 sm:px-6">
      <section className="mx-auto flex min-h-[calc(100dvh-6.375rem)] max-w-5xl items-center justify-center py-6 font-Raleway md:min-h-[calc(100dvh-8.125rem)] md:py-8">
        <ForgotPasswordForm />
      </section>
    </main>
  );
};

export default ForgotPasswordPage;

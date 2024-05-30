import EditProfileForm from "../../components/forms/editProfileForm";

const EditProfilePage = () => {
  return (
    <section className="mx-auto flex min-h-[calc(100dvh-6.375rem)] max-w-5xl items-center justify-center bg-red-900 px-3 py-6 font-Raleway sm:px-6 md:min-h-[calc(100dvh-8.125rem)] md:py-8">
      <EditProfileForm />
    </section>
  );
};

export default EditProfilePage;

import MainCard from "../../components/cards/mainCard";
import ListItem from "../../components/list items/settings/listItem";
import DarkmodeButton from "../../components/buttons/darkmodeBtn";
import LogoutButton from "../../components/buttons/logoutBtn";

const SettingsPage = () => {
  return (
    <section className="flex min-h-[calc(100dvh-9rem)] flex-col items-center justify-between space-y-4 px-3 py-6 sm:px-6">
      <MainCard>
        <ListItem>
          <DarkmodeButton />
        </ListItem>
      </MainCard>
      <LogoutButton />
    </section>
  );
};

export default SettingsPage;

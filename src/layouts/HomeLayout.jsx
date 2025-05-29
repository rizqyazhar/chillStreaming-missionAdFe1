import { Outlet } from "react-router-dom";
import { ListProvider } from "../state/ContextState";
import Navbar from "../fragments/Navbar";
import Footer from "../fragments/Footer";
import GenreTab from "../fragments/genre/GenreTab";
import { AuthProvider } from "../state/AuthContextState";

const HomeLayout = () => {
  return (
    <AuthProvider>
      <ListProvider>
        <Navbar genreTab={<GenreTab width='100px' />} />
        <Outlet />
        <Footer />
      </ListProvider>
    </AuthProvider>
  );
};

export default HomeLayout;

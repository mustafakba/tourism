import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/provider/redux/store";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function MainProvider({ children }: any) {
  return (
    <div>
      <Header />
      {children}
      <ToastContainer />
      <Footer />
    </div>
  );
}

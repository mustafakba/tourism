import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/provider/redux/store";

export default function MainProvider({ children }: any) {
  return (
    <div>
      <div>Header olacak burası</div>
      {children}
      <ToastContainer />
      <div>footer olacak burası</div>
    </div>
  );
}

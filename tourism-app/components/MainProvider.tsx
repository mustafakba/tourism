import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainProvider({ children }: any) {
  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
}

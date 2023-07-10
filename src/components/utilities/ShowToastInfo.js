import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const successToastMessage = ({ message }) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const errorToastMessage = ({ message }) => {
  toast.error(message, { position: toast.POSITION.TOP_RIGHT });
};

export { successToastMessage, errorToastMessage };

import { Bounce, toast } from "react-toastify";

export const toaster = (message, toasterType) => {
    return toast[toasterType](`${message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: false,
        theme: "light",
        transition: Bounce,
    });
}
import { Bounce, toast } from "react-toastify";

const ToasterSystem = {
  success(message: string) {
    toast.success(message, {
      position: "top-right",
      autoClose: 1500,
      closeOnClick: true,
      theme: "dark",
      transition: Bounce,
    })
  },
  error(message: string) {
    toast.error(message, {
      position: "top-right",
      autoClose: 1500,
      closeOnClick: true,
      theme: "dark",
      transition: Bounce,
    })
  }
}

export default ToasterSystem
import { Box } from "@mui/material";
import { createPortal } from "react-dom";

const modalContainer = document.getElementById('videos');
console.log(modalContainer);

export default function Modal({ children }) {

    return createPortal(<Box>{children}</Box>, modalContainer);
}

import Swal from "sweetalert2";

export default function Sweet_Alert(props) {
  return Swal.fire({
    position: "center",
    icon: props.icon,
    title:props.title,
    showConfirmButton: false,
    timer: 1500,
  });
}

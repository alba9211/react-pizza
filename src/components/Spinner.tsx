import { ClipLoader } from "react-spinners";

export const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "40vh",
    }}
  >
    <ClipLoader color="#808080" size={70} />
  </div>
);

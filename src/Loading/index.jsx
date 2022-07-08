/*

Três pontinhos carregando [...]

*/

import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <>
      <ThreeDots
        type="ThreeDots"
        color="white"
        height={28}
        width={80}
        timeout={10000}
      />
    </>
  );
};

export default Loading;

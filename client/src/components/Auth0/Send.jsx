import axios from "axios";
import Swal from "sweetalert2";

const enviarInfoAlServer = async (userData) => {
  // console.log(userData);

  const email = userData.email;
  const password = userData.password ?? null;
  const nickname = userData.nickname ?? null;
  const given_name = userData.given_name ?? null;
  const picture = userData.picture ?? null;
  const sub = userData.sub ?? null;

  try {
    const response = await axios.post("/post/user", {
      email,
      password,
      nickname,
      given_name,
      picture,
      sub,
    });
    // console.log(response);

    if (response.status === 200) {
      // Accede al encabezado Authorization para obtener el token
      const token = response.data.token;

      console.log("Token recibido:", token);
      // if (response.data) {
      // console.log(response.data.result.user);
      const user = { ...response.data, token };
      // console.log(user);
      return user;
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al autenticar/crear usuario",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: `Error al enviar la solicitud al servidor ${error.message}`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const userLog = async (userData) => {
  try {
    const response = await enviarInfoAlServer(userData);
    return response.result.user;
  } catch (error) {
    //console.error("Error en userLog:", error);
    throw error; // Puedes manejar el error aquí según tus necesidades
  }
};

export default userLog;

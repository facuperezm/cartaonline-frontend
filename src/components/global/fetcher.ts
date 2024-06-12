import { env } from "@/env.mjs";
import axios from "axios";

export async function loginUser(value: { email: string; password: string }) {
  const res = await axios.post(`${env.NEXT_PUBLIC_API_URL}/auth/login`, value, {
    withCredentials: true,
  });
  // const token = res.data.token;
  // localStorage.setItem("token", JSON.stringify(token));
  return res;
}

// function onSubmit(values: z.infer<typeof formSchema>) {
//   axios
//     .post(env.NEXT_PUBLIC_BACKEND_BASE_URL + "/users/login", values, {
//       withCredentials: true,
//     })
//     .then(({ data }) => {
//       const tokenPayload = data;
//       setUser(tokenPayload);
//       localStorage.setItem("user", JSON.stringify(tokenPayload));
//       router.push("/");
//     })
//     .catch((error) => console.log(error));
// }

export async function registerUser(value: { email: string; password: string }) {
  const res = await axios.post(
    `${env.NEXT_PUBLIC_API_URL}/auth/register`,
    value
  );
  return res;
}

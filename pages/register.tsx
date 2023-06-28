/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { env } from "@/env.mjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";

export interface Company {
  companyName: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  category:
    | "restaurant"
    | "bar"
    | "cafe"
    | "bakery"
    | "fast food"
    | "internacional"
    | "panaderia"
    | "cafeteria"
    | "barra"
    | "comida rapida"
    | "comida italiana"
    | "comida mexicana"
    | "comida internacional"
    | "pasteleria"
    | "cafeteria"
    | "cerveceria";
  phoneNumber: string;
  location: string;
}

const registerFormSchema = z.object({
  companyName: z.string().min(3, {
    message:
      "El nombre de la empresa tiene que tener como minimo 3 caracteres.",
  }),
  name: z.string().min(3, {
    message: "El nombre tiene que tener como minimo 3 caracteres.",
  }),
  lastName: z.string().min(3, {
    message: "El apellido tiene que tener como minimo 3 caracteres.",
  }),
  email: z.string().email({
    message: "El email tiene que ser valido.",
  }),
  password: z
    .string()
    .min(6)
    .refine(
      (val) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)/;
        return regex.test(val);
      },
      {
        message:
          "La contraseña debe incluir una letra mayuscula y un numero y tener como minimo 6 caracteres.",
      }
    ),
  category: z.string(),
  phoneNumber: z.string().min(10, {
    message: "El numero de telefono tiene que tener como minimo 10 caracteres.",
  }),
  location: z.string().min(3, {
    message: "La ubicacion tiene que tener como minimo 3 caracteres.",
  }),
});

export default function Register() {
  const router = useRouter();
  const dataForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      companyName: "",
      name: "",
      lastName: "",
      email: "",
      password: "",
      category: "",
      phoneNumber: "",
      location: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    axios
      .post(env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/dashboard", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        router.push("/").catch((err) => {
          console.log(err);
        });
      });
  }

  return (
    <>
      <div className="align-center m-auto flex h-screen justify-center bg-zinc-900 text-white">
        <Form {...dataForm}>
          <form
            onSubmit={dataForm.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              control={dataForm.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del local</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={dataForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={dataForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={dataForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={dataForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="very secret password" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={dataForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Restaurant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="bar">Bar</SelectItem>
                      <SelectItem value="cafe">Cafe</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="fast food">Fast food</SelectItem>
                      <SelectItem value="internacional">
                        Internacional
                      </SelectItem>
                      <SelectItem value="panaderia">Panaderia</SelectItem>
                      <SelectItem value="barra">Barra</SelectItem>
                      <SelectItem value="comida rapida">
                        Comida rapida
                      </SelectItem>
                      <SelectItem value="comida italiana">
                        Comida italiana
                      </SelectItem>
                      <SelectItem value="comida mexicada">
                        Comida mexicana
                      </SelectItem>
                      <SelectItem value="pasteleria">Pasteleria</SelectItem>
                      <SelectItem value="cafeteria">Cafeteria</SelectItem>
                      <SelectItem value="cerveceria">Cerveceria</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the category of your business.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={dataForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="3757 444444" {...field} />
                  </FormControl>
                  <FormDescription>Aca pone tu numerito</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={dataForm.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="location" {...field} />
                  </FormControl>
                  <FormDescription>Location of your business.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button onClick={dataForm.handleSubmit(onSubmit)} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

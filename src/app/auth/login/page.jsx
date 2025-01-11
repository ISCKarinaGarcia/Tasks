"use client";
import { useForm } from "react-hook-form";
import {signIn} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Login() {

   const { register,handleSubmit,formState: { errors } } = useForm();
   const router = useRouter();
   const [error, setError] = useState(null);

   const onSubmit = handleSubmit(async (data) => {
      console.log('auth login data',data);
      const res = await signIn('credentials',{
         phone: data.phone,
         password: data.password,
         redirect: false
      })

      console.log('login next auth response',res);

      if (!res.ok) {
         setError(res.error);
      }else{   
         router.push('/admin/tasks');
         
      }


      console.log('login next auth response',res); 
      

   })


   return (
      <div className="h-[calc(100vh-7rem)] flex justify-center items-center p-2">
 
         <form className="w-1/4 md:w-[350px] bg-white
         bg-gradient-to-r from-purple-200 to-blue-100 
         border-2 border-dashed border-purple-400 shadow-md rounded p-6 mt-10 space-y-4 " onSubmit={handleSubmit(onSubmit)}>
         {
            error && (
               <p className="bg-red-500 text-sm text-white p-3 rounded mb-4">
                  {error}
               </p>
            )
         }
            <h1 className="w-full flex justify-center my-2 font-bold mb-4 text-3xl text-white italic ">Login</h1>
            <label htmlFor="phone" className=" mb-2 block text-xl font-semibold text-white italic">Teléfono</label>
            <input
               className="p-3 rounded block mb-2 border-2 border-pink-100 w-full"
               type="text"
               {...register("phone", { required: { value: true, message: "Phone is required" } })}
               placeholder="Phone"
            />
            {
               errors.phone && (
                  <span className="text-red-500 text-sm">
                     {errors.phone.message}
                  </span>
               )
            }

            <label htmlFor="password" className="text-white mb-2 block text-xl font-semibold italic">Contraseña</label>
            <input
               className="p-3 rounded block mb-2 border-pink-100 w-full"
               type="password"
               {...register("password", { required: { value: true, message: "Password is required" } })}
               placeholder="******"
            />
            {
               errors.phone && (
                  <span className="text-red-500 text-sm">
                     {errors.password.message}
                  </span>
               )
            }

            <section className="w-full h-auto flex items-center justify-center">
               <button className="mt-2 w-9/12 bg-purple-400 bg-opacity-55 border-white border-2 border-dashed text-white font-bold 
               p-3 rounded-lg shadow-md italic" type="submit">Login</button>
            </section>

         </form>
      </div>

   )
}

export default Login
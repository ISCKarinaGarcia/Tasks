"use client";
import { redirect } from "next/dist/server/api-utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function Register() {

  const { register, handleSubmit , formState:{errors} } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(   async (data) => {

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch('/api/users',{
      method: 'POST',
      body: JSON.stringify({
          username: data.username,
          phone: data.phone,
          password: data.password 
      }), 
      headers: {
        'Content-Type': 'application/json'
      } 
    })


    if (response.ok) {
        router.push('/admin/users');
    }else{
      console.log('error',response);

    }
  })

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className=" h-auto w-1/4 md:w-2/4  
      bg-opacity-30 border-2 border-dashed border-blue-200 shadow-lg bg-white rounded-lg p-2">
      <section className="w-full h-8">
        <h1 className="text-gray-400 italic font-bold mb-4 text-2xl flex justify-center items-center">Nuevo Usuario</h1>
      </section>
      <label htmlFor="username" className="text-purple-900 font-bold mb-2 block text-md">Username</label>
        <input
          className="p-3 rounded block mb-2  w-full shadow"
          type="text"
          {...register("username", { required: { value: true, message: "Username es requerido" } })}
          placeholder="username"
        />
        {
          errors.username && (
            <span className="text-pink-800 text-sm">
              {errors.username.message}
            </span>
          )
        }
        
        <label htmlFor="phone" className="text-purple-900 font-bold mb-2 block text-md">Teléfono</label>
        <input
          className="p-3 rounded block mb-2  w-full shadow"
          type="text"
          {...register("phone", { required: { value: true, message: "Telefono es requerido" } })}
          placeholder="Phone"
        />
        {
          errors.phone && (
            <span className="text-pink-800 text-sm">
              {errors.phone.message}
            </span>
          )
        }



        <label htmlFor="password" className="text-purple-900 font-bold mb-2 block text-md">Contraseña</label>
        <input
         className="p-3 rounded block mb-2 w-full"
          type="password"
          {...register("password", { required: {value: true, message: "Contraseña es requerida"} })}
          placeholder="Password"
        />
                {
          errors.password && (
            <span className="text-pink-800 text-sm">
              {errors.password.message}
            </span>
          )
        }
        <label htmlFor="phone" className="text-purple-900 font-bold mb-2 block text-md">Confirmar Contraseña</label>
        <input
         className="p-3 rounded block mb-2 border-2 shadow w-full"
          type="password"
          {...register("confirmPassword", { required: {value: true, message: "Confirar la contraseña es requerida"} })}
          placeholder="Confirm Password"
        />
                        {
          errors.password && (
            <span className="text-pink-800 text-sm">
              {errors.password.message}
            </span>
          )
        }
        <button className="w-full  bg-opacity-65 border-2 border-purple-300 bg-purple-200
         p-3 rounded-lg mt-[60px] " type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;

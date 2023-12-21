import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authContext";
import Navbar from "./Navbar.jsx";
import { createPost } from "../firebase/publicaciones/createPost.js";
import { getPost } from "../firebase/publicaciones/getPost.js";
import { delPublication } from "../firebase/publicaciones/delPublication.js";


const Home = () => {
  const { user, loading } = useAuth();
  const [error, setError] = useState("");
  const [publicaciones, setPublicacion] = useState([]);
  const [file, setFile] = useState(null);
  const form = useRef();

  useEffect(() => {
    getPostAll();
  }, []);

  async function getPostAll() {
    const ResultPublicacion = await getPost();
    setPublicacion(ResultPublicacion);

  }

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <h1>loading</h1>
      </div>
    );

  const post = async (e) => {
    e.preventDefault();
    if (!form.current.publicacion.value) {
      return setError("Debe escribir un texto");
    }
    setError("");
    let img = await toBase64(file);
    const result = await createPost({
      publicacion: form.current.publicacion.value,
      foto: img,
      usuario: user.email,
      

      
    });
    console.log(result);
    if (result != null) {
      window.reload(true);
    }
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

    const handleDeletePublication = (id) => {
      publicaciones.forEach((item) => {
        if(item.id === id) {
          const confirmar = confirm('The post will be deleted')
          if(!confirmar){
            return
          }
          delPublication({
            id: id,
            email: item.user,
          })
        }
      }); 
    }



   
    

  return (
    <div className="w-full ">
      <Navbar />

      <div className="p-4  bg-slate-800 ">
        <div className="p-4    dark:border-gray-700 grid grid-flow-col  gap-3">
          <div className="flex flex-col  overflow-y-scroll-none box-border justify-center">
            <form onSubmit={post} ref={form}>
              <textarea
                className="textarea textarea-bordered w-full"
                name="publicacion"
                placeholder="¿Que inquitud tienes?"
              ></textarea>
              <div className="flex justify-between items-center  mt-4 ">
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  name="foto"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                />
                <button type="submit" className="btn btn-primary">
                  Postear
                </button>
              </div>

              <p className="text-red-500 my-4">{error}</p>
            </form>
          </div>
        </div>

        

        <div className="grid grid-cols-1 bg-slate-400">

          {publicaciones.map((myPost) => (
            
            <div
              key={myPost.id }
              
              className="block w-50 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 mb-10"
            >
               
              <div className="overflow-hidden bg-cover bg-no-repeat flex flex-col ">
                <div className="justify-between flex mr-5 ">

                <label tabIndex={0} className="btn btn-ghost  avatar mt-5">
                  <div className="w-10 rounded-full ">
                        <img alt="" src="" />
                        
                      </div>
                      <span className="">{myPost.usuario}</span>
                      
                      
                    </label>
                    
                  {
                    user.email == myPost.usuario ? 
                    
                    <button title="eliminar publicacion" className="w-8 mt-5" onClick={() => handleDeletePublication(myPost.id)}  ><img src="/icons/delete-svgrepo-com.svg" alt="" /></button> 

                    : <></>
                  }

                  </div>

                   <div className="flex justify-center">

                      <img className="rounded-3xl w-3/6 pt-3 " src={myPost.foto} alt="" />

                   </div>

                  
                <div className=" m-5  ">
                  <span className="text-2xl text-dark dark:text-neutral-200">
                    {myPost.publicacion}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

import { createPost } from "../firebase/publicaciones/createPost.js";
import { getPost } from "../firebase/publicaciones/getPost.js";

const ViewPost = () => {
    const { user, loading } = useAuth();
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");


    useEffect(() => {
        getPostAll();
      }, []);
    
      async function getPostAll() {
        const ResultPublicacion = await getPost();
        setPublicacion(ResultPublicacion);
      }

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
    
    
    return (<>

        <div className="grid grid-cols-1 bg-slate-400">

        {publicaciones.map((myPost) => (
        <div
            key={myPost.id}
            className="block w-50 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 mb-10"
        >
            <div className="flex ">
                <img src="" alt="" />
                <p></p>
            </div>
            <div className="overflow-hidden bg-cover bg-no-repeat flex flex-col justify-center items-center">
            <img className="rounded-3xl w-1/2 pt-3" src={myPost.foto} alt="" />
            <div className="p-2 flex items-start">
                <span className="text-base text-white dark:text-neutral-200">
                {myPost.publicacion}
                </span>
            </div>
            </div>
        </div>
        ))}
        </div>


    

    </>)
}

export  default ViewPost
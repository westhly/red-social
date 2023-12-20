const Perfil = () => {

    const {user, logout, loading} = useAuth()
    
    console.log(user);
    console.log(user.photoURL);


    
    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
        
    }

    if(loading) return <h1>loading</h1>


    return <div  

    className=" w-full max-w-xs m-auto card  bg-base-100 shadow-xl">
   <figure className="px-10 pt-10">
       <img src={user.photoURL}  className="rounded-xl" />
   </figure>
   <div className="card-body items-center text-center">
       <h2 className="card-title">Welcome {user.displayName || user.email}</h2>
       <p>If a dog chews shoes whose shoes does he choose?</p>
       <div className="card-actions">
       <button onClick={handleLogout} className="btn btn-primary">Logout</button>
       </div>
   </div>
   

   
</div>
}

export default Perfil

import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useLocalStorage } from "./useLocalStorage";

const Navbar = () => {

    const { user, logout, loading } = useAuth()
    const [text, setText] = useLocalStorage('text', '')
   

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }

    }

    if (loading) return <h1>loading</h1>

    return <div className="w-full ">

        <div className="navbar bg-base-100">
            <div className="flex-1">
                <div className="navbar-start">
                    <div className="dropdown">

                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Homepage</a></li>
                            <li><a>Portfolio</a></li>
                            <li><a>About</a></li>
                        </ul>
                    </div>
                </div>
                <a className="btn btn-ghost text-xl">Inicio</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  


    
   
}

export default Navbar
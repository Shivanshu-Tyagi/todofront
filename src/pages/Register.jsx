import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTodoApi } from "../context/todoContext"

 
function Register() {
    const [register, setRegister] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })
    
  const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
   const {addUser} = useTodoApi();
    const handleSubmit = async(e) =>{
        e.preventDefault();
       setLoading(true);
      try {
        const response = await addUser(register);
        if(response.status === true){
          localStorage.setItem("userName", JSON.stringify(response.data._id));
          const loginEvent = new Event("userLoggedIn");
          window.dispatchEvent(loginEvent);
          navigate("/home");
        }else(
          setError(response.message)
        )
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
      }
      finally{
        setLoading(false);
      }
    }
   
  return (
    <div className="w-full  h-4/5 flex justify-center items-center">
    <form onSubmit={(e)=>handleSubmit(e)}  className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 bg-cyan-900 rounded-lg"
      >
    <div className="w-full flex flex-col">
       <label htmlFor="name" className="text-lg md:text-2xl mb-1 text-white">Name</label>
        <input className="border-none  bg-cyan-950 text-white w-full p-2 border-b-2 border-cyan-400  focus:outline-none " type="name" id="name" name="name" value={register.name} onChange={(e) => setRegister({...register , name : e.target.value})} />
       </div>
       <div className="w-full flex flex-col my-2">
       <label htmlFor="email" className="text-lg md:text-2xl mb-1 text-white">Email</label>
        <input className="border-none  bg-cyan-950 text-white w-full p-2 border-b-2 border-cyan-400  focus:outline-none " type="email" id="email" name="email" onChange={(e) => setRegister({...register , email : e.target.value})}/>
       </div>
       <div className="w-full flex flex-col">
       <label htmlFor="phone" className="text-lg md:text-2xl mb-1 text-white">Mobile</label>
        <input className="border-none  bg-cyan-950 text-white w-full p-2 border-b-2 border-cyan-400  focus:outline-none " type="phone" id="phone" name="phone" onChange={(e) => setRegister({...register , phone : e.target.value})} />
       </div>
       <div className="flex flex-col my-2"> <label htmlFor="password" className="text-lg md:text-2xl mb-1 text-white">Password</label>
        <input className="border-none bg-cyan-950 text-white w-full p-2  focus:outline-none" type="password" id="password" name="password" onChange={(e) => setRegister({...register , password : e.target.value})}/>
        </div>
        <button className="border-none bg-cyan-600 text-white w-1/3 rounded-tl-2xl rounded-br-2xl text-center self-end p-2 text-lg md:text-xl  tracking-wider m-3 focus:outline-none">{loading === true ? "Processing..." : "Register"}</button>
    </form>

    {error && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-700 bg-opacity-75 text-white">
          <div className="bg-red-500 p-4 rounded-md">
            <p>{error}</p>
            <button
              className="mt-2 bg-white text-red-500 px-4 py-2 rounded-md"
              onClick={() => setError(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
</div>
  )
}

export default Register
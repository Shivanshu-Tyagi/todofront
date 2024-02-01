import { useEffect, useState } from "react";
import { useTodoApi } from "../context/todoContext";
import { useNavigate } from "react-router";

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [updateId, setUpdateId] = useState(''); 
 const [update, setUpdate] = useState({
  title : "",
  description : ""
  })
  console.log('++++',update);
  const { getAllTodos , deleteTodo ,updateTodo } = useTodoApi();

  const id = JSON.parse(localStorage.getItem("userName"));
  console.log('+++',id);

  
  const params = {
    updateId,
    update
  }
  const handleEdit = (todoId) => {  // Updated this function
    setUpdateId(todoId);
    setShowModel(true);
  };
  const navigate = useNavigate();
  const name = JSON.parse(localStorage.getItem("name"));
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getAllTodos(id);
        setTodos(todosData.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [id, getAllTodos]);


  const handleDelete = async (todoId) => {
    try {
      console.log("Deleting todo with ID:", todoId);
      await deleteTodo(todoId);
      console.log("Todo deleted successfully.");
  
      // Fetch updated todos after deletion
      const updatedTodosData = await getAllTodos(id);
      setTodos(updatedTodosData.data);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Submitting update with params:', { updateId, update });  // Updated this line
      const response = await updateTodo({ updateId, update });  // Updated this line
      console.log('Update response:', response);

      if (response.status === true) {
        const updatedTodosData = await getAllTodos(id);
        setTodos(updatedTodosData.data);
        setShowModel(false); 
      } else {
        console.error(response.message);
        // Handle the case where the todo is not found, e.g., show an error message to the user
      }
    } catch (error) {
      console.log('Error updating todo:', error);
      // Handle other errors if necessary
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mx-auto my-8">
     <div className=" flex justify-between px-2">
     <h1 className="text-3xl font-bold mb-4  text-cyan-200">Your Todos</h1>
     <h1 className="text-3xl font-bold mb-4  text-cyan-200">: {name}</h1>
     </div>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div key={todo._id} className="border p-4 my-4 rounded">
            <h3 className="text-2xl text-cyan-300 font-semibold mb-2">{todo.title}</h3>
            <p className="text-white">{todo.description}</p>
            <div className="flex mt-4">
              <button
                onClick={() => handleDelete(todo._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mr-2 rounded"
              >
                Delete
              </button>
              
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleEdit(todo._id)}>Edit</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No todos available.</p>
      )}

{
  showModel && (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-700 bg-opacity-75 text-white">
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 rounded-md">
           
          <form onSubmit={(e)=>handleSubmit(e)} className="w-full   p-4 bg-cyan-900 rounded-lg"
      >
    <div className="w-full flex flex-col">
       <label htmlFor="name" className="text-lg md:text-2xl mb-1 text-white">Title</label>
        <input className="border-none  bg-cyan-950 text-white w-full p-2 border-b-2 border-cyan-400  focus:outline-none " type="name" id="name" name="name" onChange={(e) => setUpdate({...update , title : e.target.value})} />
       </div>
       <div className="w-full flex flex-col my-2">
       <label htmlFor="email" className="text-lg md:text-2xl mb-1 text-white">Description</label>
        <textarea className="border-none  bg-cyan-950 text-white w-full p-2 border-b-2 border-cyan-400  focus:outline-none " rows={6} onChange={(e) => setUpdate({...update , description : e.target.value})} />
       </div>
    
        <button className="border-none bg-cyan-600 text-white w-1/3 rounded-tl-2xl rounded-br-2xl text-center self-end p-2 text-lg md:text-xl tracking-wider m-3 focus:outline-none">{loading === true ? "Processing..." : "save"}</button>
    </form>

             
          </div>
        </div>
  )
}
    </div>
  );
}

export default Home;

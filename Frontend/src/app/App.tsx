import { RouterProvider } from "react-router-dom"
import Router from "../routes/routes"
import { AuthContextProvider } from "@/features/Auth/Context/auth.context"


function App() {


  return (
    <>
      <AuthContextProvider>

        <RouterProvider router={Router} />

      </AuthContextProvider>
    </>
  )
}

export default App

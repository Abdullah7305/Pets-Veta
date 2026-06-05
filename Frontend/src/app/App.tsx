import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"
import Router from "../routes/routes"
import { AuthContextProvider } from "@/features/Auth/Context/auth.context"


function App() {


  return (
    <>
      <AuthContextProvider>

        <Toaster position="top-right" richColors />
        <RouterProvider router={Router} />

      </AuthContextProvider>
    </>
  )
}

export default App

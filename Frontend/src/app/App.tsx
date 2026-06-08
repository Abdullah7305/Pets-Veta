import { RouterProvider } from "react-router-dom"
import Router from "../routes/routes"
import { AuthContextProvider } from "@/features/Auth/Context/auth.context"
import { QueryProvider } from "@/features/Auth/Query/Providers/AuthQueryProvider"

function App() {


  return (
    <>
      <QueryProvider>

        <AuthContextProvider>

          <RouterProvider router={Router} />

        </AuthContextProvider>

      </QueryProvider>
    </>
  )
}

export default App

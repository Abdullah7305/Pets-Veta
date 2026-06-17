import { RouterProvider } from "react-router-dom"
import Router from "../routes/routes"
import { AuthContextProvider } from "@/features/Auth/Context/auth.context"
import { QueryProvider } from "@/features/Auth/Query/Providers/AuthQueryProvider"
import SmoothScroll from "@/Global Provider/SmoothScroller"

function App() {


  return (
    <>

      <QueryProvider>

        <AuthContextProvider>
          <SmoothScroll>

            <RouterProvider router={Router} />
          </SmoothScroll>

        </AuthContextProvider>

      </QueryProvider>

    </>
  )
}

export default App

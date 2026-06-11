import { RouterProvider } from "react-router-dom"
import Router from "../routes/routes"
import { AuthContextProvider } from "@/features/Auth/Context/auth.context"
import { QueryProvider } from "@/features/Auth/Query/Providers/AuthQueryProvider"
import SmoothScroll from "@/Global Provider/SmoothScroller"

function App() {


  return (
    <>
      <SmoothScroll>
        <QueryProvider>

          <AuthContextProvider>

            <RouterProvider router={Router} />

          </AuthContextProvider>

        </QueryProvider>
      </SmoothScroll>
    </>
  )
}

export default App

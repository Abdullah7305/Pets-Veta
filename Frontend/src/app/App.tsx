import { RouterProvider } from "react-router-dom"
import Router from "../routes/routes"
import { AuthContextProvider } from "@/features/Auth/Context/auth.context"
import { QueryProvider } from "@/features/Auth/Query/Providers/AuthQueryProvider"
import SmoothScroll from "@/Global Provider/SmoothScroller"
import FloatingBackButton from "@/shared/components/BackButton/FloatingBackButton"

function App() {


  return (
    <>

      <QueryProvider>

        <AuthContextProvider>
          <SmoothScroll>

            <RouterProvider router={Router} />
            <FloatingBackButton />
          </SmoothScroll>

        </AuthContextProvider>

      </QueryProvider>

    </>
  )
}

export default App

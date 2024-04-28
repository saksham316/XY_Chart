import { createBrowserRouter, RouterProvider } from "react-router-dom"
import DataChart from './components/DataChart/DataChart'
import Main from './layout/Main/Main'
// -----------------------------------------------------------------------------------------------------------------------------------

function App() {


  // -----------------------------------------------------------------------------------------------------------------------------------
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <DataChart />
        }
      ]
    }
  ])

  // -----------------------------------------------------------------------------------------------------------------------------------
  
  return (
    <RouterProvider router={appRouter}>
      <Main />
    </RouterProvider>
  )
}

export default App

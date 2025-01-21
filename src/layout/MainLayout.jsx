import { Outlet } from "react-router-dom"
import NavBar from "../social/navBar"



const MainLayout = () => {
  return (
    <main className=" overflow-hidden  border-spacing-4 ">
      <NavBar  />
        <Outlet/>
      {/* <footer>Footer</footer> */}
    </main>
  )
}

export default MainLayout
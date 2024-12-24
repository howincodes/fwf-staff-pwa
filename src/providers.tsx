import { Outlet } from "react-router-dom"
import { useGetUserDataQuery } from "./store/api/authApi"


const AppProviders = () => {
  // useGetUserDataQuery("")
  return (
    <><Outlet/></>
  )
}

export default AppProviders
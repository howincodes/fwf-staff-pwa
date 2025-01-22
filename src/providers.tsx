import { Outlet } from "react-router-dom"
import { Toaster } from "./components/ui/toaster"


const AppProviders = () => {
  // useGetUserDataQuery("")
  return (
    <>
      <Toaster />
      <Outlet /></>
  )
}

export default AppProviders
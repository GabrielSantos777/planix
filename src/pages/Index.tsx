import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const Index = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    } else {
      navigate("/landing")
    }
  }, [user, navigate])

  return null
}

export default Index

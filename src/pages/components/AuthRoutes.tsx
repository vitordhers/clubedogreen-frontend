import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useUser } from '../../contexts/UserContext'
import Loading from './Loading'


interface AuthRoutesProps {
  children: any
  route?: string
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ children, route }) => {
  const { user, isReady } = useUser()
  const router = useRouter()

  useEffect(() => {
    console.log(isReady)
    if (user) {
      !user && router.push('/login')
      user &&
        router.push(`/`)
    }else{

    }
  }, [isReady])

  return user && isReady ? children : <Loading />
}

export default AuthRoutes

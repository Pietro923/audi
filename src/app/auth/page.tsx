'use client'
import { SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    // Validate inputs
    if (!email || !password) {
      console.log('Por favor, complete todos los campos')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        // Specific error handling
        switch (error.message) {
          case 'Invalid login credentials':
            console.log('Correo o contraseña incorrectos')
            break
          case 'Email not confirmed':
            console.log('Por favor, confirma tu correo electrónico')
            break
          default:
            console.log('Ocurrió un error al iniciar sesión')
        }
      } else {
        // Successful login
        console.log('Inicio de sesión exitoso')
        // Redirect to dashboard after a short delay to show toast
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 1500)
      }
    } catch (catchError) {
        console.log('Error de red. Comprueba tu conexión')
      console.error('Unexpected login error:', catchError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
     
      <h1 className="text-2xl mb-6 text-center font-bold">Iniciar Sesión</h1>
      <div className="space-y-4">
        <Input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: { target: { value: SetStateAction<string> } }) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full"
        />
        <Input 
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e: { target: { value: SetStateAction<string> } }) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full"
        />
        <Button 
          onClick={handleLogin} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
        <div className="text-center mt-4">
          <a href="/reset-password" className="text-blue-500 hover:underline text-sm">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { X, Eye, EyeOff, Mail, Lock, User, Chrome } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (user: { name: string; email: string }) => void
}

type Tab = "login" | "register"

export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Login form
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  
  // Register form
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setLoginEmail("")
      setLoginPassword("")
      setRegisterName("")
      setRegisterEmail("")
      setRegisterPassword("")
      setRegisterConfirmPassword("")
      setAcceptTerms(false)
      setError("")
      setShowPassword(false)
      setShowConfirmPassword(false)
    }
  }, [isOpen])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!loginEmail || !loginPassword) {
      setError("Por favor completa todos los campos")
      return
    }
    
    setIsLoading(true)
    
    // Simulate login - in a real app this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check localStorage for registered users
    const users = JSON.parse(localStorage.getItem("bp_users") || "[]")
    const user = users.find((u: { email: string; password: string }) => 
      u.email === loginEmail && u.password === loginPassword
    )
    
    if (user) {
      localStorage.setItem("bp_user", JSON.stringify({ name: user.name, email: user.email }))
      onLoginSuccess({ name: user.name, email: user.email })
      onClose()
    } else {
      // For demo purposes, allow any login
      const demoUser = { name: loginEmail.split("@")[0], email: loginEmail }
      localStorage.setItem("bp_user", JSON.stringify(demoUser))
      onLoginSuccess(demoUser)
      onClose()
    }
    
    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      setError("Por favor completa todos los campos")
      return
    }
    
    if (registerPassword !== registerConfirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }
    
    if (registerPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }
    
    if (!acceptTerms) {
      setError("Debes aceptar los términos y condiciones")
      return
    }
    
    setIsLoading(true)
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem("bp_users") || "[]")
    users.push({ name: registerName, email: registerEmail, password: registerPassword })
    localStorage.setItem("bp_users", JSON.stringify(users))
    
    const newUser = { name: registerName, email: registerEmail }
    localStorage.setItem("bp_user", JSON.stringify(newUser))
    onLoginSuccess(newUser)
    onClose()
    
    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glass rounded-2xl p-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Logo */}
        <div className="text-center mb-6">
          <h2 className="font-[var(--font-bebas)] text-3xl text-[#e0457b] neon-text-subtle tracking-wider">
            BLACKPINK
          </h2>
          <p className="text-white/60 text-sm mt-1">World Tour 2025</p>
        </div>
        
        {/* Tabs */}
        <div className="flex mb-6 border-b border-white/10">
          <button
            onClick={() => { setActiveTab("login"); setError(""); }}
            className={`flex-1 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "login" 
                ? "text-[#e0457b] border-b-2 border-[#e0457b]" 
                : "text-white/60 hover:text-white"
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => { setActiveTab("register"); setError(""); }}
            className={`flex-1 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "register" 
                ? "text-[#e0457b] border-b-2 border-[#e0457b]" 
                : "text-white/60 hover:text-white"
            }`}
          >
            Crear Cuenta
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        
        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#e0457b] transition-colors"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-11 text-white placeholder:text-white/40 focus:outline-none focus:border-[#e0457b] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="text-right">
              <button type="button" className="text-sm text-[#e0457b] hover:text-[#f082ac] transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#e0457b] text-white font-semibold py-3 rounded-lg uppercase tracking-wider hover:bg-[#e0457b]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0a0a0a] px-2 text-white/40">o</span>
              </div>
            </div>
            
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white font-semibold py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Chrome className="w-5 h-5" />
              Continuar con Google
            </button>
          </form>
        )}
        
        {/* Register Form */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Nombre completo"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#e0457b] transition-colors"
              />
            </div>
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#e0457b] transition-colors"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-11 text-white placeholder:text-white/40 focus:outline-none focus:border-[#e0457b] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-11 text-white placeholder:text-white/40 focus:outline-none focus:border-[#e0457b] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#e0457b] rounded"
              />
              <span className="text-sm text-white/60">
                Acepto los{" "}
                <button type="button" className="text-[#e0457b] hover:underline">
                  términos y condiciones
                </button>
              </span>
            </label>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#e0457b] text-white font-semibold py-3 rounded-lg uppercase tracking-wider hover:bg-[#e0457b]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

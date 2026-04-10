import React, { useState } from "react";
// 1. Importar o Link
import { useNavigate, Link } from "react-router-dom";
import { login as authServiceLogin } from "../services/authService";
import useAuthStore from "../store/authStore";
import logoIbdn from "../assets/logo_ibdn.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginToStore = useAuthStore((state) => state.login);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const data = await authServiceLogin(email, password);
      loginToStore(data.user);
      navigate("/");
    } catch (err) {
      setError("Falha na autenticação. Verifique seu e-mail e senha.");
      console.error(err);
    }
  };

  const handleDemoLogin = async (demoEmail) => {
    setError("");
    try {
      const data = await authServiceLogin(demoEmail, "12345678");
      loginToStore(data.user);
      navigate("/");
    } catch (err) {
      setError("Falha no acesso rápido. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-ibdn-bg p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-ibdn-primary/10 blur-3xl mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-ibdn-accent/10 blur-3xl mix-blend-multiply"></div>
      
      <div className="w-full max-w-md p-10 space-y-8 bg-white/80 backdrop-blur-xl sm:rounded-3xl sm:shadow-2xl border border-white/50 relative z-10">
        <div className="text-center flex flex-col items-center">
          <img src={logoIbdn} alt="IBDN Logo" className="h-16 w-auto mb-6 drop-shadow-sm" />
          <h2 className="text-3xl font-serif font-bold tracking-tight text-ibdn-primary">
            Acesse sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Bem-vindo ao Portal Ambiental IBDN
          </p>
        </div>

        {/* Acesso Rápido Demo */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-center text-gray-400 uppercase tracking-widest">
            ⚡ Acesso Rápido para Demo
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("admin@ibdn.com")}
              className="flex flex-col items-center gap-1 px-3 py-3 rounded-xl border-2 border-ibdn-primary/30 bg-ibdn-primary/5 hover:bg-ibdn-primary/15 hover:border-ibdn-primary transition-all hover:-translate-y-0.5 text-left"
            >
              <span className="text-lg">🛡️</span>
              <span className="text-xs font-bold text-ibdn-primary">Administrador</span>
              <span className="text-[10px] text-gray-500 font-mono">admin@ibdn.com</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("empresa@ibdn.com")}
              className="flex flex-col items-center gap-1 px-3 py-3 rounded-xl border-2 border-ibdn-accent/30 bg-ibdn-accent/5 hover:bg-ibdn-accent/15 hover:border-ibdn-accent transition-all hover:-translate-y-0.5 text-left"
            >
              <span className="text-lg">🏢</span>
              <span className="text-xs font-bold text-ibdn-accent">Usuário Empresa</span>
              <span className="text-[10px] text-gray-500 font-mono">empresa@ibdn.com</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/80 px-3 text-gray-400 font-medium">ou entre com suas credenciais</span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Endereço de e-mail
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="seuemail@exemplo.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="********"
              />
            </div>
          </div>
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-ibdn-primary rounded-xl shadow-lg shadow-ibdn-primary/20 hover:bg-ibdn-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ibdn-primary transition-all hover:-translate-y-0.5"
            >
              Entrar
            </button>
          </div>

          <div className="text-sm text-center">
            <p className="text-gray-600">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="font-medium text-ibdn-accent hover:text-ibdn-primary transition-colors"
              >
                Registre-se agora
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;

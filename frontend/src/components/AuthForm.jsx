import { useState } from "react";
import { login, register, forgotPassword } from "../api";

export default function AuthForm({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (mode === "forgot") {
        const data = await forgotPassword(email);
        alert(data.message);
        setMode("login");
        return;
      }
      const data = mode === "register" ? await register(email, password) : await login(email, password);
      onLogin(data.email || email);
      setPassword("");
    } catch (err) {
      alert(err.message);
    }
  }

  const titles = { login: "Connexion Maintenance", register: "Créer un compte", forgot: "Mot de passe oublié" };
  const btnLabels = { login: "Se connecter", register: "S'inscrire", forgot: "Envoyer le lien" };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{titles[mode]}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre.nom@gmail.com" required />
          </div>
          {mode !== "forgot" && (
            <div className="form-group">
              <label>Mot de passe</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
          )}
          <button type="submit" className="btn btn-primary btn-full">{btnLabels[mode]}</button>
        </form>
        <div className="auth-links">
          {mode === "login" ? (
            <>
              <button onClick={() => setMode("register")}>Créer un compte</button>
              <button onClick={() => setMode("forgot")}>Mot de passe oublié ?</button>
            </>
          ) : (
            <button onClick={() => setMode("login")}>Déjà un compte ? Se connecter</button>
          )}
        </div>
      </div>
    </div>
  );
}

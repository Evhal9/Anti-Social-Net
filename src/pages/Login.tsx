import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function LoginForm() {

    const auth = useContext(AuthContext)!; // asumimos que siempre existe
    const { login } = auth;
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const res = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname, password }),
  });
  const data = await res.json();

  login(data.user);
};
        

 
    return <>
    <section>
        <div>
            <div>
                <button>Iniciar sesion</button>
                <button>Registrarse</button>
            </div>
            <div>
                <div>
                    <h3>Iniciar sesion</h3>
                    <form onSubmit={handleSubmit} >
                        <label>
                            Nickname:
                            <input
                            type="text"
                            placeholder="Usuario"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            />
                        </label>

                        <label>
                            Contraseña
                            <input
                            type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        <button type="submit">Enviar</button>
        </form>
                </div>
                <div>
                    <h3> Registrarse </h3>
                </div>
            </div>
        </div>
    </section>
    </>
}

export default LoginForm
import { jwtDecode } from "jwt-decode";

const AuthService = {
    
    SalvarToken(token) {
        localStorage.setItem("jwt", token);
    },
    PegarToken() {
        return localStorage.getItem("jwt")
    },
    VerificarSeUsuarioEstaLogado() {
        const token = localStorage.getItem("jwt");
        if (token == null) { return false }

        const dataAtual = Date.parse(new Date()) / 1000;

        const userData = jwtDecode(token);

        if (dataAtual > userData.exp) {
            localStorage.removeItem("jwt");
            return false;
        }

        return true;
    }
};

export default AuthService;
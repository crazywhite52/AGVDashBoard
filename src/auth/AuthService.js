import decode from 'jwt-decode';
export default class AuthService {
    constructor() {
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }
    login(password) {

        if (password == 'jib6454*') {
            const min = 1;
            const max = 100;
            const rand = min + Math.random() * (max - min);
            this.setToken('jibtoken2020wqaszx' + rand)
            this.setState({
                login: true
            }, () => {
                const token = this.getToken()
                this.isTokenExpired(token)
            })

        } else {
            alert('รหัสผ่านไม่ถูกต้อง');
        }

    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            //console.log(decoded);
            if (decoded.exp < Date.now() / 1000) {
                localStorage.removeItem('id_token');
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }


    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        localStorage.removeItem('id_token');
    }



    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
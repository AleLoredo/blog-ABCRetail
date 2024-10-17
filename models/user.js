// import fs from 'fs';

class User{
    #id;
    #nombre;
    #apellido;
    #username;
    #password;
    #area;

    constructor(id, nombre, apellido, username, password, area){
        this.#id = id;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#username = username;
        this.#password = password;
        this.#area = area;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get apellido() {
        return this.#apellido;
    }

    get username() {
        return this.#username;
    }

    get password() {
        return this.#password;
    }

    get area() {
        return this.#area;
    }

    // Setters
    set nombre(value) {
        this.#nombre = value;
    }

    set apellido(value) {
        this.#apellido = value;
    }

    set username(value) {
        this.#username = value;
    }

    set password(value) {
        this.#password = value;
    }

    set area(value) {
        this.#area = value;
    }

    // Cargar usuarios desde data.json
    /* loadUsers() {
        try {
            const data = fs.readFileSync('data/usuarios.json');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // Guardar usuarios en data.json
    saveUsers(users) {
        fs.writeFileSync('data/usuarios.json', JSON.stringify(users, null, 2));
    } */
}

module.exports = User;
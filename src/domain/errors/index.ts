export class DuplicateEmailError extends Error {
    constructor() {
        super("correo duplicado")
        this.name = "DuplicateEmailError"
    }
}

export class NoEnoughMoneyError extends Error {
    constructor() {
        super("No hay suficiente dinero");
    }
}
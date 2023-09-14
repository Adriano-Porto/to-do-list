class ValidationError {
    status: number
    message: string
    
    constructor(message: string, status: number) {
        this.message = message
        this.status = status
    }
}

export { ValidationError }
export interface ResponseFormat {
    success: boolean
    data: unknown | null

    error: ErrorFormat | null
}

export interface ErrorFormat {
    message: string
    name: string
    code: string
    stack?: string
}
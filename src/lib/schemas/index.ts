import z from "zod"

export const username = () => z.string().min(3).max(16)

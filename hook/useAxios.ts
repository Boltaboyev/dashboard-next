import axios from "axios"

const url = "https://67b4d658a9acbdb38ed092ff.mockapi.io"

export const my_axios = axios.create({
    baseURL: url,
})

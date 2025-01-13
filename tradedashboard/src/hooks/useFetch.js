import { useEffect, useState } from "react"
import apiHandle from "../services/ApiHandle"

const abortMessage = "cancellation on re-request"

const useFetch = ({ url, params }, triggers = []) => {

  const [abortController, setAbortController] = useState()

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setError(null)
    setIsLoading(true)
    try {
      const res = await apiHandle({ method: "GET", url, params, signal: abortController?.signal })
      if (res.status === 200) {
        setData(res?.data?.data)
      } else {
        setError(true)
      }
      setIsLoading(false)
    } catch (error) {

      if (abortController?.signal?.reason !== abortMessage) {
        setError(error)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (abortController) fetchData()
  }, [abortController])

  useEffect(() => {
    if (abortController) abortController.abort(abortMessage)

    setAbortController(url ? new AbortController() : null)
  }, triggers)

  return { isLoading, data, error }
}

export default useFetch;
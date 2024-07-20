"use client"
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"


const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit">{pending ? "Saving Campaign..." : "Save"}</Button>
  )
}

export default SubmitButton

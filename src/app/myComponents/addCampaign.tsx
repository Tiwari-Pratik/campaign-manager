"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddCampaignForm from "./addCampaignForm"
import { useState } from "react"

const AddCampaign = () => {
  const [success, setSuccess] = useState<boolean>(false)
  const toggleDialog = () => {

    setSuccess(prev => !prev)
  }

  return (
    <Dialog open={success} onOpenChange={setSuccess}>
      <DialogTrigger asChild>
        <Button variant="default">Add Campaign</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add a new Campaign</DialogTitle>
          <DialogDescription>
            Create a new campaign. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <AddCampaignForm toggle={toggleDialog} />
      </DialogContent>
    </Dialog>
  )
}

export default AddCampaign

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
import { useState } from "react"
import EditCampaignForm from "./editCampaignForm"
import { Campaign } from "@prisma/client"

interface Props {
  campaign: Campaign
}

const EditCampaign = ({ campaign }: Props) => {
  const [success, setSuccess] = useState<boolean>(false)
  const toggleDialog = () => {

    setSuccess(prev => !prev)
  }

  return (
    <Dialog open={success} onOpenChange={setSuccess}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Campaign</DialogTitle>
          <DialogDescription>
            Modify your campaign. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditCampaignForm toggle={toggleDialog} campaign={campaign} />
      </DialogContent>
    </Dialog>
  )
}

export default EditCampaign

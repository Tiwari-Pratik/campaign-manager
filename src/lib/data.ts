import "server-only"

import { Campaign } from "@prisma/client"
import prisma from "./db"

export const getAllCampaigns = async () => {

  try {
    const campaigns: Campaign[] = await prisma.campaign.findMany({
    })
    return campaigns
  } catch (error) {
    return null
  }
}

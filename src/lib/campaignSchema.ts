import { z } from "zod"

export type CampaignType = "Cost per Order" | "Cost per Click" | "Buy One get One"

export const Days = z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"])

const convertToMinutes = (time: string) => {
  console.log(time)
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export const ScheduleSchema = z.object({
  day: Days,
  startTime: z.string().time(),
  endTime: z.string().time()
}).refine(data => {

  const startMinutes = convertToMinutes(data.startTime)
  const endMinutes = convertToMinutes(data.endTime)
  return endMinutes > startMinutes

}, {
  message: "A campaign can not start before it begins. Pick a greater time to end the campaign",
  path: ["endTime"]
})

export type ScheduleType = z.infer<typeof ScheduleSchema>
export const CampaignSchema = z.object({
  campaignType: z.enum(["Cost per Order", "Cost per Click", "Buy One Get One"]),
  campaignStartDate: z.string().datetime(),
  campaignEndDate: z.string().datetime(),
  schedule: z.array(ScheduleSchema).min(1, { message: "Campaign must be scheduled for atleast 1 day" })
})

export interface campaignState {
  message?: string | null,
  errors?: {
    campaignType?: string[],
    campaignStartDate?: string[]
    campaignEndDate?: string[]
    schedule?: string[]
  }

}

"use server"

import { CampaignSchema, campaignState } from "@/lib/campaignSchema"
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

const convertTo24HourFormat = (timeString: string) => {
  // console.log(timeString)
  let hour = parseInt(timeString.split(" ")[0].split(":")[0]);
  const minute = parseInt(timeString.split(" ")[0].split(":")[1], 10);
  const period = timeString.split(" ")[1]

  // Adjust hour for AM/PM
  if (period.toUpperCase() === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }

  // Format hour and minute to 2 digits
  const hourStr = hour.toString().padStart(2, '0');
  const minuteStr = minute.toString().padStart(2, '0');
  // console.log(`${hourStr}:${minuteStr}`)

  return `${hourStr}:${minuteStr}:00`;
}

export const addCampaign = async (prevState: campaignState | undefined, formData: FormData) => {
  // console.log(formData)

  const campaignType = formData.get("campaign")
  const dateRange = formData.get("date")
  if (typeof dateRange !== "string") return
  if (!dateRange) return
  const startDate = JSON.parse(dateRange)?.from
  const endDate = JSON.parse(dateRange)?.to

  const schedule: { day: string, startTime: string, endTime: string }[] = []
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  daysOfWeek.forEach((day) => {

    const scheduledDay = formData.get(day)
    if (scheduledDay === "on") {
      const startTime = formData.get(`${day}-startTime`)
      if (typeof startTime !== "string") return
      if (!startTime) return
      const endTime = formData.get(`${day}-endTime`)
      if (typeof endTime !== "string") return
      if (!endTime) return

      schedule.push({ day, startTime: convertTo24HourFormat(startTime.replaceAll('"', '')), endTime: convertTo24HourFormat(endTime.replaceAll('"', '')) })
    }
  })

  // console.log({ campaignType, startDate, endDate, schedule })

  const validatedFields = CampaignSchema.safeParse({
    campaignType,
    campaignStartDate: startDate,
    campaignEndDate: endDate,
    schedule
  })
  if (!validatedFields.success) {
    // console.log(JSON.stringify(validatedFields.error, null, 3))
    // console.log(validatedFields.error.flatten().fieldErrors)
    return {
      message: "Error. Failed to validate inputs!",
      errors: validatedFields.error.flatten().fieldErrors,
    };

  }

  const typeOfCampaign = validatedFields.data?.campaignType
  const campaignStartDate = validatedFields.data?.campaignStartDate
  const campaignEndDate = validatedFields.data?.campaignEndDate
  const campaignSchedule = validatedFields.data?.schedule

  try {
    await prisma.campaign.create({
      data: {
        campaignType: typeOfCampaign,
        campaignStartDate,
        campaignEndDate,
        schedule: campaignSchedule
      }
    })
  } catch (error) {
    return {
      message: "Database Error: failed to create campaign",
    };
  }

  revalidatePath("/")
  return { message: "success" }
}

export const editCampaign = async (id: string, prevState: campaignState | undefined, formData: FormData) => {
  // console.log("calling edit campaign")
  // console.log(formData)

  const campaignType = formData.get("campaign")
  const dateRange = formData.get("date")
  if (typeof dateRange !== "string") return
  if (!dateRange) return
  const startDate = JSON.parse(dateRange)?.from
  const endDate = JSON.parse(dateRange)?.to

  const schedule: { day: string, startTime: string, endTime: string }[] = []
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  daysOfWeek.forEach((day) => {

    const scheduledDay = formData.get(day)
    if (scheduledDay === "on") {
      const startTime = formData.get(`${day}-startTime`)
      if (typeof startTime !== "string") return
      if (!startTime) return
      const endTime = formData.get(`${day}-endTime`)
      if (typeof endTime !== "string") return
      if (!endTime) return

      schedule.push({ day, startTime: convertTo24HourFormat(startTime.replaceAll('"', '')), endTime: convertTo24HourFormat(endTime.replaceAll('"', '')) })
    }
  })

  // console.log({ campaignType, startDate, endDate, schedule })

  const validatedFields = CampaignSchema.safeParse({
    campaignType,
    campaignStartDate: startDate,
    campaignEndDate: endDate,
    schedule
  })
  if (!validatedFields.success) {
    // console.log(JSON.stringify(validatedFields.error, null, 3))
    // console.log(validatedFields.error.flatten().fieldErrors)
    return {
      message: "Error. Failed to validate inputs!",
      errors: validatedFields.error.flatten().fieldErrors,
    };

  }

  const typeOfCampaign = validatedFields.data?.campaignType
  const campaignStartDate = validatedFields.data?.campaignStartDate
  const campaignEndDate = validatedFields.data?.campaignEndDate
  const campaignSchedule = validatedFields.data?.schedule

  try {
    await prisma.campaign.update({
      where: { id },
      data: {
        campaignType: typeOfCampaign,
        campaignStartDate,
        campaignEndDate,
        schedule: campaignSchedule
      }
    })
  } catch (error) {
    return {
      message: "Database Error: failed to create campaign",
    };
  }
  revalidatePath("/")
  return { message: "success" }
}



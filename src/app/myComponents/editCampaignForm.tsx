
"use client"
import { Label } from "@/components/ui/label"
import DatePicker from "./datePicker"
import { editCampaign } from "@/actions/campaignActions"
import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { Select, SelectItem, SelectGroup, SelectLabel, SelectValue, SelectContent, SelectTrigger } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import TimePicker from "./timePicker"
import { campaignState } from "@/lib/campaignSchema"
import { useFormState } from "react-dom"
import { useToast } from "@/components/ui/use-toast"
import SubmitButton from "./submitButton"
import { Campaign } from "@prisma/client"

enum Campaigns {
  costPerOrder = "Cost per Order",
  costPerClick = "Cost per Click",
  buyOnegetOne = "Buy One Get One"
}

interface TimeSchedule {
  day: string,
  time: string
  type: string
}

interface Props {
  toggle: () => void,
  campaign: Campaign
}


const convertToHour = (time24: string | undefined) => {
  if (!time24) return ""
  const [hours, minutes, seconds] = time24.split(':').map(Number);

  const hours12 = hours % 12 === 0 ? 12 : hours % 12;

  return hours12.toString();
}
const convertToMinute = (time24: string | undefined) => {
  if (!time24) return ""
  const [hours, minutes, seconds] = time24.split(':').map(Number);


  return minutes.toString();
}
const convertToPeriod = (time24: string | undefined) => {
  if (!time24) return ""
  const [hours, minutes, seconds] = time24.split(':').map(Number);

  const period = hours >= 12 ? 'pm' : 'am';

  return period;
}

const EditCampaignForm = ({ toggle, campaign }: Props) => {
  const [campaignDates, setCampaignDates] = useState<DateRange | undefined>()
  const [schedules, setSchedules] = useState<TimeSchedule[]>([])
  const initialState: campaignState = { message: null, errors: {} }
  const editCampaignWithId = editCampaign.bind(null, campaign.id)
  const [state, dispatch] = useFormState(editCampaignWithId, initialState)
  const { toast } = useToast()
  const [close, setClose] = useState<boolean>(false)

  useEffect(() => {

    if (state?.message === "success") {
      setClose(true)
      toggle()
      toast({
        title: "Your Ad campaign has been created successfully!",
      })
    }

  }, [state?.message])

  // console.log({ schedules })
  const addDates = (date: DateRange | undefined) => {
    setCampaignDates(date)
  }


  const addTimes = (day: string, type: string, hour: string, minute: string, period: string) => {
    setSchedules(prevState => [...prevState, { day, type, time: `${hour}:${minute} ${period}` }])
  }


  return (
    <form action={dispatch}>
      <div className="flex flex-col items-start gap-2 justify-center my-4 mx-2" aria-describedby="campaignType-error">
        <Label htmlFor="campaign">Campaigns</Label>
        <Select name="campaign" defaultValue={campaign.campaignType} >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Existing Campaigns</SelectLabel>
              <SelectItem value={Campaigns.costPerOrder}>Cost per Order</SelectItem>
              <SelectItem value={Campaigns.costPerClick}>Cost per Click</SelectItem>
              <SelectItem value={Campaigns.buyOnegetOne}>Buy One Get One</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div id="campaignType-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.campaignType &&
          state.errors?.campaignType?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="flex flex-col items-start gap-2 justify-center my-4 mx-2" aria-describedby="date-error">
        <Label htmlFor="date">
          Pick Date Range
        </Label>
        <DatePicker name="date" addDate={addDates} defaultStartDate={campaign.campaignStartDate.toString()} defaultEndDate={campaign.campaignEndDate.toString()} />
        <input type="hidden" name="date" value={JSON.stringify(campaignDates)} />
      </div>
      <div id="date-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.campaignStartDate &&
          state.errors?.campaignStartDate?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          )
          )}
        {state?.errors?.campaignEndDate &&
          state.errors?.campaignEndDate?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          )
          )}
      </div>
      <div className="flex flex-col items-start gap-2 justify-center my-4 mx-2" aria-describedby="schedule-error">
        {
          ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => {
            return (
              <div key={day} className="flex items-center justify-end gap-4 w-full">
                <Checkbox id={day} name={day} defaultChecked={campaign.schedule.find(sch => sch.day === day) ? true : false} />
                <label htmlFor={day} className="flex-1 text-sm font-medium leading-none">
                  {day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}
                </label>
                {/* <TimePicker type="start" addTime={addTimes} day={day} /> */}
                <TimePicker type="start" addTime={addTimes} day={day} hour={campaign.schedule.find(sch => sch.day === day) ?
                  convertToHour(campaign.schedule.find(sch => sch.day === day)?.startTime) : ""} minute={campaign.schedule.find(sch => sch.day === day) ?
                    convertToMinute(campaign.schedule.find(sch => sch.day === day)?.startTime) : ""}
                  period={campaign.schedule.find(sch => sch.day === day) ?
                    convertToPeriod(campaign.schedule.find(sch => sch.day === day)?.startTime) : ""} />
                <input type="hidden" name={`${day}-startTime`} value={JSON.stringify(schedules?.findLast(schedule => {
                  return (schedule.day === day && schedule.type === "start")
                })?.time)} />

                <TimePicker type="end" addTime={addTimes} day={day} hour={campaign.schedule.find(sch => sch.day === day) ?
                  convertToHour(campaign.schedule.find(sch => sch.day === day)?.endTime) : ""} minute={campaign.schedule.find(sch => sch.day === day) ?
                    convertToMinute(campaign.schedule.find(sch => sch.day === day)?.endTime) : ""}
                  period={campaign.schedule.find(sch => sch.day === day) ?
                    convertToPeriod(campaign.schedule.find(sch => sch.day === day)?.endTime) : ""} />
                <input type="hidden" name={`${day}-endTime`} value={JSON.stringify(schedules?.findLast(schedule => {
                  return (schedule.day === day && schedule.type === "end")
                })?.time)} />
              </div>

            )
          })
        }
      </div>
      <div id="schedule-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.schedule &&
          state.errors?.schedule?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <SubmitButton />

    </form>
  )

}

export default EditCampaignForm

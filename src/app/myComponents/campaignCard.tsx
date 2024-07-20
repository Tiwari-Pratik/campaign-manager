import { Campaign } from "@prisma/client";
import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface Props {
  campaign: Campaign
}


const convertToLocaleDateString = (dateString: string) => {
  const date = new Date(dateString);

  // Step 2: Get the user's locale dynamically
  const userLocale = 'en-US';

  // Step 3: Use toLocaleDateString with the dynamic locale
  const localeDateString = date.toLocaleDateString(userLocale, { year: "numeric", month: "long", day: "numeric" });
  return localeDateString
}

const convertToAmPm = (time24: string | undefined): string => {
  if (!time24) return ""
  const [hours, minutes, seconds] = time24.split(':').map(Number);

  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;

  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}


type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
const dayIndexes: Record<string, number> = {
  "sunday": 0,
  "monday": 1,
  "tuesday": 2,
  "wednesday": 3,
  "thursday": 4,
  "friday": 5,
  "saturday": 6,
};

function getNextActivationDay(startDate: string, endDate: string, schedule: { day: string, startTime: string, endTime: string }[]): { day: string, startTime: string, endTime: string } | null {
  const currentDate = new Date();

  // Parse the start and end dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Check if the current date is within the campaign period
  if (currentDate > end) {
    return null; // Campaign is not active
  }

  // Get the current day index (0-6)
  let currentDayIndex = currentDate.getDay();

  // Sort the schedule based on the day indexes
  schedule.sort((a, b) => dayIndexes[a.day] - dayIndexes[b.day]);

  // Iterate through the schedule to find the next activation day
  for (let i = 0; i < schedule.length; i++) {
    const scheduleDayIndex = dayIndexes[schedule[i].day];

    if (scheduleDayIndex > currentDayIndex ||
      (scheduleDayIndex === currentDayIndex && isTimeInFuture(currentDate, schedule[i].startTime))) {
      return schedule[i];
    }
  }

  // If no future activation day found in the current week, return the first activation day of the next week
  return schedule[0];
}

// Helper function to check if the schedule start time is in the future
function isTimeInFuture(currentDate: Date, scheduleStartTime: string) {
  const [hours, minutes, seconds] = scheduleStartTime.split(':').map(Number);
  return (currentDate.getHours() < hours) ||
    (currentDate.getHours() === hours && currentDate.getMinutes() < minutes) ||
    (currentDate.getHours() === hours && currentDate.getMinutes() === minutes && currentDate.getSeconds() < seconds);
}

const CampaignCard = ({ campaign }: Props) => {

  return (

    <Card key={campaign.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">{campaign.campaignType}</div>
          {/* EditCampaign button  */}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-col items-start gap-2 text-muted-foreground">
          <span>Start: {convertToLocaleDateString(campaign.campaignStartDate.toISOString())}</span>
          <span>End: {convertToLocaleDateString(campaign.campaignEndDate.toISOString())}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Next Activation: {getNextActivationDay(campaign.campaignStartDate.toISOString(),
            campaign.campaignEndDate.toISOString(), campaign.schedule)?.day},
            starts at: {convertToAmPm(getNextActivationDay(campaign.campaignStartDate.toISOString(),
              campaign.campaignEndDate.toISOString(), campaign.schedule)?.startTime)} </span>
        </div>
      </CardContent>
    </Card>

  )

}

export default CampaignCard

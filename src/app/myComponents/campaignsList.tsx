import { getAllCampaigns } from "@/lib/data"
import CampaignCard from "./campaignCard"

const CampaignsList = async () => {

  const allCampaigns = await getAllCampaigns()


  return (
    <section className="w-full py-2 md:py-4 lg:py-8">
      <div className="container grid gap-6 px-4 md:px-6">
        <div className="flex flex-col items-start md:flex-row md:items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tighter">Marketing Campaigns</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {
            allCampaigns && allCampaigns?.map((campaign, index) => {
              return (
                <CampaignCard campaign={campaign} key={`${campaign.id}-${index}`} />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default CampaignsList

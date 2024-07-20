import AddCampaign from "./myComponents/addCampaign";
import CampaignsList from "./myComponents/campaignsList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-10 p-24">
      <section className="py-10 border-b border-black text-center">
        <h1 className="font-semibold text-lg">Welcome to the Campaign Manager</h1>
      </section>
      <section >
        <AddCampaign />
      </section>
      <section>
        <CampaignsList />
      </section>
    </main>
  );
}

import AddCampaign from "./myComponents/addCampaign";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-10 p-24">
      <section className="py-10 border-b border-black text-center">
        <h1>Welcome to the Campaigner Manager</h1>
      </section>
      <section >
        <AddCampaign />
      </section>
      <section>
        {/* Display Campaigns List  */}
      </section>
    </main>
  );
}

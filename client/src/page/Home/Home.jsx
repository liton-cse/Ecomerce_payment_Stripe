import CardDetails from "../../components/card/CardDetails";

function Home() {
  return (
    <div className="flex flex-col lg:flex-row p-2 sm:p-4 gap-2 sm:gap-4">
      <aside className="hidden md:block lg:w-48 xl:w-56 2xl:w-64 bg-gray-100 p-2 sm:p-3 lg:p-4 rounded shadow">
        Left Aside
      </aside>

      <section className="flex- sm:p-3 lg:p-4 bg-white rounded shadow min-w-0">
        <CardDetails />
      </section>

      <aside className="hidden xl:block xl:w-56 2xl:w-64 bg-gray-100 p-2 sm:p-3 lg:p-4 rounded shadow">
        Right Aside
      </aside>
    </div>
  );
}
export default Home;

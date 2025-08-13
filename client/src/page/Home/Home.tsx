import CardDetails from "../../components/card/CardDetails.js";
import Aside from "../../layouts/AsideLayout.js";
function Home() {
  return (
    <div className="mt-4">
      <Aside>
        <CardDetails />
      </Aside>
    </div>
  );
}
export default Home;

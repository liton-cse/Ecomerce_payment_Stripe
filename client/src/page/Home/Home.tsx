import CardDetails from "../../components/card/CardDetails.js";
import Aside from "../../layouts/AsideLayout.js";
import LeftAside from "../../components/aside/LeftAside.js";
function Home() {
  return (
    <div>
      <Aside leftContent={<LeftAside />}>
        <CardDetails />
      </Aside>
    </div>
  );
}
export default Home;

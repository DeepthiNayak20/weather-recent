import Header from "../../components/header/header";
import TabsHeader from "../../components/tabsHeader/tabsHeader";

import "./home.css";

const Home = () => {
  return (
    <div>
      <div className="homeContainer">
        <Header />
        <TabsHeader />
      </div>
    </div>
  );
};

export default Home;

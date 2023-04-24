import { BrowserRouter } from "react-router-dom";
import Router from "router";
import GlobalStyle from "styles/global";

const App: React.FC = () => {
  return (
    <BrowserRouter>
   
        <Router />
        <GlobalStyle/>
    </BrowserRouter>
  );
};

export default App;

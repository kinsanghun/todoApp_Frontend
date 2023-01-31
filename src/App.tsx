import Header from "components/Header";
import { Profile } from "components/Profile";
import Search from "components/Search";
import SubContent from "components/SubContent";
import Login from "pages/Login";
import Main from "pages/Main";
import NotFound from "pages/NotFound";
import Setting from "pages/Setting";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App bg-slate-300 w-full min-h-screen flex gap-5 pr-10">
      <BrowserRouter>
				<Header />
				<div className=" flex-1 py-5 mb-10">
          <div className="flex h-20 items-center gap-4"><Search/><Profile/></div>
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/setting" element={<Setting />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </div>
        <div className="w-80 py-5  max-xl:hidden">
          <div className="h-20"></div>
          <SubContent/>
        </div>
			</BrowserRouter>
    </div>
  );
}

export default App;

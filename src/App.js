import Root from "./Root";
import './style/main.scss'
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
  <>
     <Provider store={store}>
        <Root />
     </Provider>
  </>
  )
  ;
}

export default App;

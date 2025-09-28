import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from "./redux/index.ts"
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
     <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#0080e6',
            colorSuccess: '#52c41a',
            colorWarning: '#faad14',
            colorError: '#ff4d4f',
            fontFamily: "'Poppins', sans-serif", 
          },
        }}
      >
      <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>,
)

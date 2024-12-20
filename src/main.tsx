import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import HowinMapsWrapper from './modules/howin-maps/howin-maps-wrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <Provider store={store}>
         <HowinMapsWrapper apiKey={"AIzaSyAnnHpyw3vvS9ZOAIIjSAi6K2cqI6OC_vQ"}>
          <App />
         </HowinMapsWrapper>
       </Provider>
        </ThemeProvider>
  </StrictMode>,
)

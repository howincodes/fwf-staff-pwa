import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Provider } from 'react-redux'

import HowinMapsWrapper from './modules/howin-maps/howin-maps-wrapper.tsx'
import { CoreProvider } from './context/core-context.tsx'
import { store } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <Provider store={store}>
         <HowinMapsWrapper apiKey={"AIzaSyAnnHpyw3vvS9ZOAIIjSAi6K2cqI6OC_vQ"}>
          <CoreProvider>
          <App />
          </CoreProvider>
         </HowinMapsWrapper>
       </Provider>
        </ThemeProvider>
  </StrictMode>,
)

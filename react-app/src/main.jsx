import React from 'react'
import ReactDOM from 'react-dom/client'
import {ThemeProvider} from "@material-tailwind/react";
import './index.css'
import {AuthProvider} from "./contexts/auth.jsx";
import {AppRouter} from "./routes/index.jsx";




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>

  </React.StrictMode>
)

//<RouterProvider router={router} />

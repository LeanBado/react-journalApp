import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import React from 'react'
import { purpleTheme } from './purple'

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
    <CssBaseline></CssBaseline>
    {children}
    </ThemeProvider>
  )
}

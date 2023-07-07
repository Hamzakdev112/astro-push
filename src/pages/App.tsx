import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Menu from "../components/Menu"
import {useEffect, useState} from 'react'
const Component: React.FC = () => {
  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
    <Menu />
    </QueryClientProvider>
  )
}

export default Component
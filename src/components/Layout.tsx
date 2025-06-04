import { Box, Container } from "@mui/material";
import React from "react";

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 4, bg: "white" }}
      >
        {children}
      </Container>
    </Box>
  )
}

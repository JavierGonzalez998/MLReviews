import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import * as React from "react";
import Layout from "@/components/main/layout";

export default function Home(): React.JSX.Element {
  const styles = {
    width: "100vw",
    height: "100vh",
    backgroundColor: '#676665',
    backgroundImage: 'url("/dominos.svg")',
    zIndex: "0",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
  return (
    <Box sx={styles}>
      <Layout/>
    </Box>
  );
}

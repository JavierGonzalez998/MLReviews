import { Box, Container, Stack, Typography } from '@mui/material'
import * as React from 'react'
import Form from '@/components/form/form'


export default function Layout(): React.JSX.Element {
    const style = {
        width: "95%",
        height: "95%",
        backgroundColor: "white",
        color: "black",
        zIndex: "1000",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"

    }
    return (
        <Box sx={style}>
            <Typography variant='h5' textAlign="center" marginTop={2}>What is my review?</Typography>
            <Container sx={{ mt: "5rem" }}>
                <Stack direction="column">
                    <Typography variant="h6" textAlign="center">Este sitio te ayudará a validar y verificar que tu review sea positivo o negativo.</Typography>
                    <Typography variant="h6" textAlign="center">Escribe tu reseña y el modelo predecirá si su reseña es positiva o negativa</Typography>
                </Stack>
                <Form />
            </Container>

        </Box>
    )
}
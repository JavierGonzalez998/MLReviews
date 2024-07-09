'use client'
import { TextField, Box, Button, Alert, Modal, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import * as React from 'react'
import { review } from '@/app/lib/conn/review/Review'
import CircularProgress from '@mui/material/CircularProgress';
import { pink } from '@mui/material/colors';
import ErrorIcon from '@mui/icons-material/Error';
import { reviewType } from '@/app/lib/conn/review/Review';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

interface errorInt {
    error: boolean
    msg: string
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

export default function Form(): React.JSX.Element {
    const [reviewText, setReviewText] = React.useState<string>("")
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<errorInt>({ error: false, msg: '' })
    const [open, setOpen] = React.useState<boolean>(false)
    const [data, setData] = React.useState<reviewType>()

    const handleClose = () => setOpen(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (reviewText == "") {
            setError({
                error: true,
                msg: "Debe escribir una reseña para ser evaluado"
            })
            return
        }
        setLoading(true)
        const { data, error } = await review.getReview(reviewText)

        setLoading(false)
        if (data) {
            setOpen(true)
            setData(data)
            return
        }

        if (error) {
            setError({
                error: true,
                msg: "Error al enviar la reseña, intente nuevamente"
            })
            return
        }
    }

    return (
        <>
            <Box component="form" sx={{ width: "100%" }} onSubmit={handleSubmit}>
                {error?.error && (
                    <Alert icon={<ErrorIcon fontSize="inherit" />} severity="success">
                        {error.msg}
                    </Alert>
                )}
                <TextField
                    id="filled-multiline-static"
                    label="Ingrese su reseña"
                    multiline
                    fullWidth
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={6}
                    variant="standard"
                />
                <Box sx={{ m: 3, position: 'relative', width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Button type='submit' disabled={loading} sx={{ width: '30%', backgroundColor: pink[300] }} variant='contained'>
                        Recibir tipo de reseña
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: pink[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }} />
                    )}
                </Box>
            </Box>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Resultado</DialogTitle>
                <DialogContent>
                    <Typography>La reseña que dió es: {data?.response}</Typography>
                    <Typography>porcentaje de acierto: {typeof data?.output !== "undefined" ? Math.trunc(data?.output * 100)  : "0"}%</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>

    )
}
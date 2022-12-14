import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../store'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import ReactAudioPlayer from 'react-audio-player'
import { ReactComponent as Fullscreen } from '../icons/Fullscreen.svg'
import { ReactComponent as FullscreenExit } from '../icons/Fullscreen-exit.svg'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { StyledButton } from './styled/StyledButton'

const selectionEnum = {
    details: 'details',
    location: 'location',
    media: 'media'
}
const EventDetail = () => {
    const [selection, setSelection] = useState(selectionEnum.details)
    const { selectedData } = useAppSelector(state => state.eventdata)

    useEffect(() => {
        setSelection(selectionEnum.details)
    }, [selectedData])
    return (
        <Grid item md={6} sm={12} xs={12} lg={5} xl={4}>
            <Typography variant="h5" fontWeight="700" p={2} sx={{ fontSize: 23 }} >EVENT DETAILS</Typography>
            <Box sx={{ backgroundColor: "#ffffff", margin: 1, mt: 0 }}>
                <Stack direction="row" sx={{ p: 2, gap: 1 }}>
                    <Grid item xs={6} >
                        <StyledButton fullWidth color='secondary' variant='contained'> NO ACTION NEEDED</StyledButton>
                    </Grid>
                    <Grid item xs={6} >
                        <StyledButton fullWidth color='primary' variant='contained'> TAKE ACTION</StyledButton>
                    </Grid>
                </Stack>
                <div className='event-detail-operations-button-container'>
                    <button className={selection === selectionEnum.details ? 'active' : ''} onClick={() => setSelection(selectionEnum.details)}>DETAILS</button>
                    <button className={selection === selectionEnum.location ? 'active' : ''} onClick={() => setSelection(selectionEnum.location)}>LOCATION</button>
                    <button className={selection === selectionEnum.media ? 'active' : ''} onClick={() => setSelection(selectionEnum.media)}>MEDIA</button>
                </div>
                <div className='event-details-container'>
                    {selection === selectionEnum.details ? <div className='col'>
                        <div className='event-title'>Category</div>
                        <div>
                            {selectedData?.details?.map(data => data.title === "Kategori" ? data.value : "")}
                        </div>
                    </div>
                        : null}
                    {selection === selectionEnum.location ? <div>
                        {selectedData.location ?
                            <MapContainer center={[selectedData?.location?.latitude, selectedData?.location?.longitude]} zoom={13} scrollWheelZoom={false} >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[selectedData?.location?.latitude, selectedData?.location?.longitude]}>
                                    <Popup>
                                        {selectedData.id}
                                    </Popup>
                                </Marker>
                            </MapContainer> : <div>There is no map information</div>}
                    </div> : null}
                    {selection === selectionEnum.media ? <div>
                        {selectedData?.media?.map((media, index) => media.type === "image" ? <div>

                            <img className='scaled-image' key={index} src={media.url} alt="" />
                            <Fullscreen className='fullscreen-icon-container ' fill='white' data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" />
                            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className='modal-body'>
                                            <img className='fullscreen-image' key={index} src={media.url} alt="" />
                                            <FullscreenExit className='fullscreen-icon-container' fill='white' type="button" data-bs-dismiss="modal" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                            :
                            <ReactAudioPlayer key={index}
                                src={media.url}
                                controls
                            />)}

                    </div> : null}
                </div>
            </Box>
            <hr />
        </Grid >
    )
}

export default EventDetail
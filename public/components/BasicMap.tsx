import React from "react"
import 'leaflet/dist/leaflet.css'
import Authentification from "../../pages/api/Authentification"
import AddLocationPopUpComponent, { AddLocationPopUpComponentProps } from "./AddLocationPopUpComponent"
import CommentPopUpComponent, { CommentPopUpProps } from "./CommentComponent"
import { CircleMarker, FeatureGroup, MapContainer, Popup, TileLayer } from "react-leaflet"
import { getPropsWithDefaults, PrimaryButton, Stack, TextField } from "@fluentui/react"
import { EditControl } from "react-leaflet-draw"
import { PrismaClient } from "@prisma/client"


export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const loactions = await prisma.location.findMany();
  console.log("locations" + loactions)
  return {
    props : {
      initalLocation : loactions
    }
  }
}

export  default function BasicMap({initalLocation}) {
  const ZOOM_LEVEL = 14
  const [jsonArray, setJson] = React.useState<{}>()
  const [logged, setLogged] = React.useState(false)
  const [imageSrc, setImageSrc] = React.useState<string | null>()
  const [closeCamera, setCloseCamre] = React.useState(false)
//   const [long, setlong] = useState(1)
//   const [lati, setlati] = useState(2)

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(function (position) {
//      setCenter([position.coords])
//     })
//   })

//   const [center, setCenter] = React.useState({
//     lat: basicMapProps.langitude,
//     lng: basicMapProps.longitude,
//   })
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [lat, setlat] = React.useState<number>(12)
  const [lng, setlng] = React.useState<number>(21)
  const [idLocation, setIdLocation] = React.useState<number>()
  const [IdMachine, SetIdMAchine] = React.useState<number>()
  const [comments, setComment] = React.useState<[]>()
  const [LoginDialog, setOpenLoginDialog] = React.useState<boolean>(false)

  const [username, setUsername] = React.useState<string>()
  const [password, setPassword] = React.useState<string>()
  const [loginError, setloginError] = React.useState<boolean>(true)

  const handleChange = (e: any, value: any) => {
    setUsername(value)
  }
  const handleChangeP = (e: any, value: any) => {
    setPassword(value)
  }

  if(initalLocation != undefined) {
    console.log(initalLocation);
    
  }
 
  
  async function checkIExists() {
    // let response = await userservice.login(username!, password!)
    // console.log('res' + response.success)
    // if (response.success) {
    //   AuthenthificationService.login(username!)
    //   window.location.href = '/MapPage'
    // }
   // setloginError(response.success)
  }
  let addLocationPopUpComponentProps: AddLocationPopUpComponentProps = {
    idLocation: 0,
    idMachine: 0,
    dates: null,
    lat: lat!,
    lng: lng!,
    setIsDialogOpen2: function (truth: boolean): any {
      setOpenDialog(truth)
    },
  }
  const _onCreate = (e: any) => {
    const { layerType, layer } = e

    const { _leaflet_id, _latlng } = layer

    const { lat, lng } = _latlng

    setlat(lat)
    setlng(lng)

    setOpenDialog(true)
  }

  // const _onDeleted = (e: any) => {
  //   console.log(e)
  //   const {
  //     layers: { _layers },
  //   } = e

  //   Object.values(_layers).map(({ _leaflet_id }: any) => {
  //     setMapLayers((layers: any) =>
  //       layers.filter((l: any) => l.id !== _leaflet_id)
  //     )
  //   })
  // }
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'back',
  }

  function makeProps(idLocation: number, idMachine: number, comments: []) {
    setIdLocation(idLocation)
    SetIdMAchine(idMachine)
    setComment(comments)
    console.log(comments)
    setIsDialogOpen(true)
  }
  let commentPopUpProps: CommentPopUpProps = {
    idLocation: idLocation!,
    idMachine: IdMachine!,
    comments: comments!,
    setIsDialogOpen2: function (truth: boolean): any {
      setIsDialogOpen(truth)
    },
  }
  function logout() {
    Authentification.logout()
    window.location.reload()
  }
  async function savePictur() {
    // treba implementirati slanje url u bazu
    setCloseCamre(true)
  }
  async function openLoginDialog() {
    setOpenLoginDialog(true)
    console.log(LoginDialog)
  }

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <div className="col ">
            {/* {!logged && (
              <>
                <a>
                  AKO ZELITE DODAVATI KOMENTARE MOLIMO ULOGIRAJTE SE, AKO NEMATE
                  RAČUN REGISTRIRAJTE SE
                </a>
                <Stack
                  className=" center bg-items-center flex"
                  horizontalAlign="center"
                  // styles={stackStyles}
                >
                  {!loginError && (
                    <div className="mb-3 text-red-100">
                      KRIVO KORISINIČKO IME ILI LOZINKA! POKUŠAJTE PONOVNO
                    </div>
                  )}
                  <a>KORISNIČKO IME:</a>
                  <TextField
                    className="mt-3"
                    id="username"
                    placeholder="Unesite Korisničko Ime"
                    value={username}
                    onChange={handleChange}
                  ></TextField>

                  <a className="mt-3">LOZINKA:</a>
                  <TextField
                    type="password"
                    className="mt-3 "
                    value={password}
                    onChange={handleChangeP}
                    placeholder="Unesite Lozinku"
                  ></TextField>

                  <Stack verticalAlign="center">
                    <PrimaryButton
                      className="mt-3	bg-sky-600"
                      text="POTVRDI"
                      onClick={() => {
                        checkIExists()
                      }}
                    ></PrimaryButton>
                  </Stack>
                </Stack>
              </>
            )}
            {logged && (
              <PrimaryButton
                onClick={logout}
                className="mt-2 justify-center border-slate-200 bg-slate-300"
              >
                ODJAVA
              </PrimaryButton>
            )} 
            {!logged && (
              <div>
                <PrimaryButton
                  onClick={openLoginDialog}
                  className="mt-2 justify-center border-slate-200 bg-slate-300"
                >
                  PRIJAVA
                </PrimaryButton>
                <PrimaryButton
                  onClick={openLoginDialog}
                  className="mt-2 justify-center border-slate-200 bg-slate-300"
                >
                  REGISTRACIJA
                </PrimaryButton>
              </div>
            )} */}
             <MapContainer  className="mb-15 animate-spin"
              tap={false}
              center={[ 45.322708,15.693535 ]}
              zoom={ZOOM_LEVEL}
              style={{
                height: '100vh',
                width: '100wh',
                marginTop: '15px',
              }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
           <CircleMarker center={[ 45.322708,15.693535 ]}/>
               {/* <PopUpComponent
                popUpComponentProps={popUpComponentProps}
              ></PopUpComponent>  */}

              {logged && (
                <FeatureGroup>
                  <EditControl
                    position="topright"
                    onCreated={_onCreate}
                    //onDeleted={_onDeleted}
                    draw={{
                      rectangle: false,
                      polyline: false,
                      polygon: false,
                      circle: false,
                      //circlemarker: false,
                      marker: false,
                    }}
                  />
                </FeatureGroup>
              )}
              { initalLocation != undefined && 
                initalLocation.map((e: any) =>
                  e.map((result: any) => (
                    <CircleMarker
                      key={result.locationId}
                      center={[
                        Number(result.langitude),
                        Number(result.longitude),
                      ]}
                      fillColor="navy"
                    >
                      <Popup className="font-sans text-sm">
                        <label>
                          {result.addres},{result.city},{result.country}
                          <br></br>
                          {result.machineName},{result.detail}
                        </label>
                        <br></br>
                        <PrimaryButton
                          className="bg-sky-600"
                          onClick={() =>
                            makeProps(
                              result.locationId,
                              result.machineId,
                              result.commentList
                            )
                          }
                        >
                          PREDGLEDAJ KOMENTARE
                        </PrimaryButton>
                      </Popup>
                    </CircleMarker>
                  ))
                )} 

               {isDialogOpen && (
                <CommentPopUpComponent
                  commentPopUpProps={commentPopUpProps}
                ></CommentPopUpComponent>
              )}
              {openDialog && (
                <AddLocationPopUpComponent
                  addLocationPopUpComponentProps={
                    addLocationPopUpComponentProps
                  }
                ></AddLocationPopUpComponent>
              )}
            </MapContainer> 
          </div>
        </div>
      </div>
    </>
  )
}


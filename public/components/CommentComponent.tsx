import {
    ChoiceGroup,
    DefaultButton,
    Dialog,
    DialogFooter,
    PrimaryButton,
    Stack,
  } from '@fluentui/react'
  
import React, { useState } from 'react'

import Webcam from 'react-webcam'
import AddCommentComponent, { AddCommentComponentProps } from './AddComentComponent'
  
  export interface CommentPopUpProps {
    setIsDialogOpen2(truth: boolean): boolean
    idLocation: number
    idMachine: number
    comments: []
  }
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'back',
  }
  
  const modelProps = {
    isBlocking: true,
    topOffsetFixed: true,
    bottomOffsetFixed: true,
  }
  
  function CommentPopUpComponent({
    commentPopUpProps,
  }: {
    commentPopUpProps: CommentPopUpProps
  }) {
    const [hideDialog, setDialog] = useState(false)
    const [mistakeAddingComment, setMistake] = useState(false)
    const [textComment, setText] = React.useState<string>()
    const [nameComment, setName] = React.useState<string>()
    const [jsonArray, setJson] = React.useState<{}>()
    const [logged, setisLogged] = useState(false)
    const [imageSrc, setImageSrc] = React.useState<string | null>()
    const [closeCamera, setCloseCamre] = React.useState(true)
    const [havePictue, setHavePicture] = React.useState(false)
    console.log('array down')
    console.log(jsonArray)
    async function getData() {
    //   const datas = await FetchInformation.getCommentsForLocation(
    //     commentPopUpProps.idLocation
    //   )
    //   setJson(datas)
  
    //   setisLogged(AuthenthificationService.isUserLoggedIn)
    }
    React.useEffect(() => {
      getData()
    }, [])
    const toggleHideDialog = () => {
      commentPopUpProps.setIsDialogOpen2(false)
      setDialog(!hideDialog)
    }
    let addCommentComponentProps: AddCommentComponentProps = {
      setCommentInfo: function (text: string) {
        setName(text)
      },
    }
    async function savePictur() {
      // treba implementirati slanje url u bazu
      setCloseCamre(true)
    }
    async function saveFunction() {
      if (nameComment == undefined) {
        commentPopUpProps.setIsDialogOpen2(false)
        setDialog(!hideDialog)
      }
    //   let response = await LocationService.addCommentToLocation(
    //     commentPopUpProps.idLocation,
    //     nameComment!,
    //     imageSrc!
    //   )
  
    //   if (response) {
    //     commentPopUpProps.setIsDialogOpen2(false)
    //     setDialog(!hideDialog)
    //     window.location.reload()
    //   } else {
    //     setMistake(true)
    //   }
    }
  
    function dodajsliku() {
      setCloseCamre(false)
    }
  
    return (
      <>
        <DefaultButton
          secondaryText="Opens the Sample Dialog"
          onClick={toggleHideDialog}
          text="Open Dialog"
        />
        <Dialog
          hidden={hideDialog}
          onDismiss={toggleHideDialog}
          modalProps={modelProps}
        >
          <div>
            <div style={{ fontFamily: 'caption', marginBottom: '3px' }}>
              Popis komentara za lokaciju:
            </div>
            <div>
              {jsonArray != undefined &&
                Array(jsonArray!).map((el: any) =>
                  el.map((rez: any) => (
                    <>
                      <div
                        style={{
                          padding: '5px',
                          marginBlockEnd: '10px',
                          //  marginLeft: '-px',
                          fontFamily: 'caption',
                          borderBlockEnd: ' double #237090',
                          borderBlockStart: ' double #237090',
                          borderLeft: 'double #237090',
                          borderRight: 'double #237090',
                        }}
                      >
                        <div
                          style={{
                            borderBlockEnd: 'double #237090',
                            fontFamily: 'caption',
                          }}
                        >
                          {' '}
                          By : {rez.name}
                        </div>
                        {rez.picture && <img src={rez.picture}></img>}
                        <div> {rez.text}</div>
                      </div>
                    </>
                  ))
                )}
              {''}
              {logged && (
                <AddCommentComponent
                  addCommentComponentProps={addCommentComponentProps}
                ></AddCommentComponent>
              )}
              {logged && (
                <>
                  <PrimaryButton
                    onClick={dodajsliku}
                    style={{ marginTop: '15px' }}
                  >
                    Dodaj Sliku uz komentar
                  </PrimaryButton>
                  <div>*Možete dodati samo jednu sliku uz jedan komentar</div>
                </>
              )}
              {!closeCamera && logged && (
                <Webcam
                  audio={false}
                  height={720}
                  screenshotFormat="image/jpeg"
                  width={1280}
                  videoConstraints={videoConstraints}
                >
                  {({ getScreenshot }) => (
                    <PrimaryButton
                      style={{
                        marginTop: '15px',
                        backgroundColor: 'double #237090',
                      }}
                      onClick={() => {
                        setImageSrc(getScreenshot())
                        setCloseCamre(true)
                        setHavePicture(true)
                        console.log(imageSrc)
                      }}
                    >
                      SLIKAJ
                    </PrimaryButton>
                  )}
                </Webcam>
              )}
              {closeCamera && havePictue && (
                <div>
                  <img src={imageSrc!} />
                  <PrimaryButton
                    style={{ backgroundColor: 'bg-sky-600', marginTop: '5px' }}
                    onClick={savePictur}
                  >
                    SPREMI FOTOGRAFIJU UZ KOMENATR
                  </PrimaryButton>
                  <PrimaryButton
                    style={{ backgroundColor: 'bg-sky-600', marginTop: '5px' }}
                    onClick={() => {
                      setCloseCamre(true)
                      setHavePicture(false)
                    }}
                  >
                    ODUSTANI
                  </PrimaryButton>
                </div>
              )}
            </div>
          </div>
          {mistakeAddingComment && (
            <div>Došlo je do pogreške pri dodavanju komentara</div>
          )}
          <DialogFooter>
            {logged && (
              <PrimaryButton
                className="bg-sky-600"
                onClick={saveFunction}
                text="Save"
              />
            )}
            <PrimaryButton onClick={toggleHideDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </>
    )
  }
  export default CommentPopUpComponent
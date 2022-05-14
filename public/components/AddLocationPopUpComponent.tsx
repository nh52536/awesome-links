import React, { useState } from 'react'
import {
  ChoiceGroup,
  DefaultButton,
  Dialog,
  DialogFooter,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  TextField,
 
} from '@fluentui/react'
import FadeIn from 'react-fade-in'
export interface AddLocationPopUpComponentProps {
  setIsDialogOpen2(truth: boolean): boolean
  idLocation: number
  idMachine: number 
  dates: any
  lat: number
  lng: number
}
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdownOptionText: { overflow: 'visible', whiteSpace: 'normal' },
  dropdownItem: { height: 'auto' },
}
const dropdownExampleOptions = [
  { key: '1', text: 'RAMPA ZA INVALIDE' },
  { key: '2', text: 'DIZALO ZA INVALIDE' },

  {
    key: '3',
    text: 'USTANOVA',
  },
]
const modelProps = {
  isBlocking: true,
  topOffsetFixed: true,
  bottomOffsetFixed: true,
}
function AddLocationPopUpComponent({
  addLocationPopUpComponentProps,
}: {
  addLocationPopUpComponentProps: AddLocationPopUpComponentProps
}) {
  React.useEffect(() => {}, [])
  const mystyle = {
    color: 'white',
    borderRadius: '5px',
    backgroundColor: 'rgb(2 132 199)',
    borderColor: 'blue',
    padding: '10px',
    fontFamily: 'Arial',
    marginBottom: '5px',
  }
  const stylemistake = {
    color: 'white',
    borderRadius: '5px',
    backgroundColor: 'rgb(253 164 175)',
    borderColor: 'blue',
    padding: '10px',
    fontFamily: 'Arial',
    marginBottom: '5px',
  }
  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>()
  const [hideDialog, setDialog] = useState(false)
  const [mistakeAddingComment, setMistake] = useState(false)
  const [mistake, setMistake2] = useState(false)
  const [emptyVariables, setVariables] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [address, setAddress] = React.useState<string>()
  const [city, setCity] = React.useState<string>()
  const [country, setCountry] = React.useState<string>()
  const [machine, setMachine] = React.useState<string>()
  const toggleHideDialog = () => {
    addLocationPopUpComponentProps.setIsDialogOpen2(false)

    setDialog(!hideDialog)
  }
  const handleNameChange = (e: any, value: any) => {
    setVariables(false)
    setAddress(value)
  }
  const handleCityChange = (e: any, value: any) => {
    setVariables(false)
    setCity(value)
  }
  const handleCountryChange = (e: any, value: any) => {
    setVariables(false)
    setCountry(value)
  }

  const handleChange = (e: any, value: any) => {
    setMachine(value.key)
  }
  async function saveFunction() {
    if (city == null || address == null || country == null) {
      setVariables(true)
      return
    }
    setMistake2(false)
    setLoading(true)
    // let info = await LocationService.addLocation(
    //   addLocationPopUpComponentProps.lat,
    //   addLocationPopUpComponentProps.lng,
    //   address!,
    //   city!,
    //   country!,
    //   machine!
    // )
    // if (!info) {
    //   setMistake2(true)
    //   setLoading(false)
    //   return
    // }
    setLoading(false)
    setSuccess(true)
    setSuccess(false)
    addLocationPopUpComponentProps.setIsDialogOpen2(false)
    window.location.reload()
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
        {emptyVariables && (
          <FadeIn>
            <div style={stylemistake}>Molimo popunite sve potrebne podatke</div>
          </FadeIn>
        )}
        {loading && (
          <FadeIn>
            {' '}
            <div></div>
            <div style={mystyle}>Spremanje podataka, molimo pričekajte.</div>
            <div></div>
          </FadeIn>
        )}
        <div>
          {mistake && (
            <FadeIn>
              <div></div>
              <div style={stylemistake}>
                Došlo je do pogreške pri dodavanju lokacije. Molim Vas pokušajte
                ponovno!
              </div>
              <div></div>
            </FadeIn>
          )}
        </div>
        {success && <div style={mystyle}>Uspješno pohranjena lokacija!</div>}
        <a>
          Molimo Vas da pri dodavanju lokaciju dodati najbolju približnu adresu.
        </a>
        <div>
          <TextField
            className="w-9"
            label="Adresa"
            required
            onChange={handleNameChange}
          />
          <TextField
            className="w-10"
            label="Grad"
            required
            onChange={handleCityChange}
          />
          <TextField
            className="w-10"
            label="Država"
            required
            onChange={handleCountryChange}
          />
          <Dropdown
            // componentRef={dropdownRef}
            placeholder="Select an option"
            selectedKey={selectedItem ? selectedItem.key.toString() : undefined}
            onChange={handleChange}
            label="Odaberite vrstu pomagala koja se nalazi na lokaciji"
            options={dropdownExampleOptions}
            required
            styles={dropdownStyles}
          />
        </div>

        {mistakeAddingComment && (
          <div>Došlo je do pogreške pri dodavanju komentara</div>
        )}
        <DialogFooter className="absolute bottom-0">
          <DefaultButton
            disabled={disabled}
            className="bg-sky-600"
            onClick={saveFunction}
            text="Save"
          />
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default AddLocationPopUpComponent
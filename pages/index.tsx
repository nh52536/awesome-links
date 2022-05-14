
import dynamic from 'next/dynamic'




export default function index() {
  // needed to make the Leaflet map render correctly
  const MapWithNoSSR = dynamic(() => import('../public/components/BasicMap'), {
    ssr: false,
  })
  
 
  return (
    <>
      <h1 className=" mb-2 text-center text-2xl font-bold">
        Aplikacija za povećanje socijalne inkluzije osoba s invaliditetom
      </h1>
      <div className="">
        <MapWithNoSSR initalLocation={undefined} />

        <footer className="{styles.footer}"></footer>
      </div>
    </>
  )
}
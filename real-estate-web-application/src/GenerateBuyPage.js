import RealEstateListing from "./BuyPropertyPage";

function GenerateBuyPage({type, address, price, previewPhotos, broker, favorite, features, propID}){
    return(
        <>
        <RealEstateListing  type={type} address={address} price={price} previewPhotos={previewPhotos} broker={broker} favorite={favorite} features={features} propID={propID}/>
        </>
    );
}

export default GenerateBuyPage;
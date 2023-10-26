import RealEstateListing from "./BuyPropertyPage";

function GenerateBuyPage({type, address, price, previewPhotos, broker, favorite, features}){
    return(
        <>
        <RealEstateListing  type={type} address={address} price={price} previewPhotos={previewPhotos} broker={broker} favorite={favorite} features={features}/>
        </>
    );
}

export default GenerateBuyPage;
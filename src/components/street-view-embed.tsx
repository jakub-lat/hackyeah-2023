const StreetViewEmbed = ({ src }: { src: string }) : JSX.Element =>  {
    return ( 
        <iframe
            src={src}
            width="1000"
            height="500"
            style={{border:0}}
            allowFullScreen={false}
            referrerPolicy={"no-referrer-when-downgrade"}>
        </iframe>   
    );
}
 
export default StreetViewEmbed;
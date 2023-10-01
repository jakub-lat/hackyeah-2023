interface IUniversity {
    name: string,
    description: string,
    fieldsOfStudy: string[],
    rating: number,
    comments: []
}

const field = (x) => {
    return <div className="field float-left m-2 bg-yellow-400 text-stone-950 px-2 py-0.5">{x}</div>
}

const University = ({univ}:{univ: IUniversity}) => {
    return (
        <div className="university">
            <p className="description">
                {univ.description}
            </p>
            <div className="ratingDiv">
               <p className="rating">
                   {univ.rating}/5                    
               </p>
               <p className="basedOn text-sm text-muted-foreground">
                   na bazie {univ.comments.length} opinii
               </p>
            </div>
            <div className="comments">
               {univ.comments}
            </div>
            <div className="fields">
                {univ.fieldsOfStudy.map(x => field(x))}
            </div>
        </div>
    );
}
 
export default University;
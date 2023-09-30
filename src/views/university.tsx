

interface IUniversity {
    name: string,
    description: string,
    fieldsOfStudy: string[],
    rating: number,
    comments: []
}

const University = ({univ}:{univ: IUniversity}) => {
    return (
        <div className="university">
            <p className="description">
                {univ.description}
            </p>
             <div className="fields">
                {univ.fieldsOfStudy}
             </div>
             <p className="rating">
                
                {univ.rating}
             </p>
             <div className="comments">
                {univ.comments}
             </div>
        </div>
    );
}
 
export default University;
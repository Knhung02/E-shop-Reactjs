function FormError(props) {
    function renderError(){
        let errors =props.errors
        

        if(Object.keys(errors).length > 0){
            return Object.keys(errors).map((key, index) =>{
                return(
                    <li key = {index} style={{color:"red"}}>{errors[key]}</li>
                )
            })

        }
    }
    return(
        <div>
            {renderError()}
        </div>
    )
}

export default FormError;


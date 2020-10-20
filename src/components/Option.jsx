import React from 'react';
const getCss=(obj)=>{
    let arr = []
    for(let k in obj){
        if(k ==="true"){
            arr.push(obj[k]);
        }
    }
    return arr.join(' ');
}
function Option(props) {
    const { selected, disabled, className, children ,onSelect} = props;
    let cls = getCss({
        [selected]:'x-scroll-list-option-selected',
        [disabled]:'x-scroll-list-option-disabled'
    })
    return (
        <div className={'x-scroll-list-option ' + cls} onClick={onSelect}>
            {children}
        </div>
    )
}
Option.displayName="ScrollOption"
export default Option
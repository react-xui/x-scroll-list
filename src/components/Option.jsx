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
export default (props) => {
    const { selected, disabled, className, children ,onSelect} = props;
    let cls = getCss({
        [selected]:'x-list-option-selected',
        [disabled]:'x-list-option-disabled'
    })
    return (
        <div className={'x-list-option ' + cls} onClick={onSelect}>
            {children}
        </div>
    )
}
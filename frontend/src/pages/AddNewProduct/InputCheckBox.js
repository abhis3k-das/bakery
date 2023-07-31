function InputCheckBox({weight,children,price,quantity,id}) {
    function check(){
        const checkbox = document.getElementById(id);
        if(checkbox.checked){
            weight(id);
        }else{
            weight("")
        }
    }
	return (
		<div style={{
            display:'flex',
            justifyContent:'space-between',
            width:'100%',
        }}>
            <input type="checkbox" onChange={check} style={{width:'12px'}} id={id}></input>
            <label style={{width:'60px',textAlign:'start'}}>{children}</label>

            <input type="number" step={0.01} placeholder="Price" style={{width:'100px'}} onChange={price}></input>
            <input type="number" step={1} placeholder="Quantity" style={{width:'100px'}} onChange={quantity}></input>
		</div>
	)
}
export default InputCheckBox

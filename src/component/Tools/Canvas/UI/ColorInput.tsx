const ColorInput = (
    colorChanger: (e:string)=> void) => {



return (
    <div className="groupTools" >
        <input onChange={e=>colorChanger(e.target.value)} type="color"></input>
    </div>
)       

}

export default ColorInput
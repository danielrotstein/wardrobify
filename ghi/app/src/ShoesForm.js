import React from "react"  


class ShoesForm extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            manufacturer: "",
            model_name: "",
            color: "",
            picture_url: "",
            bin: "",
            bins: [],
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...this.state};
        delete data.bins;
        console.log(data)

        
        const shoesUrl = "http://localhost:8080/api/shoes/";
    
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log("Hello")
        const response = await fetch(shoesUrl, fetchConfig);
        
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe)

            const cleared = {
                manufacturer: "",
                model_name: "",
                color: "",
                picture_url: "",
                bin: "",
            };
            this.setState(cleared);
            // window.location.reload(false);
            window.location.href="/shoes"
        }
    }


    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;    
        this.setState({...this.state, [name]: value})
    }


    async componentDidMount() {
        const url = "http://localhost:8100/api/bins/";

        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            this.setState({bins: data.bins})
        }
    }
    
    
    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create new shoe</h1>


                <form onSubmit={this.handleSubmit} id="create-shoe-form">

                  <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                    <label htmlFor="manufacturer">Manufacturer</label>
                  </div>


                  <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.model_name} placeholder="Model Name" required type="text" name="model_name" id="model_name" className="form-control"/>
                    <label htmlFor="model_name">Model Name</label>
                  </div>


                  <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                    <label htmlFor="color">Color</label>
                  </div>


                  <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.picture_url} placeholder="Picture" required type="url" name="picture_url" id="picture_url" className="form-control"/>
                    <label htmlFor="picture_url">Picture</label>
                  </div>


        


                  <div className="mb-3">
                    <select onChange={this.handleInputChange} value={this.state.bin} required id="bin" name="bin" className="form-select">
                      <option value="">Choose a bin</option>

                    {this.state.bins.map(bin => {
                        return (
                            <option key={bin.href} value={bin.href}>
                                {bin.closet_name}
                            </option>
                        )
                    })}

                    </select>
                  </div>
                  <button className="btn btn-warning">Create</button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}

export default ShoesForm;


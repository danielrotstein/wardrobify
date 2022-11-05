import React from "react"  


class HatsFrom extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            fabric: "",
            style_name: "",
            color: "",
            picture_url: "",
            location: "",
            locations: [],
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...this.state};
        delete data.locations;
     
        const hatsUrl = "http://localhost:8090/api/hats/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(hatsUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            const cleared = {
                fabric: "",
                style_name: "",
                color: "",
                picture_url: "",
                location: "",
            };
            this.setState(cleared);
            // window.location.reload(false);
            window.location.href="/hats"
        }
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;    
        this.setState({...this.state, [name]: value})
    }

    async componentDidMount() {
        const url = "http://localhost:8100/api/locations/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({locations: data.locations})
        }
    }
    
    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Add New Hat</h1>
                <form onSubmit={this.handleSubmit} id="create-hat-form">
                <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.style_name} placeholder="Style Name" required type="text" name="style_name" id="style_name" className="form-control"/>
                    <label htmlFor="style_name">Style</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.fabric} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control"/>
                    <label htmlFor="fabric">Fabric</label>
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
                    <select onChange={this.handleInputChange} value={this.state.location} required id="location" name="location" className="form-select">
                      <option value="">Choose Location</option>
                    {this.state.locations.map(location => {
                        return (
                            <option key={location.href} value={location.href}>
                                {location.closet_name}
                            </option>
                        )
                    })}
                    </select>
                  </div>
                  <button className="btn btn-warning">Add</button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}

export default HatsFrom;


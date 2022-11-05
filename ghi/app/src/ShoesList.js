import { Link } from 'react-router-dom';


function ShoesList(props) {
    const deleteShoe = async (href) => {
        const url = `http://localhost:8080/${href}`;
        const fetchConfig = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            window.location.reload(false);
        }
    }
   
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Model Name</th>
                        <th>Color</th>
                        <th>Picture</th>
                        <th>Bin</th>
                        <th></th>
                    </tr>
                </thead>
                 <tbody>
                    {props.shoes.map((shoe) => {
                        return (
                            <tr key={shoe.id}>
                                <td>{shoe.manufacturer}</td>
                                <td>{shoe.model_name}</td>
                                <td>{shoe.color}</td>
                                <td>
                                    <img src={shoe.picture_url} alt="" width="100px" height="100px"/>
                                </td>
                                <td>{shoe.bin}</td>
                                {<td>
                                    <button className="btn btn-outline-danger" onClick={() => deleteShoe(shoe.href)}>Delete</button>
                                </td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
              <Link to="/shoes/new" className="btn btn btn-warning btn-lg px-4 gap-3">Add New Shoe</Link>
            </div>
        </div>
    )
}

export default ShoesList; 
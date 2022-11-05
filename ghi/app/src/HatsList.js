import { Link } from 'react-router-dom';


function HatsList(props) {
    const deleteHat = async (href) => {
        const url = `http://localhost:8090/${href}`;
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
                        <th>Style</th>
                        <th>Fabric</th>
                        <th>Color</th>
                        <th>Picture</th>
                        <th>Location</th>
                        <th></th>
                    </tr>
                </thead>
                 <tbody>
                    {props.hats.map((hat) => {
                        return (
                            <tr key={hat.id}>
                                <td>{hat.style_name}</td>
                                <td>{hat.fabric}</td>
                                <td>{hat.color}</td>
                                <td>
                                    <img src={hat.picture_url} alt="" width="100px" height="100px"/>
                                </td>
                                <td>{hat.location}</td>
                                {<td>
                                    <button className="btn btn-outline-danger" onClick={() => deleteHat(hat.href)}>Delete</button>
                                </td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
              <Link to="/hats/new" className="btn btn-warning btn-lg px-4 gap-3">Add New Hat</Link>
            </div>
        </div>
    )
}

export default HatsList; 
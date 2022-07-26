import '../UserTasks/UserTasks.css';
import React, { useState, useEffect } from 'react';


function OtherDetails(props) {

    const [address, setAddress] = useState({});

    useEffect(() => {
        // console.log(props.otherDetails);
        if(props.otherDetails) {
        setAddress(props.otherDetails)
    }
    }, [])

    // const value = () => {
    //     if (address.city) {
    //         return address.city
    //     } else {
    //         return NaN;
    //     }
        
    // };


    const handleChangeCity = e => {
        setAddress({ ...address, city: e.target.value });
        props.callbackOtherDetails(address);
    };

    const handleChangeStreet = e => {
        setAddress({ ...address, street: e.target.value });
        props.callbackOtherDetails(address);
    };

    const handleChangeZipCode = e => {
        setAddress({ ...address, zipcode: e.target.value });
        props.callbackOtherDetails(address);
    };

    return (<div className="boxDiv5">

        <div>
            {(address.city || address.street || address.zipcode) &&
                <div>
                    <span style={{ fontWeight: "bold" }}>City: </span> <input type="text" onChange={handleChangeCity} value={address.city} /> <br />
                    <span style={{ fontWeight: "bold" }}>Street: </span> <input type="text" onChange={handleChangeStreet} value={address.street} /> <br />
                    <span style={{ fontWeight: "bold" }}>Zip Code: </span> <input type="text" onChange={handleChangeZipCode} value={address.zipcode} /> <br />
                </div>
            }

        </div>

    </div>
    );
}

export default OtherDetails;


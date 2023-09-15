import React, { useState } from 'react';
import '../css/Form.css';

function MemberForm() {
    const [formData, setFormData] = useState({
        名称: '',
        费率: '',
        'Carrier ID*': '',
        'Carrier&Service': '',
        签名: '',
        'Api Key*': '',
        name: '',
        street1: '',
        street2: '',
        city: '',
        'state*': '',
        'zip code*': '',
        'country*': '',
        'phone*': '',
    });

    const handleInputChange = (field, value) => {
        const updatedFormData = { ...formData, [field]: value };
        setFormData(updatedFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you can add your logic to handle form submission
        // For example, you can send the formData to an API endpoint

        // Reset the form fields after submission (you can remove this if not needed)
        setFormData({
            名称: '',
            费率: '',
            'Carrier ID*': '',
            'Carrier&Service': '',
            签名: '',
            'Api Key*': '',
            name: '',
            street1: '',
            street2: '',
            city: '',
            'state*': '',
            'zip code*': '',
            'country*': '',
            'phone*': '',
        });
    };

    const renderInputFields = () => (
        // <div className="section">
        //   <h2>Member Information</h2>
        //   {Object.entries(formData).map(([field, value]) => (
        //     <React.Fragment key={field}>
        //       <label>{field.replace(/\*/g, '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}:</label>
        //       <input
        //         type="text"
        //         value={value}
        //         onChange={(e) => handleInputChange(field, e.target.value)}
        //       />
        //     </React.Fragment>
        //   ))}
        // </div>
        <div className="section">
            <h2>Member Information</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(formData).map(([field, value]) => (
                    <React.Fragment key={field}>
                        <label>{field.replace(/\*/g, '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}:</label>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                        />
                    </React.Fragment>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );

    return (
        <div className="form">
            <h1>Member Information Form</h1>
            <div className="row">
                {renderInputFields()}
                {/* Add your submit button and form handling logic here */}
            </div>
        </div>
    );
}

export default MemberForm;

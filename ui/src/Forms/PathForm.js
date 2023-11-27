import React, { useState } from 'react';
import axios from 'axios';
import '../css/PathForm.css';

function PathForm() {
    const [formData, setFormData] = useState({
        渠道名称: { value: '', required: true },
        费率: { value: '', required: true },
        CarrierID: { value: '', required: true },
        Carrier_Service: { value: '', required: true },
        签名: { value: '', required: false, options: ['', 'how long the option can be', 2, 3] },
        API_Key: { value: '', required: true },
        Name: { value: '', required: true },
        Street1: { value: '', required: true },
        Street2: { value: '', required: false },
        City: { value: '', required: true },
        State: { value: '', required: true },
        Zip_Code: { value: '', required: true },
        Country: { value: '', required: true },
        Phone: { value: '', required: true },
    });

    const handleInputChange = (field, value) => {
        const updatedFormData = { ...formData, [field]: { ...formData[field], value } };
        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isFormValid = Object.values(formData).every(field => !field.required || field.value.trim() !== '');

        if (isFormValid) {
            try {
                const valuesToSend = {};
                Object.keys(formData).forEach((field) => {
                    valuesToSend[field] = formData[field].value;
                });
                console.log('form data: ', valuesToSend)
                await axios.post('http://localhost:4400/api/v1/path/addnewpath', valuesToSend);
                alert('Form submitted!');

                const cleanFormData = Object.fromEntries(Object.keys(formData).map(field => [field, { value: '' }]));
                setFormData(cleanFormData);

                window.location.reload();
            } catch (err) {
                console.error(err);
                if (err.response) {
                    console.error('Server responded with: ', err.response.status, err.response.data)
                }
            }
        } else {
            alert('Please fill in all required fields');
        }
    };

    const renderInputFields = () => (
        <div className="path-selection">
            <form onSubmit={handleSubmit} className='path-form'>
                {Object.entries(formData).map(([field, { value, required, options }]) => (
                    <React.Fragment key={field}>
                        <label>
                            {field.replace(/\*/g, '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                            {required && <span style={{ color: 'red' }}> * </span>}
                            :
                        </label>
                        {options ? (
                            <select
                                value={value}
                                onChange={(e) => handleInputChange(field, e.target.value)}
                                required={required}
                                style={{ fontSize: '22px', textAlign: 'center' }}
                            >
                                {options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(field, e.target.value)}
                                required={required}
                            />
                        )}
                    </React.Fragment>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );

    return (
        <div className="path-form">
            <h1>Path Registration Form</h1>
            <div className="path-row">
                {renderInputFields()}
                {/* Add your submit button and form handling logic here */}
            </div>
        </div>
    );
}

export default PathForm;

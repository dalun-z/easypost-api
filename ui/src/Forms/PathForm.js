import React, { useState } from 'react';
import '../css/PathForm.css';

function MemberForm() {
    const [formData, setFormData] = useState({
        渠道名称: { value: '', required: true },
        费率: { value: '', required: true },
        CarrierID: { value: '', required: true },
        'Carrier&Service': { value: '', required: true },
        签名: { value: '', required: false, options: ['how long the option can be', 2, 3] },
        'Api Key': { value: '', required: true },
        name: { value: '', required: true },
        street1: { value: '', required: true },
        street2: '',
        city: { value: '', required: true },
        'state': { value: '', required: true },
        'zip code': { value: '', required: true },
        'country': { value: '', required: true },
        'phone': { value: '', required: true },
    });

    const handleInputChange = (field, value) => {
        const updatedFormData = { ...formData, [field]: { ...formData[field], value } };
        setFormData(updatedFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isFormValid = Object.values(formData).every(field => !field.required || field.value.trim() !== '');
        if (isFormValid) {
            // do something
            alert('Form has been submitted!');
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

export default MemberForm;

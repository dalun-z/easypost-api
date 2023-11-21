import React, { useState } from 'react';
import axios from 'axios';
import '../css/Form.css'

function TransactionForm() {
  const [fromAddress, setFromAddress] = useState({
    street1: '417 MONTGOMERY ST',
    street2: 'FLOOR 5',
    city: 'SAN FRANCISCO',
    state: 'CA',
    zip: '94104',
    country: 'US',
    company: 'EasyPost',
    phone: '415-123-4567',
  });

  const [toAddress, setToAddress] = useState({
    name: 'Dr. Steve Brule',
    street1: '179 N Harbor Dr',
    city: 'Redondo Beach',
    state: 'CA',
    zip: '90277',
    country: 'US',
    phone: '4155559999',
  });

  const [parcel, setParcel] = useState({
    length: 8,
    width: 5,
    height: 5,
    weight: 5,
  });

  const [shipmentLabel, setShipmentLabel] = useState(null);
  const [txtDownloadUrl, setTxtDownloadUrl] = useState(null);

  const handleInputChange = (section, field, value) => {
    const updatedSection = { ...section, [field]: value };
    if (section === fromAddress) {
      setFromAddress(updatedSection);
    } else if (section === toAddress) {
      setToAddress(updatedSection);
    } else if (section === parcel) {
      setParcel(updatedSection);
    }
  };

  const renderInputFields = (section, title) => (
    <div className='section'>
      <h2>{title}</h2>
      {Object.entries(section).map(([field, value]) => (
        <React.Fragment key={field}>
          <label>{field.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}:</label>
          <input
            type='text'
            value={value}
            onChange={(e) => handleInputChange(section, field, e.target.value)}
          />
        </React.Fragment>
      ))}
    </div>
  );

  const downloadImage = async () => {
    if (shipmentLabel) {
      const imageURL = await axios.get('http://localhost:4400/api/v1/getImage', shipmentLabel);

      console.log('image URL : ', imageURL);

      window.open(shipmentLabel, '_blank');
      fetch(imageURL)
        .then((response) => {
          console.log('blob ',response)
          response.blob()
        })
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.download = 'downloaded_img.png'
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          document.body.removeChild(link);
        });
    }
  }

  const executeApiRequest = async () => {
    try {
      const response = await axios.post('http://localhost:4400/api/v1/createShipment', {
        from_address: fromAddress,
        to_address: toAddress,
        parcel: parcel,
      });

      if (response.status === 200) {
        const shipmentId = response.data.id;
        console.log("shipment id is : " + shipmentId);

        try {
          const txtData = JSON.stringify(response.data, null, 2);
          console.log('Shipment info: ', response.data);
          const txtBlob = new Blob([txtData], { type: 'text/plain' });
          const txtUrl = URL.createObjectURL(txtBlob);
          setTxtDownloadUrl(txtUrl);
        } catch (error) {
          console.error('PDF Generation Error:', error);
        }

        setTimeout(async () => {
          try {
            const labelResponse = await axios.get(`http://localhost:4400/api/v1/shipments/${shipmentId}/label`);
            console.log(labelResponse.data);
            const labelUrl = labelResponse.data.labelUrl;
            console.log('Label URL:', labelUrl);
            setShipmentLabel(labelUrl);
          } catch (error) {
            console.error('Error fetching labal: ', error);
          }
        }, 1000); // 1s delay after the 1st request
      }

    } catch (error) {
      console.error('Error:', error);

      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error details:', error.message);
      }
    }
  };

  return (
    <div className='form'>
      <h1>EasyPost API Example</h1>
      <div className='row'>
        {renderInputFields(fromAddress, 'From Address')}
        {renderInputFields(toAddress, 'To Address')}
        {renderInputFields(parcel, 'Parcel')}
        <button onClick={executeApiRequest}>Execute API Request</button>
        {txtDownloadUrl && (
          <div className='download-section'>
            <h2>Shipment Result Detail</h2>
            {txtDownloadUrl}
            <div className='download-button'>
              <a href={txtDownloadUrl} download="shipment_data.txt">
                Download TXT
              </a>
            </div>

          </div>
        )}
        {shipmentLabel && (
          <div className='download-section'>
            <h2>{shipmentLabel}</h2>
            <div className='download-button'>
              <button onClick={downloadImage}>Download Label</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionForm;

import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import ReactTooltip from 'react-tooltip';
import AsyncSelect from 'react-select/async';

const LoadingIndicator = () => {
  return (
    <div data-tip="Custom Loader">
      <BeatLoader loading={true} size={4} />
      <ReactTooltip place="top" type="dark" effect="solid" />
    </div>
  );
};

const customStyles = {
  // Define your custom styles here
};

const CustomLoadingIndicator = ({ hospitalOptions }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedOption) {
      // Handle what happens when selected
    }
  }, [selectedOption]);

  const getHospitalOptions = () => {
    const options = [];
    if (hospitalOptions) {
      Object.keys(hospitalOptions).forEach((key) => {
        const hospital = hospitalOptions[key];
        const { name, website, distance, isOpen } = hospital;
        options.push({ value: { website, distance, isOpen }, label: name });
      });
    }
    return options;
  };

  const hospitalList = getHospitalOptions();

  const filterOptions = (inputValue) =>
    hospitalList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      }, 1000);
    });

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      components={{ LoadingIndicator }}
      placeholder="Search Urgent Care By Name"
      onChange={(newValue) => setSelectedOption(newValue)}
      // styles={customStyles}
      value={selectedOption}
    />
  );
};

export default CustomLoadingIndicator
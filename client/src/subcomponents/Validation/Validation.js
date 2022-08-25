const Validation = function (data, outputName, validation, setValidation) {
  const dataArray = Object.entries(data);
  const name = dataArray[0][0];
  const value = dataArray[0][1];

  if (!value) {
    setValidation({ ...validation, [name]: `Please enter the ${outputName}` });
    isValid = false;
    setTimeout(() => {
      setValidation("");
    }, 1000);
  } else {
  }
};

export default Validation;

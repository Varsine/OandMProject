const inputValidation = {
  firstName: {
    required: {
      value: true,
      message: '* required',
    },
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: 'Alphabetical characters only',
    },
    minLength: {
      value: 6,
      message: 'First name must have at least 6 characters',
    },
    maxLength: {
      value: 20,
      message: 'First name cannot exceed 20 characters',
    },
  },
  email: {
    required: true,
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Entered value does not match email format',
    },
  },
  phone: {
    required: true,
    pattern: {
      value:
        /^(\+\d{1,3}\s?)?1?-?\.?\s?\(?\d{2,3}\)?[\s.-]?\d{2,4}[\s.-]?\d{2,4}$/i,
      message: 'Please enter a valid phone number',
    },
  },
  resume: {
    required: true,
  },
  github: {
    required: false,
    pattern: {
      value: /^https:\/\/github\.com\/.*$/gim,
      message: 'Please enter a valid Github link ',
    },
  },
  linkedin: {
    required: false,
    pattern: {
      value: /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/gim,
      message: 'Please enter a valid Linkedin link',
    },
  },
};

export default inputValidation;

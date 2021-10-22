import * as Yup from 'yup';

export const stepOneInitialValues = {
  jobType: 'Back-End Developer',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const stepOneValidationSchema = Yup.object({
  jobType: Yup.string().required('* required'),
  firstName: Yup.string().required('* required'),
  lastName: Yup.string().required('* required'),
  email: Yup.string().email('Invalid email format').required('* required'),
  phone: Yup.string()
    .required('* required')
    .matches(phoneRegExp, 'Phone number is not valid'),
});

export const dropdownOptions = [
  { key: 'Back-End Developer', value: 'Back-End Developer' },
  { key: 'Front-End Developer', value: 'Front-End Developer' },
  { key: 'Product Designer', value: 'Product Designer' },
  { key: 'QA Tester', value: 'QA Tester' },
  { key: 'UX Designer', value: 'UX Designer' },
  { key: '3D Animator', value: '3D Animator' },
  { key: 'Graphic Designer', value: 'Graphic Designer' },
];

export const stepTwoInitialValues = {
  resume: '',
  coverLetter: '',
  githubLink: '',
  linkedInLink: '',
};

export const stepTwoValidationSchema = Yup.object({
  resume: Yup.string().required('* required'),
  coverLetter: Yup.string().required('* required'),
  githubLink: Yup.string().matches(
    '/^https:\\/\\/github\\.com\\/.*$/gim',
    'Invalid GitHub link',
  ),
  linkedInLink: Yup.string().matches(
    '/^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$/gim',
    'Invalid LinkedIn link',
  ),
});

import inputValidation from './inputValidation';

const { firstName, email, phone, resume, github, linkedin, lastName } =
  inputValidation;

export const dropdownList = [
  {
    id: 1,
    text: 'Front-End Developer',
  },
  {
    id: 2,
    text: 'Back-End Developer',
  },
  {
    id: 3,
    text: 'UI/UX Designer',
  },
  {
    id: 4,
    text: 'Project Manager',
  },
  {
    id: 5,
    text: 'Full-Stack Developer',
  },
  {
    id: 6,
    text: 'Mobile Developer',
  },
  {
    id: 7,
    text: 'SEO Engineer',
  },
];

export const fieldsList = [
  {
    id: 1,
    type: 'dropdown',
    name: 'jobType',
    // validation: firstName,
    label: 'Job type',
  },
  {
    id: 2,
    type: '',
    name: 'firstName',
    label: 'First name',
    inputType: 'text',
    validation: firstName,
    placeholder: 'First name',
  },
  {
    id: 3,
    type: '',
    name: 'lastName',
    label: 'Last name',
    inputType: 'text',
    validation: lastName,
    placeholder: 'Last name',
  },
  {
    id: 4,
    type: '',
    name: 'email',
    label: 'E-mail address',
    inputType: 'email',
    validation: email,
    placeholder: 'example@gmail.com',
  },
  {
    id: 5,
    type: '',
    name: 'phone',
    label: 'Phone number',
    inputType: 'tel',
    validation: phone,
    placeholder: '+374',
  },
  {
    id: 6,
    name: 'resume',
    type: 'file',
    label: 'CVResume',
    validation: resume,
  },
  {
    id: 7,
    type: 'file',
    name: 'coverLetter',
    label: 'Cover letter',
  },
  {
    id: 8,
    type: '',
    name: 'github',
    label: 'Github link',
    inputType: 'text',
    validation: github,
    placeholder: 'Github link',
  },
  {
    id: 9,
    type: '',
    name: 'linkedin',
    label: 'Linkedin link',
    inputType: 'text',
    validation: linkedin,
    placeholder: 'Linkedin link',
  },
  {
    id: 10,
    type: 'file',
    name: 'otherFile',
    label: 'Other File',
  },
];

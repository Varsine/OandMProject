import shortid from 'shortid';

import inputValidation from './inputValidation';

const { firstName, email, phone, resume, github, linkedin } = inputValidation;

export const dropdownList = [
  {
    id: shortid.generate(),
    text: 'Front-End Developer',
  },
  {
    id: shortid.generate(),
    text: 'Back-End Developer',
  },
  {
    id: shortid.generate(),
    text: 'UI/UX Designer',
  },
  {
    id: shortid.generate(),
    text: 'Project Manager',
  },
  {
    id: shortid.generate(),
    text: 'Full-Stack Developer',
  },
  {
    id: shortid.generate(),
    text: 'Mobile Developer',
  },
  {
    id: shortid.generate(),
    text: 'SEO Engineer',
  },
];

export const fieldsList = [
  {
    id: shortid.generate(),
    type: 'dropdown',
    name: 'jobType',
    // validation: firstName,
    label: 'Job type',
  },
  {
    id: shortid.generate(),
    type: '',
    name: 'firstName',
    label: 'First name',
    inputType: 'text',
    validation: firstName,
    placeholder: 'First name',
  },
  {
    id: shortid.generate(),
    type: '',
    name: 'lastName',
    label: 'Last name',
    inputType: 'text',
    validation: firstName,
    placeholder: 'Last name',
  },
  {
    id: shortid.generate(),
    type: '',
    name: 'email',
    label: 'E-mail address',
    inputType: 'email',
    validation: email,
    placeholder: 'example@gmail.com',
  },
  {
    id: shortid.generate(),
    type: '',
    name: 'phone',
    label: 'Phone number',
    inputType: 'tel',
    validation: phone,
    placeholder: '+374',
  },
  {
    id: shortid.generate(),
    name: 'resume',
    type: 'file',
    label: 'CVResume',
    validation: resume,
  },
  {
    id: shortid.generate(),
    type: 'file',
    name: 'coverLetter',
    label: 'Cover letter',
  },
  {
    id: shortid.generate(),
    type: '',
    name: 'github',
    label: 'Github link',
    inputType: 'text',
    validation: github,
    placeholder: 'Github link',
  },
  {
    id: shortid.generate(),
    type: '',
    name: 'linkedin',
    label: 'Linkedin link',
    inputType: 'text',
    validation: linkedin,
    placeholder: 'Linkedin link',
  },
  {
    id: shortid.generate(),
    type: 'file',
    name: 'otherFile',
    label: 'Other File',
  },
];

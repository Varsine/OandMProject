import shortid from 'shortid';

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
    label: 'Job type',
  },
  {
    id: shortid.generate(),
    type: '',
    label: 'First name',
    inputType: 'text',
    placeholder: 'First name',
  },
  {
    id: shortid.generate(),
    type: '',
    label: 'Last name',
    inputType: 'text',
    placeholder: 'Last name',
  },
  {
    id: shortid.generate(),
    type: '',
    label: 'E-mail address',
    inputType: 'email',
    placeholder: 'example@gmail.com',
  },
  {
    id: shortid.generate(),
    type: '',
    label: 'Phone number',
    inputType: 'tel',
    placeholder: '+374',
  },
  {
    id: shortid.generate(),
    type: 'file',
    label: 'CVResume',
  },
  {
    id: shortid.generate(),
    type: 'file',
    label: 'Cover letter',
  },
  {
    id: shortid.generate(),
    type: '',
    label: 'Github link',
    inputType: 'text',
    placeholder: 'Github link',
  },
  {
    id: shortid.generate(),
    type: '',
    label: 'Linkedin link',
    inputType: 'text',
    placeholder: 'Linkedin link',
  },
  {
    id: shortid.generate(),
    type: 'file',
    label: 'Other File',
  },
];

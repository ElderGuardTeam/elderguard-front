import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import TextAreaFormGroup from './index';
import { IFormGroupProps } from '../FormGroup';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default {
  title: 'Form/TextArea/TextAreaFormGroup',
  component: TextAreaFormGroup,
} as Meta;

const Template: StoryFn<IFormGroupProps> = (args) => {
  const { register } = useForm();

  return <TextAreaFormGroup {...args} register={register('textarea')} />;
};

export const Default = Template.bind({});
Default.args = {
  labelText: 'TextArea',
  error: '',
  isRequired: false,
  inputClass: 'h-40',
  className: '',
  isDisabled: false,
  tooltipText: '',
  tooltipContent: '',
  type: 'text',
};

export const Required = Template.bind({});
Required.args = {
  labelText: 'TextArea',
  error: '',
  isRequired: true,
  inputClass: 'h-40',
  className: '',
  isDisabled: false,
  tooltipText: '',
  tooltipContent: '',
  type: 'text',
};

export const Error = Template.bind({});
Error.args = {
  labelText: 'TextArea',
  error: 'Campo obrigatório',
  isRequired: false,
  inputClass: 'h-40',
  className: '',
  isDisabled: false,
  tooltipText: '',
  tooltipContent: '',
  type: 'text',
};

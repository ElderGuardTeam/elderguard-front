import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TextArea, { InputProps } from './index';

export default {
  title: 'Form/TextArea',
  component: TextArea,
} as Meta;

const Template: StoryFn<InputProps> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Digite seu texto aqui...',
};

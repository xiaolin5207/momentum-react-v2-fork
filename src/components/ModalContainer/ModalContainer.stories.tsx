import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ModalContainer, { ModalContainerProps, MODAL_CONTAINER_CONSTANTS as CONSTANTS } from './';
import argTypes from './ModalContainer.stories.args';
import Documentation from './ModalContainer.stories.docs.mdx';

export default {
  title: 'Momentum UI/ModalContainer',
  component: ModalContainer,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const commonChildren = <div>Example Text</div>;

const Example = Template<ModalContainerProps>(ModalContainer).bind({});

Example.argTypes = { ...argTypes };
Example.args = {
  children: commonChildren,
  isPadded: true,
};

const Colors = MultiTemplate<ModalContainerProps>(ModalContainer).bind({});

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.color;

Colors.parameters = {
  variants: Object.values(CONSTANTS.COLORS).map((color) => ({ color })),
};

Colors.args = {
  children: commonChildren,
  isPadded: true,
};

const Elevations = MultiTemplate<ModalContainerProps>(ModalContainer).bind({});

Elevations.argTypes = { ...argTypes };
delete Elevations.argTypes.elevation;

Elevations.parameters = {
  variants: Object.values(CONSTANTS.ELEVATIONS).map((elevation) => ({ elevation })),
};

Elevations.args = {
  children: commonChildren,
  isPadded: true,
};

const Padding = MultiTemplate<ModalContainerProps>(ModalContainer).bind({});

Padding.argTypes = { ...argTypes };
delete Padding.argTypes.isPadded;

Padding.parameters = {
  variants: [
    {
      children: <div>isPadded != true</div>,
    },
    {
      children: <div>isPadded = true</div>,
      isPadded: true,
    },
  ],
};

const Rounding = MultiTemplate<ModalContainerProps>(ModalContainer).bind({});

Rounding.argTypes = { ...argTypes };
delete Rounding.argTypes.isRounded;

Rounding.parameters = {
  variants: [
    {
      children: <div>isRound != true</div>,
    },
    {
      children: <div>isRound = true</div>,
      isRounded: true,
    },
  ],
};

Rounding.args = {
  isPadded: true,
};

const Common = MultiTemplate<ModalContainerProps>(ModalContainer).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [
    { children: commonChildren },
    {
      color: 'secondary',
      children: (
        <div style={{ margin: '0.5rem' }}>
          This is a very long `div` element with pre-defined margin.
        </div>
      ),
      elevation: 16,
    },
    {
      children: (
        <div>
          {commonChildren}
          {commonChildren}
          {commonChildren}
          {commonChildren}
        </div>
      ),
      color: 'tertiary',
      elevation: 48,
      isPadded: true,
    },
  ],
};

export { Example, Colors, Elevations, Padding, Rounding, Common };
import Avatar from '.';
import { mount } from 'enzyme';
import React from 'react';
import { COLORS, MAX_INITIALS_SPACE, SIZES, STYLE } from './Avatar.constants';
import { AvatarColor, AvatarSize, PresenceType } from './Avatar.types';
import { mountAndWait } from '../../../test/utils';

describe('Avatar', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Avatar title="Cisco Webex" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with initials', () => {
      expect.assertions(1);

      const container = mount(<Avatar initials="CW" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const container = mount(<Avatar title="CW" size={size} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with presence', async () => {
      expect.assertions(1);

      const avatars = Object.values(PresenceType).map((presence, index) => {
        return <Avatar key={index} title="Cisco Webex" presence={presence} />;
      });

      const container = await mountAndWait(<div>{avatars}</div>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with src & alt', () => {
      expect.assertions(1);

      const container = mount(<Avatar title="CW" src={'src'} alt={'alt'} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with type', () => {
      expect.assertions(1);

      const container = mount(<Avatar title="Cisco Webex" type="space" />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<Avatar initials="CW" />)
        .find(Avatar)
        .getDOMNode();

      expect(element.classList.contains(STYLE.outerWrapper)).toBe(true);
    });

    it('should pass the size prop', () => {
      expect.assertions(1);

      const size = SIZES[48] as AvatarSize;

      const element = mount(<Avatar initials="CW" size={size} />)
        .find(`div.${STYLE.wrapper}`)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });

    it('should pass the presence prop', async () => {
      expect.assertions(1);

      const presence = PresenceType.Away;

      const container = await mountAndWait(<Avatar initials="CW" presence={presence} />);
      const element = container.find('svg').getDOMNode();

      expect(element).toBeDefined();
    });

    it('should pass the src & alt props', () => {
      expect.assertions(2);

      const src = 'src';
      const alt = 'alt';

      const element = mount(<Avatar initials="CW" src={src} alt={alt} />)
        .find('img')
        .getDOMNode();

      expect(element.getAttribute('src')).toBe(`${src}`);
      expect(element.getAttribute('alt')).toBe(`${alt}`);
    });

    it('should pass the initials prop', () => {
      expect.assertions(1);

      const initials = 'CW';

      const element = mount(<Avatar initials={initials} />)
        .find('span')
        .getDOMNode();

      expect(element.textContent).toBe(`${initials}`);
    });

    it('should pass the title prop', () => {
      expect.assertions(1);

      const title = 'Cisco Webex';
      const initials = 'CW';

      const element = mount(<Avatar title={title} />)
        .find('span')
        .getDOMNode();

      expect(element.textContent).toBe(`${initials}`);
    });

    it('should pass the color prop', () => {
      expect.assertions(1);

      const color = COLORS.cyan as AvatarColor;

      const element = mount(<Avatar initials="CW" color={color} />)
        .find(`div.${STYLE.wrapper}`)
        .getDOMNode();

      expect(element.getAttribute('data-color')).toBe(`${color}`);
    });

    it('should pass the type prop', () => {
      expect.assertions(2);

      // space type only generates 1 initial
      const type = 'space';
      const initials = 'C';

      const element = mount(<Avatar title="Cisco Webex" type={type} />)
        .find('span')
        .getDOMNode();

      expect(element.textContent.length).toBe(MAX_INITIALS_SPACE);
      expect(element.textContent).toBe(`${initials}`);
    });
  });
});
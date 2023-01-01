import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../../../utils/testutils';

import Sidebar from './index'

//Implementing the AAA pattern
//For now the role is hard-coded as agency
test('Adds correct class to the home link', async () => {

    renderWithRouter(<Sidebar />, { route: '/' });

    const linkTags = await screen.findAllByRole('link');

    const homeLink = linkTags
        .find(a => a.textContent?.toLocaleLowerCase().includes('home'))

    expect(homeLink).toHaveClass('active');

})

test('Adds correct class to the property link', async () => {

    renderWithRouter(<Sidebar />, { route: '/properties' });

    const linkTags = await screen.findAllByRole('link');

    const addPropertyLink = linkTags
        .find(a => a.textContent?.toLocaleLowerCase().includes('add property'))

    const propertiesLink = linkTags
        .find(a => a.textContent?.toLocaleLowerCase().includes('properties'))

    expect(addPropertyLink).not.toHaveClass('active');

    expect(propertiesLink).toHaveClass('active');

})

test('Renders correct toggle icon', async () => {

    window.innerWidth = 500;

    renderWithRouter(<Sidebar />, { route: '/properties' });

    const closeIcon = await screen.findByTestId('CloseIcon');
    expect(closeIcon).toBeInTheDocument();

    await fireEvent(closeIcon, new Event('click', { bubbles: true }));

    const menuIcon = await screen.findByTestId('MenuIcon');

    expect(menuIcon).toBeInTheDocument();
    expect(closeIcon).not.toBeInTheDocument();
    
});
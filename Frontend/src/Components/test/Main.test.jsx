import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Mainpage from '../Mainpage';
import Cookies from 'js-cookie';

describe('Mainpage component', () => {
  test('should set and retrieve username from cookies', async () => {
    const mockUsername = 'testuser';
    Cookies.set('username', mockUsername);

    const { getByText } = render(<Mainpage />);

    expect(getByText(mockUsername)).toBeInTheDocument();

    fireEvent.click(getByText('Logout'));

    await waitFor(() => {
      expect(Cookies.get('username')).toBeUndefined();
    });
  });
});

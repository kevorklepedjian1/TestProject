import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers

import AddAllButton from './AddAllButton';

test('renders Add All button', () => {
  const { getByText } = render(<AddAllButton onAddAll={() => {}} />);
  const addAllButton = getByText('Add All');
  expect(addAllButton).toBeInTheDocument();
});

// You can add more tests to simulate clicking, etc.

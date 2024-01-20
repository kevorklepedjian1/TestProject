import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers

import PlayAllButton from './PlayAllButton';

test('renders Play All button', () => {
  const { getByText } = render(<PlayAllButton playAll={() => {}} />);
  const playAllButton = getByText('Play All');
  expect(playAllButton).toBeInTheDocument();
});

test('clicking Play All button toggles the play state', () => {
  const mockPlayAll = jest.fn();
  const { getByText } = render(<PlayAllButton playAll={mockPlayAll} />);
  const playAllButton = getByText('Play All');

  fireEvent.click(playAllButton);
  expect(mockPlayAll).toHaveBeenCalledWith(false); // Initially, isPlayingAll is false

  fireEvent.click(playAllButton);
  expect(mockPlayAll).toHaveBeenCalledWith(true); // After clicking again, isPlayingAll is true
});

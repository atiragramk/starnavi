import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import HomePage from './HomePage';
import '@testing-library/jest-dom';
import Pagination from '../Pagination';
import { setCurrentPageAction } from '@/redux/pagination/reducer';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

describe('HomePage Component', () => {
  test('renders component with no data and loading', () => {
    const mockStore = configureStore({
      reducer: {
        characterList: (state = { data: null, loading: true }, action) => state,
        pagination: (state = { page: 1, itemsPerPage: 10 }, action) => state,
      },
    });
    render(
      <Provider store={mockStore}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByAltText('loading-gif')).toBeInTheDocument();
  });

  test('renders component with data', () => {
    const mockData = {
      count: 20,
      results: [
        {
          id: 1,
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          skin_color: 'fair',
        },
        {
          id: 2,
          name: 'Darth Vader',
          birth_year: '41.9BBY',
          gender: 'male',
          skin_color: 'white',
        },
      ],
    };

    const store = configureStore({
      reducer: {
        characterList: (state = { data: mockData, loading: false }, action) =>
          state,
        pagination: (state = { page: 1, itemsPerPage: 10 }, action) => state,
      },
    });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    // Check data display
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  test('navigates to character detail page on card click', () => {
    const mockData = {
      count: 20,
      results: [
        {
          id: 1,
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          skin_color: 'fair',
        },
      ],
    };

    const mockPush = jest.fn();
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({
      push: mockPush,
    });

    const store = configureStore({
      reducer: {
        characterList: (state = { data: mockData, loading: false }, action) =>
          state,
        pagination: (state = { page: 1, itemsPerPage: 10 }, action) => state,
      },
    });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    // Check correct url by clicking on text
    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(mockPush).toHaveBeenCalledWith('character/1');
  });
});

describe('Pagination Component', () => {
  test('renders with correct initial page', () => {
    const store = configureStore({
      reducer: {
        pagination: (state = { page: 1, itemsPerPage: 10 }, action) => state,
      },
    });
    render(
      <Provider store={store}>
        <Pagination pageCount={5} />
      </Provider>
    );

    // Перевірте, чи є поточна сторінка 1
    expect(screen.getByText('1')).toHaveClass('bg-orange-500');
  });

  test('disables previous button on first page', () => {
    const store = configureStore({
      reducer: {
        pagination: (state = { page: 1, itemsPerPage: 10 }, action) => state,
      },
    });
    render(
      <Provider store={store}>
        <Pagination pageCount={5} />
      </Provider>
    );

    // Перевірте, що кнопка "Previous" вимкнена
    expect(screen.getByText('Previous').closest('a')).toHaveClass(
      'pointer-events-none'
    );
  });

  test('disables next button on last page', () => {
    const store = configureStore({
      reducer: {
        pagination: (state = { page: 5, itemsPerPage: 10 }, action) => state,
      },
    });

    render(
      <Provider store={store}>
        <Pagination pageCount={5} />
      </Provider>
    );

    // Перевірте, що кнопка "Next" вимкнена
    expect(screen.getByText('Next').closest('a')).toHaveClass(
      'pointer-events-none'
    );
  });
});

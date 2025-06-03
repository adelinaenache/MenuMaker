import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { RestaurantCard } from './RestaurantCard';
import { Restaurant, Category } from '@/types/restaurant';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/components/Price', () => ({
  Price: ({ value }: { value: number }) => <span>{value}</span>,
}));

const mockCategory: Category = {
  id: 1,
  name: 'Italian',
  items: []
};

const mockRestaurant: Restaurant = {
  id: 1,
  access: true,
  name: 'Test Restaurant',
  city: 'Test City',
  country: 'Test Country',
  address: '123 Test St',
  categories: [mockCategory],
  itemCount: 10,
  priceRange: [10, 20],
  userId: 'test-user'
};

describe('RestaurantCard', () => {
  test('renders restaurant name', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText(mockRestaurant.name)).toBeInTheDocument();
  });

  test('displays item count', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText(`${mockRestaurant.itemCount} items`)).toBeInTheDocument();
  });

  test('displays price range when both values are present', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  test('does not display price range when second value is 0', () => {
    const restaurantWithZeroPrice = {
      ...mockRestaurant,
      priceRange: [10, 0] as [number, number]
    };
    render(<RestaurantCard restaurant={restaurantWithZeroPrice} />);
    expect(screen.queryByText('10')).not.toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  test('renders restaurant image with correct attributes', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://designshack.net/wp-content/uploads/placeholder-image.png');
    expect(image).toHaveAttribute('alt', 'Pizza');
  });
});
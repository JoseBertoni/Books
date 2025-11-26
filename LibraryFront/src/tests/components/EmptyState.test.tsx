import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../../components/common/EmptyState';

// Simple test icon to avoid MUI icon import issues
const TestIcon = ({ 'data-testid': testId }: { 'data-testid'?: string }) => (
  <div data-testid={testId || 'test-icon'}>Icon</div>
);

describe('EmptyState', () => {
  it('should render title', () => {
    render(
      <EmptyState
        icon={<TestIcon data-testid="icon" />}
        title="No hay datos"
      />
    );

    expect(screen.getByText('No hay datos')).toBeInTheDocument();
  });

  it('should render description when provided', () => {
    render(
      <EmptyState
        icon={<TestIcon />}
        title="No hay datos"
        description="Agrega tu primer elemento"
      />
    );

    expect(screen.getByText('Agrega tu primer elemento')).toBeInTheDocument();
  });

  it('should render icon', () => {
    render(
      <EmptyState
        icon={<TestIcon data-testid="menu-icon" />}
        title="No hay datos"
      />
    );

    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('should not render description when not provided', () => {
    const { container } = render(
      <EmptyState
        icon={<TestIcon />}
        title="No hay datos"
      />
    );

    const descriptions = container.querySelectorAll('p');
    expect(descriptions).toHaveLength(0);
  });
});

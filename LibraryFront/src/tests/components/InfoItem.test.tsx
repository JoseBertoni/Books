import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InfoItem } from '../../components/common/InfoItem';

// Simple test icon to avoid MUI icon import issues
const TestIcon = ({ 'data-testid': testId }: { 'data-testid'?: string }) => (
  <div data-testid={testId || 'test-icon'}>Icon</div>
);

describe('InfoItem', () => {
  it('should render text', () => {
    render(
      <InfoItem
        icon={<TestIcon data-testid="person-icon" />}
        text="Juan Pérez"
      />
    );

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
  });

  it('should render icon', () => {
    render(
      <InfoItem
        icon={<TestIcon data-testid="person-icon" />}
        text="Juan Pérez"
      />
    );

    expect(screen.getByTestId('person-icon')).toBeInTheDocument();
  });
});

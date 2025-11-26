import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render spinner', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('.MuiCircularProgress-root');
    expect(spinner).toBeInTheDocument();
  });

  it('should render message when provided', () => {
    render(<LoadingSpinner message="Cargando datos..." />);
    expect(screen.getByText('Cargando datos...')).toBeInTheDocument();
  });

  it('should not render message when not provided', () => {
    const { container } = render(<LoadingSpinner />);
    const text = container.querySelector('.MuiTypography-body2');
    expect(text).not.toBeInTheDocument();
  });
});

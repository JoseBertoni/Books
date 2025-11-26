import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ResponsiveGrid } from '../../components/common/ResponsiveGrid';

describe('ResponsiveGrid', () => {
  it('should render children', () => {
    const { getByText } = render(
      <ResponsiveGrid>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </ResponsiveGrid>
    );

    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
    expect(getByText('Child 3')).toBeInTheDocument();
  });

  it('should apply default grid columns', () => {
    const { container } = render(
      <ResponsiveGrid>
        <div>Child</div>
      </ResponsiveGrid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveStyle({ display: 'grid' });
  });

  it('should render with custom gap', () => {
    const { container } = render(
      <ResponsiveGrid gap={5}>
        <div>Child</div>
      </ResponsiveGrid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toBeInTheDocument();
  });
});

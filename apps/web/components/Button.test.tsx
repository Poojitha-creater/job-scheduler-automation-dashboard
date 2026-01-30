import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import { describe, it, expect, vi } from 'vitest';

describe('Button', () => {
  it('renders children and responds to click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDefined();
    await user.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});

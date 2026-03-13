import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Modal } from '../components/ui/modal';
import { Badge } from '../components/ui/badge';

expect.extend(toHaveNoViolations);

describe('Accessibility Audit - Automated Tests', () => {
  it('Button component should have no violations', async () => {
    const { container } = render(<Button>Test</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Input component should have no violations', async () => {
    const { container } = render(<Input label="Email" type="email" value="" onChange={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Card component should have no violations', async () => {
    const { container } = render(<Card><CardContent><p>Test</p></CardContent></Card>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Modal component should have no violations', async () => {
    const { container } = render(<Modal isOpen={true} onClose={() => {}} title="Test" description="Test description"><p>Content</p></Modal>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Badge component should have no violations', async () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Accessibility Audit - Keyboard Navigation', () => {
  it('Button should be keyboard accessible', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });

  it('Modal should close on Escape key', async () => {
    const handleClose = jest.fn();
    render(<Modal isOpen={true} onClose={handleClose} title="Test" description="Test description"><p>Content</p></Modal>);
    await userEvent.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalled();
  });
});


describe('Accessibility Audit - ARIA Attributes', () => {
  it('Disabled button has disabled attribute', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('Input with error has aria-invalid', () => {
    render(<Input label="Email" value="" onChange={() => {}} error="Invalid" />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('Modal has proper ARIA roles', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Test" description="Test description"><p>Content</p></Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby');
  });
});

describe('Accessibility Audit - Screen Reader Support', () => {
  it('Labels are associated with inputs', () => {
    render(<Input label="Username" value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('Error messages are accessible', () => {
    render(<Input label="Email" value="" onChange={() => {}} error="Required" />);
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });
});

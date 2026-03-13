import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import { Input } from '../input';
import { Button } from '../button';
import { useState } from 'react';

/**
 * Property 3: Form Validation
 * **Validates: Invalid inputs always produce error messages**
 * 
 * This property-based test validates that form validation:
 * - Always shows error messages for invalid inputs
 * - Clears error messages when inputs become valid
 * - Prevents form submission when validation fails
 * - Displays appropriate error messages for different validation rules
 * 
 * Design Reference: Correctness Properties - Property 3
 * 
 * Universal quantification:
 * ∀ input ∈ InvalidInputs:
 *   validate(input) ⟹ showsErrorMessage(input) ∧
 *   ¬allowsSubmission(input)
 * 
 * ∀ input ∈ ValidInputs:
 *   validate(input) ⟹ ¬showsErrorMessage(input) ∧
 *   allowsSubmission(input)
 */

// ============================================================================
// Test Components
// ============================================================================

/**
 * Simple form component for testing validation
 */
interface SimpleFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  validateEmail?: (email: string) => string | undefined;
  validatePassword?: (password: string) => string | undefined;
}

function SimpleForm({ onSubmit, validateEmail, validatePassword }: SimpleFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email && validateEmail) {
      setEmailError(validateEmail(value));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password && validatePassword) {
      setPasswordError(validatePassword(value));
    }
  };

  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }));
    if (validateEmail) {
      setEmailError(validateEmail(email));
    }
  };

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }));
    if (validatePassword) {
      setPasswordError(validatePassword(password));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ email: true, password: true });
    
    // Validate all fields
    const emailErr = validateEmail ? validateEmail(email) : undefined;
    const passwordErr = validatePassword ? validatePassword(password) : undefined;
    
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    
    // Only submit if no errors
    if (!emailErr && !passwordErr) {
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="test-form">
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        error={emailError}
        data-testid="email-input"
      />
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        error={passwordError}
        data-testid="password-input"
      />
      <Button type="submit" data-testid="submit-button">
        Submit
      </Button>
    </form>
  );
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Email validation function
 */
function validateEmail(email: string): string | undefined {
  if (!email) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  
  return undefined;
}

/**
 * Password validation function
 */
function validatePassword(password: string): string | undefined {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  return undefined;
}

/**
 * Required field validation
 */
function validateRequired(value: string, fieldName: string): string | undefined {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return undefined;
}

/**
 * Minimum length validation
 */
function validateMinLength(value: string, minLength: number): string | undefined {
  if (value.length < minLength) {
    return `Must be at least ${minLength} characters`;
  }
  return undefined;
}

/**
 * Maximum length validation
 */
function validateMaxLength(value: string, maxLength: number): string | undefined {
  if (value.length > maxLength) {
    return `Must be at most ${maxLength} characters`;
  }
  return undefined;
}

/**
 * Numeric validation
 */
function validateNumeric(value: string): string | undefined {
  if (!/^\d+$/.test(value)) {
    return 'Must contain only numbers';
  }
  return undefined;
}

// ============================================================================
// Arbitraries (Generators)
// ============================================================================

/**
 * Generate invalid email addresses
 */
const invalidEmailGenerator = fc.oneof(
  fc.constant(''), // Empty
  fc.constant('notanemail'), // No @ symbol
  fc.constant('missing@domain'), // No TLD
  fc.constant('@nodomain.com'), // No local part
  fc.constant('spaces in@email.com'), // Spaces
  fc.constant('double@@email.com'), // Double @
  fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes('@')), // No @ symbol
);

/**
 * Generate valid email addresses
 */
const validEmailGenerator = fc.tuple(
  fc.array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789'.split('')), { minLength: 1, maxLength: 10 }).map(arr => arr.join('')),
  fc.array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')), { minLength: 2, maxLength: 10 }).map(arr => arr.join('')),
  fc.constantFrom('com', 'org', 'net', 'edu', 'gov')
).map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

/**
 * Generate invalid passwords (too short, missing requirements)
 */
const invalidPasswordGenerator = fc.oneof(
  fc.constant(''), // Empty
  fc.constant('short'), // Too short
  fc.constant('alllowercase123'), // No uppercase
  fc.constant('ALLUPPERCASE123'), // No lowercase
  fc.constant('NoNumbers'), // No numbers
  fc.string({ minLength: 1, maxLength: 7 }), // Too short
);

/**
 * Generate valid passwords
 */
const validPasswordGenerator = fc.tuple(
  fc.array(fc.constantFrom(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')), { minLength: 1, maxLength: 3 }).map(arr => arr.join('')),
  fc.array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')), { minLength: 1, maxLength: 3 }).map(arr => arr.join('')),
  fc.array(fc.constantFrom(...'0123456789'.split('')), { minLength: 1, maxLength: 3 }).map(arr => arr.join('')),
  fc.string({ minLength: 2, maxLength: 10 }) // Ensure total length is at least 8
).map(([upper, lower, digit, extra]) => {
  const password = upper + lower + digit + extra;
  // Ensure password is at least 8 characters
  return password.length >= 8 ? password : password + 'Extra123';
});

/**
 * Generate strings of various lengths
 */
const stringWithLengthGenerator = (minLength: number, maxLength: number) =>
  fc.string({ minLength, maxLength });

// ============================================================================
// Property Tests
// ============================================================================

describe('Form Validation - Property-Based Tests', () => {
  /**
   * **Property 3: Invalid email inputs always produce error messages**
   * 
   * For any invalid email input, the validation function should return an error message.
   * 
   * Universal quantification:
   * ∀ email ∈ InvalidEmails: validateEmail(email) ≠ undefined
   */
  it('Property 3: Invalid email inputs always produce error messages', () => {
    fc.assert(
      fc.property(invalidEmailGenerator, (email) => {
        const error = validateEmail(email);
        expect(error).toBeDefined();
        expect(typeof error).toBe('string');
        expect(error!.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Property 3: Valid email inputs never produce error messages**
   * 
   * For any valid email input, the validation function should return undefined.
   * 
   * Universal quantification:
   * ∀ email ∈ ValidEmails: validateEmail(email) = undefined
   */
  it('Property 3: Valid email inputs never produce error messages', () => {
    fc.assert(
      fc.property(validEmailGenerator, (email) => {
        const error = validateEmail(email);
        expect(error).toBeUndefined();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Property 3: Invalid password inputs always produce error messages**
   * 
   * For any invalid password input, the validation function should return an error message.
   */
  it('Property 3: Invalid password inputs always produce error messages', () => {
    fc.assert(
      fc.property(invalidPasswordGenerator, (password) => {
        const error = validatePassword(password);
        expect(error).toBeDefined();
        expect(typeof error).toBe('string');
        expect(error!.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Property 3: Valid password inputs never produce error messages**
   * 
   * For any valid password input, the validation function should return undefined.
   */
  it('Property 3: Valid password inputs never produce error messages', () => {
    fc.assert(
      fc.property(validPasswordGenerator, (password) => {
        const error = validatePassword(password);
        expect(error).toBeUndefined();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Property 3: Required field validation always fails for empty strings**
   * 
   * For any empty or whitespace-only string, required validation should fail.
   */
  it('Property 3: Required field validation always fails for empty strings', () => {
    const emptyStringGenerator = fc.oneof(
      fc.constant(''),
      fc.array(fc.constantFrom(' ', '\t', '\n'), { minLength: 1, maxLength: 10 }).map(arr => arr.join(''))
    );

    fc.assert(
      fc.property(
        emptyStringGenerator,
        fc.string({ minLength: 1, maxLength: 20 }),
        (value, fieldName) => {
          const error = validateRequired(value, fieldName);
          expect(error).toBeDefined();
          expect(error).toContain(fieldName);
          expect(error).toContain('required');
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * **Property 3: Required field validation always passes for non-empty strings**
   * 
   * For any non-empty string with actual content, required validation should pass.
   */
  it('Property 3: Required field validation always passes for non-empty strings', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 20 }),
        (value, fieldName) => {
          const error = validateRequired(value, fieldName);
          expect(error).toBeUndefined();
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * **Property 3: Minimum length validation fails for strings below threshold**
   * 
   * For any string shorter than the minimum length, validation should fail.
   */
  it('Property 3: Minimum length validation fails for strings below threshold', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 5, max: 20 }),
        (minLength) => {
          const shortString = fc.sample(
            fc.string({ minLength: 0, maxLength: minLength - 1 }),
            1
          )[0];
          
          const error = validateMinLength(shortString, minLength);
          expect(error).toBeDefined();
          expect(error).toContain(`${minLength}`);
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * **Property 3: Minimum length validation passes for strings at or above threshold**
   * 
   * For any string at or above the minimum length, validation should pass.
   */
  it('Property 3: Minimum length validation passes for strings at or above threshold', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 5, max: 20 }),
        (minLength) => {
          const validString = fc.sample(
            fc.string({ minLength, maxLength: minLength + 10 }),
            1
          )[0];
          
          const error = validateMinLength(validString, minLength);
          expect(error).toBeUndefined();
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * **Property 3: Maximum length validation fails for strings above threshold**
   * 
   * For any string longer than the maximum length, validation should fail.
   */
  it('Property 3: Maximum length validation fails for strings above threshold', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 5, max: 20 }),
        (maxLength) => {
          const longString = fc.sample(
            fc.string({ minLength: maxLength + 1, maxLength: maxLength + 10 }),
            1
          )[0];
          
          const error = validateMaxLength(longString, maxLength);
          expect(error).toBeDefined();
          expect(error).toContain(`${maxLength}`);
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * **Property 3: Maximum length validation passes for strings at or below threshold**
   * 
   * For any string at or below the maximum length, validation should pass.
   */
  it('Property 3: Maximum length validation passes for strings at or below threshold', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 5, max: 20 }),
        (maxLength) => {
          const validString = fc.sample(
            fc.string({ minLength: 0, maxLength }),
            1
          )[0];
          
          const error = validateMaxLength(validString, maxLength);
          expect(error).toBeUndefined();
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * **Property 3: Numeric validation fails for non-numeric strings**
   * 
   * For any string containing non-numeric characters, validation should fail.
   */
  it('Property 3: Numeric validation fails for non-numeric strings', () => {
    const nonNumericGenerator = fc.oneof(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !/^\d+$/.test(s)),
      fc.constant('abc'),
      fc.constant('12.34'),
      fc.constant('12-34'),
      fc.constant('12 34')
    );

    fc.assert(
      fc.property(nonNumericGenerator, (value) => {
        const error = validateNumeric(value);
        expect(error).toBeDefined();
        expect(error).toContain('numbers');
      }),
      { numRuns: 50 }
    );
  });

  /**
   * **Property 3: Numeric validation passes for numeric strings**
   * 
   * For any string containing only digits, validation should pass.
   */
  it('Property 3: Numeric validation passes for numeric strings', () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom(...'0123456789'.split('')), { minLength: 1, maxLength: 20 }).map(arr => arr.join('')),
        (value) => {
          const error = validateNumeric(value);
          expect(error).toBeUndefined();
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * **Property 3: Form displays error messages for invalid inputs**
   * 
   * When a form field contains invalid input and is blurred, an error message should be displayed.
   */
  it('Property 3: Form displays error messages for invalid inputs', async () => {
    const user = userEvent.setup();

    fc.assert(
      fc.asyncProperty(invalidEmailGenerator, async (email) => {
        const handleSubmit = jest.fn();
        
        const { unmount } = render(
          <SimpleForm
            onSubmit={handleSubmit}
            validateEmail={validateEmail}
            validatePassword={validatePassword}
          />
        );

        try {
          const emailInput = screen.getByTestId('email-input');
          
          // Type invalid email
          await user.type(emailInput, email);
          
          // Blur to trigger validation
          await user.tab();
          
          // Wait for error message to appear
          await waitFor(() => {
            const errorMessage = screen.queryByText(/email|invalid|required/i);
            expect(errorMessage).toBeInTheDocument();
          }, { timeout: 1000 });
        } finally {
          unmount();
        }
      }),
      { numRuns: 20 } // Reduced runs for async tests
    );
  });

  /**
   * **Property 3: Form prevents submission when validation fails**
   * 
   * When a form contains invalid inputs, the submit handler should not be called.
   */
  it('Property 3: Form prevents submission when validation fails', async () => {
    const user = userEvent.setup();

    fc.assert(
      fc.asyncProperty(
        invalidEmailGenerator,
        invalidPasswordGenerator,
        async (email, password) => {
          const handleSubmit = jest.fn();
          
          const { unmount } = render(
            <SimpleForm
              onSubmit={handleSubmit}
              validateEmail={validateEmail}
              validatePassword={validatePassword}
            />
          );

          try {
            const emailInput = screen.getByTestId('email-input');
            const passwordInput = screen.getByTestId('password-input');
            const submitButton = screen.getByTestId('submit-button');
            
            // Type invalid inputs
            await user.type(emailInput, email);
            await user.type(passwordInput, password);
            
            // Try to submit
            await user.click(submitButton);
            
            // Wait a bit to ensure submit handler is not called
            await waitFor(() => {
              expect(handleSubmit).not.toHaveBeenCalled();
            }, { timeout: 500 });
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 15 } // Reduced runs for async tests
    );
  });

  /**
   * **Property 3: Form allows submission when validation passes**
   * 
   * When a form contains valid inputs, the submit handler should be called.
   */
  it('Property 3: Form allows submission when validation passes', async () => {
    const user = userEvent.setup();

    fc.assert(
      fc.asyncProperty(
        validEmailGenerator,
        validPasswordGenerator,
        async (email, password) => {
          const handleSubmit = jest.fn();
          
          const { unmount } = render(
            <SimpleForm
              onSubmit={handleSubmit}
              validateEmail={validateEmail}
              validatePassword={validatePassword}
            />
          );

          try {
            const emailInput = screen.getByTestId('email-input');
            const passwordInput = screen.getByTestId('password-input');
            const submitButton = screen.getByTestId('submit-button');
            
            // Type valid inputs
            await user.type(emailInput, email);
            await user.type(passwordInput, password);
            
            // Submit form
            await user.click(submitButton);
            
            // Wait for submit handler to be called
            await waitFor(() => {
              expect(handleSubmit).toHaveBeenCalledWith({ email, password });
            }, { timeout: 1000 });
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 15 } // Reduced runs for async tests
    );
  });

  /**
   * **Property 3: Validation is idempotent**
   * 
   * Running validation multiple times on the same input should produce the same result.
   */
  it('Property 3: Validation is idempotent', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 50 }),
        (input) => {
          const result1 = validateEmail(input);
          const result2 = validateEmail(input);
          const result3 = validateEmail(input);
          
          expect(result1).toEqual(result2);
          expect(result2).toEqual(result3);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Property 3: Validation error messages are descriptive**
   * 
   * All validation error messages should be non-empty strings that describe the error.
   */
  it('Property 3: Validation error messages are descriptive', () => {
    fc.assert(
      fc.property(
        fc.oneof(invalidEmailGenerator, invalidPasswordGenerator),
        (input) => {
          const emailError = validateEmail(input);
          const passwordError = validatePassword(input);
          
          // At least one should have an error
          const error = emailError || passwordError;
          
          if (error) {
            expect(typeof error).toBe('string');
            expect(error.length).toBeGreaterThan(5); // Meaningful message
            expect(error).toMatch(/[a-zA-Z]/); // Contains letters
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

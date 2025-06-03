describe('Authentication', () => {
  const testUser = {
    email: 'testuser@example.com' + Math.random(),
    password: 'Test@1234',
    name: 'Test User',
  };

  // Handle uncaught exceptions for this test suite
  beforeEach(() => {
    // Clear any stored tokens before each test
    cy.clearLocalStorage();
    cy.clearCookies();

    // Handle uncaught exceptions
    cy.on('uncaught:exception', (err) => {
      // Return false to prevent the test from failing
      return false;
    });
  });

  describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/auth/login');
    });

    it('should display login form elements', () => {
      cy.get('h2').should('contain', 'Login');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Login');
      cy.get('a[href="/auth/signup"]').should('contain', 'Signup here!');
    });

    it('should show validation errors for empty fields', () => {
      cy.get('button[type="submit"]').click();

      cy.get('input[name="email"]').should('have.attr', 'aria-invalid', 'true');
      cy.get('input[name="password"]').should('have.attr', 'aria-invalid', 'true');

      // Check for error messages
      cy.contains('Field is required').should('be.visible');
    });

    it('should show validation error for invalid email', () => {
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.contains('Invalid email address. Try again.').should('be.visible');
    });

    it('should successfully login with valid credentials', () => {
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'LOGIN') {
          req.reply({
            body: {
              data: {
                login: {
                  accessToken: 'mock-access-token',
                  refreshToken: 'mock-refresh-token',
                  user: {
                    id: 1,
                    email: 'test@example.com',
                    name: 'Test User',
                  },
                },
              },
            },
          });
        }
      }).as('loginMutation');

      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.wait('@loginMutation');
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000); // Wait for the login to complete

      // Check that tokens are stored
      cy.window().then((win) => {
        expect(win.localStorage.getItem('ACCESS_TOKEN')).to.equal('mock-access-token');
        expect(win.localStorage.getItem('REFRESH_TOKEN')).to.equal('mock-refresh-token');
      });
    });

    it('should display error message on login failure', () => {
      // Mock failed login
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'LOGIN') {
          req.reply({
            errors: [
              {
                message: 'Invalid credentials',
              },
            ],
          });
        }
      }).as('loginMutationError');

      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();

      cy.wait('@loginMutationError');
      cy.get('p').contains('Invalid credentials').should('be.visible');
    });

    it('should navigate to signup page when clicking signup link', () => {
      cy.get('a[href="/auth/signup"]').click();
      cy.url().should('include', '/auth/signup');
    });

    it('should clear error message when resubmitting form', () => {
      // First, trigger an error
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'LOGIN') {
          req.reply({
            errors: [{ message: 'Invalid credentials' }],
          });
        }
      }).as('loginError');

      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      cy.wait('@loginError');

      cy.contains('Invalid credentials').should('be.visible');

      // Now mock successful login
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'LOGIN') {
          req.reply({
            data: {
              login: {
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
              },
            },
          });
        }
      }).as('loginSuccess');

      // Resubmit form
      cy.get('button[type="submit"]').click();
      cy.wait('@loginSuccess');

      // Error message should be cleared
      cy.contains('Invalid credentials').should('not.exist');
    });
  });

  describe('Signup Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/auth/signup');
    });

    it('should display signup form elements', () => {
      cy.get('h2').should('contain', 'Signup');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('input[name="confirmPass"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Submit');
    });

    it('should show validation errors for empty fields', () => {
      cy.get('button[type="submit"]').click();

      cy.get('input[name="email"]').should('have.attr', 'aria-invalid', 'true');
      cy.get('input[name="password"]').should('have.attr', 'aria-invalid', 'true');
    });

    it('should show validation error for invalid email', () => {
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPass"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.contains('Invalid email address. Try again.').should('be.visible');
    });

    it('should show validation error when passwords do not match', () => {
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPass"]').type('differentpassword');
      cy.get('button[type="submit"]').click();

      cy.contains('Passwords must match').should('be.visible');
    });

    it('should successfully signup with valid credentials', () => {
      // Mock the GraphQL signup mutation
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'SIGNUP') {
          req.reply({
            data: {
              signup: {
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
              },
            },
          });
        }
      }).as('signupMutation');

      cy.get('input[name="email"]').type('newuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPass"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.wait('@signupMutation');

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
      // Check that tokens are stored
      cy.window().then((win) => {
        expect(win.localStorage.getItem('ACCESS_TOKEN')).to.equal('mock-access-token');
        expect(win.localStorage.getItem('REFRESH_TOKEN')).to.equal('mock-refresh-token');
      });
    });

    it('should display error message on signup failure', () => {
      // Mock failed signup
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'SIGNUP') {
          req.reply({
            errors: [
              {
                message: 'User already exists',
              },
            ],
          });
        }
      }).as('signupMutationError');

      cy.get('input[name="email"]').type('existing@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPass"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.wait('@signupMutationError');
      cy.get('p').contains('User already exists').should('be.visible');
    });

    it('should clear error message when resubmitting form', () => {
      // First, trigger an error
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'SIGNUP') {
          req.reply({
            errors: [{ message: 'User already exists' }],
          });
        }
      }).as('signupError');

      cy.get('input[name="email"]').type('existing@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPass"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.wait('@signupError');

      cy.contains('User already exists').should('be.visible');

      // Now mock successful signup
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'SIGNUP') {
          req.reply({
            data: {
              signup: {
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
              },
            },
          });
        }
      }).as('signupSuccess');

      // Change email and resubmit
      cy.get('input[name="email"]').clear().type('newuser@example.com');
      cy.get('button[type="submit"]').click();
      cy.wait('@signupSuccess');

      // Error message should be cleared
      cy.contains('User already exists').should('not.exist');
    });
  });

  describe('Form Accessibility', () => {
    it('should have proper labels and form controls for login', () => {
      cy.visit('http://localhost:3000/auth/login');

      cy.get('label[for="email"]').should('contain', 'Email');
      cy.get('label[for="password"]').should('contain', 'Password');
      cy.get('input[name="email"]').should('have.attr', 'type', 'email');
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    });

    it('should have proper labels and form controls for signup', () => {
      cy.visit('http://localhost:3000/auth/signup');

      cy.get('label[for="email"]').should('contain', 'Email');
      cy.get('label[for="password"]').should('contain', 'Password');
      cy.get('label[for="confirmPass"]').should('contain', 'Confirm Password');
      cy.get('input[name="email"]').should('have.attr', 'type', 'email');
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
      cy.get('input[name="confirmPass"]').should('have.attr', 'type', 'password');
    });
  });

  describe('Loading States', () => {
    it('should show loading state during login submission', () => {
      cy.visit('http://localhost:3000/auth/login');

      // Mock a delayed response
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'LOGIN') {
          // Delay the response to test loading state
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  login: {
                    accessToken: 'mock-access-token',
                    refreshToken: 'mock-refresh-token',
                  },
                },
              });
            }, 1000);
          });
        }
      }).as('slowLogin');

      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      // Check if submit button is disabled during loading
      cy.get('button[type="submit"]').should('be.disabled');

      cy.wait('@slowLogin');
    });

    it('should show loading state during signup submission', () => {
      cy.visit('http://localhost:3000/auth/signup');

      // Mock a delayed response
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'SIGNUP') {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  signup: {
                    accessToken: 'mock-access-token',
                    refreshToken: 'mock-refresh-token',
                  },
                },
              });
            }, 1000);
          });
        }
      }).as('slowSignup');

      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPass"]').type('password123');
      cy.get('button[type="submit"]').click();

      // Check if submit button is disabled during loading
      cy.get('button[type="submit"]').should('be.disabled');

      cy.wait('@slowSignup');
    });
  });
});

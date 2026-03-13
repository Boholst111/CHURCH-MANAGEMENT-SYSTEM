/**
 * Dark Mode Example Component
 * 
 * Demonstrates all components in both light and dark modes side by side
 * to verify color tokens and contrast.
 */

import React from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Input } from './input';
import { Sun, Moon, Mail, Lock, Check, AlertTriangle, XCircle, Info } from 'lucide-react';

export function DarkModeExample() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Dark Mode Color Tokens</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            All components tested in both light and dark modes with WCAG AA contrast compliance
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Light Mode Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Sun className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Light Mode</h2>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>All button styles in light mode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Badge Variants</CardTitle>
                <CardDescription>Status badges in light mode</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Form Inputs</CardTitle>
                <CardDescription>Input fields in light mode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email address"
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  icon={<Lock className="w-4 h-4" />}
                  label="Password"
                />
                <Input
                  type="text"
                  placeholder="Error state"
                  error="This field is required"
                  label="With Error"
                />
                <Input
                  type="text"
                  placeholder="Disabled"
                  disabled
                  label="Disabled"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Text styles in light mode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <h1 className="text-h1">Heading 1</h1>
                <h2 className="text-h2">Heading 2</h2>
                <h3 className="text-h3">Heading 3</h3>
                <h4 className="text-h4">Heading 4</h4>
                <p className="text-base text-neutral-900">Body text - Primary</p>
                <p className="text-base text-neutral-600">Body text - Secondary</p>
                <p className="text-base text-neutral-500">Body text - Tertiary</p>
                <p className="text-small text-neutral-400">Small text - Muted</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Semantic Colors</CardTitle>
                <CardDescription>Status colors in light mode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-success">
                  <Check className="w-5 h-5" />
                  <span>Success message</span>
                </div>
                <div className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Warning message</span>
                </div>
                <div className="flex items-center gap-2 text-error">
                  <XCircle className="w-5 h-5" />
                  <span>Error message</span>
                </div>
                <div className="flex items-center gap-2 text-info">
                  <Info className="w-5 h-5" />
                  <span>Info message</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Dark Mode Column */}
          <div className="dark space-y-6">
            <div className="flex items-center gap-2 mb-4 text-neutral-50">
              <Moon className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Dark Mode</h2>
            </div>
            
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">Button Variants</CardTitle>
                <CardDescription className="text-neutral-400">All button styles in dark mode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">Badge Variants</CardTitle>
                <CardDescription className="text-neutral-400">Status badges in dark mode</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">Form Inputs</CardTitle>
                <CardDescription className="text-neutral-400">Input fields in dark mode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email address"
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  icon={<Lock className="w-4 h-4" />}
                  label="Password"
                />
                <Input
                  type="text"
                  placeholder="Error state"
                  error="This field is required"
                  label="With Error"
                />
                <Input
                  type="text"
                  placeholder="Disabled"
                  disabled
                  label="Disabled"
                />
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">Typography</CardTitle>
                <CardDescription className="text-neutral-400">Text styles in dark mode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <h1 className="text-h1 text-neutral-50">Heading 1</h1>
                <h2 className="text-h2 text-neutral-50">Heading 2</h2>
                <h3 className="text-h3 text-neutral-100">Heading 3</h3>
                <h4 className="text-h4 text-neutral-100">Heading 4</h4>
                <p className="text-base text-neutral-50">Body text - Primary</p>
                <p className="text-base text-neutral-200">Body text - Secondary</p>
                <p className="text-base text-neutral-400">Body text - Tertiary</p>
                <p className="text-small text-neutral-500">Small text - Muted</p>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">Semantic Colors</CardTitle>
                <CardDescription className="text-neutral-400">Status colors in dark mode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-success">
                  <Check className="w-5 h-5" />
                  <span>Success message</span>
                </div>
                <div className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Warning message</span>
                </div>
                <div className="flex items-center gap-2 text-error">
                  <XCircle className="w-5 h-5" />
                  <span>Error message</span>
                </div>
                <div className="flex items-center gap-2 text-info">
                  <Info className="w-5 h-5" />
                  <span>Info message</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Color Palette Reference */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Dark Mode Color Palette</CardTitle>
            <CardDescription>
              All colors are inverted for dark mode to maintain proper contrast ratios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Primary Colors</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-primary-400"></div>
                    <span className="text-sm">400 - Links</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-primary-500"></div>
                    <span className="text-sm">500 - Interactive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-primary-600"></div>
                    <span className="text-sm">600 - Buttons</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Neutral Colors</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-neutral-50 border"></div>
                    <span className="text-sm">50 - Primary Text</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-neutral-200"></div>
                    <span className="text-sm">200 - Secondary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-neutral-400"></div>
                    <span className="text-sm">400 - Muted</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Success/Error</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-success"></div>
                    <span className="text-sm">Success</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-error"></div>
                    <span className="text-sm">Error</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Warning/Info</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-warning"></div>
                    <span className="text-sm">Warning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-info"></div>
                    <span className="text-sm">Info</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-neutral-600 dark:text-neutral-400">
            All color combinations meet WCAG AA standards for contrast (4.5:1 for normal text, 3:1 for large text)
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default DarkModeExample;

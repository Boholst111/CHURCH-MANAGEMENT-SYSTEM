import React, { useState } from 'react';
import { Input } from './input';
import { Mail, Lock, Phone, Search, User } from 'lucide-react';

/**
 * Input Component Examples
 * 
 * This file demonstrates various use cases of the Input component
 * following the design specifications from the Modern UI/UX Redesign.
 */

export function InputExamples() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="space-y-8 p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-neutral-900">Input Component Examples</h1>

      {/* Basic Input */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Basic Input</h2>
        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </section>

      {/* Input with Label */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Input with Label</h2>
        <Input
          type="email"
          label="Email Address"
          placeholder="your.email@church.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </section>

      {/* Input with Icon (Left) */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Input with Left Icon</h2>
        <Input
          type="email"
          label="Email"
          placeholder="your.email@church.com"
          icon={<Mail className="h-5 w-5" />}
          iconPosition="left"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </section>

      {/* Input with Icon (Right) */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Input with Right Icon</h2>
        <Input
          type="text"
          label="Search"
          placeholder="Search members..."
          icon={<Search className="h-5 w-5" />}
          iconPosition="right"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* Input with Error */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Input with Error</h2>
        <Input
          type="email"
          label="Email Address"
          placeholder="your.email@church.com"
          icon={<Mail className="h-5 w-5" />}
          iconPosition="left"
          value="invalid-email"
          error="Please enter a valid email address"
        />
      </section>

      {/* Input with Helper Text */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Input with Helper Text</h2>
        <Input
          type="password"
          label="Password"
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5" />}
          iconPosition="left"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Password must be at least 8 characters"
        />
      </section>

      {/* Required Input */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Required Input</h2>
        <Input
          type="text"
          label="Full Name"
          placeholder="John Doe"
          icon={<User className="h-5 w-5" />}
          iconPosition="left"
          required
        />
      </section>

      {/* Disabled Input */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Disabled Input</h2>
        <Input
          type="text"
          label="Username"
          placeholder="johndoe"
          value="johndoe"
          disabled
        />
      </section>

      {/* Different Input Types */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Different Input Types</h2>
        
        <Input
          type="tel"
          label="Phone Number"
          placeholder="+63 912 345 6789"
          icon={<Phone className="h-5 w-5" />}
          iconPosition="left"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          type="number"
          label="Age"
          placeholder="25"
          min={0}
          max={120}
        />

        <Input
          type="url"
          label="Website"
          placeholder="https://example.com"
        />
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Different Sizes</h2>
        
        <Input
          type="text"
          label="Small Input"
          placeholder="Small size"
          size="sm"
        />

        <Input
          type="text"
          label="Medium Input (Default)"
          placeholder="Medium size"
          size="md"
        />

        <Input
          type="text"
          label="Large Input"
          placeholder="Large size"
          size="lg"
        />
      </section>
    </div>
  );
}

export default InputExamples;

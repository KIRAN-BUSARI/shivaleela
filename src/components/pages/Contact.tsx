"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  number: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    countryCode: '+91',
    number: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0, x: 30 },
        { autoAlpha: 1, x: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      );
    }

    if (formRef.current) {
      const fields = formRef.current.querySelectorAll('.gsap-field');
      gsap.fromTo(
        fields,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, delay: 0.45, ease: 'power2.out' }
      );
    }
  }, []);

  useEffect(() => {
    const errorNodes = document.querySelectorAll('.field-error');
    if (errorNodes.length) {
      gsap.fromTo(
        errorNodes,
        { autoAlpha: 0, y: -5 },
        { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }, [errors]);

  useEffect(() => {
    if (submitStatus && statusRef.current) {
      gsap.fromTo(
        statusRef.current,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [submitStatus]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.number.trim()) {
      newErrors.number = 'Phone number is required';
    } else if (!/^[+]?[\d\s\-()]{10,}$/.test(formData.number)) {
      newErrors.number = 'Phone number is invalid';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message:
            data.message ||
            'Your message has been sent successfully! We will get back to you soon.',
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          countryCode: '+91',
          number: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          success: false,
          message:
            data.error ||
            'Failed to send your message. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus({
        success: false,
        message:
          'Failed to send your message. Please try again later or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-4 sm:px-6 lg:px-8">
      <div ref={containerRef} className="flex w-full opacity-0">
        <div className="mx-auto flex w-full max-w-lg items-center justify-center">
          <div
            className="w-full rounded-2xl border border-border bg-background/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8 md:p-10"
          >
            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="group gsap-field">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      className={
                        errors.name
                          ? 'border-red-500 bg-muted text-foreground ring-1 ring-red-500 placeholder:text-muted-foreground'
                          : 'border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary'
                      }
                      placeholder="your name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && (
                      <p className="field-error mt-2 flex items-center text-sm text-red-400">
                        <svg
                          className="mr-1 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {errors.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="group gsap-field">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      className={
                        errors.email
                          ? 'border-red-500 bg-muted text-foreground ring-1 ring-red-500 placeholder:text-muted-foreground'
                          : 'border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary'
                      }
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <p className="field-error mt-2 flex items-center text-sm text-red-400">
                        <svg
                          className="mr-1 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="group gsap-field">
                <label
                  htmlFor="number"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex gap-2">
                  <select
                    id="countryCode"
                    name="countryCode"
                    title="Country code"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="mx-px w-18 rounded-md border border-border bg-muted py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+7">🇷🇺 +7</option>
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+46">🇸🇪 +46</option>
                    <option value="+47">🇳🇴 +47</option>
                    <option value="+45">🇩🇰 +45</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+32">🇧🇪 +32</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+66">🇹🇭 +66</option>
                    <option value="+63">🇵🇭 +63</option>
                    <option value="+84">🇻🇳 +84</option>
                    <option value="+62">🇮🇩 +62</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+20">🇪🇬 +20</option>
                  </select>
                  <div className="relative flex-1">
                    <Input
                      type="tel"
                      id="number"
                      name="number"
                      className={
                        errors.number
                          ? 'border-red-500 bg-muted text-foreground ring-1 ring-red-500 placeholder:text-muted-foreground'
                          : 'border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary'
                      }
                      placeholder="1234567890"
                      value={formData.number}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {errors.number && (
                  <p className="field-error mt-2 flex items-center text-sm text-red-400">
                    <svg
                      className="mr-1 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {errors.number}
                  </p>
                )}
              </div>
              <div className="group gsap-field">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    className={
                      errors.subject
                        ? 'border-red-500 bg-muted text-foreground ring-1 ring-red-500 placeholder:text-muted-foreground'
                        : 'border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary'
                    }
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                  {errors.subject && (
                    <p className="field-error mt-2 flex items-center text-sm text-red-400">
                      <svg
                        className="mr-1 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>
              <div className="group gsap-field">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    className={
                      errors.message
                        ? 'border-red-500 bg-muted text-foreground ring-1 ring-red-500 placeholder:text-muted-foreground'
                        : 'border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary'
                    }
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                  {errors.message && (
                    <p className="field-error mt-2 flex items-center text-sm text-red-400">
                      <svg
                        className="mr-1 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>
              {submitStatus && (
                <div
                  ref={statusRef}
                  className={`rounded-lg ${submitStatus.success ? 'border-green-500 bg-green-100 dark:bg-green-900/20' : 'border-red-500 bg-red-100 dark:bg-red-900/20'} border-2 p-4`}
                >
                  <div className="flex items-center">
                    <div className="shrink-0">
                      {submitStatus.success ? (
                        <svg
                          className="h-6 w-6 text-green-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-6 w-6 text-red-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p
                        className={`text-sm font-medium ${submitStatus.success ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'}`}
                      >
                        {submitStatus.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div
                className={`gsap-field transition-transform duration-200 ${isSubmitting ? '' : 'hover:scale-[1.02] active:scale-[0.98]'
                  }`}
              >
                <Button
                  variant="secondary"
                  size="lg"
                  type="submit"
                  className="group relative w-full overflow-hidden border-2 border-primary/30 bg-background font-semibold text-foreground shadow-lg transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                  disabled={isSubmitting}
                >
                  <span className="absolute inset-0 -z-10 bg-linear-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="mr-2 h-5 w-5 animate-spin text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-primary">Sending Message...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span className="transition-all duration-300 group-hover:text-primary">
                        Send Message
                      </span>
                      <svg
                        className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  )}
                </Button>
              </div>
              <p className="gsap-field text-center text-sm text-muted-foreground">
                By submitting this form, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">
                  privacy policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/rate-limit';

// Notification hook stub: logs or triggers email via provider to be connected later
async function notifyAdminNewSubmission(formType: string, summary: string) {
  if (process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true') {
    console.log(`[EMAIL STUB] Notification for ${formType}: ${summary}`);
  }
}

// 1. First-time visitor schema
const visitorSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  preferredServiceDate: z.string().optional(),
  bringingFamily: z.boolean().default(false),
  numberOfFamily: z.string().optional(),
  prayerRequestOrQuestions: z.string().optional(),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: 'You must consent to our privacy policy to submit this form',
  }),
  websiteHoneypot: z.string().max(0, 'Spam detected'),
});

export async function submitVisitorForm(formData: FormData) {
  try {
    // Rate limit check (max 5 submissions per 10 mins)
    const rate = await checkRateLimit();
    if (!rate.success) {
      return { success: false, error: 'Too many submissions. Please wait 10 minutes before submitting again.' };
    }

    const raw = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      preferredServiceDate: formData.get('preferredServiceDate') || '',
      bringingFamily: formData.get('bringingFamily') === 'on',
      numberOfFamily: formData.get('numberOfFamily') || '0',
      prayerRequestOrQuestions: formData.get('prayerRequestOrQuestions') || '',
      consentGiven: formData.get('consentGiven') === 'on',
      websiteHoneypot: formData.get('websiteHoneypot') || '',
    };

    const validated = visitorSchema.parse(raw);

    const supabase = await createClient();
    const { error } = await supabase.from('form_submissions').insert({
      form_type: 'visitor',
      payload: validated,
      status: 'new',
      retention_days: 90,
    });

    if (error) {
      console.error('Supabase error inserting visitor form:', error.message);
    }

    await notifyAdminNewSubmission('visitor', `New visitor: ${validated.fullName} (${validated.email})`);
    return { success: true, message: 'Thank you! We look forward to welcoming you this Sunday.' };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0]?.message || 'Validation error' };
    }
    return { success: false, error: 'Unable to submit your details. Please try again.' };
  }
}

// 2. Prayer request schema (Confidential, restricted retention)
const prayerSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required for pastoral follow-up'),
  phone: z.string().optional(),
  isConfidential: z.boolean().default(true),
  prayerTopic: z.string().min(10, 'Please write your prayer request (at least 10 characters)'),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: 'Consent required to process prayer requests',
  }),
  websiteHoneypot: z.string().max(0, 'Spam detected'),
});

export async function submitPrayerRequest(formData: FormData) {
  try {
    const rate = await checkRateLimit();
    if (!rate.success) {
      return { success: false, error: 'Too many submissions. Please wait 10 minutes before submitting again.' };
    }

    const raw = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      isConfidential: formData.get('isConfidential') !== 'off',
      prayerTopic: formData.get('prayerTopic'),
      consentGiven: formData.get('consentGiven') === 'on',
      websiteHoneypot: formData.get('websiteHoneypot') || '',
    };

    const validated = prayerSchema.parse(raw);

    const supabase = await createClient();
    const { error } = await supabase.from('form_submissions').insert({
      form_type: 'prayer',
      payload: validated,
      status: 'new',
      retention_days: 90,
    });

    if (error) {
      console.error('Supabase error inserting prayer form:', error.message);
    }

    await notifyAdminNewSubmission('prayer', `Confidential prayer request from ${validated.fullName}`);
    return { success: true, message: 'Your prayer request has been received by our pastoral intercessory team.' };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0]?.message || 'Validation error' };
    }
    return { success: false, error: 'Failed to send prayer request.' };
  }
}

// 3. General Contact schema
const contactSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().optional().default('General Enquiry'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  consentGiven: z.boolean().optional().default(true),
  websiteHoneypot: z.string().max(0, 'Spam detected'),
});

export async function submitContactForm(formData: FormData) {
  try {
    const rate = await checkRateLimit();
    if (!rate.success) {
      return { success: false, error: 'Too many submissions. Please wait 10 minutes before submitting again.' };
    }

    const raw = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: (formData.get('phone') as string) || '',
      subject: (formData.get('subject') as string) || 'General Enquiry',
      message: formData.get('message'),
      consentGiven: formData.get('consentGiven') ? formData.get('consentGiven') === 'on' : true,
      websiteHoneypot: (formData.get('websiteHoneypot') as string) || '',
    };

    const validated = contactSchema.parse(raw);

    const supabase = await createClient();
    const { error } = await supabase.from('form_submissions').insert({
      form_type: 'contact',
      payload: validated,
      status: 'new',
      retention_days: 180,
    });

    if (error) {
      console.error('Supabase error inserting contact form:', error.message);
    }

    await notifyAdminNewSubmission('contact', `Contact message from ${validated.fullName}: ${validated.subject}`);
    return { success: true, message: 'Thank you for reaching out. We will get back to you shortly.' };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0]?.message || 'Validation error' };
    }
    return { success: false, error: 'Failed to send your message.' };
  }
}

// 4. Home Group Join Request schema
const homeGroupSchema = z.object({
  groupName: z.string().min(2, 'Group selection is required'),
  groupArea: z.string().min(2, 'Area is required'),
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone number required so leader can contact you'),
  preferredContactMethod: z.string().default('email'),
  notes: z.string().optional(),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: 'Consent required to forward details to the group leader',
  }),
  websiteHoneypot: z.string().max(0, 'Spam detected'),
});

export async function submitHomeGroupRequest(formData: FormData) {
  try {
    const rate = await checkRateLimit();
    if (!rate.success) {
      return { success: false, error: 'Too many submissions. Please wait 10 minutes before submitting again.' };
    }

    const raw = {
      groupName: formData.get('groupName'),
      groupArea: formData.get('groupArea'),
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      preferredContactMethod: formData.get('preferredContactMethod') || 'email',
      notes: formData.get('notes') || '',
      consentGiven: formData.get('consentGiven') === 'on',
      websiteHoneypot: formData.get('websiteHoneypot') || '',
    };

    const validated = homeGroupSchema.parse(raw);

    const supabase = await createClient();
    const { error } = await supabase.from('form_submissions').insert({
      form_type: 'home_group',
      payload: validated,
      status: 'new',
      retention_days: 90,
    });

    if (error) {
      console.error('Supabase error inserting home group request:', error.message);
    }

    await notifyAdminNewSubmission('home_group', `Join request for ${validated.groupName} by ${validated.fullName}`);
    return {
      success: true,
      message: `Your request to join ${validated.groupName} was sent! The leader will connect with you soon.`,
    };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0]?.message || 'Validation error' };
    }
    return { success: false, error: 'Could not send group request.' };
  }
}

// 5. Young Saints Enquiry schema
const youngSaintsSchema = z.object({
  parentName: z.string().min(2, 'Parent or guardian name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone number required'),
  childName: z.string().min(2, 'Child’s name is required'),
  childAge: z.string().min(1, 'Child age is required'),
  classInterested: z.string().min(2, 'Please select a class'),
  allergiesOrMedicalNeeds: z.string().optional(),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: 'Consent required for child registration and safeguarding records',
  }),
  websiteHoneypot: z.string().max(0, 'Spam detected'),
});

export async function submitYoungSaintsEnquiry(formData: FormData) {
  try {
    const rate = await checkRateLimit();
    if (!rate.success) {
      return { success: false, error: 'Too many submissions. Please wait 10 minutes before submitting again.' };
    }

    const raw = {
      parentName: formData.get('parentName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      childName: formData.get('childName'),
      childAge: formData.get('childAge'),
      classInterested: formData.get('classInterested'),
      allergiesOrMedicalNeeds: formData.get('allergiesOrMedicalNeeds') || '',
      consentGiven: formData.get('consentGiven') === 'on',
      websiteHoneypot: formData.get('websiteHoneypot') || '',
    };

    const validated = youngSaintsSchema.parse(raw);

    const supabase = await createClient();
    const { error } = await supabase.from('form_submissions').insert({
      form_type: 'young_saints',
      payload: validated,
      status: 'new',
      retention_days: 180,
    });

    if (error) {
      console.error('Supabase error inserting Young Saints enquiry:', error.message);
    }

    await notifyAdminNewSubmission('young_saints', `Young Saints registration: ${validated.childName} (Parent: ${validated.parentName})`);
    return {
      success: true,
      message: 'Thank you! Our Young Saints team and safeguarding lead will review your details.',
    };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0]?.message || 'Validation error' };
    }
    return { success: false, error: 'Could not submit registration.' };
  }
}

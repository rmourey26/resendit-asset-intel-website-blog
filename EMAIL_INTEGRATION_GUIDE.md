# Resend-It Email Integration Guide

## Overview

This guide covers the complete email integration setup for the Resend-It platform using Resend API with custom domain `updates.resend-it.com`.

## Email Flows Implemented

### 1. Demo Request Notifications
- **Trigger**: User submits demo request form
- **Recipients**: Internal team (`help@resend-it.com`)
- **Template**: Professional HTML email with gradient branding
- **Features**: Reply-to user email, inquiry tracking, formatted data

### 2. Waitlist Signup System
- **Trigger**: User joins Lite plan waitlist
- **Recipients**: 
  - Internal notification to `help@resend-it.com`
  - Welcome email to user
- **Templates**: Both internal notification and user welcome emails
- **Features**: Duplicate prevention, user engagement tracking

### 3. Supabase Auth Integration
- **Email Confirmation**: Custom branded confirmation emails
- **Password Reset**: Secure password reset flow
- **Custom Routes**: `/auth/email-confirmed`, `/auth/reset-password`, `/auth/forgot-password`
- **Features**: Proper redirect handling, error pages, responsive design

## Setup Instructions

### 1. Environment Variables

Add these to your Vercel project or `.env.local`:

\`\`\`bash
# Resend API Configuration
RESEND_API_KEY=re_xxxxxxxxxx

# Optional: Email testing in production
EMAIL_TEST_KEY=your-secret-test-key

# Supabase Configuration (already configured)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
\`\`\`

### 2. Domain Setup in Resend

1. **Add Domain**: Add `resend-it.com` to your Resend dashboard
2. **DNS Configuration**: Add the required DNS records:
   \`\`\`
   Type: MX
   Name: updates.resend-it.com
   Value: feedback-smtp.us-east-1.amazonses.com
   Priority: 10
   \`\`\`
3. **Verify Domain**: Complete domain verification in Resend dashboard
4. **Update From Address**: Emails will be sent from `updates@resend-it.com`

### 3. Install Dependencies

\`\`\`bash
npm install resend zod @supabase/supabase-js @supabase/ssr
\`\`\`

## Email Templates

All email templates feature:
- **Consistent Branding**: Resend-It gradient colors and styling
- **Responsive Design**: Mobile-optimized layouts
- **Professional Formatting**: Clean, readable HTML and text versions
- **Call-to-Actions**: Branded buttons with hover effects
- **Accessibility**: Proper alt text and semantic HTML

## API Endpoints

### Production Endpoints
- `POST /api/demo-request` - Handles demo requests with email notifications
- `POST /api/waitlist` - Handles waitlist signups with dual email flow
- `POST /api/auth/send-confirmation` - Resends email confirmations

### Testing Endpoint
- `POST /api/test-email` - Test all email types (development only)

## Testing Email Integration

### Development Testing

\`\`\`bash
# Test demo request email
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "demo",
    "email": "test@example.com",
    "testData": {
      "name": "John Doe",
      "company": "Test Corp"
    }
  }'

# Test waitlist emails
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "waitlist",
    "email": "test@example.com",
    "testData": {
      "firstName": "Jane",
      "lastName": "Smith"
    }
  }'
\`\`\`

### Production Testing

Use the `x-test-key` header with your secret test key:

\`\`\`bash
curl -X POST https://your-domain.com/api/test-email \
  -H "Content-Type: application/json" \
  -H "x-test-key: your-secret-test-key" \
  -d '{"type": "welcome", "email": "test@example.com"}'
\`\`\`

## Email Service Architecture

### EmailService Class
- **Centralized**: All email logic in one service class
- **Type Safety**: Full TypeScript support with proper interfaces
- **Error Handling**: Comprehensive error catching and logging
- **Tagging**: Resend tags for analytics and filtering
- **Templating**: Reusable template system

### Template System
- **Modular**: Separate template functions for each email type
- **Consistent**: Shared styling and branding across all emails
- **Flexible**: Easy to customize and extend
- **Dual Format**: Both HTML and plain text versions

## Monitoring and Analytics

### Resend Dashboard
- **Delivery Status**: Track email delivery success/failure
- **Open Rates**: Monitor email engagement
- **Click Tracking**: Track CTA button clicks
- **Bounce Handling**: Automatic bounce management

### Application Logging
- **Success Logging**: Track successful email sends
- **Error Logging**: Detailed error information for debugging
- **Performance**: Email send timing and response tracking

## Security Features

### Authentication Emails
- **Secure Tokens**: Supabase-generated secure confirmation codes
- **Expiration**: Time-limited links for security
- **Domain Validation**: Proper redirect URL validation
- **CSRF Protection**: Built-in Next.js CSRF protection

### Data Protection
- **No Sensitive Data**: Emails contain only necessary information
- **Secure Headers**: Proper email headers for spam prevention
- **Rate Limiting**: Built-in Supabase rate limiting
- **Input Validation**: Zod schema validation for all inputs

## Troubleshooting

### Common Issues

1. **Domain Not Verified**
   - Check DNS records in your domain provider
   - Wait up to 24 hours for DNS propagation
   - Verify in Resend dashboard

2. **Emails Not Sending**
   - Check `RESEND_API_KEY` environment variable
   - Verify domain is verified in Resend
   - Check application logs for error messages

3. **Auth Emails Not Working**
   - Verify Supabase project settings
   - Check redirect URLs in Supabase dashboard
   - Ensure proper environment variables

### Debug Mode

Enable detailed logging by setting:
\`\`\`bash
NODE_ENV=development
\`\`\`

This will provide detailed console logs for all email operations.

## Next Steps

1. **Analytics Integration**: Add email analytics tracking
2. **Template Customization**: Customize email templates for specific campaigns
3. **Automation**: Set up automated email sequences
4. **A/B Testing**: Implement email template A/B testing
5. **Internationalization**: Add multi-language email support

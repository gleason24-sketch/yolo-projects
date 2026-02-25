#!/usr/bin/env node

// Lead Outreach Email Generator
// Generates personalized cold emails for Riot Digital leads

const args = process.argv.slice(2);
let company = '';
let industry = '';
let pain = 'manual admin work';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--company' && args[i + 1]) company = args[i + 1];
  if (args[i] === '--industry' && args[i + 1]) industry = args[i + 1];
  if (args[i] === '--pain' && args[i + 1]) pain = args[i + 1];
}

if (!company || !industry) {
  console.log('Usage: node generate-email.cjs --company "Company Name" --industry "industry" [--pain "specific pain point"]');
  console.log('');
  console.log('Example: node generate-email.cjs --company "ABC Plumbing" --industry "plumbing"');
  process.exit(1);
}

// Templates
const templates = {
  plumbing: {
    pain: 'answering calls, chasing quotes, scheduling jobs manually',
    result: 'went from 25h/week of admin to 3h'
  },
  hvac: {
    pain: 'booking calls, dispatching technicians, follow-up quotes',
    result: 'saved 15 hours/week on scheduling alone'
  },
  landscaping: {
    pain: 'customer calls, estimates, seasonal bookings',
    result: 'automated 80% of their booking process'
  },
  restaurant: {
    pain: 'takeout orders, reservations, inventory management',
    result: 'reduced phone orders by 70%'
  },
  realestate: {
    pain: 'lead follow-ups, showing scheduling, document handling',
    result: 'converted 3x more leads with automated follow-up'
  },
  default: {
    pain: 'manual tasks, customer inquiries, scheduling',
    result: 'saved 10+ hours per week'
  }
};

const t = templates[industry.toLowerCase()] || templates.default;

const email = `Subject: Automate your ${industry} business? Here's how ${company} saved 15h/week

Hi,

I noticed ${company} is doing ${industry} work.

Here's the thing: most ${industry} companies we talk to are wasting 15+ hours/week on:
- ${t.pain}
- Chasing leads
- Manual scheduling

We built an AI automation system that handles all of that automatically. One client in ${industry} ${t.result}.

No catch - we'd just show you what's possible. 15-minute call, no pitch.

-[Your Name]
Riot Digital
`;

console.log('--- GENERATED EMAIL ---\n');
console.log(email);
console.log('--- END ---\n');
console.log('Copy and personalize before sending.');

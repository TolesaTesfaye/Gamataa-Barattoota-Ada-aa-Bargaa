# Leadership Setup Guide

This guide explains how to populate the leadership data in the database.

## Quick Start

Run the following command from the `backend` directory:

```bash
npm run seed:leadership
```

Or directly with tsx:

```bash
npx tsx src/seed-leadership.ts
```

## What This Does

The script will:
1. Connect to your MongoDB database
2. Create a system user (if not exists) to associate with leadership members
3. Remove any existing leadership members with the same email addresses
4. Create 6 new leadership members with real data:
   - Dr. Sarah Mensah (President)
   - James Osei (Vice President)
   - Ama Serwaa (Treasurer)
   - Kwame Asante (Secretary)
   - Akua Nyarko (Programs Director)
   - Yaw Adjei (Communications Lead)

## Alternative: Manual Entry

If you prefer not to run the seed script, you can add leadership members manually through the admin interface:

1. Log in as an admin or superadmin
2. Navigate to **Manage → Leadership Management**
3. Click **"Add Leader"**
4. Fill in the form with leadership details
5. Make sure to use a leadership designation like:
   - President
   - Vice President
   - Secretary
   - Treasurer
   - Director
   - Lead (e.g., Communications Lead)

## Leadership Data

The seed script includes these members:

### Dr. Sarah Mensah
- **Email:** s.mensah@gbaabw.org
- **Phone:** +251 91 234 5001
- **Department:** Executive
- **Designation:** President
- **Bio:** Over 20 years of experience in professional development and organizational leadership, driving the association's strategic vision.

### James Osei
- **Email:** j.osei@gbaabw.org
- **Phone:** +251 91 234 5002
- **Department:** Executive
- **Designation:** Vice President
- **Bio:** Expert in strategic planning and community engagement with a passion for youth mentorship and member development.

### Ama Serwaa
- **Email:** a.serwaa@gbaabw.org
- **Phone:** +251 91 234 5003
- **Department:** Finance
- **Designation:** Treasurer
- **Bio:** Accounted accountant with extensive experience in non-profit financial management and regulatory compliance.

### Kwame Asante
- **Email:** k.asante@gbaabw.org
- **Phone:** +251 91 234 5004
- **Department:** Administration
- **Designation:** Secretary
- **Bio:** Dedicated administrator committed to operational excellence, governance, and delivering exceptional member services.

### Akua Nyarko
- **Email:** a.nyarko@gbaabw.org
- **Phone:** +251 91 234 5005
- **Department:** Programs
- **Designation:** Programs Director
- **Bio:** Passionate about designing impactful programs that drive professional growth and community engagement across the UK.

### Yaw Adjei
- **Email:** y.adjei@gbaabw.org
- **Phone:** +251 91 234 5006
- **Department:** Communications
- **Designation:** Communications Lead
- **Bio:** Seasoned communications professional specializing in public relations, digital media, and brand strategy.

## Troubleshooting

### Database Connection Issues
Make sure your `.env` file has the correct `MONGO_URI` value:
```
MONGO_URI=mongodb://localhost:27017/gbaabw
```

### Script Not Found
Make sure you're running the command from the `backend` directory.

### Permission Errors
The script requires database write permissions. Make sure your MongoDB user has the necessary privileges.

## After Seeding

Once the leadership data is seeded:
1. Visit `/leadership` on your frontend to see the leadership page
2. Go to **Manage → Leadership Management** in the admin panel to edit members
3. You can update photos, bios, and other details through the admin interface

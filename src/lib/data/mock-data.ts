import {
  SiteSettings,
  ServiceTime,
  EventItem,
  Ministry,
  HomeGroup,
  Leader,
  Sermon,
  SermonSeries,
  YoungSaintsClass,
  ManagedPage,
} from '@/types';

export const mockSiteSettings: SiteSettings = {
  id: 1,
  church_name: 'Open Heavens Christian Centre',
  charity_number: '1138247',
  address_line1: 'Unit 1, The Exchange, 150-152 High Street',
  address_line2: '',
  city: 'Edgware',
  postcode: 'HA8 7EL',
  country: 'United Kingdom',
  primary_phone: '+44 (0)20 8952 1234',
  secondary_phone: '+44 (0)79 1234 5678',
  contact_email: 'info@openheavens.org.uk',
  social_facebook: 'https://facebook.com/openheavensuk',
  social_instagram: 'https://instagram.com/openheavensuk',
  social_youtube: 'https://youtube.com/@openheavensuk',
  bank_name: 'Barclays Bank UK PLC',
  bank_account_name: 'Open Heavens Christian Centre',
  bank_sort_code: '20-00-00',
  bank_account_number: '12345678',
  gift_aid_notice:
    'As a registered UK charity (No. 1138247), we can reclaim 25p on every £1 you give at no extra cost to you if you are a UK taxpayer.',
  safeguarding_lead_name: 'Sarah Jenkins',
  safeguarding_lead_email: 'safeguarding@openheavens.org.uk',
  safeguarding_policy_url: '/safeguarding',
};

export const mockServiceTimes: ServiceTime[] = [
  {
    id: '1',
    title: 'Sunday Celebration & Worship',
    day_of_week: 'Sunday',
    start_time: '10:30',
    end_time: '12:30',
    description: 'Inspirational worship, biblical teaching, and fellowship. Young Saints children church runs concurrently.',
    venue: 'Main Auditorium, Edgware',
    is_active: true,
    display_order: 1,
  },
  {
    id: '2',
    title: 'Midweek Bible Study & Prayer',
    day_of_week: 'Wednesday',
    start_time: '19:00',
    end_time: '20:30',
    description: 'Interactive scripture discussion and corporate intercession. Available in-person and online.',
    venue: 'Main Auditorium & Online Livestream',
    is_active: true,
    display_order: 2,
  },
  {
    id: '3',
    title: 'Monthly Night of Overflow',
    day_of_week: 'Friday',
    start_time: '22:00',
    end_time: '01:00',
    description: 'First Friday of every month: extended praise, holy communion, and targeted prayer.',
    venue: 'Main Auditorium, Edgware',
    is_active: true,
    display_order: 3,
  },
];

export const mockEvents: EventItem[] = [
  {
    id: '1',
    title: 'Kingdom Couples Banquet 2026',
    slug: 'kingdom-couples-banquet-2026',
    description:
      'An evening designed for married and engaged couples to invest in their relationship, enjoy a 3-course dinner, and receive wisdom on building a resilient Christian marriage.',
    date: '2026-12-05',
    start_time: '18:30',
    end_time: '21:30',
    venue: 'The Exchange Hall, Edgware',
    image_url: '/placeholder-event.svg',
    image_alt: 'Couples banquet hall and table setting',
    registration_url: 'https://openheavens.org.uk/register/couples',
    is_recurring: false,
    status: 'published',
  },
  {
    id: '2',
    title: 'Community Carols by Candlelight',
    slug: 'community-carols-by-candlelight',
    description:
      'Celebrate Christmas with classic carols, festive choir performances, mince pies, warm refreshments, and an uplifting message for all ages.',
    date: '2026-12-20',
    start_time: '17:00',
    end_time: '19:00',
    venue: 'Main Auditorium, Edgware',
    image_url: '/placeholder-event.svg',
    image_alt: 'Candlelight service in church auditorium',
    is_recurring: false,
    status: 'published',
  },
  {
    id: '3',
    title: 'CrossOver Vision Night 2026/2027',
    slug: 'crossover-vision-night-2026-2027',
    description:
      'Entering the New Year in prayer, thanksgiving, and prophetic declaration for the season ahead.',
    date: '2026-12-31',
    start_time: '21:00',
    end_time: '00:30',
    venue: 'Main Auditorium, Edgware',
    image_url: '/placeholder-event.svg',
    image_alt: 'New Year cross over service gathering',
    is_recurring: false,
    status: 'published',
  },
];

export const mockMinistries: Ministry[] = [
  {
    id: '1',
    name: 'Men of Honour',
    slug: 'men-of-honour',
    description:
      'Equipping men to walk in integrity, lead their families faithfully, and support each other through fellowship and prayer.',
    times: '2nd Saturday of each month at 08:30 AM',
    location: 'Church Fellowship Hall & Online',
    leader_name: 'Bro. Emmanuel Davies',
    contact_email: 'men@openheavens.org.uk',
    image_url: '/placeholder-ministry.svg',
    image_alt: 'Men of Honour meeting and discussion',
    is_active: true,
    display_order: 1,
  },
  {
    id: '2',
    name: 'Virtuous Women',
    slug: 'virtuous-women',
    description:
      'A supportive sisterhood empowering women to thrive in faith, career, family, and community leadership.',
    times: '3rd Saturday of each month at 10:00 AM',
    location: 'Church Auditorium',
    leader_name: 'Sister Grace Thomas',
    contact_email: 'women@openheavens.org.uk',
    image_url: '/placeholder-ministry.svg',
    image_alt: 'Virtuous Women fellowship gathering',
    is_active: true,
    display_order: 2,
  },
  {
    id: '3',
    name: 'Ignite Youth & Young Adults',
    slug: 'ignite-youth',
    description:
      'A vibrant community for ages 13-25 exploring relevant biblical truth, creative arts, and social connection.',
    times: 'Fridays at 18:30 PM',
    location: 'Youth Lounge, Edgware',
    leader_name: 'Bro. Michael Adebayo',
    contact_email: 'youth@openheavens.org.uk',
    image_url: '/placeholder-ministry.svg',
    image_alt: 'Youth and young adult fellowship',
    is_active: true,
    display_order: 3,
  },
  {
    id: '4',
    name: 'Open Heavens Worship Collective',
    slug: 'worship-collective',
    description:
      'Leading the congregation into authentic, Spirit-led worship through musical excellence and devotion.',
    times: 'Thursdays at 19:30 PM (Rehearsals)',
    location: 'Main Auditorium',
    leader_name: 'Minister Joy Richards',
    contact_email: 'worship@openheavens.org.uk',
    image_url: '/placeholder-ministry.svg',
    image_alt: 'Worship band and vocal team',
    is_active: true,
    display_order: 4,
  },
  {
    id: '5',
    name: 'Community Outreach & Food Hub',
    slug: 'community-outreach',
    description:
      'Serving vulnerable families in Edgware and North London through food parcels, elderly visits, and local charity partnerships.',
    times: 'Saturdays at 11:00 AM',
    location: 'Edgware Community Centre',
    leader_name: 'Deacon Marcus Vance',
    contact_email: 'outreach@openheavens.org.uk',
    image_url: '/placeholder-ministry.svg',
    image_alt: 'Volunteers preparing community food boxes',
    is_active: true,
    display_order: 5,
  },
];

export const mockHomeGroups: HomeGroup[] = [
  {
    id: '1',
    name: 'Edgware Central Connect',
    area: 'Edgware',
    day_of_week: 'Tuesday',
    meeting_time: '19:30',
    leader_name: 'Pastor David & Bola',
    virtual_instructions: 'Hybrid group. Detailed area directions provided upon leader confirmation.',
    is_active: true,
    description: 'Weekly sermon recap, fellowship, and mutual prayer.',
  },
  {
    id: '2',
    name: 'Stanmore & Canons Park Group',
    area: 'Stanmore',
    day_of_week: 'Thursday',
    meeting_time: '19:30',
    leader_name: 'Bro. Peter Smith',
    virtual_instructions: 'In-person meeting in Stanmore area.',
    is_active: true,
    description: 'Focus on family discipleship and topical scripture study.',
  },
  {
    id: '3',
    name: 'Mill Hill & Colindale Fellowship',
    area: 'Mill Hill',
    day_of_week: 'Tuesday',
    meeting_time: '20:00',
    leader_name: 'Sister Chioma Eze',
    virtual_instructions: 'Online video meeting with monthly in-person brunches.',
    is_active: true,
    description: 'Convenient for busy professionals and students.',
  },
  {
    id: '4',
    name: 'Harrow & Queensbury LifeGroup',
    area: 'Harrow',
    day_of_week: 'Wednesday',
    meeting_time: '19:30',
    leader_name: 'Bro. Daniel & Ruth Kalu',
    virtual_instructions: 'In-person gathering across Harrow area.',
    is_active: true,
    description: 'Encouraging Christian walk and community support.',
  },
  {
    id: '5',
    name: 'Burnt Oak Care Group',
    area: 'Burnt Oak',
    day_of_week: 'Thursday',
    meeting_time: '19:00',
    leader_name: 'Deaconess Abigail Mensah',
    virtual_instructions: 'In-person gathering in Burnt Oak area.',
    is_active: true,
    description: 'Intercessory prayer and pastoral care.',
  },
];

export const mockLeaders: Leader[] = [
  {
    id: '1',
    name: 'Pastor John Adebayo',
    role: 'Senior Pastor',
    bio: 'Pastor John has faithfully served Open Heavens Christian Centre since 2012, bringing biblical teaching, pastoral warmth, and vision for community transformation.',
    photo_url: '/placeholder-leader.svg',
    photo_alt: 'Portrait of Senior Pastor John Adebayo',
    display_order: 1,
    is_active: true,
  },
  {
    id: '2',
    name: 'Pastor Sarah Adebayo',
    role: 'Associate Pastor & Family Ministries',
    bio: 'Pastor Sarah oversees family care, counseling, and women’s discipleship, fostering healthy Christian relationships and leadership development.',
    photo_url: '/placeholder-leader.svg',
    photo_alt: 'Portrait of Associate Pastor Sarah Adebayo',
    display_order: 2,
    is_active: true,
  },
  {
    id: '3',
    name: 'Minister David Okon',
    role: 'Director of Discipleship & Home Groups',
    bio: 'David helps newcomers connect into community life and leads our discipleship tracks and cell groups.',
    photo_url: '/placeholder-leader.svg',
    photo_alt: 'Portrait of Minister David Okon',
    display_order: 3,
    is_active: true,
  },
  {
    id: '4',
    name: 'Minister Joy Richards',
    role: 'Worship & Creative Arts Lead',
    bio: 'Joy guides our music ministry team with passion for authentic worship and vocal excellence.',
    photo_url: '/placeholder-leader.svg',
    photo_alt: 'Portrait of Minister Joy Richards',
    display_order: 4,
    is_active: true,
  },
];

export const mockSeries: SermonSeries[] = [
  {
    id: '3',
    title: 'The Long Road Back',
    slug: 'the-long-road-back',
    description: 'What the story of the prodigal son says to anyone who wonders if it is too late to come back.',
    image_url: '/church-pew.jpg',
    image_alt: 'The Long Road Back series artwork',
  },
  {
    id: '1',
    title: 'Walking in Divine Purpose',
    slug: 'walking-in-divine-purpose',
    description: 'A study on discovering God’s eternal design for every believer.',
    image_url: '/placeholder-series.svg',
    image_alt: 'Walking in Divine Purpose series artwork',
  },
  {
    id: '2',
    title: 'Unshakable Faith',
    slug: 'unshakable-faith',
    description: 'Lessons from scripture on standing firm in times of cultural uncertainty.',
    image_url: '/placeholder-series.svg',
    image_alt: 'Unshakable Faith series artwork',
  },
];

export const mockSermons: Sermon[] = [
  {
    id: '1',
    title: 'Finding Your Way Home',
    slug: 'finding-your-way-home',
    date: '2026-11-01',
    series_id: '3',
    series_title: 'The Long Road Back',
    speaker: 'Pastor Michael',
    scripture: 'Luke 15:11, 32',
    duration: '34 min',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audio_url: '',
    notes: 'What the story of the prodigal son says to anyone who wonders if it’s too late to come back.',
    is_featured: true,
    status: 'published',
  },
  {
    id: '2',
    title: 'Faith in Ordinary Life',
    slug: 'faith-in-ordinary-life',
    date: '2026-10-25',
    series_id: '3',
    series_title: 'The Long Road Back',
    speaker: 'Pastor Michael',
    duration: '29 min',
    scripture: 'Colossians 3:17',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audio_url: '',
    notes: 'Bringing sacred intentionality and Christ’s peace into modern daily work and family routines.',
    is_featured: false,
    status: 'published',
  },
  {
    id: '3',
    title: 'The Courage to Begin',
    slug: 'the-courage-to-begin',
    date: '2026-10-18',
    series_id: '3',
    series_title: 'The Long Road Back',
    speaker: 'Pastor Michael',
    duration: '31 min',
    scripture: 'Joshua 1:9',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audio_url: '',
    notes: 'Stepping out in obedience when the future feels uncertain.',
    is_featured: false,
    status: 'published',
  },
  {
    id: '4',
    title: 'Hope for the Journey',
    slug: 'hope-for-the-journey',
    date: '2026-10-11',
    series_id: '3',
    series_title: 'The Long Road Back',
    speaker: 'Guest Speaker',
    duration: '37 min',
    scripture: 'Romans 15:13',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audio_url: '',
    notes: 'An anchor for the soul through every season of waiting.',
    is_featured: false,
    status: 'published',
  },
  {
    id: '5',
    title: 'Living with Eternal Clarity',
    slug: 'living-with-eternal-clarity',
    date: '2026-11-15',
    series_id: '1',
    series_title: 'Walking in Divine Purpose',
    speaker: 'Pastor John Adebayo',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audio_url: '',
    notes: 'Key Scriptures: Ephesians 1:3, 14; Romans 8:28. Understanding God’s sovereignty in our daily decisions.',
    is_featured: false,
    status: 'published',
  },
];

export const mockYoungSaintsClasses: YoungSaintsClass[] = [
  {
    id: '1',
    name: 'Little Lambs (Crèche)',
    age_range: '0 - 2 years',
    time: '10:45 - 12:30',
    room: 'Room 101 (Ground Floor)',
    leader_name: 'Sister Rachel M.',
    description: 'Clean, safe, and staffed sensory space for infants with nursing facilities.',
    display_order: 1,
  },
  {
    id: '2',
    name: 'Kingdom Sparks',
    age_range: '3 - 5 years (Preschool & Reception)',
    time: '10:45 - 12:30',
    room: 'Room 102 (Lower Hall)',
    leader_name: 'Sister Hannah B.',
    description: 'Interactive Bible stories, fun worship songs, and craft projects.',
    display_order: 2,
  },
  {
    id: '3',
    name: 'Faith Explorers',
    age_range: '6 - 11 years (Years 1 - 6)',
    time: '10:45 - 12:30',
    room: 'Upper Hall A',
    leader_name: 'Bro. Samuel K.',
    description: 'Engaging scripture lessons, group discussions, and Christian life application.',
    display_order: 3,
  },
  {
    id: '4',
    name: 'Young Saints Teens',
    age_range: '12 - 17 years (Years 7 - 13)',
    time: '10:45 - 12:30',
    room: 'Youth Hub (Room 204)',
    leader_name: 'Bro. Michael Adebayo',
    description: 'Relevant discussions covering faith, identity, school life, and discipleship.',
    display_order: 4,
  },
];

export const mockPages: Record<string, ManagedPage> = {
  about: {
    id: '1',
    slug: 'about',
    title: 'About Open Heavens Christian Centre',
    summary: 'Our mission, vision, core values, history, and leadership serving Edgware and beyond.',
    content: `## Who We Are
Open Heavens Christian Centre is a vibrant, multi-ethnic, Bible-believing church rooted in the heart of Edgware, London. We are a registered UK charity (No. 1138247) dedicated to worshiping God, preaching the Gospel, and actively serving our community.

## Our Mission
To know Christ and to make Him known across London, the UK, and beyond.

## Our Core Beliefs
- **The Scriptures:** The Bible is the inspired and authoritative Word of God.
- **The Trinity:** One God in three persons: Father, Son, and Holy Spirit.
- **Salvation:** Forgiveness and eternal life through grace in Jesus Christ.
- **Community:** The local church as an authentic, caring spiritual family.`,
    meta_title: 'About Us | Open Heavens Christian Centre Edgware',
    meta_description: 'Learn about Open Heavens Christian Centre in Edgware, London: our biblical mission, vision, leadership team, and history as a registered UK charity.',
    updated_at: '2026-11-20T12:00:00Z',
  },
  'im-new': {
    id: '2',
    slug: 'im-new',
    title: 'Plan Your Visit to Open Heavens',
    summary: 'Everything you need to know before attending your first Sunday service with us.',
    content: `## What to Expect
You will find a warm welcome, heartfelt worship, and practical Bible teaching. Dress comfortably — everyone is welcome.

## Service Duration
Our Sunday service lasts approximately 105 minutes (10:30 AM to 12:15 PM).

## Parking & Public Transport
- **Underground:** Edgware Station (Northern Line) is a 4-minute walk.
- **Buses:** Multiple lines stop within 100 metres (32, 107, 142, 204, 221, 240, 288, 292, 303, 384).
- **Parking:** Dedicated church bays behind The Exchange, plus nearby council parking.

## Accessibility
Full step-free access, wheelchair accessible facilities, and hearing loop installed.`,
    meta_title: 'Plan Your Visit | Open Heavens Christian Centre Edgware',
    meta_description: 'First time at Open Heavens Christian Centre? Discover service times, parking and tube directions, accessibility, and children’s check-in details.',
    updated_at: '2026-11-20T12:00:00Z',
  },
  privacy: {
    id: '3',
    slug: 'privacy',
    title: 'Privacy Policy',
    summary: 'How we handle and protect your personal data in accordance with UK GDPR.',
    content: `## Data Protection Notice
Open Heavens Christian Centre (Registered Charity No. 1138247) respects your privacy and is committed to protecting your personal information.

- **Information Collected:** Contact inquiries, prayer requests, first-time visitor details, and Gift Aid declarations.
- **Usage:** Used solely for pastoral care and church administration with your consent. We never sell your data.
- **Retention:** Prayer requests are retained for up to 90 days before secure deletion. General inquiries are kept up to 12 months.
- **Your Rights:** You have the right to request access or deletion of your data by emailing info@openheavens.org.uk.`,
    meta_title: 'Privacy Policy | Open Heavens Christian Centre',
    meta_description: 'Read the official Privacy Policy of Open Heavens Christian Centre in Edgware, London.',
    updated_at: '2026-11-20T12:00:00Z',
  },
  cookies: {
    id: '4',
    slug: 'cookies',
    title: 'Cookie Policy',
    summary: 'Explanation of essential and functional cookies used on this site.',
    content: `## Our Cookie Usage
We only use essential cookies necessary for website security and remembering your cookie consent preference. We do not use intrusive third-party advertising cookies.`,
    meta_title: 'Cookie Policy | Open Heavens Christian Centre',
    meta_description: 'Our cookie policy outlines how cookies are utilized on our website.',
    updated_at: '2026-11-20T12:00:00Z',
  },
  safeguarding: {
    id: '5',
    slug: 'safeguarding',
    title: 'Safeguarding Policy',
    summary: 'Our commitment to the safety of children, youth, and vulnerable adults.',
    content: `## Commitment to Safeguarding
Open Heavens Christian Centre maintains the highest standards of protection and care for children, young people, and vulnerable adults.

- **Named Safeguarding Lead:** Sarah Jenkins (safeguarding@openheavens.org.uk)
- **Deputy Lead:** Deacon Marcus Vance
- **DBS Verification:** All children and youth volunteers undergo mandatory DBS checks and safeguarding training.
- **Secure Check-In:** Young Saints operates a secure parent check-in and collection protocol.`,
    meta_title: 'Safeguarding Policy | Open Heavens Christian Centre',
    meta_description: 'Safeguarding policies and designated lead contact information for Open Heavens Christian Centre.',
    updated_at: '2026-11-20T12:00:00Z',
  },
};

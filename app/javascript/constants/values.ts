export type Value = {
  id: string;
  name: string;
  good: string;
  bad: string;
};

const VALUES: Value[] = [
  {
    id: 'value',
    name: 'Delivering value',
    good:
      'We deliver great stuff! We’re proud of it and our stakeholders are really happy.',
    bad:
      'We deliver crap. We feel ashamed to deliver it. Our stakeholders hate us.',
  },
  {
    id: 'release',
    name: 'Easy to Release',
    good: 'Releasing is simple, safe, painless and mostly automated.',
    bad: 'Releasing is risky, painful, lots of manual work and takes forever.',
  },
  {
    id: 'fun',
    name: 'Fun',
    good: 'We love going to work and have great fun working together!',
    bad: 'Boooooooring…',
  },
  {
    id: 'health',
    name: 'Health of Codebase',
    good:
      'We’re proud of the quality of our code! It is clean, easy to read and has great test coverage.',
    bad:
      'Our code is a pile of dung and technical debt is raging out of control.',
  },
  {
    id: 'learn',
    name: 'Learning',
    good: 'We’re learning lots of interesting stuff all the time!',
    bad: 'We never have time to learn anything.',
  },
  {
    id: 'mission',
    name: 'Mission',
    good: 'We know why we are here and we’re really excited about it!',
    bad:
      'We have no idea why we are here. There’s no high lever picture or focus. Our so-called mission is completely unclear and uninspiring.',
  },
  {
    id: 'pawn',
    name: 'Pawns or Players',
    good:
      'We are in control of our own destiny! We decide what to build and how to build it.',
    bad:
      'We are just pawns in a game of chess with no influence over what we build or how we build it.',
  },
  {
    id: 'speed',
    name: 'Speed',
    good: 'We get stuff done really quickly! No waiting and no delays.',
    bad:
      'We never seem to get anything done. We keep getting stuck or interrupted. Stories keep getting stuck on dependencies.',
  },
  {
    id: 'process',
    name: 'Suitable Process',
    good: 'Our way of working fits us perfectly!',
    bad: 'Our way of working sucks!',
  },
  {
    id: 'support',
    name: 'Support',
    good: 'We always get great support and help when we ask for it!',
    bad:
      'We keep getting stuck because we can’t get the support and help that we ask for.',
  },
  {
    id: 'teamwork',
    name: 'Teamwork',
    good: 'We are a totally gelled super-team with awesome collaboration!',
    bad:
      'We are a bunch of individuals that neither know nor care about what the other people in the squad are doing.',
  },
];

export default VALUES;

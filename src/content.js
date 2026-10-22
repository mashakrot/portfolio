const P = 'https://mashakrot.github.io/'
const IMG = `${import.meta.env.BASE_URL}assets/`
const AALTO_LOGO = `${IMG}aalto_logo.jpg`
const LUT_LOGO = `${IMG}lut_logo.jpg`
const HEIBEI_LOGO = `${IMG}heibei_logo.png`
const SITE = 'marija.dev'
const SOCIALS = [
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/marija-krotova-361970160/' },
  { label: 'GitHub', icon: 'github', href: 'https://github.com/mashakrot' },
  { label: 'Kaggle', icon: 'kaggle', href: 'https://www.kaggle.com/marykro' },
  { label: 'Telegram', icon: 'telegram', href: 'https://t.me/m_krot' },
  { label: 'Email', icon: 'email', href: 'mailto:Marija.Krotova.dev@gmail.com' },
]


export const CONTENT = {
  about: {
    title: 'About me',
    body: [{
      window: {
        address: `${SITE}/about`,
        tab: 'about_me',
        name: 'Marija',
        role: 'React Developer · CS Master’s Student',
        rows: [
          { icon: 'code', h: 'Hi, I’m Marija! 👋', text: 'I’m a developer who enjoys turning ideas into interactive experiences, from playful web interfaces to machine learning projects.' },
          { icon: 'school', h: 'Aalto University', text: 'Currently pursuing my Master’s in Computer Science, exploring the intersection of software development, data, and intelligent systems.' },
          // { icon: 'chat', h: 'Let’s connect!', text: 'Have an interesting idea, a fun project, or just want to talk tech? I’d love to hear from you.' },
        ],
        tags1: [
          'Machine Learning',
          'Computer Vision',
          'Data Analytics',
          'Full-Stack Development',
          'Animation',
        ],
        tags: ['Python', 'JavaScript', 'TypeScript', 'React', 'TensorFlow', 'Keras', 'SQL'],
        now: ['Machine Learning', 'Computer Vision', 'Data Analytics', 'Full-Stack Development', 'Animation'],
        socials: SOCIALS,
      },
    }],
  },


  projects: {
    title: 'Projects',
    address: `${SITE}/projects`,
    body: [
      {
        h: 'WEB & ANIMATION',
        tab: 'Web',
        projects: [
          {
            name: 'iPhone 15 Pro',
            img: `${IMG}covers/iphone.png`,
            description: 'Apple website recreation with GSAP animations and Three.js 3D effects.',
            href: `${P}apple_website/`,
            tech: ['React', 'GSAP', 'Three.js'],
          },
          {
            name: 'Brainwave',
            img: `${IMG}covers/brain.png`,
            description: 'Responsive AI startup landing page with polished motion and layouts.',
            href: `${P}brainwave/`,
            tech: ['Next.js', 'Framer Motion', 'Tailwind'],
          },
          {
            name: 'YC Directory',
            description: 'Startup discovery platform with GitHub login, search and Editor Picks.',
            href: 'https://startupsdirectory.vercel.app/',
            tech: ['Next.js 15', 'React 19', 'API'],
          },
          {
            name: 'GSAP City Animation',
            img: `${IMG}covers/hongkong.png`,
            description: 'Scroll-driven animated cityscape.',
            href: `${P}gsap_city_animation/`,
            tech: ['GSAP', 'ScrollTrigger'],
          },
          {
            name: 'Animated 3D Image Slider',
            img: `${IMG}covers/slider.png`,
            description: 'Stunning 3D image slider with 3-dimensional auto-rotations — using pure CSS.',
            href: `https://mashakrot.github.io/3D_image_slider/`,
            tech: ['CSS', 'Animation'],
          },
          // {
          //   name: 'Animated 3D Image Slider',
          //   img: `${IMG}covers/bottle.png`,
          //   description: 'Stunning 3D product viewer demonstrates smooth three-dimensional space.',
          //   href: `https://mashakrot.github.io/3D_rotation_effect/`,
          //   tech: ['CSS', 'Animation'],
          // },
        ],
      },
      {
        h: 'MACHINE LEARNING & DATA ANALYTICS',
        tab: 'ML & Data',
        projects: [
          {
            name: 'Real-time Object Detection',
            img: `${IMG}covers/thesis.png`,
            description: 'Bachelor’s thesis on dataset creation, YOLO training and real-world implementation.',
            href: 'https://lutpub.lut.fi/handle/10024/172232',
            tech: ['Python', 'YOLO', 'Computer Vision'],
          },
          {
            name: 'Face Blur',

            description: 'Web app for blurring faces in images and video.',
            href: 'https://github.com/mashakrot/face_blur',
            tech: ['Flask', 'OpenCV', 'MediaPipe'],
          },
          {
            name: 'Pneumonia Classifier',
            description: 'CNN-based classification of X-ray images.',
            href: 'https://github.com/mashakrot/pneumonia_classifier',
            tech: ['TensorFlow', 'CNN'],
          },
          {
            name: 'Breast Cancer Classification',
            description: 'Logistic regression model to predict tumor type.',
            href: 'https://www.kaggle.com/code/marykro/logistic-regression-on-breast-cancer',
            tech: ['TensorFlow', 'CNN'],
          },
          {
            name: 'Flight Delay Analysis',
            description: 'Exploratory data analysis of flight delay data.',
            href: 'https://www.kaggle.com/code/marykro/flight-delay-exploratory-data-analysis',
            // tech: ['Python', 'Pandas', 'Matplotlib'],
            tech: [''],
          },
          // {
          //   name: 'Wordle Tweet Dataset EDA',
          //   description: ' Exploratory data analysis of a Wordle tweet dataset.',
          //   href: 'https://www.kaggle.com/code/marykro/wordle-tweet-dataset-eda',
          //   tech: [''],
          // },

          // {
          //   name: 'MNIST Digit Recognizer',
          //   description: 'A neural network for handwritten digit classification from scratch.',
          //   href: 'https://www.kaggle.com/code/marykro/mnist-nn-digit-recognizer',
          //   tech: ['Python', 'Neural Networks'],
          // },
        ],
      },
      {
        h: 'EXPLORE MORE',
        text: 'Find more experiments, datasets and projects on my GitHub and Kaggle.',
        links: [
          { label: 'GitHub', href: 'https://github.com/mashakrot' },
          { label: 'Kaggle', href: 'https://www.kaggle.com/marykro' },
        ],
      },
    ],
  },


  experience: {
    title: 'Experience',
    address: `${SITE}/experience`,
    body: [
      {
        h: 'Junior .NET Developer',
        company: 'UVS Group',
        sub: '06.2025 – 08.2025 · Vilnius',
        bullets: [
          'Built and maintained applications with C#, .NET Core and Entity Framework Core.',
          'Designed desktop interfaces with Avalonia and MAUI.',
          'Wrote unit tests, worked with SQL Server and built REST APIs.',
        ],
        tech: ['C#', '.NET', 'SQL Server'],
      },
      {
        h: 'Front-End Developer',
        company: 'Freelance',
        sub: '2022 – 2024 · Remote',
        bullets: [
          'Developed responsive web apps with React, Tailwind CSS, GSAP and TypeScript.',
          'Built website recreations, animated UI and a statistical app with a focus on accessibility and performance.',
        ],
        tech: ['React', 'TypeScript', 'GSAP'],
      },
      {
        h: 'Technical Payment Support',
        company: 'Shift4 Payments',
        sub: '06.2024 – 08.2024 · Vilnius',
        bullets: [
          'Resolved 200+ customer inquiries monthly with a 90% satisfaction rate.',
          'Configured and troubleshot 100+ card payment terminals.',
        ],
        tech: ['Technical Support', 'Troubleshooting'],
      },
      {
        h: 'System Maintenance Specialist',
        company: 'JSC Softra',
        sub: '10.2022 – 08.2023 · Vilnius',
        bullets: [
          'Diagnosed 50+ equipment issues monthly, reducing downtime by 20%.',
          'Optimized a license plate recognition system to 95% detection accuracy.',
          'Helped resolve 70+ software bugs with the development team.',
        ],
        tech: ['System Maintenance', 'Computer Vision'],
      },
    ],
  },


  education: {
    title: 'Education',
    address: `${SITE}/education`,
    body: [
      {
        uni: 'Aalto University',
        h: 'MSc in Computer Science',
        logo: AALTO_LOGO, sub: '2026 – 2028'
      },
      {
        uni: 'LUT University',
        h: 'BSc in Software and Systems Engineering (Double degree)',
        logo: LUT_LOGO, sub: '2023 – 2026 · Lahti, Finland'
      },
      { list: ['GPA 4.4/5', `Bachelor thesis on real-time object detection   \n  with YOLO models (5/5)`, 'LUT Distinction Scholarship (2026)'] },
      {
        uni: 'Hebei University of Technology',
        h: 'BSc in Software and Systems Engineering (Double degree)',
        logo: HEIBEI_LOGO, sub: '2023 – 2026 · Lahti, Finland'
      },
      { list: ['GPA 4.4/5'] },
    ],
  },

  // TODO: change phrase
  contact: {
    title: 'Contact',
    address: `${SITE}/contact`,
    body: [
      { h: "Let's connect!" },
      "I'm happy to chat about projects or ML and web development or any other interesting and fun stuff.",
      {
        icons: [
          { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/marija-krotova-361970160/' },
          { label: 'Kaggle', icon: 'kaggle', href: 'https://www.kaggle.com/marykro' },
          { label: 'GitHub', icon: 'github', href: 'https://github.com/mashakrot' },
          { label: 'Email', icon: 'email', href: 'mailto:Marija.Krotova.dev@gmail.com' },
          { label: 'Telegram', icon: 'telegram', href: 'https://t.me/m_krot' },
        ],
      },
    ],
  },
}
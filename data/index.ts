const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const navItems = [
  // { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experince", link: "#experince" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: `${prefix}/b1.svg`,
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: `${prefix}/grid.svg`,
    spareImg: `${prefix}/b4.svg`,
  },

  {
    id: 5,
    title: "Diving into React Native for mobile development",
    // title: "Creating 3D animations for modern design",
    // title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: `${prefix}/b5.svg`,
    spareImg: `${prefix}/grid.svg`,
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

// TODO: change tooltips from links to projects names 
// TODO: add year maybe 


// TODO: add tooltips for icons maaaaybe
export const projects = [
  {
    id: 1,
    title: "Animated Apple Iphone 3D Website",
    des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
    img: `${prefix}/p4.svg`,
    iconLists: [`${prefix}/react.svg`, `${prefix}/tail.svg`, `${prefix}/js.svg`, `${prefix}/three.svg`, `${prefix}/gsap.svg`],
    link: "/apple_website/",
  },
  {
    id: 2,
    title: "Brainwave - AI Landing Page",
    des: "Modern and responsive AI startup landing page built with Next.js, Framer Motion, and TailwindCSS.",
    img: `${prefix}/p51.png`,
    iconLists: [`${prefix}/react.svg`, `${prefix}/tail.svg`, `${prefix}/js.svg`, `${prefix}/ts.svg`],
    link: "/brainwave/",
  },
  {
    id: 3,
    title: "YC Directory – Startup Pitch Platform",
    des: "A modern platform built with Next.js 15 and React 19 for entrepreneurs to pitch, browse, and explore startup ideas. Features include GitHub login, live content API, pitch submissions, search, and Editor Picks — all in a clean minimal UI.",
    img: `${prefix}/p15.png`,
    iconLists: [`${prefix}/react.svg`, `${prefix}/next.svg`, `${prefix}/shad.svg`, `${prefix}/sanity.svg`, `${prefix}/tail.svg`, `${prefix}/ts.svg`],
    link: "https://startupsdirectory.vercel.app/",
  },
  {
    id: 4,
    title: "GSAP City Animation",
    des: "A scroll-driven cityscape built with plain HTML, CSS, and JavaScript, powered by GSAP and its ScrollTrigger plugin.",
    img: `${prefix}/p8.png`,
    iconLists: [`${prefix}/js.svg`, `${prefix}/gsap.svg`],
    link: "/gsap_city_animation/",
  },
  {
    id: 5,
    title: "Interactive 3D Butterfly Animation",
    des: "An interactive 3D butterfly animation built using Three.js, GSAP and JavaScript. It features a .glb 3D model, creating a visually engaging experience.​",
    img: `${prefix}/p10.png`,
    iconLists: [`${prefix}/js.svg`, `${prefix}/three.svg`, `${prefix}/gsap.svg`],
    link: "/3D_butterfly_animation/",
  },
  {
    id: 6,
    title: "Animated 3D Image Slider",
    des: "Stunning 3D image slider with 3-dimensional auto-rotations — using pure CSS.",
    img: `${prefix}/p6.png`,
    iconLists: [],
    // iconLists: [`${prefix}/css.svg`, `${prefix}/html.svg`],
    link: "/3D_image_slider/",
  },
  {
    id: 7,
    title: "Interactive 3D Parallax Header",
    des: "Stunning interactive 3D parallax lens effect with Glassmorphism popup — using CSS & JS.",
    img: `${prefix}/p7.png`,
    iconLists: [],
    // iconLists: [`${prefix}/js.svg`, `${prefix}/css.svg`, `${prefix}/html.svg`],
    link: "/parallax_3d_lens_effect/",
  },
  {
    id: 8,
    title: "Interactive 3D Parallax Header",
    des: "Stunning interactive 3D parallax scroll effect — using CSS & JS.",
    img: `${prefix}/p9.png`,
    iconLists: [],
    // iconLists: [`${prefix}/js.svg`, `${prefix}/css.svg`, `${prefix}/html.svg`],
    link: "/parallax_3d_scroll_effect/",
  },
  {
    id: 9,
    title: "Animated 3D Image Slider",
    des: "Stunning 3D product viewer demonstrates smooth three-dimensional space.",
    img: `${prefix}/p11.png`,
    // iconLists: [`${prefix}/css.svg`, `${prefix}/html.svg`],
    iconLists: [],
    link: "/3D_rotation_effect/",
  },
  {
    id: 10,
    title: "Animated 3D Cube Product Viewer",
    des: "3D product viewer with interactive controls, glass effects, and auto-rotations — using pure CSS.",
    img: `${prefix}/p12.png`,
    // iconLists: [`${prefix}/css.svg`, `${prefix}/html.svg`],
    iconLists: [],
    link: "/3d_cube/",
  },
  {
    id: 11,
    title: "Cat Energy - proper cat nutrition",
    des: "A site to browse and book escape room games with a date and time picker and live availability checks.",
    img: `${prefix}/p13.png`,
    // iconLists: [`${prefix}/js.svg`, `${prefix}/less-w.svg`, `${prefix}/css.svg`, `${prefix}/html.svg`],
    iconLists: [],
    link: "https://mashakrot.github.io/cat-energy-public/build/index.html",
  },
  {
    id: 12,
    title: "Escape Room - booking quest rooms",
    des: "A fun one‑page site about cat nutrition, with scroll-triggered reveals and smooth entry animations.",
    img: `${prefix}/p14.png`,
    // iconLists: [`${prefix}/js.svg`, `${prefix}/less-w.svg`, `${prefix}/css.svg`, `${prefix}/html.svg`],
    iconLists: [],
    link: "https://mashakrot.github.io/escape-room-english/build/main.html",
  },
];

export const testimonials = [
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: `${prefix}/cloud.svg`,
    nameImg: `${prefix}/cloudName.svg`,
  },
  {
    id: 2,
    name: "appwrite",
    img: `${prefix}/app.svg`,
    nameImg: `${prefix}/appName.svg`,
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: `${prefix}/host.svg`,
    nameImg: `${prefix}/hostName.svg`,
  },
  {
    id: 4,
    name: "stream",
    img: `${prefix}/s.svg`,
    nameImg: `${prefix}/streamName.svg`,
  },
  {
    id: 5,
    name: "docker.",
    img: `${prefix}/dock.svg`,
    nameImg: `${prefix}/dockerName.svg`,
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Junior .NET Developer –\n UVS Group",
    desc: "Built and maintained .NET applications using C#, EF Core, SQL Server, REST APIs, and modern desktop UIs with Avalonia and MAUI.",
    className: "md:col-span-2",
    thumbnail: `${prefix}/exp4.svg`,
  },
  {
    id: 2,
    title: "Creative Front-End Developer",
    desc: "Developed interactive websites and UI animations using React, Tailwind CSS, and GSAP — showcasing modern front-end expertise.",
    className: "md:col-span-2",
    thumbnail: `${prefix}/exp1.svg`,
  },
  {
    id: 3,
    title: "Technical Payment Support –\n Shift4 Payments",
    desc: "Resolved 200+ monthly client issues in payment systems, ensuring 90% satisfaction and optimal terminal performance.",
    className: "md:col-span-2", 
    thumbnail: `${prefix}/exp2.svg`,
  },
  {
    id: 4,
    title: "System Maintenance –\n JSC Softra",
    desc: "Diagnosed and fixed 50+ monthly faults in automated parking systems, enhancing reliability and cutting downtime by 20%.",
    className: "md:col-span-2", 
    thumbnail: `${prefix}/exp4.svg`,
  },
  // {
  //   id: 4,
  //   title: "Lead Frontend Developer",
  //   desc: "Developed and maintained user-facing features using modern frontend technologies.",
  //   className: "md:col-span-2",
  //   thumbnail: "/exp4.svg",
  // },
];

export const socialMedia = [
  {
    id: 1,
    link: "https://github.com/mashakrot",
    img: `${prefix}/git.svg`,
  },
  {
    id: 2,
    link: "http://t.me/m_krot",
    img: `${prefix}/telegram.svg`,
  },
  // {
  //   id: 2,
  //   link: "https://www.instagram.com/makrosensei_/",
  //   img: "/insta.svg",
  // },
  {
    id: 3,
    link: "https://www.linkedin.com/in/marija-krotova-361970160/",
    img: `${prefix}/link.svg`,
  },
];

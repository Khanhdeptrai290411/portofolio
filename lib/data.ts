// lib/data.ts — Central data store for Kay's portfolio

export const personalInfo = {
  name: "Nguyễn Đình Quốc Khánh",
  nickname: "Kay",
  role: "Fullstack Developer / Web Developer Intern",
  email: "quockhanhhhh28004@gmail.com",
  github: "https://github.com/Khanhdeptrai290411",
  facebook: "https://www.facebook.com/nguyen.inh.quoc.khanh.121003",
  location: "Da Nang, Vietnam",
  university: "VKU – Vietnam Korea University of ICT",
  major: "Information Technology",
  japanese: "N3",
  focus: "Web / Mobile / AI",
  cvPath: "/NGUYEN_DINH_QUOC_KHANH_履歴書.doc",
  avatarPath: "/images/Me.jpg",
};

export const navItems = [
  { id: "home", labelEn: "Home", labelJp: "ホーム" },
  { id: "about", labelEn: "About", labelJp: "自己紹介" },
  { id: "skills", labelEn: "Skills", labelJp: "スキル" },
  { id: "projects", labelEn: "Projects", labelJp: "プロジェクト" },
  { id: "awards", labelEn: "Awards", labelJp: "受賞" },
  { id: "contact", labelEn: "Contact", labelJp: "連絡" },
];

export const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/Khanhdeptrai290411",
    icon: "github",
  },
  {
    id: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/nguyen.inh.quoc.khanh.121003",
    icon: "facebook",
  },
];

export const techStack = [
  // Frontend
  { name: "HTML", category: "Frontend", color: "#e34f26" },
  { name: "CSS", category: "Frontend", color: "#1572b6" },
  { name: "JavaScript", category: "Frontend", color: "#f7df1e" },
  { name: "TypeScript", category: "Frontend", color: "#3178c6" },
  { name: "React", category: "Frontend", color: "#61dafb" },
  { name: "Next.js", category: "Frontend", color: "#ffffff" },
  { name: "Tailwind CSS", category: "Frontend", color: "#06b6d4" },
  { name: "Three.js", category: "Frontend", color: "#ffffff" },
  // Backend
  { name: "Node.js", category: "Backend", color: "#339933" },
  { name: "Express.js", category: "Backend", color: "#ffffff" },
  { name: "PHP", category: "Backend", color: "#777bb4" },
  { name: "Laravel", category: "Backend", color: "#ff2d20" },
  { name: "Python", category: "Backend", color: "#3776ab" },
  { name: "REST API", category: "Backend", color: "#00ff99" },
  // Mobile
  { name: "Flutter", category: "Mobile", color: "#54c5f8" },
  { name: "React Native", category: "Mobile", color: "#61dafb" },
  // Database
  { name: "MySQL", category: "Database", color: "#4479a1" },
  { name: "MongoDB", category: "Database", color: "#47a248" },
  { name: "Firebase", category: "Database", color: "#ffca28" },
  // Tools
  { name: "Socket.IO", category: "Tools", color: "#010101" },
  { name: "WebRTC", category: "Tools", color: "#00ff99" },
  { name: "Git", category: "Tools", color: "#f05032" },
  { name: "GitHub", category: "Tools", color: "#ffffff" },
  { name: "Vercel", category: "Tools", color: "#ffffff" },
  { name: "Docker", category: "Tools", color: "#2496ed" },
  { name: "Figma", category: "Tools", color: "#f24e1e" },
];

export type SkillLevel = "Experienced" | "Familiar" | "Learning";

export interface Skill {
  name: string;
  category: string;
  level: SkillLevel;
  icon?: string;
}

export const skills: Skill[] = [
  // Frontend
  { name: "HTML", category: "Frontend", level: "Experienced" },
  { name: "CSS", category: "Frontend", level: "Experienced" },
  { name: "JavaScript", category: "Frontend", level: "Experienced" },
  { name: "TypeScript", category: "Frontend", level: "Familiar" },
  { name: "ReactJS", category: "Frontend", level: "Experienced" },
  { name: "Next.js", category: "Frontend", level: "Familiar" },
  { name: "Tailwind CSS", category: "Frontend", level: "Experienced" },
  { name: "Three.js", category: "Frontend", level: "Familiar" },
  // Backend
  { name: "Node.js", category: "Backend", level: "Experienced" },
  { name: "ExpressJS", category: "Backend", level: "Experienced" },
  { name: "PHP", category: "Backend", level: "Experienced" },
  { name: "Laravel", category: "Backend", level: "Familiar" },
  { name: "Python", category: "Backend", level: "Familiar" },
  { name: "REST API", category: "Backend", level: "Experienced" },
  // Mobile
  { name: "Flutter", category: "Mobile", level: "Familiar" },
  { name: "React Native", category: "Mobile", level: "Familiar" },
  // Database
  { name: "MySQL", category: "Database", level: "Experienced" },
  { name: "MongoDB", category: "Database", level: "Familiar" },
  { name: "Firebase", category: "Database", level: "Familiar" },
  // Tools
  { name: "Git", category: "Tools", level: "Experienced" },
  { name: "GitHub", category: "Tools", level: "Experienced" },
  { name: "Vercel", category: "Tools", level: "Familiar" },
  { name: "Figma", category: "Tools", level: "Familiar" },
  { name: "Docker", category: "Tools", level: "Learning" },
  // Languages
  { name: "Vietnamese", category: "Languages", level: "Experienced" },
  { name: "English", category: "Languages", level: "Familiar" },
  { name: "Japanese N3", category: "Languages", level: "Familiar" },
];

export interface Project {
  id: string;
  title: string;
  titleJp?: string;
  date: string;
  type: string;
  tech: string[];
  descriptionEn: string;
  descriptionJp: string;
  award?: string;
  awardJp?: string;
  links: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: "hand-to-hand",
    title: "手と手 – Hand to Hand",
    titleJp: "手と手",
    date: "06/2024 – 08/2024",
    type: "Mobile App",
    tech: ["Flutter"],
    descriptionEn:
      "A mobile app developed during Hackathon 2024 organized by NIX and VKU. It promotes environmental awareness and daily eco-friendly actions through challenges, eco-point tracking and community activities.",
    descriptionJp:
      "NIXとVKUが主催するHackathon 2024で開発したモバイルアプリです。チャレンジ、エコポイント追跡、コミュニティ活動を通じて環境意識と日常的なエコ活動を促進します。",
    award: "🏆 First Prize at Hackathon 2024",
    awardJp: "🏆 Hackathon 2024 第1位",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Khanhdeptrai290411/-Hakathon-2024_1st.git",
      },
    ],
  },
  {
    id: "weather-app",
    title: "Weather App",
    date: "06/2024 – 07/2024",
    type: "Mobile App",
    tech: ["React Native", "OpenWeather API"],
    descriptionEn:
      "A mobile app that provides real-time weather updates, city search, temperature, humidity, wind speed and forecast information with a clean responsive UI.",
    descriptionJp:
      "リアルタイムの天気情報、都市検索、気温・湿度・風速・予報などを提供するモバイルアプリです。クリーンでレスポンシブなUIを採用しています。",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Khanhdeptrai290411/WeatherApp-Kay.git",
      },
    ],
  },
  {
    id: "tofus",
    title: "Tofus – Web Design Showcase",
    date: "05/2023 – 08/2023",
    type: "Web Design",
    tech: ["HTML", "CSS", "JavaScript", "Three.js"],
    descriptionEn:
      "A creative web design project and my first team project. It uses Three.js for interactive 3D models and helped me learn teamwork, UI/UX and frontend fundamentals.",
    descriptionJp:
      "初めてのチームプロジェクトで、Three.jsを用いたインタラクティブな3Dモデルを実装しました。チームワーク・UI/UX・フロントエンドの基礎を学びました。",
    award: "🏆 First Prize – Best Web Design at VKU",
    awardJp: "🏆 VKU ベストウェブデザイン 第1位",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Khanhdeptrai290411/BEST-WEB-DESIGN.git",
      },
    ],
  },
  {
    id: "flashcard",
    title: "FlashCard Web",
    date: "04/2024 – 06/2024",
    type: "Web App",
    tech: ["Laravel", "PHP", "MySQL"],
    descriptionEn:
      "A responsive flashcard web application that helps users create, edit and organize flashcards for learning and memorization. Includes authentication, CRUD features and database management.",
    descriptionJp:
      "学習・記憶のためにフラッシュカードの作成・編集・管理ができるレスポンシブWebアプリです。認証・CRUD・データベース管理機能を含みます。",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Khanhdeptrai290411/flash-card-web.git",
      },
    ],
  },
  {
    id: "hearme",
    title: "HearMe App",
    date: "06/2024",
    type: "AI Web Application",
    tech: ["ReactJS", "Python", "AI Model"],
    descriptionEn:
      "An AI-powered web application designed to support communication between hearing individuals and members of the deaf and mute community. Provides sign language learning and real-time sign recognition.",
    descriptionJp:
      "聴覚者と聴覚・言語障害者のコミュニケーションを支援するAI Webアプリです。手話学習とリアルタイム手話認識機能を提供します。",
    award: "🏅 Top 15 – AI For Life Contest",
    awardJp: "🏅 AI For Life コンテスト トップ15",
    links: [
      {
        label: "Frontend",
        url: "https://github.com/Khanhdeptrai290411/Frontend_HearMe.git",
      },
      {
        label: "Backend",
        url: "https://github.com/Khanhdeptrai290411/Backend_HearMe.git",
      },
    ],
  },
  {
    id: "boom-meeting",
    title: "Boom Meeting",
    date: "11/2024 – 12/2024",
    type: "Real-time Communication App",
    tech: ["ReactJS", "ExpressJS", "WebRTC", "Socket.IO"],
    descriptionEn:
      "A real-time communication web app for chatting, making friends and video calls. Built as a fullstack developer in a two-person team. Includes REST APIs, authentication, messaging, call signaling and responsive UI.",
    descriptionJp:
      "チャット・友達作り・ビデオ通話ができるリアルタイムWebアプリです。2人チームでフルスタック開発を担当し、REST API・認証・メッセージング・通話シグナリング・レスポンシブUIを実装しました。",
    links: [
      {
        label: "Frontend",
        url: "https://github.com/Khanhdeptrai290411/Boom-Meeting.git",
      },
      {
        label: "Backend",
        url: "https://github.com/CristalViet/ExpressJsMeetingApp",
      },
    ],
  },
];

export interface Award {
  id: string;
  title: string;
  titleJp: string;
  date: string;
  organizer: string;
  organizerJp: string;
  project: string;
  descriptionEn: string;
  descriptionJp: string;
  image: string;
  logFile: string;
}

export const awards: Award[] = [
  {
    id: "bwd",
    title: "Top 1 Best Web Design 2023/2024",
    titleJp: "ベストウェブデザイン第1位 2023/2024",
    date: "08/2023",
    organizer: "VKU – Vietnam Korea University of ICT",
    organizerJp: "ベトナム韓国情報通信技術大学（VKU）",
    project: "Tofus",
    descriptionEn:
      'Awarded for the "Tofus" project, a creative website built with HTML, CSS, JavaScript and Three.js for interactive 3D modeling. My first web design experience and first team collaboration.',
    descriptionJp:
      "Three.jsを用いたインタラクティブ3Dモデルを備えた「Tofus」プロジェクトで受賞。初めてのウェブデザインおよびチームコラボレーションの経験。",
    image: "/images/Top1BWD.jpg",
    logFile: "achievement_001.log",
  },
  {
    id: "hackathon",
    title: "Top 1 Hackathon 2024",
    titleJp: "ハッカソン2024 第1位",
    date: "08/2024",
    organizer: "VKU & NIX Vietnam",
    organizerJp: "VKU・NIXベトナム",
    project: "手と手 – Hand to Hand",
    descriptionEn:
      'Developed "手と手 – Hand to Hand", a mobile app promoting environmental sustainability. Awarded First Prize for technical innovation and the ability to present ideas effectively in Japanese.',
    descriptionJp:
      "環境持続可能性を促進するモバイルアプリ「手と手」を開発し、技術革新と日本語でのアイデア発表力が評価され第1位を受賞しました。",
    image: "/images/Top1Hakathon.jpg",
    logFile: "achievement_002.log",
  },
  {
    id: "aiforlife",
    title: "Top 15 – AI For Life Contest",
    titleJp: "AI For Life コンテスト トップ15",
    date: "08/2024",
    organizer: "AI For Life Competition",
    organizerJp: "AI For Lifeコンペティション",
    project: "HearMe App",
    descriptionEn:
      "Our team was honored to reach the Top 15 teams in the AI For Life Contest with the HearMe App, an AI accessibility tool for the deaf and mute community.",
    descriptionJp:
      "聴覚・言語障害者向けAIアクセシビリティツール「HearMe」でAI For Lifeコンテストのトップ15に入賞しました。",
    image: "/images/team.jpg",
    logFile: "achievement_003.log",
  },
];

export const interests = [
  { id: "gym", icon: "Dumbbell", labelEn: "Gym", labelJp: "ジム" },
  {
    id: "reading",
    icon: "BookOpen",
    labelEn: "Reading Books",
    labelJp: "読書",
  },
  { id: "coding", icon: "Code2", labelEn: "Coding", labelJp: "コーディング" },
  {
    id: "japan",
    icon: "Languages",
    labelEn: "Japanese Culture",
    labelJp: "日本文化",
  },
];

export const terminalLines = [
  { command: "whoami", output: "Nguyen Dinh Quoc Khanh" },
  {
    command: "cat focus.txt",
    output: "Web Development | Mobile Apps | AI Accessibility",
  },
  {
    command: "echo $STATUS",
    output: "Building meaningful digital products...",
  },
  {
    command: "cat languages.txt",
    output: "Vietnamese | English | Japanese N3",
  },
  { command: "pwd", output: "/home/kay/portfolio" },
];

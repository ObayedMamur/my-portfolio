import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Lucide Icons (using standard SVG paths for independence)
const IconExternal = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
const IconGithub = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const IconLinkedin = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const IconMail = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconMoon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const IconSun = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const IconTerminal = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>;
const IconPlay = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const IconRefresh = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>;
const IconBot = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>;
const IconSend = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconLoader = () => <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="4.93" x2="19.07" y2="7.76"></line></svg>;

const portfolioData = {
  personal: {
    name: "Obayed Mamur",
    title: "SQA Engineer / SDET",
    location: "Dhaka, Bangladesh",
    email: "obayedmamur@gmail.com",
    phone: "+8801707560217",
    website: "https://obayedmamur.com",
    social: {
      linkedin: "https://linkedin.com/in/obayedmamur",
      github: "https://github.com/ObayedMamur",
      wordpress: "https://profiles.wordpress.org/obayedmamur"
    },
    summary: "I'm a Software Quality Assurance Engineer with over 5 years of experience safeguarding product quality across enterprise SaaS and web ecosystems. I design and build robust test automation frameworks — Playwright and TypeScript for UI/API, k6 for performance, and custom AI integrations for edge-case generation — that prevent bugs, cut regression cycles, and let teams ship with confidence. My focus has always been on scalable infrastructure and developer tooling: from architecting the E2E framework for Essential Addons for Elementor (2M+ installs) that reduced manual regression time by 90%, to developing the QA Assistant plugin for streamlined Git branch testing. Today, I continue to drive quality by blending traditional automation with modern LLMs to expand coverage beyond traditional manual limits."
  },
  experience: [
    {
      company: "Startise",
      url: "https://startise.com",
      location: "Dhaka, Bangladesh",
      totalPeriod: "Sep 2021 - May 2026",
      roles: [
        {
          title: "Senior Software Test Engineer",
          period: "Apr 2025 - May 2026",
          description: "Spearheaded the evolution of the company's quality engineering infrastructure. Transitioned the engineering lifecycle from traditional manual validation to a highly autonomous, CI/CD-integrated testing architecture, acting as the primary gatekeeper for production quality.",
          achievements: [
            "Architected a scalable Playwright (TypeScript) framework from the ground up, slashing manual regression times by 90%.",
            "Pioneered AI-assisted testing by integrating LLMs to analyze requirements and auto-generate complex edge-case scenarios.",
            "Established strict GitHub Actions quality gates, preventing critical regressions from reaching upstream beta environments.",
            "Acted as the technical QA lead, debugging PHP/JS codebases to accelerate root-cause isolation and reduce MTTR."
          ]
        },
        {
          title: "Software Test Engineer",
          period: "Sep 2021 - Mar 2025",
          description: "Served as the foundational QA pillar during rapid Agile growth phases. Focused on establishing rigorous exploratory testing protocols and bridging communication gaps between product management and engineering.",
          achievements: [
            "Drove comprehensive manual and functional test cycles for high-velocity two-week sprints.",
            "Standardized defect triage processes across Jira and ClickUp, establishing a reliable bug lifecycle management system."
          ]
        }
      ]
    },
    {
      company: "Flux IT",
      url: "https://fluxit.tech",
      location: "Dhaka, Bangladesh",
      totalPeriod: "Aug 2020 - Aug 2021",
      roles: [
        {
          title: "Software QA & Operations Engineer",
          period: "Aug 2020 - Aug 2021",
          description: "Owned the end-to-end quality lifecycle for a diverse portfolio of client-facing web applications. Acted as the crucial link between client-reported operational issues and technical engineering fixes.",
          achievements: [
            "Executed foundational smoke, sanity, and integration testing across multiple varied client stacks.",
            "Translated complex user feedback into reproducible, actionable technical defect documentation."
          ]
        }
      ]
    }
  ],
  skills: [
    { category: "Test Automation & SDET", items: ["Playwright (JS/TS Advanced)", "k6 (Performance)", "Selenium", "E2E Regression"] },
    { category: "Programming Languages", items: ["JavaScript", "TypeScript", "Python", "PHP (Debugging)"] },
    { category: "API & Backend Testing", items: ["RESTful APIs", "Postman", "Payload Validation", "SQL Database Querying"] },
    { category: "CI/CD & DevOps", items: ["GitHub Actions", "Docker", "Git", "Continuous Testing"] },
    { category: "Manual & Validation", items: ["UI/UX Validation", "Accessibility (WCAG)", "Risk-Based Testing", "Edge-Case ID"] },
    { category: "Agile & Leadership", items: ["Defect Triage", "Code-level Debugging", "Acceptance Criteria", "QA Documentation"] }
  ],
  projects: [
    {
      title: "Essential Addons for Elementor (2M+ Installs)",
      url: "https://essential-addons.com/demos/",
      repo: "https://github.com/ObayedMamur/essential-addons-playwright-automation",
      description: "Architected a comprehensive end-to-end testing framework using Playwright, automating 100+ complex UI widgets and reducing manual regression time by over 90%. Managed Day 0 compatibility testing.",
      tags: ["Playwright", "TypeScript", "E2E", "AI-Enhanced Testing"]
    },
    {
      title: "QA Assistant - WordPress Plugin",
      url: "https://wordpress.org/plugins/qa-assistant/",
      repo: null,
      description: "Developed a powerful WordPress plugin designed specifically for SQA Engineers. Provides advanced Git branch management directly from the WP admin bar to streamline testing different versions.",
      tags: ["WordPress", "PHP", "Tooling", "Git"]
    }
  ],
  education: {
    degree: "B.Sc. in Computer Science & Engineering",
    school: "University of Asia Pacific",
    location: "Dhaka, Bangladesh",
    period: "Apr 2015 - Mar 2019"
  }
};

const AIChatWidget = ({ portfolioInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi! I'm Obayed's AI assistant. Ask me anything about his QA experience, automation skills (Playwright/k6), or how he approaches complex testing scenarios." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = ""; // Canvas handles this automatically
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      
      const systemPrompt = `You are a helpful, professional AI assistant embedded in the portfolio website of Obayed Mamur, a Senior Software Quality Assurance Engineer / SDET. 
      Your goal is to answer questions from recruiters or visitors about Obayed based ONLY on the provided context.
      Be concise, enthusiastic, and highly professional. Limit responses to 2-3 short paragraphs max.
      
      Context about Obayed:
      Name: ${portfolioInfo.personal.name}
      Title: ${portfolioInfo.personal.title}
      Summary: ${portfolioInfo.personal.summary}
      Experience: ${JSON.stringify(portfolioInfo.experience)}
      Skills: ${JSON.stringify(portfolioInfo.skills)}
      Projects: ${JSON.stringify(portfolioInfo.projects)}`;

      const payload = {
        contents: [
          ...messages.filter(m => m.role !== 'model' || m.text !== "Hi! I'm Obayed's AI assistant. Ask me anything about his QA experience, automation skills (Playwright/k6), or how he approaches complex testing scenarios.").map(m => ({
            role: m.role === 'model' ? 'model' : 'user',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const modelReply = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (modelReply) {
        setMessages(prev => [...prev, { role: 'model', text: modelReply }]);
      } else {
        throw new Error("Unexpected response structure");
      }

    } catch (error) {
      console.error("Failed to fetch response:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later or contact Obayed directly!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] flex-col items-end sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex w-[calc(100vw-2rem)] max-w-96 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            style={{ height: 'min(500px, calc(100vh - 7rem))' }}
          >
            {/* Header */}
            <div className="bg-teal-600 dark:bg-teal-700 text-white p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <IconBot />
                <h3 className="font-semibold text-sm">Obayed's AI Assistant</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close Chat"
              >
                <IconX />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-teal-600 text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-600 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <IconLoader />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my experience..."
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-teal-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-0 rounded-full pl-4 pr-12 py-2.5 text-sm text-slate-800 dark:text-slate-200 outline-none transition-all placeholder-slate-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-slate-300 dark:focus:ring-offset-slate-800 dark:disabled:bg-slate-600"
                  aria-label="Send message"
                >
                  <IconSend />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600' : 'bg-teal-600 hover:bg-teal-700'} flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 motion-reduce:transform-none sm:h-14 sm:w-14 dark:focus:ring-offset-slate-900`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <IconX /> : <IconBot />}
      </button>
    </div>
  );
};

const SectionHeading = ({ children, id }) => (
  <motion.h2 
    id={id}
    initial={false}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-4 text-slate-800 dark:text-slate-100"
  >
    <span className="text-teal-600 dark:text-teal-400 font-mono text-sm tracking-wider uppercase font-medium mt-1">//</span>
    {children}
  </motion.h2>
);

// Typewriter component for the header
const TypewriterEffect = ({ text }) => {
  return (
    <span className="inline-block relative">
      {text}
      <span aria-hidden="true" className="relative top-1 ml-1 inline-block h-5 w-1.5 animate-pulse bg-teal-500 motion-reduce:animate-none"></span>
    </span>
  );
};

const IconCode = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;

const LiveTestRunner = () => {
  const [activeTab, setActiveTab] = useState('playwright'); // 'playwright', 'k6', 'terminal'
  const [activeScript, setActiveScript] = useState('playwright'); // 'playwright', 'k6'
  const [status, setStatus] = useState('idle'); // 'idle', 'running', 'passed'
  const [logs, setLogs] = useState([]);
  const terminalRef = useRef(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current && activeTab === 'terminal') {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, activeTab]);

  const runPlaywright = () => {
    if (status === 'running') return;
    setActiveTab('terminal'); 
    setStatus('running');
    setLogs(['$ npx playwright test e2e/portfolio.spec.ts --project=chromium', '']);

    const testSteps = [
      { msg: <span className="text-slate-400">Running 4 tests using 4 workers...</span>, delay: 500 },
      { msg: <span><span className="text-emerald-400">✓</span>  <span className="text-slate-300">e2e/portfolio.spec.ts:12:5</span> › visual regression testing layout scales correctly <span className="text-slate-500">(1.2s)</span></span>, delay: 1800 },
      { msg: <span><span className="text-emerald-400">✓</span>  <span className="text-slate-300">e2e/portfolio.spec.ts:24:5</span> › accessibility (axe-core) checks pass with zero violations <span className="text-slate-500">(843ms)</span></span>, delay: 2700 },
      { msg: <span><span className="text-emerald-400">✓</span>  <span className="text-slate-300">e2e/portfolio.spec.ts:38:5</span> › API mocked intercept for Chat Widget returns 200 OK <span className="text-slate-500">(2.1s)</span></span>, delay: 3900 },
      { msg: <span><span className="text-emerald-400">✓</span>  <span className="text-slate-300">e2e/portfolio.spec.ts:51:5</span> › dark mode toggle updates root DOM classes <span className="text-slate-500">(600ms)</span></span>, delay: 4600 },
      { msg: '', delay: 5000 },
      { msg: <span><span className="text-emerald-400 font-bold">4 passed</span> <span className="text-slate-400">(4.7s)</span></span>, delay: 5100 },
      { msg: <span>To open last HTML report run:</span>, delay: 5300 },
      { msg: <span className="text-cyan-400">  npx playwright show-report</span>, delay: 5500 },
    ];

    testSteps.forEach(({ msg, delay }, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, msg]);
        if (index === testSteps.length - 1) {
          setStatus('passed');
        }
      }, delay);
    });
  };

  const runK6 = () => {
    if (status === 'running') return;
    setActiveTab('terminal');
    setStatus('running');
    setLogs(['$ k6 run performance/load-test.js', '']);

    const testSteps = [
      { msg: <span className="text-slate-400">          /\      |‾‾| /‾‾/   /‾‾/   </span>, delay: 300 },
      { msg: <span className="text-slate-400">     /\  /  \     |  |/  /   /  /    </span>, delay: 400 },
      { msg: <span className="text-slate-400">    /  \/    \    |     (   /   ‾‾\  </span>, delay: 500 },
      { msg: <span className="text-slate-400">   /          \   |  |\  \ |  (‾)  | </span>, delay: 600 },
      { msg: <span className="text-slate-400">  / __________ \  |__| \__\ \_____/ .io</span>, delay: 700 },
      { msg: '', delay: 800 },
      { msg: <span className="text-slate-300">  execution: <span className="text-cyan-400">local</span></span>, delay: 1000 },
      { msg: <span className="text-slate-300">     script: performance/load-test.js</span>, delay: 1100 },
      { msg: <span className="text-slate-300">     output: -</span>, delay: 1200 },
      { msg: '', delay: 1300 },
      { msg: <span className="text-slate-300">  scenarios: (100.00%) 1 scenario, 50 max VUs, 1m40s max duration</span>, delay: 1500 },
      { msg: <span className="text-slate-400">           * default: Up to 50 looping VUs for 1m40s</span>, delay: 1700 },
      { msg: '', delay: 2500 },
      { msg: <span><span className="text-emerald-400">✓</span> status is 200</span>, delay: 3500 },
      { msg: <span><span className="text-emerald-400">✓</span> transaction time &lt; 200ms</span>, delay: 3600 },
      { msg: '', delay: 3700 },
      { msg: <span className="text-emerald-400 font-bold">  ✓ http_req_duration..............: avg=112ms min=45ms med=98ms max=312ms p(90)=145ms p(95)=189ms</span>, delay: 4000 },
      { msg: <span className="text-emerald-400 font-bold">  ✓ http_req_failed................: 0.00%  ✓ 0        ✗ 4312</span>, delay: 4100 },
      { msg: <span className="text-slate-300">    http_reqs......................: 4312   41.32/s</span>, delay: 4200 },
      { msg: <span className="text-slate-300">    iterations.....................: 4312   41.32/s</span>, delay: 4300 },
      { msg: <span className="text-slate-300">    vus............................: 50     min=1      max=50</span>, delay: 4400 },
      { msg: <span className="text-slate-300">    vus_max........................: 50     min=50     max=50</span>, delay: 4500 }
    ];

    testSteps.forEach(({ msg, delay }, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, msg]);
        if (index === testSteps.length - 1) {
          setStatus('passed');
        }
      }, delay);
    });
  };

  const runTests = () => {
    if (activeScript === 'playwright') {
      runPlaywright();
    } else {
      runK6();
    }
  };

  const resetTests = () => {
    setStatus('idle');
    setLogs([]);
    setActiveTab(activeScript);
  };

  return (
    <div className="w-full mt-6 rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 bg-[#0d1117] flex flex-col font-mono text-sm">
      {/* IDE Header */}
      <div className="flex flex-col gap-2 border-b border-slate-700/50 bg-slate-800/80 p-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="code-scroll flex min-w-0 gap-1 overflow-x-auto" role="tablist" aria-label="Automation demo views">
           <button 
             onClick={() => { setActiveTab('playwright'); setActiveScript('playwright'); if (status !== 'running') setStatus('idle'); }}
             className={`flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded px-2 transition-colors cursor-pointer ${activeTab === 'playwright' ? 'bg-slate-700/80 text-teal-400' : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}`}
             role="tab"
             aria-selected={activeTab === 'playwright'}
             aria-label="Playwright E2E source"
           >
             <IconCode /> <span className="text-xs">Playwright E2E  </span>
           </button>
           <button 
             onClick={() => { setActiveTab('k6'); setActiveScript('k6'); if (status !== 'running') setStatus('idle'); }}
             className={`flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded px-2 transition-colors cursor-pointer ${activeTab === 'k6' ? 'bg-slate-700/80 text-purple-400' : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}`}
             role="tab"
             aria-selected={activeTab === 'k6'}
             aria-label="k6 load test source"
           >
             <IconCode /> <span className="text-xs">k6</span>
           </button>
           <button 
             onClick={() => setActiveTab('terminal')}
             className={`flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded px-2 transition-colors cursor-pointer ${activeTab === 'terminal' ? 'bg-slate-700/80 text-sky-400' : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}`}
             role="tab"
             aria-selected={activeTab === 'terminal'}
           >
             <IconTerminal /> <span className="text-xs">Terminal</span>
           </button>
        </div>
        <div className="flex w-full shrink-0 items-center justify-end sm:ml-auto sm:w-auto">
           {status === 'running' ? (
              <div className="flex min-h-11 items-center gap-2 px-3 text-xs font-medium text-teal-400" role="status">
                <IconLoader /> Running...
              </div>
           ) : (
              <button 
                onClick={status === 'passed' ? resetTests : runTests}
                className={`flex min-h-11 w-full items-center justify-center gap-2 rounded px-4 text-xs font-medium transition-colors sm:w-auto cursor-pointer ${status === 'passed' ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-teal-600 text-white hover:bg-teal-500'}`}
              >
                {status === 'passed' ? <><IconRefresh /> Reset</> : <><IconPlay /> Run {activeScript === 'playwright' ? 'E2E' : 'k6'}</>}
              </button>
           )}
        </div>
      </div>
      
      {/* IDE Body */}
      <div className="relative h-[450px] sm:h-[550px] bg-[#0d1117] w-full">
        {/* Playwright Code View */}
        {activeTab === 'playwright' && (
          <div className="code-scroll absolute inset-0 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-300 sm:text-sm whitespace-pre">
            <span className="text-rose-400">import</span> {'{ test, expect }'} <span className="text-rose-400">from</span> <span className="text-amber-300">'@playwright/test'</span>;<br/>
            <span className="text-rose-400">import</span> {'{ AxeBuilder }'} <span className="text-rose-400">from</span> <span className="text-amber-300">'@axe-core/playwright'</span>;<br/>
            <br/>
            <span className="text-sky-400">test.describe</span>(<span className="text-amber-300">'Portfolio QA Suite'</span>, () <span className="text-sky-400">=&gt;</span> {'{'}<br/>
            {'  '}<span className="text-sky-400">test.beforeEach</span>(<span className="text-rose-400">async</span> ({'{ page }'}) <span className="text-sky-400">=&gt;</span> {'{'}<br/>
            {'    '}<span className="text-rose-400">await</span> page.<span className="text-sky-400">goto</span>(<span className="text-amber-300">'/'</span>);<br/>
            {'  }'});<br/>
            <br/>
            {'  '}<span className="text-slate-500">// Visual Regression (Responsive)</span><br/>
            {'  '}<span className="text-sky-400">test</span>(<span className="text-amber-300">'visual regression testing layout scales correctly'</span>, <span className="text-rose-400">async</span> ({'{ page }'}) <span className="text-sky-400">=&gt;</span> {'{'}<br/>
            {'    '}<span className="text-rose-400">await</span> <span className="text-sky-400">expect</span>(page).<span className="text-sky-400">toHaveScreenshot</span>(<span className="text-amber-300">'home-page.png'</span>, {'{'} maxDiffPixels: <span className="text-purple-400">100</span> {'}'});<br/>
            {'  }'});<br/>
            <br/>
            {'  '}<span className="text-slate-500">// Accessibility (Axe Core Plugin)</span><br/>
            {'  '}<span className="text-sky-400">test</span>(<span className="text-amber-300">'accessibility checks pass with zero violations'</span>, <span className="text-rose-400">async</span> ({'{ page }'}) <span className="text-sky-400">=&gt;</span> {'{'}<br/>
            {'    '}<span className="text-rose-400">const</span> accessibilityScanResults = <span className="text-rose-400">await new</span> <span className="text-emerald-300">AxeBuilder</span>({'{ page }'}).<span className="text-sky-400">analyze</span>();<br/>
            {'    '}<span className="text-sky-400">expect</span>(accessibilityScanResults.violations).<span className="text-sky-400">toEqual</span>([]);<br/>
            {'  }'});<br/>
            <br/>
            {'  '}<span className="text-slate-500">// Network Intercepts & API Mocking</span><br/>
            {'  '}<span className="text-sky-400">test</span>(<span className="text-amber-300">'API mocked intercept for Chat Widget returns 200 OK'</span>, <span className="text-rose-400">async</span> ({'{ page }'}) <span className="text-sky-400">=&gt;</span> {'{'}<br/>
            {'    '}<span className="text-rose-400">await</span> page.<span className="text-sky-400">route</span>(<span className="text-amber-300">'**/v1beta/models/**'</span>, <span className="text-rose-400">async</span> route <span className="text-sky-400">=&gt;</span> {'{'}<br/>
            {'      '}<span className="text-rose-400">await</span> route.<span className="text-sky-400">fulfill</span>({'{'} json: {'{'} response: <span className="text-amber-300">'Mocked!'</span> {'}'} {'}'});<br/>
            {'    }'});<br/>
            {'    '}<span className="text-rose-400">await</span> page.<span className="text-sky-400">getByLabel</span>(<span className="text-amber-300">'Toggle AI Assistant'</span>).<span className="text-sky-400">click</span>();<br/>
            {'    '}<span className="text-rose-400">await</span> <span className="text-sky-400">expect</span>(page.<span className="text-sky-400">getByText</span>(<span className="text-amber-300">'Mocked!'</span>)).<span className="text-sky-400">toBeVisible</span>();<br/>
            {'  }'});<br/>
            {'});'}
          </div>
        )}

        {/* k6 Code View */}
        {activeTab === 'k6' && (
          <div className="code-scroll absolute inset-0 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-300 sm:text-sm whitespace-pre">
            <span className="text-rose-400">import</span> http <span className="text-rose-400">from</span> <span className="text-amber-300">'k6/http'</span>;<br/>
            <span className="text-rose-400">import</span> {'{ check, sleep }'} <span className="text-rose-400">from</span> <span className="text-amber-300">'k6'</span>;<br/>
            <br/>
            <span className="text-rose-400">export const</span> options = {'{'}<br/>
            {'  '}stages: [<br/>
            {'    {'} duration: <span className="text-amber-300">'30s'</span>, target: <span className="text-purple-400">50</span> {'}'},  <span className="text-slate-500">// Ramp up</span><br/>
            {'    {'} duration: <span className="text-amber-300">'1m'</span>, target: <span className="text-purple-400">50</span> {'}'},   <span className="text-slate-500">// Sustain</span><br/>
            {'    {'} duration: <span className="text-amber-300">'10s'</span>, target: <span className="text-purple-400">0</span> {'}'},   <span className="text-slate-500">// Ramp down</span><br/>
            {'  '}],<br/>
            {'  '}thresholds: {'{'}<br/>
            {'    '}http_req_duration: [<span className="text-amber-300">'p(95)&lt;500'</span>], <span className="text-slate-500">// 95% of reqs &lt; 500ms</span><br/>
            {'    '}http_req_failed: [<span className="text-amber-300">'rate&lt;0.01'</span>],   <span className="text-slate-500">// Error rate &lt; 1%</span><br/>
            {'  }'},<br/>
            {'}'};<br/>
            <br/>
            <span className="text-rose-400">export default function</span> () {'{'}<br/>
            {'  '}<span className="text-rose-400">const</span> res = http.<span className="text-sky-400">get</span>(<span className="text-amber-300">'https://obayedmamur.com/'</span>);<br/>
            {'  '}<span className="text-sky-400">check</span>(res, {'{'}<br/>
            {'    '}<span className="text-amber-300">'status is 200'</span>: (r) <span className="text-sky-400">=&gt;</span> r.status === <span className="text-purple-400">200</span>,<br/>
            {'    '}<span className="text-amber-300">'transaction time &lt; 200ms'</span>: (r) <span className="text-sky-400">=&gt;</span> r.timings.duration &lt; <span className="text-purple-400">200</span>,<br/>
            {'  }'});<br/>
            {'  '}<span className="text-sky-400">sleep</span>(<span className="text-purple-400">1</span>);<br/>
            {'}'}<br/>
          </div>
        )}

        {/* Terminal View */}
        {activeTab === 'terminal' && (
          <div 
            ref={terminalRef}
            className="code-scroll absolute inset-0 overflow-auto p-4 font-mono text-sm space-y-1.5 whitespace-nowrap"
          >
            {logs.length === 0 ? (
              <div className="text-slate-500 h-full flex flex-col items-center justify-center italic opacity-70">
                <IconTerminal />
                <span className="mt-2 text-xs">Waiting for execution... Select a script and click "Run"</span>
              </div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className={typeof log === 'string' && log.startsWith('$') ? 'text-teal-400 mb-4' : ''}>
                  {log}
                </div>
              ))
            )}
            {status === 'running' && (
              <div className="text-slate-400 animate-pulse mt-2">_</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    setDarkMode(isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
  }, []);

  const toggleTheme = () => {
    const nextThemeIsDark = !darkMode;
    const root = document.documentElement;

    setDarkMode(nextThemeIsDark);
    root.classList.toggle('dark', nextThemeIsDark);
    root.style.colorScheme = nextThemeIsDark ? 'dark' : 'light';

    try {
      localStorage.setItem('portfolio-theme', nextThemeIsDark ? 'dark' : 'light');
    } catch {
      // Theme switching should still work when storage is unavailable.
    }
  };

  // Handle active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'demo', 'projects', 'skills'];
      const scrollPosition = window.scrollY + 150;
      let currentSection = 'about';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = section;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-montserrat text-slate-600 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-400">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-teal-600 text-white p-2 rounded z-50"
      >
        Skip to main content
      </a>

      {/* AI Assistant Widget Integration */}
      <AIChatWidget portfolioInfo={portfolioData} />

      {/* Grid Background Pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-5 sm:px-8 md:px-12 lg:px-16 xl:flex-row xl:gap-20 xl:px-20">
        {/* Left Column / Sidebar */}
        <header className="flex flex-col justify-between py-10 sm:py-12 xl:sticky xl:top-0 xl:max-h-screen xl:min-w-0 xl:w-1/3 xl:py-24">
          <div>
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-6"
            >
              <h1 className="text-5xl sm:text-6xl font-playfair font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                <a
                  href="/"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
                >
                  {portfolioData.personal.name}
                </a>
              </h1>
            </motion.div>

            <motion.h2
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-2 text-lg sm:text-xl font-montserrat font-medium text-slate-700 dark:text-slate-300 tracking-wide uppercase"
            >
              <TypewriterEffect text={portfolioData.personal.title} />
            </motion.h2>

            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-6 max-w-sm text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light font-montserrat"
            >
              Architecting{" "}
              <strong className="font-medium text-teal-700 dark:text-teal-400">
                scalable test automation
              </strong>{" "}
              frameworks and ensuring exceptional software quality across modern
              web ecosystems.
            </motion.p>

            {/* Desktop Navigation */}
            <nav
              className="nav mt-16 hidden xl:block"
              aria-label="In-page navigation"
            >
              <ul className="w-max space-y-4">
                {["about", "experience", "demo", "projects", "skills"].map(
                  (item, i) => (
                    <motion.li
                      key={item}
                      initial={false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    >
                      <a
                        href={`#${item}`}
                        className={`group flex min-h-11 items-center py-2 uppercase tracking-widest text-sm font-bold transition-all ${
                          activeSection === item
                            ? "text-teal-700 dark:text-teal-400"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                        }`}
                      >
                        {/* Original Left Line */}
                        <span
                          className={`mr-4 h-px transition-all bg-current ${
                            activeSection === item
                              ? "w-16 bg-teal-600 dark:bg-teal-400"
                              : "w-8 group-hover:w-16 group-hover:bg-slate-900 dark:group-hover:bg-slate-200"
                          }`}
                        ></span>

                        {/* Text with Floating Underline */}
                        <span className="relative">
                          {item}
                          <span
                            className={`absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300 ease-out ${
                              activeSection === item
                                ? "w-full bg-teal-700 dark:bg-teal-400"
                                : "w-0 bg-slate-900 dark:bg-slate-200 group-hover:w-full"
                            }`}
                          />
                        </span>
                      </a>
                    </motion.li>
                  ),
                )}
              </ul>
            </nav>
          </div>

          {/* Social Links & Theme Toggle */}
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8 flex items-center gap-2 sm:mt-12 sm:gap-3 xl:mt-0"
          >
            <a
              href={portfolioData.personal.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <IconGithub />
            </a>
            <a
              href={portfolioData.personal.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <IconLinkedin />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              aria-label="Email"
              className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <IconMail />
            </a>
            <div className="mx-1 h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              aria-pressed={darkMode}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-200 hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-teal-400"
            >
              {darkMode ? <IconSun /> : <IconMoon />}
            </button>
          </motion.div>
        </header>

        <nav
          className="nav-scroll sticky top-0 z-40 -mx-1 overflow-x-auto border-y border-slate-200 bg-slate-50/95 px-1 backdrop-blur xl:hidden dark:border-slate-800 dark:bg-slate-900/95"
          aria-label="Section navigation"
        >
          <ul className="flex min-w-max items-center gap-1">
            {["about", "experience", "demo", "projects", "skills"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className={`flex min-h-11 items-center rounded-md px-3 text-xs font-semibold uppercase tracking-wider transition-colors ${activeSection === item ? "bg-teal-100 text-teal-800 dark:bg-teal-400/10 dark:text-teal-300" : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"}`}
                  >
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* Right Column / Content */}
        <main
          id="main-content"
          className="flex min-w-0 flex-col gap-24 py-12 xl:w-2/3 xl:py-24"
        >
          {/* About Section */}
          <section id="about" className="scroll-mt-24">
            <SectionHeading id="about-heading">About Me</SectionHeading>
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4"
            >
              <p>{portfolioData.personal.summary}</p>
              <p>
                My focus is not just on finding bugs, but on building robust,
                scalable infrastructure that prevents them. I specialize in
                architecting frameworks using modern tools like{" "}
                <strong className="text-slate-900 dark:text-slate-200 font-medium">
                  Playwright and TypeScript
                </strong>
                , and integrating these suites deep into CI/CD pipelines to
                ensure continuous quality.
              </p>
              <p>
                Recently, I've been exploring the intersection of QA and AI,
                utilizing custom MCP servers and LLMs to auto-generate complex
                test scenarios and expand coverage beyond traditional manual
                efforts.
              </p>
            </motion.div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="scroll-mt-24">
            <SectionHeading id="experience-heading">Experience</SectionHeading>

            <div className="space-y-16">
              {}
              {portfolioData.experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Subtle hover background for the whole company block */}
                  <div className="absolute -inset-x-4 -inset-y-6 z-0 hidden rounded-2xl transition-colors duration-300 xl:-inset-x-6 xl:block xl:group-hover:bg-slate-100/50 dark:xl:group-hover:bg-slate-800/30"></div>

                  <div className="relative z-10">
                    {/* Company Header */}
                    <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group/link"
                        >
                          {job.company}
                          <IconExternal className="h-4 w-4 opacity-0 -translate-x-2 translate-y-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 group-hover/link:translate-y-0 transition-all duration-300" />
                        </a>
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-medium px-3 py-1 bg-slate-200/50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 rounded-full">
                          {job.totalPeriod}
                        </span>
                      </div>
                    </header>

                    {/* Timeline & Roles */}
                    <div className="relative border-l-2 border-slate-200 dark:border-slate-700/50 ml-2.5 md:ml-3 space-y-10">
                      {job.roles.map((role, roleIndex) => (
                        <div key={roleIndex} className="relative pl-6 md:pl-8">
                          {/* Timeline Node */}
                          <div className="absolute w-3 h-3 bg-teal-500 rounded-full -left-[7px] top-2 ring-4 ring-slate-50 dark:ring-slate-900 shadow-sm transition-transform group-hover:scale-110"></div>

                          {/* Role Header */}
                          <div className="flex flex-col mb-4">
                            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                              {role.title}
                            </h4>
                            <span className="text-sm font-medium text-teal-600 dark:text-teal-400 mt-1">
                              {role.period}
                            </span>
                          </div>

                          {/* Narrative Description */}
                          <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400 mb-6 font-light">
                            {role.description}
                          </p>

                          {/* Refined Highlights */}
                          {role.achievements &&
                            role.achievements.length > 0 && (
                              <div className="space-y-3">
                                <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                                  Key Highlights
                                </h5>
                                {role.achievements.map((achievement, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-3 group/item"
                                  >
                                    <svg
                                      className="w-4 h-4 text-teal-500/70 mt-1 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1 group-hover/item:text-teal-500"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                    <span className="text-sm md:text-base text-slate-600 dark:text-slate-400 group-hover/item:text-slate-900 dark:group-hover/item:text-slate-200 transition-colors duration-300">
                                      {achievement}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-11 items-center font-semibold text-slate-900 dark:text-slate-200"
              >
                <span className="border-b border-transparent pb-px transition-colors duration-300 group-hover:border-teal-500">
                  View Full Résumé
                </span>
                <IconExternal className="ml-2 h-4 w-4 transform transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </div>
          </section>

          {/* Live Demo Section */}
          <section id="demo" className="scroll-mt-24">
            <SectionHeading id="demo-heading">
              Live Automation Demo
            </SectionHeading>
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-600 dark:text-slate-400"
            >
              <p className="mb-4">
                A true SDET doesn't just build a portfolio—they test it. I've
                integrated a simulated{" "}
                <strong className="text-slate-900 dark:text-slate-200 font-medium">
                  Playwright test runner
                </strong>{" "}
                and{" "}
                <strong className="text-slate-900 dark:text-slate-200 font-medium">
                  k6 performance suite
                </strong>{" "}
                directly into this site. Switch between the tabs and run the
                suites to see how I validate UI responsiveness, API
                interactions, and load resilience in real-time.
              </p>
              <LiveTestRunner />
            </motion.div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="scroll-mt-24">
            <SectionHeading id="projects-heading">
              Selected Projects
            </SectionHeading>
            <div className="space-y-12">
              {portfolioData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4"
                >
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none xl:-inset-x-6 xl:block xl:group-hover:bg-slate-200/50 dark:xl:group-hover:bg-slate-800/50 xl:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] xl:group-hover:drop-shadow-lg"></div>

                  <div className="z-10 sm:col-span-8">
                    <h3 className="flex flex-wrap items-center gap-3 font-medium leading-snug text-slate-900 dark:text-slate-200 text-base">
  <a 
    href={project.url} 
    target="_blank" 
    rel="noreferrer" 
    aria-label={project.title}
    className="group/link relative inline-flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 focus-visible:text-teal-600"
  >
    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 xl:block"></span>
    <span>{project.title}</span>
    <IconExternal className="h-4 w-4 shrink-0 opacity-70 transition-all group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:opacity-100" />
  </a>
  
  {project.repo && (
    <a 
      href={project.repo} 
      target="_blank" 
      rel="noreferrer" 
      aria-label="GitHub Repository"
      className="relative z-10 flex shrink-0 items-center justify-center text-slate-500 transition-colors hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-400 dark:hover:text-teal-400"
    >
      <IconGithub className="h-5 w-5" />
    </a>
  )}
</h3>
                    <p className="mt-2 text-sm leading-normal text-slate-600 dark:text-slate-400">
                      {project.description}
                    </p>
                    <ul
                      className="mt-4 flex flex-wrap"
                      aria-label="Technologies used"
                    >
                      {project.tags.map((tag, i) => (
                        <li key={i} className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-100 dark:bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-800 dark:text-teal-300">
                            {tag}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="scroll-mt-24">
            <SectionHeading id="skills-heading">
              Technical Skills
            </SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {portfolioData.skills.map((skillGroup, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-800/50 rounded-lg p-5 border border-slate-200 dark:border-slate-700/50 shadow-sm"
                >
                  <h3 className="text-slate-900 dark:text-slate-200 font-semibold mb-3 text-sm tracking-wide uppercase">
                    {skillGroup.category}
                  </h3>
                  <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-1.5">
                    {skillGroup.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-teal-500 before:rounded-full before:mr-2"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
  <p>
    &copy; {new Date().getFullYear()} Obayed Mamur. All rights reserved.
  </p>
</footer>
        </main>
      </div>
    </div>
  );
}
